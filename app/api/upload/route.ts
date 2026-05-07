import { auth } from "@clerk/nextjs/server";
import { Decimal } from "decimal.js";
import { db } from "@/lib/db";
import { PARSERS } from "@/lib/parsers";
import { getEurRatesForDates, fxKey } from "@/lib/fx/ecb";
import type { Broker } from "@prisma/client";

/**
 * Synchronous upload + parse.
 *
 * Browser POSTs multipart/form-data: { file, broker, taxYear }.
 * We parse inline, resolve FX with ECB rates, write Transactions, and
 * return the uploadId. No Cloudflare hop, no presigned URLs — everything
 * happens on Vercel in a single request.
 *
 * For the closed beta this keeps deploy + ops single-path. The Cloudflare
 * Workflow stack stays in the repo (`workers/`) for when files outgrow the
 * 4.5 MB Vercel body limit or when parsing needs > 60 s.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_BROKERS: Broker[] = ["IBKR", "SCALABLE", "DEGIRO", "TRADE_REPUBLIC", "MANUAL"];

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  const broker = formData.get("broker");
  const taxYearRaw = formData.get("taxYear");

  if (!(file instanceof File)) return Response.json({ error: "Missing file" }, { status: 400 });
  if (typeof broker !== "string" || !ALLOWED_BROKERS.includes(broker as Broker)) {
    return Response.json({ error: "Invalid broker" }, { status: 400 });
  }
  const taxYear = typeof taxYearRaw === "string" ? parseInt(taxYearRaw, 10) : NaN;
  if (!Number.isInteger(taxYear) || taxYear < 2018 || taxYear > new Date().getFullYear()) {
    return Response.json({ error: "Invalid taxYear" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "File too large (max 10 MB for beta)" }, { status: 413 });
  }

  // Ensure the User row exists before we FK-reference it.
  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, plan: "PRO" },
  });

  const upload = await db.brokerUpload.create({
    data: {
      userId,
      broker: broker as Broker,
      taxYear,
      filename: file.name,
      status: "PARSING",
    },
  });

  try {
    const parser = PARSERS[broker];
    if (!parser) throw new Error(`No parser for ${broker}`);
    const buffer = await file.arrayBuffer();
    const parseResult = await parser({ buffer, filename: file.name, taxYear });

    const fxRates = await getEurRatesForDates({
      pairs: parseResult.transactions.map((t) => ({ currency: t.currency, date: t.date })),
    });

    if (parseResult.transactions.length > 0) {
      await db.transaction.createMany({
        data: parseResult.transactions.map((t) => {
          const fx = fxRates.get(fxKey(t.currency, t.date));
          if (!fx) throw new Error(`No FX rate resolved for ${t.currency} on ${t.date.toISOString()}`);
          const grossEur = new Decimal(t.grossAmount).mul(fx.rate);
          const withholdingEur = new Decimal(t.withholdingTax).mul(fx.rate);
          const priceEur = t.pricePerUnit ? new Decimal(t.pricePerUnit).mul(fx.rate) : null;
          return {
            uploadId: upload.id,
            userId,
            type: t.type,
            isin: t.isin,
            date: t.date,
            quantity: t.quantity ?? null,
            priceEur: priceEur?.toString() ?? null,
            grossAmountEur: grossEur.toString(),
            withholdingTaxEur: withholdingEur.toString(),
            currency: t.currency,
            fxRate: fx.rate.toString(),
            fxDate: fx.rateDate,
          };
        }),
      });
    }

    await db.brokerUpload.update({
      where: { id: upload.id },
      data: { status: "DONE", parsedAt: new Date() },
    });

    return Response.json({
      uploadId: upload.id,
      transactionCount: parseResult.transactions.length,
      warnings: parseResult.warnings,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await db.brokerUpload.update({
      where: { id: upload.id },
      data: { status: "FAILED", errorMessage: message },
    });
    return Response.json({ error: message, uploadId: upload.id }, { status: 422 });
  }
}
