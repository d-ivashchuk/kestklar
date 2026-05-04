import {
  GlyphMultiBroker,
  GlyphDatabase,
  GlyphFormLine,
  GlyphWarning,
  GlyphAiCheck,
  GlyphPdfExport,
} from "./illustrations";

const features = [
  {
    title: "Mehrere Broker, eine Berechnung",
    body: "Trade Republic, IBKR, Scalable Capital — lade alle PDFs hoch. Der Verlustausgleich über Broker hinweg passiert automatisch.",
    Glyph: GlyphMultiBroker,
  },
  {
    title: "ETF-Erträge automatisch",
    body: "Ausschüttungsgleiche Erträge deiner thesaurierenden ETFs werden direkt aus der ÖEKB-Datenbank abgerufen. Du musst nichts selbst nachschlagen.",
    Glyph: GlyphDatabase,
  },
  {
    title: "Genaue E1kv-Zeilen",
    body: "Kein Raten welche Zahl wohin kommt. KestKlar sagt dir exakt: Zeile 984 — 320 Euro. Zeile 994 — 3.180 Euro. Einfach abtippen.",
    Glyph: GlyphFormLine,
  },
  {
    title: "Nichtmeldefonds-Warnung",
    body: "Falls ein Fonds nicht bei der ÖEKB gemeldet ist, wirst du sofort gewarnt — bevor du einen zu niedrigen Betrag einreichst.",
    Glyph: GlyphWarning,
  },
  {
    title: "KI-Plausibilitätsprüfung",
    body: "Nach der Berechnung prüft ein KI-Modell das Ergebnis auf Ungereimtheiten. Auffälligkeiten werden klar erklärt, nie stillschweigend ignoriert.",
    Glyph: GlyphAiCheck,
  },
  {
    title: "PDF-Export für deine Unterlagen",
    body: "Exportiere eine vollständige Aufstellung aller Transaktionen und Berechnungen — als Beilage für FinanzOnline oder den Steuerberater.",
    Glyph: GlyphPdfExport,
  },
];

export function Features() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            Alles was du für die Steuererklärung brauchst
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            KestKlar übernimmt den mechanischen Teil — damit du dich aufs Investieren konzentrieren kannst.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border bg-border">
          {features.map((f, i) => (
            <div key={f.title} className="feature-card bg-background p-6 space-y-3">
              <div className="flex items-start justify-between">
                <f.Glyph className="feature-glyph w-6 h-6 text-foreground/80" />
                <span className="feature-num font-mono text-xs text-muted-foreground/40">0{i + 1}</span>
              </div>
              <h3 className="feature-title font-sans text-sm font-medium text-foreground">{f.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
