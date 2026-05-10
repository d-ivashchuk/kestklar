import type { Metadata } from "next";
import Link from "next/link";
import { MeldefondsVergleich } from "@/components/tools/meldefonds-vergleich";
import { JsonLdSoftwareApplication } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Meldefonds vs. Nicht-Meldefonds Vergleich – Steuer-Impact Rechner – KestKlar",
  description:
    "Vergleiche Meldefonds und Nicht-Meldefonds (Schwarzfonds) steuerlich: Wie viel kostet die Pauschalbesteuerung nach §186 InvFG über 10, 20 oder 30 Jahre? Kostenloser Rechner.",
  alternates: { canonical: "https://kestklar.at/tools/meldefonds-vergleich" },
};

export default function MeldefondsVergleichPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdSoftwareApplication
        name="Meldefonds vs. Nicht-Meldefonds Vergleich"
        url="https://kestklar.at/tools/meldefonds-vergleich"
        description="Kostenloser Rechner: Vergleiche die steuerliche Auswirkung von Meldefonds und Nicht-Meldefonds (Schwarzfonds/Pauschalbesteuerung nach §186 InvFG) über deinen Anlagezeitraum."
      />

      <div className="mb-10">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Kostenloser Rechner
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Meldefonds vs. Nicht-Meldefonds Vergleich
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Nicht-Meldefonds (Schwarzfonds) werden pauschal besteuert: 27,5% auf 90% des NAV-Anstiegs pro
          Jahr. Dieser Rechner zeigt, wie viel dich das über deinen Anlagezeitraum im Vergleich zu einem
          gemeldeten Fonds kostet.
        </p>
      </div>

      <MeldefondsVergleich />

      {/* CTA */}
      <div className="mt-16 border border-border p-6 sm:p-8 text-center">
        <p className="font-serif text-lg text-foreground mb-2">
          Prüfe ob dein ETF ein Meldefonds ist
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          In unserem Ratgeber zeigen wir dir Schritt für Schritt, wie du auf my.oekb.at prüfst ob dein
          ETF als Meldefonds registriert ist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ratgeber/etf-meldefonds-pruefen"
            className="inline-block text-sm font-medium border border-foreground text-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            Zum Meldefonds-Ratgeber
          </Link>
          <a
            href="/#waitlist"
            className="inline-block text-sm font-medium bg-foreground text-background px-6 py-2.5 hover:opacity-80 transition-opacity"
          >
            Kostenlos auf die Warteliste
          </a>
        </div>
      </div>
    </main>
  );
}
