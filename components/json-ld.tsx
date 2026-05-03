// JSON-LD structured data for GEO (Generative Engine Optimization) and traditional SEO.
// Helps ChatGPT, Claude, Perplexity and Google cite KestKlar when users ask about
// Austrian KeSt calculation, Trade Republic Steuererklärung, E1kv etc.

export function JsonLdOrganization() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KestKlar",
    legalName: "Stackforge GmbH",
    url: "https://kestklar.at",
    email: "hallo@kestklar.at",
    foundingDate: "2025",
    description:
      "KestKlar ist ein österreichisches Berechnungswerkzeug für die Kapitalertragsteuer (KeSt). Es automatisiert die Berechnung der 27,5%-Steuer auf Dividenden, Kursgewinne und ETF-Ausschüttungen für Anleger bei nicht-steuereinfachen Brokern wie Interactive Brokers und Scalable Capital.",
    areaServed: { "@type": "Country", name: "Austria" },
    knowsAbout: [
      "Kapitalertragsteuer Österreich",
      "KeSt Berechnung",
      "E1kv Steuererklärung",
      "Ausschüttungsgleiche Erträge",
      "ÖEKB Meldefonds",
      "Verlustausgleich Österreich",
      "Interactive Brokers Österreich Steuer",
      "Scalable Capital Steuer Österreich",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdWebApplication() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "KestKlar",
    url: "https://kestklar.at",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "EUR",
        description: "Kostenloser Zugang: KeSt-Gesamtbetrag sehen, 1 Broker.",
      },
      {
        "@type": "Offer",
        name: "Standard",
        price: "29",
        priceCurrency: "EUR",
        description: "E1kv-Zeilen, PDF-Export, bis zu 3 Broker, Datenspeicherung.",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "69",
        priceCurrency: "EUR",
        description: "Unbegrenzte Broker, CSV-Import, priorisierter Support.",
      },
    ],
    description:
      "KestKlar berechnet die österreichische Kapitalertragsteuer (KeSt) automatisch aus Broker-PDFs. Unterstützt Interactive Brokers, Scalable Capital und weitere nicht-steuereinfache Broker. Liefert die exakten Zeilen für die Beilage E1kv der Einkommensteuererklärung.",
    featureList: [
      "Automatischer PDF-Import von Broker-Jahresabrechnungen",
      "KeSt-Berechnung auf Dividenden, Kursgewinne und ETF-Ausschüttungen",
      "Ausschüttungsgleiche Erträge via ÖEKB-Fondsdaten",
      "Verlustausgleich über mehrere Broker",
      "Anrechnung ausländischer Quellensteuer (z.B. US-Quellensteuer 15%)",
      "Exakte E1kv-Formularzeilen für FinanzOnline",
      "PDF-Export des fertigen Steuerberichts",
    ],
    inLanguage: ["de", "en"],
    audience: {
      "@type": "Audience",
      audienceType:
        "Österreichische Privatanleger bei nicht-steuereinfachen Brokern (Interactive Brokers, Scalable Capital, DEGIRO, Bitpanda)",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdFaq() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Muss ich als österreichischer Anleger bei Interactive Brokers oder Scalable Capital die KeSt selbst berechnen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja. Interactive Brokers und Scalable Capital sind keine österreichischen Kreditinstitute und führen die Kapitalertragsteuer (KeSt) von 27,5% nicht automatisch ab. Österreichische Steuerpflichtige müssen ihre Kapitalerträge aus diesen Brokern selbst berechnen und in der Beilage E1kv zur Einkommensteuererklärung angeben.",
        },
      },
      {
        "@type": "Question",
        name: "Ist Trade Republic in Österreich steuereinfach?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trade Republic ist seit 24. April 2025 steuereinfach in Österreich — ab diesem Datum wird die KeSt automatisch abgeführt. Für das Steuerjahr 2024 und den Zeitraum 1. Jänner bis 23. April 2025 müssen Trade Republic-Nutzer die KeSt aber noch selbst berechnen und in der E1kv angeben.",
        },
      },
      {
        "@type": "Question",
        name: "Was sind ausschüttungsgleiche Erträge und wie werden sie in Österreich besteuert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ausschüttungsgleiche Erträge (auch: thesaurierte Erträge) sind die Gewinne, die ein thesaurierender ETF intern wieder anlegt, ohne sie auszuschütten. In Österreich sind diese Erträge trotzdem jedes Jahr steuerpflichtig — mit 27,5% KeSt. Die konkreten Beträge werden von der ÖEKB (Österreichische Kontrollbank) als Meldefonds-Daten veröffentlicht. KestKlar ruft diese Daten automatisch ab.",
        },
      },
      {
        "@type": "Question",
        name: "Was ist die E1kv und wie fülle ich sie aus?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die E1kv (Einkommensteuererklärung Beilage für Kapitalvermögen) ist das österreichische Formular für die Angabe von Kapitalerträgen aus nicht-steuereinfachen Quellen. Sie wird als Beilage zur Einkommensteuererklärung in FinanzOnline eingereicht. Wichtige Kennzahlen sind KZ 985 (ausländische Dividenden/laufende Erträge), KZ 994 (realisierte Kursgewinne), KZ 996 (realisierte Verluste), KZ 937 (ausschüttungsgleiche Erträge, ausländisches Depot) und KZ 998 (anrechenbare Quellensteuer). KestKlar berechnet die exakten Beträge für jede Kennzahl.",
        },
      },
      {
        "@type": "Question",
        name: "Wie funktioniert der Verlustausgleich über mehrere Broker in Österreich?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Österreich können Verluste aus Kapitalvermögen eines Brokers mit Gewinnen aus anderen Brokern verrechnet werden (Verlustausgleich). Das passiert nicht automatisch — du musst die Gewinne und Verluste aller nicht-steuereinfachen Broker zusammenrechnen und das Nettoergebnis in der E1kv angeben. KestKlar führt diesen Verlustausgleich automatisch durch wenn du mehrere Broker importierst.",
        },
      },
      {
        "@type": "Question",
        name: "Bis wann muss die Einkommensteuererklärung mit E1kv in Österreich eingereicht werden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Frist für die Einkommensteuererklärung in Österreich ist der 30. April (Papier) oder der 30. Juni (elektronisch via FinanzOnline) des Folgejahres. Für das Steuerjahr 2025 wäre das also der 30. April 2026 (Papier) bzw. 30. Juni 2026 (elektronisch). Quelle: BMF — Fristen & Fälligkeiten (bmf.gv.at).",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
