"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "de" | "en";

export const translations = {
  de: {
    nav: {
      howItWorks: "So funktioniert's",
      faq: "FAQ",
      pricing: "Preise",
      waitlist: "Warteliste",
    },
    hero: {
      badge: "Jetzt in Entwicklung · Warteliste offen",
      h1a: "Österreichische Investorsteuer,",
      h1b: "fertig in 10 Minuten.",
      sub: "Lade dein Broker-PDF hoch. Den Rest erledigt KestKlar.",
      lossLabel: "",
      lossAdvisor: "Steuerberater",
      lossAdvisorPrice: "€150–300",
      lossAdvisorSub: "pro Jahr · mechanische Arbeit",
      lossKestklar: "KestKlar",
      lossKestklarPrice: "€29",
      lossKestklarSub: "pro Jahr · 8 Minuten",
      ctaSub: "Kostenlos auf die Warteliste · Keine Kreditkarte nötig",
    },
    eu: {
      badge: "Deine Sicherheit",
      h2a: "Du lädst hier deine Finanzdaten hoch.",
      h2b: "Das nehmen wir ernst.",
      sub: "Wir wissen dass es kein kleiner Schritt ist, einem fremden Tool seine Depotauszüge anzuvertrauen. Deshalb haben wir KestKlar so gebaut, dass deine Daten privat bleiben.",
    },
    brokers: {
      h2: "Unterstützte Broker",
      sub: "PDF hochladen, fertig. Weitere Broker folgen basierend auf Nutzer-Feedback.",
      comingSoon: "Demnächst",
      learnMore: "Mehr erfahren",
    },
    howItWorks: {
      h2: "So einfach funktioniert KestKlar",
      s1t: "PDF hochladen",
      s1b: "Lade deine Jahresabrechnung hoch — von einem oder mehreren Brokern. KestKlar liest alle Transaktionen automatisch aus.",
      s2t: "Wir rechnen alles durch",
      s2b: "KeSt auf Dividenden, Kursgewinne, ausschüttungsgleiche ETF-Erträge, Verlustausgleich über mehrere Broker und ausländische Quellensteuer-Anrechnung.",
      s3t: "E1kv-Kennzahlen vorbereiten",
      s3b: "Du siehst, welche Beträge in welche E1kv-Kennzahlen gehören. Danach überträgst du sie in FinanzOnline.",
      avg: "Durchschnittliche Zeit:",
      avgVal: "8 Minuten",
      avgSub: "für einen Investor mit 2 Brokern und 3 ETFs.",
    },
    proof: {
      eyebrow: "Was österreichische Investoren sagen",
      h2a: "Das Problem ist real.",
      h2b: "Jeden Jänner aufs Neue.",
      stat: "Viele österreichische Anleger halten Wertpapiere bei ausländischen oder nicht automatisch besteuernden Brokern. Für sie wird die E1kv jedes Jahr schnell komplex.",
    },
    faq: {
      heading: "Häufige Fragen",
      sub: "Alles was du vor dem Start wissen musst.",
      items: [
        {
          q: "Was kostet KestKlar?",
          a: "Der Basiszugang ist kostenlos — du siehst deine KeSt-Summe und die E1kv-Kennzahlen. Für den PDF-Export und die Datenspeicherung für Folgejahre gibt es einen Jahresbeitrag von 29 Euro. Für Power-User mit mehr als drei Brokern gibt es einen Pro-Plan um 69 Euro pro Jahr.",
        },
        {
          q: "Bin ich der richtige User für KestKlar?",
          a: "Ja, wenn für dein Depot keine österreichische KeSt automatisch abgeführt wird — zum Beispiel bei Interactive Brokers, Scalable Capital nach aktuellem Österreich-Status oder bei Trade Republic für Steuerjahr 2024 und den Zeitraum vor 24. April 2025. Dann musst du die Werte selbst berechnen und in der Einkommensteuererklärung angeben.",
        },
        {
          q: "Was ist wenn ich nur bei einer österreichischen Bank investiere?",
          a: "Dann brauchst du KestKlar nicht. Österreichische Banken wie Erste, Raiffeisen oder Bank Austria führen die KeSt automatisch ab — du musst nichts selbst berechnen oder angeben.",
        },
        {
          q: "Welche Broker werden unterstützt?",
          a: "In der ersten Version: Trade Republic, Interactive Brokers und Scalable Capital. Bitpanda und DEGIRO folgen als nächstes. Alle anderen Broker können über manuelle Eingabe oder CSV-Import genutzt werden.",
        },
        {
          q: "Was passiert mit meinen Daten?",
          a: "Deine Daten werden sicher auf Servern in Deutschland gespeichert. Die Original-PDFs werden nach dem Einlesen sofort gelöscht — wir speichern nur die Transaktionsdaten die für die Berechnung nötig sind. Kein Verkauf, keine Werbung.",
        },
        {
          q: "Woher kommen die ETF-Fondsdaten?",
          a: "Von der ÖEKB — einer öffentlichen österreichischen Institution die alle bei der Finanzbehörde gemeldeten Fonds und deren jährliche Steuerdaten veröffentlicht. KestKlar ruft diese Daten automatisch ab, damit du das nicht selbst recherchieren musst.",
        },
        {
          q: "Ist KestKlar eine Steuerberatung?",
          a: "Nein. KestKlar ist ein Berechnungstool — vergleichbar mit dem BMF-Steuerrechner, nur speziell für Kapitalerträge. Es gibt keine persönliche Beratung. Du bist weiterhin selbst für deine Steuererklärung verantwortlich.",
        },
      ],
    },
    cta: {
      h2: "Nie wieder Stunden mit der E1kv verschwenden.",
      sub: "Trag dich in die Warteliste ein. Wir melden uns, sobald KestKlar für die nächsten unterstützten Steuerjahre startet.",
    },
    footer: {
      legal: "Kein Steuerberater · Nur ein Berechnungstool · Daten bleiben in der EU",
    },
    waitlistSuccess: "Du bist auf der Liste. Wir melden uns wenn KestKlar startet.",
    waitlistPlaceholder: "deine@email.at",
    waitlistBtn: "Auf die Warteliste",
  },
  en: {
    nav: {
      howItWorks: "How it works",
      faq: "FAQ",
      pricing: "Pricing",
      waitlist: "Join waitlist",
    },
    hero: {
      badge: "Now in development · Waitlist open",
      h1a: "Austrian investor tax,",
      h1b: "done in 10 minutes.",
      sub: "Upload your broker PDF. KestKlar handles the rest.",
      lossLabel: "",
      lossAdvisor: "Tax advisor",
      lossAdvisorPrice: "€150–300",
      lossAdvisorSub: "per year · mechanical work",
      lossKestklar: "KestKlar",
      lossKestklarPrice: "€29",
      lossKestklarSub: "per year · 8 minutes",
      ctaSub: "Free to join · No credit card required",
    },
    eu: {
      badge: "Your security",
      h2a: "You're uploading your financial data here.",
      h2b: "We take that seriously.",
      sub: "We know it's not a small thing to hand your broker statements to a tool you've never heard of. That's why we built KestKlar so your data stays private.",
    },
    brokers: {
      h2: "Supported brokers",
      sub: "Upload your PDF and you're done. More brokers coming based on user feedback.",
      comingSoon: "Coming soon",
      learnMore: "Learn more",
    },
    howItWorks: {
      h2: "How KestKlar works",
      s1t: "Upload your PDF",
      s1b: "Upload your annual statement from one or more brokers. KestKlar reads every transaction automatically.",
      s2t: "We calculate everything",
      s2b: "KeSt on dividends, capital gains, ETF deemed distributions, cross-broker loss netting, and foreign withholding tax credits.",
      s3t: "Prepare your E1kv fields",
      s3b: "You see which amounts belong in which E1kv fields. Then you transfer them into FinanzOnline.",
      avg: "Average time:",
      avgVal: "8 minutes",
      avgSub: "for an investor with 2 brokers and 3 ETFs.",
    },
    proof: {
      eyebrow: "What Austrian investors are saying",
      h2a: "The problem is real.",
      h2b: "Every January, without fail.",
      stat: "Many Austrian investors hold securities with foreign or non-withholding brokers. For them, the E1kv can become complex every year.",
    },
    faq: {
      heading: "Frequently asked questions",
      sub: "Everything you need to know before getting started.",
      items: [
        {
          q: "What does KestKlar cost?",
          a: "Basic access is free — you see your total KeSt and the E1kv field values. The PDF export and year-over-year data storage costs €29 per year. For power users with more than three brokers there's a Pro plan at €69 per year.",
        },
        {
          q: "Am I the right user for KestKlar?",
          a: "Yes, if Austrian KeSt is not automatically withheld for your account — for example Interactive Brokers, Scalable Capital based on its current Austrian status, or Trade Republic for tax year 2024 and the period before 24 April 2025. In those cases you need to calculate the values yourself and report them in your tax return.",
        },
        {
          q: "What if I only invest through an Austrian bank?",
          a: "Then you don't need KestKlar. Austrian banks like Erste, Raiffeisen, or Bank Austria automatically withhold KeSt — you don't need to calculate or report anything yourself.",
        },
        {
          q: "Which brokers are supported?",
          a: "In the first version: Trade Republic, Interactive Brokers, and Scalable Capital. Bitpanda and DEGIRO are coming next. All other brokers can be used via manual entry or CSV import.",
        },
        {
          q: "What happens to my data?",
          a: "Your data is stored securely on servers in Germany. The original PDFs are deleted immediately after parsing — we only store the transaction data needed for the calculation. No selling, no advertising.",
        },
        {
          q: "Where does the ETF fund data come from?",
          a: "From the ÖEKB — an Austrian public institution that publishes tax data for all registered funds each year. KestKlar fetches this automatically so you don't have to look it up yourself.",
        },
        {
          q: "Is KestKlar a tax advisory service?",
          a: "No. KestKlar is a calculation tool — comparable to the BMF online tax calculator, but built specifically for investment income. There is no personal advice. You remain responsible for your own tax return.",
        },
      ],
    },
    cta: {
      h2: "Stop spending hours on your tax return.",
      sub: "Join the waitlist. We'll email you when KestKlar launches for the next supported tax years.",
    },
    footer: {
      legal: "Not a tax advisor · Calculation tool only · Data stays in the EU",
    },
    waitlistSuccess: "You're on the list. We'll email you when KestKlar launches.",
    waitlistPlaceholder: "your@email.com",
    waitlistBtn: "Join waitlist",
  },
};

type Translations = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}>({
  lang: "de",
  setLang: () => {},
  t: translations.de,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
