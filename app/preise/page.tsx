import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preise – KestKlar",
  description: "Transparente Preise für die KeSt-Berechnung. Kostenloser Einstieg, faire Jahresbeiträge.",
};

const features = [
  {
    category: "Berechnung",
    rows: [
      { label: "KeSt-Gesamtbetrag (27,5%)", free: true, standard: true, pro: true },
      { label: "Aufschlüsselung nach Einkommensart", free: false, standard: true, pro: true },
      { label: "Ausschüttungsgleiche ETF-Erträge (ÖEKB)", free: false, standard: true, pro: true },
      { label: "Verlustausgleich über mehrere Broker", free: false, standard: true, pro: true },
      { label: "Anrechnung ausländischer Quellensteuer", free: false, standard: true, pro: true },
    ],
  },
  {
    category: "E1kv & Export",
    rows: [
      { label: "E1kv Formularzeilen", free: false, standard: true, pro: true },
      { label: "PDF-Export (Steuerbericht)", free: false, standard: true, pro: true },
      { label: "Datenspeicherung für Folgejahre", free: false, standard: true, pro: true },
      { label: "Verlustvorträge in Folgejahre übernehmen", free: false, standard: true, pro: true },
    ],
  },
  {
    category: "Broker & Import",
    rows: [
      { label: "1 Broker", free: true, standard: false, pro: false },
      { label: "Bis zu 3 Broker", free: false, standard: true, pro: false },
      { label: "Unbegrenzte Broker-Konten", free: false, standard: false, pro: true },
      { label: "PDF-Import (Trade Republic, Scalable, IBKR)", free: true, standard: true, pro: true },
      { label: "CSV-Import (alle Broker)", free: false, standard: false, pro: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { label: "Dokumentation & FAQ", free: true, standard: true, pro: true },
      { label: "E-Mail-Support", free: false, standard: true, pro: true },
      { label: "Priorisierter Support", free: false, standard: false, pro: true },
    ],
  },
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto shrink-0">
    <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto shrink-0 opacity-25">
    <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function PreisePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Einfache, transparente Preise
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Kostenlos sehen wie viel KeSt du schuldest.
          Für die E1kv-Zeilen und den fertigen Bericht — einmal pro Jahr.
        </p>
      </div>

      {/* Combined plan header + feature table */}
      <div className="border border-border">

        {/* Column headers with plan details */}
        <div className="grid grid-cols-4 border-b border-border bg-secondary">
          <div className="px-4 py-4 border-r border-border" />

          {/* Free */}
          <div className="px-4 py-4 border-r border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Free</p>
            <p className="font-serif text-xl text-foreground">€ 0</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">für immer</p>
            <Link
              href="/#waitlist"
              className="mt-3 block text-center text-[10px] font-medium border border-border text-foreground px-2 py-1.5 hover:bg-background transition-colors"
            >
              Starten
            </Link>
          </div>

          {/* Standard — highlighted */}
          <div className="px-4 py-4 border-r border-border bg-foreground">
            <p className="text-[10px] text-background/50 uppercase tracking-wider mb-1">Standard</p>
            <p className="font-serif text-xl text-background">€ 29</p>
            <p className="text-[10px] text-background/50 mt-0.5">pro Steuerjahr</p>
            <Link
              href="/#waitlist"
              className="mt-3 block text-center text-[10px] font-medium bg-background text-foreground px-2 py-1.5 hover:opacity-80 transition-opacity"
            >
              Warteliste
            </Link>
          </div>

          {/* Pro */}
          <div className="px-4 py-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Pro</p>
            <p className="font-serif text-xl text-foreground">€ 69</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">pro Steuerjahr</p>
            <Link
              href="/#waitlist"
              className="mt-3 block text-center text-[10px] font-medium border border-border text-foreground px-2 py-1.5 hover:bg-secondary transition-colors"
            >
              Warteliste
            </Link>
          </div>
        </div>

        {/* Feature rows */}
        {features.map((group) => (
          <div key={group.category}>
            {/* Category header */}
            <div className="grid grid-cols-4 bg-secondary/60 border-b border-border">
              <div className="col-span-4 px-4 py-2">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {group.category}
                </p>
              </div>
            </div>

            {/* Rows */}
            {group.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-4 border-b border-border last:border-b-0">
                <div className="px-4 py-3 border-r border-border">
                  <p className="text-xs text-foreground leading-relaxed">{row.label}</p>
                </div>
                <div className={`px-4 py-3 border-r border-border flex items-center justify-center ${row.free ? "text-foreground" : "text-muted-foreground"}`}>
                  {row.free ? <Check /> : <Dash />}
                </div>
                <div className={`px-4 py-3 border-r border-border flex items-center justify-center bg-foreground/[0.03] ${row.standard ? "text-foreground" : "text-muted-foreground"}`}>
                  {row.standard ? <Check /> : <Dash />}
                </div>
                <div className={`px-4 py-3 flex items-center justify-center ${row.pro ? "text-foreground" : "text-muted-foreground"}`}>
                  {row.pro ? <Check /> : <Dash />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Plan descriptions below table */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-px border border-border bg-border">
        <div className="bg-background px-5 py-4">
          <p className="text-xs font-medium text-foreground mb-1">Free</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Du siehst deinen KeSt-Gesamtbetrag. Die E1kv-Zeilen und der Bericht bleiben gesperrt — dafür brauchst du Standard.
          </p>
        </div>
        <div className="bg-background px-5 py-4">
          <p className="text-xs font-medium text-foreground mb-1">Standard — empfohlen</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Alles was du für die Steuererklärung brauchst. E1kv-Zeilen, PDF-Export, Datenspeicherung. Richtig für die große Mehrheit der Anleger.
          </p>
        </div>
        <div className="bg-background px-5 py-4">
          <p className="text-xs font-medium text-foreground mb-1">Pro</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Für Anleger mit mehr als drei Brokern oder komplexen Portfolios. CSV-Import und priorisierter Support inklusive.
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          Alle Preise inkl. MwSt. · Einmalig pro Steuerjahr · Keine automatische Verlängerung
        </p>
        <p className="text-xs text-muted-foreground">
          Fragen?{" "}
          <a href="mailto:hallo@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">
            hallo@kestklar.at
          </a>
        </p>
      </div>
    </main>
  );
}
