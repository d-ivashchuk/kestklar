import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

/**
 * Clerk → KestKlar user-sync webhook.
 *
 * NOTE: requires `svix` package (Clerk's recommended verifier). Add it once
 * webhooks are wired in production. For now this route returns 501 in dev so
 * the URL is reserved.
 */
export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "secret missing" }, { status: 501 });

  const headers = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };
  const body = await req.text();
  let evt: { type: string; data: { id: string; email_addresses: Array<{ email_address: string }> } };
  try {
    evt = new Webhook(secret).verify(body, headers) as typeof evt;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const email = evt.data.email_addresses?.[0]?.email_address;
    if (!email) return NextResponse.json({ ok: false }, { status: 400 });
    await db.user.upsert({
      where: { id: evt.data.id },
      create: { id: evt.data.id, email },
      update: { email },
    });
  } else if (evt.type === "user.deleted") {
    await db.user.deleteMany({ where: { id: evt.data.id } });
  }

  return NextResponse.json({ ok: true });
}
