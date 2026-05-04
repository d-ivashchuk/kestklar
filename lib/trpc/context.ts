import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function createContext() {
  const { userId } = await auth();
  return { userId, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
