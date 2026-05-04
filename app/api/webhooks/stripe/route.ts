import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Stripe webhook — updates User.plan after checkout.session.completed.
 *
 * Signature verification uses Stripe.webhooks.constructEvent — wired once the
 * `stripe` SDK is installed. Until then this returns 501 to fail closed.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return NextResponse.json({ ok: false }, { status: 501 });

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  const body = await req.text();

  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as "STANDARD" | "PRO" | undefined;
    if (userId && plan) {
      await db.user.update({
        where: { id: userId },
        data: {
          plan,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
        },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
