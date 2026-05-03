import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Steuer-Ratgeber für österreichische Anleger – KestKlar",
  description:
    "Praktische Anleitungen zur Kapitalertragsteuer in Österreich: E1kv ausfüllen, ausschüttungsgleiche Erträge, KeSt berechnen bei IBKR und Scalable Capital.",
};

const articles = [
  {
    slug: "e1kv-ausfuellen",
    title: "E1kv ausfüllen: Schritt-für-Schritt-Anleitung für Anleger",
    description:
      "Welche Zeilen musst du wo eintragen? Eine klare Anleitung zur Beilage E1kv für Kapitalvermögen — mit konkreten Beispielen für Dividenden, Kursgewinne und ETF-Erträge.",
    keyword: "E1kv · Kapitalvermögen · FinanzOnline",
    readTime: "6 min",
  },
  {
    slug: "ausschuettungsgleiche-ertraege",
    title: "Ausschüttungsgleiche Erträge: Was sie sind und wie du sie versteuern musst",
    description:
      "Thesaurierende ETFs schütten nichts aus — aber du musst trotzdem Steuern zahlen. Wie das funktioniert, was die ÖEKB damit zu tun hat, und wie du die Beträge berechnest.",
    keyword: "ETF · ÖEKB · Thesaurierung",
    readTime: "7 min",
  },
  {
    slug: "kest-berechnen",
    title: "KeSt berechnen bei nicht-steuereinfachen Brokern (IBKR, Scalable & Co.)",
    description:
      "Wenn dein Broker die Steuer nicht automatisch abführt, musst du es selbst tun. Eine vollständige Anleitung: Was zählt, was nicht, und wie der Verlustausgleich funktioniert.",
    keyword: "KeSt · Verlustausgleich · E1kv",
    readTime: "8 min",
  },
  {
    slug: "interactive-brokers-steuer-oesterreich",
    title: "Interactive Brokers Steuererklärung Österreich: Komplette Anleitung",
    description:
      "Activity Statement lesen, gleitenden Durchschnittspreis berechnen, US-Quellensteuer anrechnen und alles korrekt in der E1kv eintragen. Mit allen offiziellen BMF-Quellen.",
    keyword: "Interactive Brokers · IBKR · E1kv",
    readTime: "8 min",
  },
  {
    slug: "degiro-steuer-oesterreich",
    title: "DEGIRO Steuererklärung Österreich: Anleitung 2025",
    description:
      "DEGIRO Austria existiert nicht mehr — wer DEGIRO heute nutzt, nutzt DEGIRO Deutschland und ist nicht steuereinfach. So füllst du E1kv korrekt aus.",
    keyword: "DEGIRO · flatex · E1kv",
    readTime: "9 min",
  },
  {
    slug: "scalable-capital-steuer-oesterreich",
    title: "Scalable Capital Steuer Österreich: Status 2025",
    description:
      "Vollbank-Lizenz, Depotmigration weg von Baader Bank, KPMG-Steuerreport: was sich 2025 geändert hat und was du in der E1kv eintragen musst.",
    keyword: "Scalable · Baader · E1kv",
    readTime: "10 min",
  },
  {
    slug: "verlustausgleich-oesterreich",
    title: "Verlustausgleich Österreich: Was wirklich verrechenbar ist",
    description:
      "§27 Abs 8 EStG zerlegt: drei Buckets, klare Tabelle was geht und was nicht, drei Rechenbeispiele und die neue Steuerreporting-Verordnung 2025.",
    keyword: "§27 EStG · Verluste · 2025",
    readTime: "9 min",
  },
  {
    slug: "etf-meldefonds-pruefen",
    title: "ETF Meldefonds prüfen: OeKB-Anleitung Österreich",
    description:
      "So prüfst du, ob dein ETF Meldefonds oder Schwarzfonds ist. Mit Walkthrough durch my.oekb.at, Pauschalbesteuerungs-Formel und allen Fristen.",
    keyword: "Meldefonds · OeKB · §186 InvFG",
    readTime: "9 min",
  },
];

export default function RatgeberPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Ratgeber</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Steuer-Ratgeber für österreichische Anleger
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          Praktische Anleitungen rund um KeSt, E1kv und die Eigenheiten der österreichischen Kapitalertragsteuer — für Anleger bei Interactive Brokers, Scalable Capital und anderen nicht-steuereinfachen Brokern.
        </p>
      </div>

      <div className="space-y-px border border-border">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/ratgeber/${article.slug}`}
            className="block bg-background hover:bg-secondary transition-colors p-6 border-b border-border last:border-b-0 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {article.keyword} · {article.readTime} Lesezeit
                </p>
                <h2 className="font-serif text-lg text-foreground group-hover:opacity-70 transition-opacity leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </div>
              <span className="text-muted-foreground shrink-0 mt-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
