import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../init";
import { createCheckoutSession, createPortalSession, getStripeCustomer } from "@/lib/stripe";

export const billingRouter = router({
  createCheckout: protectedProcedure
    .input(z.object({ plan: z.enum(["STANDARD", "PRO"]), taxYear: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const customer = await getStripeCustomer({ user });
      const session = await createCheckoutSession({
        customerId: customer.id,
        plan: input.plan,
        taxYear: input.taxYear,
        userId: ctx.userId,
      });
      return { url: session.url };
    }),

  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
      select: { plan: true, stripeCustomerId: true },
    });
    return user;
  }),

  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user?.stripeCustomerId) throw new TRPCError({ code: "BAD_REQUEST", message: "No Stripe customer" });
    const session = await createPortalSession({ customerId: user.stripeCustomerId });
    return { url: session.url };
  }),
});
