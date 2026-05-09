export type Broker = {
  slug: string;
  name: string;
  status: "supported" | "coming-soon";
  country: string;
  pdfName: { de: string; en: string };
  description: { de: string; en: string };
  metaTitle: { de: string; en: string };
  metaDesc: { de: string; en: string };
  transactions: number;
  keyFacts: { de: string[]; en: string[] };
};

// Only non-steuereinfach brokers belong here.
// Steuereinfach (automatic KeSt withholding) brokers like Flatex Austria, Erste, Raiffeisen,
// Bank Austria etc. handle tax automatically — their users don't need KestKlar.
//
// NOTE: Trade Republic became steuereinfach in Austria on 24 April 2025.
// However, users still need KestKlar for:
//   (a) the partial period Jan 1 – Apr 23 2025 before activation, and
//   (b) full Steuerjahr 2024 which was not covered by automatic withholding.
export const brokers: Broker[] = [
  {
    slug: "trade-republic",
    name: "Trade Republic",
    status: "supported",
    country: "DE",
    pdfName: { de: "Jahresabrechnung (PDF)", en: "Annual statement (PDF)" },
    transactions: 42,
    description: {
      de: "Trade Republic ist seit 24. April 2025 steuereinfach in Österreich. Für den Zeitraum davor — und für das gesamte Steuerjahr 2024 — musst du die KeSt aber noch selbst berechnen und in der E1kv angeben. KestKlar übernimmt genau das.",
      en: "Trade Republic became tax-simple (steuereinfach) in Austria on 24 April 2025. For the period before that — and for the full tax year 2024 — you still need to calculate and report KeSt yourself in the E1kv. KestKlar handles exactly that.",
    },
    metaTitle: {
      de: "KeSt berechnen mit Trade Republic — KestKlar",
      en: "Calculate KeSt with Trade Republic — KestKlar",
    },
    metaDesc: {
      de: "KestKlar liest deine Trade Republic Jahresabrechnung automatisch aus und berechnet deine österreichische KeSt inklusive ETF-Erträge und E1kv-Kennzahlen.",
      en: "KestKlar automatically reads your Trade Republic annual statement and calculates your Austrian KeSt including ETF distributions and E1kv field values.",
    },
    keyFacts: {
      de: [
        "Für Steuerjahr 2024: Trade Republic war noch nicht steuereinfach — du brauchst den vollen Steuerreport aus der App und musst alle Erträge in der E1kv angeben.",
        "Für Steuerjahr 2025: Nur der Zeitraum 1. Jänner bis 23. April 2025 muss manuell erfasst werden — ab 24. April führt Trade Republic die KeSt automatisch ab.",
        "KestKlar liest den Trade Republic Steuerreport (PDF) automatisch aus und trennt den manuell zu meldenden Zeitraum sauber vom automatisch abgeführten.",
        "Verlustausgleich mit IBKR, Scalable Capital und anderen nicht-steuereinfachen Brokern inklusive.",
      ],
      en: [
        "For tax year 2024: Trade Republic was not yet tax-simple — you need the full tax report from the app and must declare all income in the E1kv.",
        "For tax year 2025: Only the period 1 January – 23 April 2025 needs manual reporting — from 24 April, Trade Republic automatically withholds KeSt.",
        "KestKlar reads the Trade Republic tax report (PDF) automatically and cleanly separates the manually reportable period from the automatically withheld one.",
        "Cross-broker loss netting with IBKR, Scalable Capital and other non-withholding brokers included.",
      ],
    },
  },
  {
    slug: "interactive-brokers",
    name: "Interactive Brokers",
    status: "supported",
    country: "IE",
    pdfName: { de: "Annual Activity Statement (PDF/CSV)", en: "Annual Activity Statement (PDF/CSV)" },
    transactions: 7,
    description: {
      de: "Interactive Brokers (IBKR) ist der Broker der Wahl für aktive Trader und Investoren mit internationalem Portfolio. Die österreichische Steuerbehandlung ist komplex — besonders bei US-Quellensteuer und Währungsgewinnen.",
      en: "Interactive Brokers (IBKR) is the broker of choice for active traders and investors with international portfolios. Austrian tax treatment is complex — especially for US withholding tax and currency gains.",
    },
    metaTitle: {
      de: "KeSt berechnen mit Interactive Brokers (IBKR) — KestKlar",
      en: "Calculate KeSt with Interactive Brokers (IBKR) — KestKlar",
    },
    metaDesc: {
      de: "KestKlar berechnet deine österreichische KeSt für Interactive Brokers Konten inklusive US-Quellensteuer-Anrechnung und E1kv-Kennzahlen.",
      en: "KestKlar calculates your Austrian KeSt for Interactive Brokers accounts including US withholding tax credits and E1kv field values.",
    },
    keyFacts: {
      de: [
        "PDF/CSV: Annual Activity Statement aus dem IBKR Client Portal herunterladen",
        "US-Quellensteuer (15%) wird automatisch als anrechenbare Steuer erfasst",
        "Fremdwährungsbeträge werden je Transaktion in EUR umgerechnet",
        "Die österreichische Kostenbasis wird mit gleitendem Durchschnittspreis berechnet — nicht mit IBKR-FIFO",
      ],
      en: [
        "PDF/CSV: Download your Annual Activity Statement from the IBKR Client Portal",
        "US withholding tax (15%) is automatically captured as creditable tax",
        "Foreign-currency amounts are converted to EUR per transaction",
        "The Austrian cost basis is calculated using the moving average price — not IBKR FIFO",
      ],
    },
  },
  {
    slug: "scalable-capital",
    name: "Scalable Capital",
    status: "supported",
    country: "DE",
    pdfName: { de: "Österreichischer Steuerreport (PDF)", en: "Austrian tax report (PDF)" },
    transactions: 24,
    description: {
      de: "Scalable Capital ist ein deutscher Neo-Broker mit starkem Wachstum in Österreich. Nach aktuellem öffentlich kommuniziertem Stand führt Scalable für österreichische Kund:innen keine österreichische KeSt ab — diese Kapitalerträge müssen daher selbst in der E1kv deklariert werden.",
      en: "Scalable Capital is a German neo-broker growing fast in Austria. Based on its currently public Austrian tax status, Scalable does not withhold Austrian KeSt for Austrian customers — this investment income must therefore be declared in the E1kv.",
    },
    metaTitle: {
      de: "KeSt berechnen mit Scalable Capital — KestKlar",
      en: "Calculate KeSt with Scalable Capital — KestKlar",
    },
    metaDesc: {
      de: "KestKlar liest deinen österreichischen Scalable Capital Steuerreport automatisch aus und berechnet deine österreichische KeSt inklusive ETF-Erträge und E1kv-Kennzahlen.",
      en: "KestKlar automatically reads your Austrian Scalable Capital tax report and calculates your Austrian KeSt including ETF distributions and E1kv field values.",
    },
    keyFacts: {
      de: [
        "PDF: österreichischen Steuerreport im Scalable Portal herunterladen, sobald er für dein Steuerjahr verfügbar ist",
        "Alle Dividenden, ETF-Ausschüttungen und realisierten Kursgewinne werden erkannt",
        "Ausschüttungsgleiche Erträge für thesaurierende ETFs werden via ÖEKB abgerufen",
        "Verlustausgleich mit Trade Republic, IBKR und anderen nicht-steuereinfachen Brokern inklusive",
      ],
      en: [
        "PDF: download your Austrian tax report from the Scalable portal once it is available for your tax year",
        "All dividends, ETF distributions, and realized capital gains are recognized",
        "Deemed distributions for accumulating ETFs are fetched via ÖEKB",
        "Cross-broker loss netting with Trade Republic, IBKR, and other non-withholding brokers included",
      ],
    },
  },
  {
    slug: "bitpanda",
    name: "Bitpanda",
    status: "coming-soon",
    country: "AT",
    pdfName: { de: "Transaktionshistorie", en: "Transaction history" },
    transactions: 0,
    description: { de: "", en: "" },
    metaTitle: { de: "Bitpanda KeSt — KestKlar", en: "Bitpanda KeSt — KestKlar" },
    metaDesc: { de: "", en: "" },
    keyFacts: { de: [], en: [] },
  },
  {
    slug: "degiro",
    name: "DEGIRO",
    status: "coming-soon",
    country: "NL",
    pdfName: { de: "Jahresabrechnung", en: "Annual report" },
    transactions: 0,
    description: { de: "", en: "" },
    metaTitle: { de: "DEGIRO KeSt — KestKlar", en: "DEGIRO KeSt — KestKlar" },
    metaDesc: { de: "", en: "" },
    keyFacts: { de: [], en: [] },
  },
];

export function getBroker(slug: string) {
  return brokers.find((b) => b.slug === slug);
}
