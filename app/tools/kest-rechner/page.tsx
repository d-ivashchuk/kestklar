import type { Metadata } from "next";
import { KestRechner } from "@/components/tools/kest-rechner";
import { JsonLdSoftwareApplication } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "KESt-Rechner Österreich – Kapitalertragsteuer berechnen – KestKlar",
  description:
    "Kostenloser KESt-Rechner: Berechne die 27,5% Kapitalertragsteuer auf Dividenden, Kursgewinne und ausschüttungsgleiche Erträge. Mit Verlustausgleich und Quellensteuer-Anrechnung nach §27 EStG.",
  alternates: { canonical: "https://kestklar.at/tools/kest-rechner" },
};

export default function KestRechnerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdSoftwareApplication
        name="KESt-Rechner Österreich"
        url="https://kestklar.at/tools/kest-rechner"
        description="Kostenloser Online-Rechner für die österreichische Kapitalertragsteuer (27,5%) mit Verlustausgleich nach §27 Abs 8 EStG und Quellensteuer-Anrechnung."
      />

      <div className="mb-10">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Kostenloser Rechner
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          KESt-Rechner Österreich
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Berechne deine österreichische Kapitalertragsteuer (27,5%) auf Dividenden, Kursgewinne und
          ausschüttungsgleiche Erträge — inklusive automatischem Verlustausgleich nach §27 Abs 8 EStG
          und Anrechnung ausländischer Quellensteuer.
        </p>
      </div>

      <KestRechner />

      {/* CTA */}
      <div className="mt-16 border border-border p-6 sm:p-8 text-center">
        <p className="font-serif text-lg text-foreground mb-2">
          KestKlar berechnet das automatisch aus deinem Broker-PDF
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Lade deine Jahresabrechnung hoch — KestKlar liest alle Transaktionen aus und berechnet KeSt, Verlustausgleich und E1kv-Kennzahlen in Minuten.
        </p>
        <a
          href="/#waitlist"
          className="inline-block text-sm font-medium bg-foreground text-background px-6 py-2.5 hover:opacity-80 transition-opacity"
        >
          Kostenlos auf die Warteliste
        </a>
      </div>
    </main>
  );
}
