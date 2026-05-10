// JSON-LD structured data for GEO (Generative Engine Optimization) and traditional SEO.
// Helps ChatGPT, Claude, Perplexity and Google cite KestKlar when users ask about
// Austrian KeSt calculation, Trade Republic Steuererklärung, E1kv etc.

export function JsonLdArticle({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  inLanguage = "de",
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  inLanguage?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage,
    author: { "@type": "Organization", name: "KestKlar", url: "https://kestklar.at" },
    publisher: {
      "@type": "Organization",
      name: "KestKlar",
      legalName: "Stackforge GmbH",
      url: "https://kestklar.at",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

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
        description: "E1kv-Kennzahlen, PDF-Export, bis zu 3 Broker, Datenspeicherung.",
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
      "KestKlar berechnet die österreichische Kapitalertragsteuer (KeSt) aus Broker-PDFs. Unterstützt Interactive Brokers, Scalable Capital und weitere nicht automatisch besteuerte Broker. Liefert vorbereitete Kennzahlen für die Beilage E1kv der Einkommensteuererklärung.",
    featureList: [
      "Automatischer PDF-Import von Broker-Jahresabrechnungen",
      "KeSt-Berechnung auf Dividenden, Kursgewinne und ETF-Ausschüttungen",
      "Ausschüttungsgleiche Erträge via ÖEKB-Fondsdaten",
      "Verlustausgleich über mehrere Broker",
      "Anrechnung ausländischer Quellensteuer (z.B. US-Quellensteuer 15%)",
      "E1kv-Kennzahlen für FinanzOnline",
      "PDF-Export des fertigen Steuerberichts",
    ],
    inLanguage: ["de", "en"],
    audience: {
      "@type": "Audience",
      audienceType:
        "Österreichische Privatanleger bei ausländischen oder nicht automatisch besteuernden Brokern",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLdSoftwareApplication({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Calculator",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    inLanguage: "de",
    author: { "@type": "Organization", name: "KestKlar", url: "https://kestklar.at" },
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
          text: "Ja, wenn für das konkrete Konto keine österreichische Kapitalertragsteuer (KeSt) automatisch einbehalten wird. Bei Interactive Brokers ist das typischerweise der Fall; bei Scalable Capital gilt nach aktuellem Österreich-Status ebenfalls Selbstdeklaration. Österreichische Steuerpflichtige müssen diese Kapitalerträge selbst berechnen und in der Beilage E1kv zur Einkommensteuererklärung angeben.",
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
          text: "Die E1kv (Einkommensteuererklärung Beilage für Kapitalvermögen) ist das österreichische Formular für die Angabe von Kapitalerträgen aus nicht automatisch besteuerten Quellen. Sie wird als Beilage zur Einkommensteuererklärung in FinanzOnline eingereicht. Häufig relevante Kennzahlen sind KZ 863 für laufende ausländische Kapitalerträge, KZ 898 für ausländische Investmentfonds-Ausschüttungen, KZ 994 für realisierte Kursgewinne, KZ 892 für ausländische Kursverluste, KZ 937 für ausschüttungsgleiche Erträge bei Auslandsdepot und KZ 998 für anrechenbare Quellensteuer. Maßgeblich bleibt immer das BMF-Formular des jeweiligen Jahres.",
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
