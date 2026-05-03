import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Ausschüttungsgleiche Erträge: ETF-Steuer Österreich erklärt – KestKlar",
  description:
    "Was sind ausschüttungsgleiche Erträge bei ETFs? Wie berechnet man sie für die österreichische Steuererklärung? ÖEKB, Meldefonds und E1kv Zeile 892 einfach erklärt.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/ausschuettungsgleiche-ertraege",
    languages: { en: "https://kestklar.at/en/ratgeber/deemed-distributions" },
  },
};

export default function AgEPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Ausschüttungsgleiche Ertr��ge: ETF-Steuer Österreich erkl��rt"
        description="Was sind ausschüttungsgleiche Erträge bei ETFs? Wie berechnet man sie für die österreichische Steuererklärung?"
        url="https://kestklar.at/ratgeber/ausschuettungsgleiche-ertraege"
        datePublished="2025-05-01"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "Ausschüttungsgleiche Erträge", url: "https://kestklar.at/ratgeber/ausschuettungsgleiche-ertraege" },
        ]}
      />
      <div className="mb-2">
        <Link href="/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Ratgeber
        </Link>
      </div>

      <article>
        <header className="mt-6 mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            ETF · ÖEKB · Thesaurierung · 7 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Ausschüttungsgleiche Erträge: Was sie sind und wie du sie versteuern musst
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Thesaurierende ETFs zahlen keine Dividenden aus — aber in Österreich musst du trotzdem jedes Jahr Steuern darauf zahlen. Was steckt dahinter, wie kommen die Beträge zustande, und was hat die ÖEKB damit zu tun?
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Das Grundprinzip">
            <p>
              Ein thesaurierender ETF reinvestiert seine Erträge — Dividenden der enthaltenen Aktien, Zinsen aus Anleihen — automatisch ins Fondsvermögen. Du bekommst kein Geld ausgezahlt, aber dein Anteil wird mehr wert.
            </p>
            <p>
              In Österreich gilt: Diese intern reinvestierten Erträge sind trotzdem steuerpflichtig, und zwar im Jahr, in dem sie im Fonds anfallen. Sie heißen <strong className="text-foreground">ausschüttungsgleiche Erträge</strong> (kurz: AgE). Der Steuersatz ist 27,5% KeSt — genauso wie auf echte Ausschüttungen.
            </p>
            <p>
              Das bedeutet: Du zahlst jedes Jahr Steuer auf Erträge, die du nie auf deinem Konto gesehen hast.
            </p>
          </Section>

          <Section title="Was ist ein Meldefonds?">
            <p>
              Nicht alle ETFs liefern die nötigen Steuerdaten. Ein <strong className="text-foreground">Meldefonds</strong> ist ein Fonds, der seine steuerlichen Erträge jährlich an die <strong className="text-foreground">ÖEKB</strong> (Österreichische Kontrollbank) meldet. Auf dem Portal <strong className="text-foreground">my.oekb.at</strong> (früher profitweb.at) werden diese Daten für jeden registrierten Fonds veröffentlicht.
            </p>
            <p>
              Die allermeisten großen ETFs — MSCI World (IWDA), FTSE All-World (VWCE), S&P 500 (CSPX) — sind Meldefonds. Du kannst es per ISIN-Suche auf my.oekb.at prüfen.
            </p>
            <p>
              Ist ein Fonds <strong className="text-foreground">kein</strong> Meldefonds, wird der steuerpflichtige Ertrag pauschal mit 90% des Kursgewinns bewertet — in der Regel deutlich ungünstiger. Nicht-Meldefonds sollte man als österreichischer Anleger meiden.
            </p>
          </Section>

          <Section title="Wie wird der steuerpflichtige Betrag berechnet?">
            <p>
              Die ÖEKB veröffentlicht für jeden Meldefonds einen Betrag in Euro oder Fondswährung pro Anteil. Für die eigene Steuerberechnung brauchst du:
            </p>
            <ol className="list-decimal pl-4 space-y-2 mt-3">
              <li>Den ÖEKB-Betrag pro Anteil für das jeweilige Steuerjahr (auf my.oekb.at per ISIN suchen)</li>
              <li>Die Anzahl deiner Anteile am <strong className="text-foreground">Stichtag</strong> der ÖEKB-Meldung (nicht zum Jahresende)</li>
              <li>Den EZB-Devisenkurs am Stichtag, falls der Fonds in USD oder GBP notiert</li>
            </ol>
            <p className="mt-3">
              Die Formel: <strong className="text-foreground">AgE = ÖEKB-Betrag/Anteil × Anzahl Anteile × Devisenkurs</strong>
            </p>
            <p>
              Das Ergebnis kommt in <strong className="text-foreground">Kennzahl 937</strong> (ausländisches Depot) bzw. <strong className="text-foreground">936</strong> (inländisches Depot) der E1kv. Darauf werden 27,5% KeSt berechnet. Quelle: <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024</a>.
            </p>
          </Section>

          <Section title="Konkrete Beispiele">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                {
                  name: "Vanguard FTSE All-World (VWCE)",
                  isin: "IE00BK5BQT80",
                  note: "Thesaurierend. Meldefonds. ÖEKB meldet jährlich ausschüttungsgleiche Erträge je Anteil.",
                },
                {
                  name: "iShares Core MSCI World (IWDA)",
                  isin: "IE00B4L5Y983",
                  note: "Thesaurierend. Meldefonds. Einer der am häufigsten genutzten ETFs österreichischer Anleger.",
                },
                {
                  name: "Xtrackers MSCI World Swap (XMEX)",
                  isin: "LU0274208692",
                  note: "Thesaurierend, Swap-basiert. Auch Swap-ETFs können Meldefonds sein — ISIN auf my.oekb.at prüfen.",
                },
              ].map((fund) => (
                <div key={fund.isin} className="p-4">
                  <p className="text-xs font-medium text-foreground">{fund.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{fund.isin}</p>
                  <p className="text-xs text-muted-foreground mt-1">{fund.note}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Warum das mühsam ist">
            <p>
              Das Problem: Jeder Fonds hat einen anderen Stichtag. Du brauchst für jeden ETF den richtigen EZB-Kurs an einem anderen Datum. Die ÖEKB-Daten müssen manuell heruntergeladen und aufbereitet werden. Wer mehrere ETFs in mehreren Depots hält, verbringt damit leicht ein paar Stunden.
            </p>
            <p>
              Bei steuereinfachen Brokern (z.B. österreichische Banken) macht das der Broker automatisch. Bei Interactive Brokers, Scalable Capital oder Bitpanda liegt es an dir.
            </p>
          </Section>

          <Section title="Was ist mit ausschüttenden ETFs?">
            <p>
              Ausschüttende ETFs zahlen Erträge direkt aus. Diese Ausschüttungen sind sofort steuerpflichtig (Zeile 985 der E1kv) und erscheinen im Broker-Bericht. Ausschüttungsgleiche Erträge fallen dabei aber trotzdem an — ein Teil des Fondsertrags wird jährlich gemeldet, auch wenn ein Teil ausgeschüttet wird.
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">ÖEKB-Daten automatisch abrufen</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar holt die ÖEKB-Fondsdaten für alle deine ETFs automatisch — richtiger Stichtag, richtiger Devisenkurs, korrekte Berechnung. Du gibst nur den Wert in Zeile 892 ein.
            </p>
            <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
              Kostenlos auf die Warteliste →
            </Link>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">Weitere Ratgeber</p>
        <div className="space-y-2">
          <Link href="/ratgeber/e1kv-ausfuellen" className="block text-sm text-foreground hover:underline underline-offset-2">
            E1kv ausfüllen: Schritt-für-Schritt-Anleitung →
          </Link>
          <Link href="/ratgeber/kest-berechnen" className="block text-sm text-foreground hover:underline underline-offset-2">
            KeSt berechnen bei nicht-steuereinfachen Brokern →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-foreground mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
