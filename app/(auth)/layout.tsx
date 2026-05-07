import { ClerkProvider } from "@clerk/nextjs";

// Auth pages must render dynamically — Clerk's components read runtime context.
export const dynamic = "force-dynamic";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
