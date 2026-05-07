/**
 * Stripe client + helpers. One-time annual KeSt-year purchases (no subscriptions).
 *
 * NOTE: pulled the SDK import behind a function so the scaffold compiles
 * without `stripe` installed yet. Add `stripe` to package.json before flipping
 * the import to module-scope.
 */
import type { User } from "@prisma/client";

const PLAN_PRICE_IDS: Record<"STANDARD" | "PRO", string | undefined> = {
  STANDARD: process.env.STRIPE_PRICE_STANDARD,
  PRO: process.env.STRIPE_PRICE_PRO,
};

async function client() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  // dynamic import keeps the dep optional during scaffold
  const Stripe = (await import("stripe")).default;
  return new Stripe(key);
}

export async function getStripeCustomer({ user }: { user: User }) {
  const stripe = await client();
  if (user.stripeCustomerId) {
    return stripe.customers.retrieve(user.stripeCustomerId);
  }
  return stripe.customers.create({ email: user.email ?? undefined, metadata: { userId: user.id } });
}

export async function createCheckoutSession(args: {
  customerId: string;
  plan: "STANDARD" | "PRO";
  taxYear: number;
  userId: string;
}) {
  const priceId = PLAN_PRICE_IDS[args.plan];
  if (!priceId) throw new Error(`Stripe price id missing for plan ${args.plan}`);
  const stripe = await client();
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer: args.customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId: args.userId, taxYear: String(args.taxYear), plan: args.plan },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/app/${args.taxYear}/result?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/app/${args.taxYear}`,
  });
}

export async function createPortalSession({ customerId }: { customerId: string }) {
  const stripe = await client();
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/app/settings`,
  });
}
