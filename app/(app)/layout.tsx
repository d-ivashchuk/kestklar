import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { TRPCProvider } from "@/lib/trpc/provider";

// Force dynamic — every page in this subtree needs auth context.
export const dynamic = "force-dynamic";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <div className="min-h-screen bg-background">
          <header className="border-b border-border/40">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
              <Link href="/app" className="text-sm font-semibold tracking-tight">
                KestKlar
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link href="/app" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                <Link href="/app/settings" className="text-muted-foreground hover:text-foreground">
                  Einstellungen
                </Link>
                <UserButton afterSignOutUrl="/" />
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </div>
      </TRPCProvider>
    </ClerkProvider>
  );
}
