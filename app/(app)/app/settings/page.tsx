"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

export default function SettingsPage() {
  const me = trpc.user.getMe.useQuery();
  const deleteAccount = trpc.user.deleteAccount.useMutation();

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Einstellungen</h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Konto</h2>
        <div className="rounded-lg border border-border/60 p-4 text-sm">
          <div className="text-muted-foreground">E-Mail</div>
          <div>{me.data?.email ?? "—"}</div>
          <div className="mt-3 text-muted-foreground">Plan</div>
          <div>{me.data?.plan ?? "—"} (Beta — kostenlos)</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-red-600">Daten löschen</h2>
        <p className="text-sm text-muted-foreground">
          Löscht dein Konto sowie alle hochgeladenen Daten, Transaktionen und Berechnungen unwiderruflich.
        </p>
        <button
          onClick={async () => {
            if (!confirm("Wirklich gesamtes Konto und alle Daten löschen?")) return;
            try {
              await deleteAccount.mutateAsync();
              toast.success("Konto gelöscht");
              window.location.href = "/";
            } catch {
              toast.error("Löschen fehlgeschlagen");
            }
          }}
          className="rounded-md border border-red-500/40 px-3 py-1.5 text-sm text-red-600 hover:bg-red-500/5"
        >
          Konto und Daten löschen
        </button>
      </section>
    </div>
  );
}
