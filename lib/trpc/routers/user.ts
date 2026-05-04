import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../init";

export const userRouter = router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.userId } });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),

  // GDPR: full account + data deletion.
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    // Cascading deletes wipe Transactions, Positions, Uploads, TaxCalculationResults
    // via Prisma onDelete: Cascade. ÖEKB cache is shared and not deleted.
    await ctx.db.user.delete({ where: { id: ctx.userId } });
    return { ok: true };
  }),

  updateProfile: protectedProcedure
    .input(z.object({ email: z.string().email().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({ where: { id: ctx.userId }, data: input });
    }),
});
