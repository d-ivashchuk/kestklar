import { router } from "./init";
import { uploadsRouter } from "./routers/uploads";
import { calculationsRouter } from "./routers/calculations";
import { oekbRouter } from "./routers/oekb";
import { billingRouter } from "./routers/billing";
import { userRouter } from "./routers/user";

export const appRouter = router({
  uploads: uploadsRouter,
  calculations: calculationsRouter,
  oekb: oekbRouter,
  billing: billingRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
