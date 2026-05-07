import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

/**
 * Auto-upsert: on the very first authed request from a Clerk user, create
 * their KestKlar User row. During the closed beta we default every new user
 * to plan=PRO so they get full access without Stripe.
 *
 * Email stays NULL until the Clerk webhook (`/api/webhooks/clerk`) populates
 * it — we don't need it for the tax flow.
 */
const BETA_DEFAULT_PLAN = "PRO" as const;

export async function createContext() {
  const { userId } = await auth();
  if (userId) {
    await db.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, plan: BETA_DEFAULT_PLAN },
    });
  }
  return { userId, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
