import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "KeSt berechnen bei Interactive Brokers, Scalable Capital & Co – KestKlar",
  description:
    "Schritt-für-Schritt: Wie du die österreichische Kapitalertragsteuer bei nicht-steuereinfachen Brokern berechnest. Mit Verlustausgleich, Quellensteuer-Anrechnung und E1kv-Zeilen.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/kest-berechnen",
    languages: { en: "https://kestklar.at/en/ratgeber/how-to-calculate-kest" },
  },
};

export default function KestBerechnenPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="KeSt berechnen bei nicht-steuereinfachen Brokern"
        description="Schritt-für-Schritt: Wie du die österreichische Kapitalertragsteuer bei nicht-steuereinfachen Brokern berechnest."
        url="https://kestklar.at/ratgeber/kest-berechnen"
        datePublished="2025-05-01"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "KeSt berechnen", url: "https://kestklar.at/ratgeber/kest-berechnen" },
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
            KeSt · Verlustausgleich · E1kv · 8 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            KeSt berechnen bei nicht-steuereinfachen Brokern
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Interactive Brokers, Scalable Capital, DEGIRO — diese Broker zahlen die österreichische Steuer nicht für dich. Du musst die 27,5% KeSt selbst berechnen, den Verlustausgleich über alle Depots durchführen und das Ergebnis in der E1kv angeben. So funktioniert es.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Warum musst du das selbst machen?">
            <p>
              Österreichische Banken und sogenannte <strong className="text-foreground">steuereinfache Broker</strong> (Erste, Raiffeisen, Flatex Austria, seit April 2025 auch Trade Republic) behalten die KeSt automatisch ein und führen sie direkt ans Finanzamt ab. Du musst in der Steuererklärung nichts angeben — alles ist erledigt.
            </p>
            <p>
              <strong className="text-foreground">Nicht-steuereinfache Broker</strong> — das sind alle ausländischen Broker ohne österreichische Banklizenz — tun das nicht. Sie liefern dir einen Jahresbericht mit all deinen Transaktionen. Was du dem Finanzamt schuldest, musst du selbst ausrechnen und in der <strong className="text-foreground">Beilage E1kv</strong> deiner Einkommensteuererklärung angeben.
            </p>
          </Section>

          <Section title="Was zählt als steuerpflichtiger Kapitalertrag?">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { type: "Dividenden", detail: "Alle Ausschüttungen von Aktien und ausschüttenden ETFs. Steuersatz 27,5%." },
                { type: "Realisierte Kursgewinne", detail: "Gewinn aus dem Verkauf von Wertpapieren — Verkaufspreis minus Einstandspreis (gleitender Durchschnittspreis). Steuersatz 27,5%." },
                { type: "Zinserträge", detail: "Zinsen aus Anleihen oder Cash-Zinsen. Steuersatz 27,5% (teilweise 25% bei Spareinlagen)." },
                { type: "Ausschüttungsgleiche Erträge", detail: "Thesaurierte Erträge von Meldefonds/ETFs, jährlich via ÖEKB gemeldet. Steuersatz 27,5%." },
                { type: "Fremdwährungsgewinne", detail: "Kursgewinne aus Wertpapieren in Fremdwährung. Der Transaktionskurs zum Kaufzeitpunkt ist relevant." },
              ].map((row) => (
                <div key={row.type} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-medium text-foreground">{row.type}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Nicht steuerpflichtig: Kapitalerträge die du in einem steuereinfachen Depot hast — die wurden bereits versteuert.
            </p>
          </Section>

          <Section title="Verlustausgleich: So funktioniert er">
            <p>
              Verluste aus dem Verkauf von Wertpapieren können mit Gewinnen verrechnet werden. Das Wichtige: der Verlustausgleich gilt <strong className="text-foreground">über alle nicht-steuereinfachen Broker hinweg</strong> — du summierst alle Gewinne und Verluste aus allen Depots und trägst das Nettoergebnis in die E1kv ein.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Beispiel</p>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span>Kursgewinn Interactive Brokers</span><span className="text-foreground">+ €4.200</span></div>
                <div className="flex justify-between"><span>Kursverlust Scalable Capital</span><span className="text-red-500">− €1.100</span></div>
                <div className="flex justify-between border-t border-border pt-1 mt-1"><span className="font-medium text-foreground">Steuerbemessungsgrundlage</span><span className="text-foreground">€3.100</span></div>
                <div className="flex justify-between"><span>KeSt (27,5%)</span><span className="text-foreground">€852,50</span></div>
              </div>
            </div>
            <p>
              Verluste aus Aktien können mit Gewinnen aus ETFs und umgekehrt verrechnet werden. Verluste können <strong className="text-foreground">nicht</strong> in Folgejahre vorgetragen werden — der Verlustpool wird am 1. Jänner zurückgesetzt.
            </p>
          </Section>

          <Section title="US-Quellensteuer anrechnen">
            <p>
              Wenn du US-Dividenden erhältst, wird in den USA eine <strong className="text-foreground">Quellensteuer von 15%</strong> direkt abgezogen (dank DBA zwischen USA und Österreich). Diese 15% kannst du auf deine österreichische KeSt von 27,5% anrechnen. Du zahlst also nur noch die Differenz: 27,5% − 15% = 12,5%.
            </p>
            <p>
              Die anrechenbare Quellensteuer kommt in <strong className="text-foreground">Zeile 998</strong> der E1kv. Den genauen Betrag findest du im Jahresbericht deines Brokers (meist als „Tax withheld" oder „WHT" ausgewiesen).
            </p>
          </Section>

          <Section title="Kostenbasis: Gleitender Durchschnittspreis">
            <p>
              Bei mehrfachen Käufen derselben Aktie oder desselben ETFs gilt in Österreich das <strong className="text-foreground">Verfahren des gleitenden Durchschnittspreises</strong> (auch: gewichteter Einstandspreis). Jeder neue Kauf verändert den Durchschnittspreis aller gehaltenen Anteile dieser Position.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Beispiel</p>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span>Kauf 1: 50 Anteile VWCE zu €90</span><span className="text-foreground">Ø €90,00</span></div>
                <div className="flex justify-between"><span>Kauf 2: 50 Anteile VWCE zu €100</span><span className="text-foreground">Ø €95,00</span></div>
                <div className="flex justify-between border-t border-border pt-1 mt-1"><span>Verkauf 30 Anteile zu €110</span><span className="text-foreground">Gewinn: 30 × (€110 − €95) = €450</span></div>
              </div>
            </div>
            <p>
              Quelle: <a href="https://www.bmf.gv.at/dam/jcr:6a499877-62fa-484b-ac72-3b7f1a0fdfe5/info_kest_kursgewinne.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — KeSt auf Kursgewinne (PDF)</a>
            </p>
          </Section>

          <Section title="Welche Dokumente du brauchst">
            <div className="mt-2 space-y-2">
              {[
                { broker: "Interactive Brokers", doc: "Annual Activity Statement (PDF oder CSV, im Client Portal unter Reports → Tax)" },
                { broker: "Scalable Capital", doc: "Jahressteuerbescheinigung (PDF, unter Steuern & Dokumente im Scalable Portal)" },
                { broker: "DEGIRO", doc: "Annual Report / Jahresübersicht (PDF, unter Postfach im DEGIRO Dashboard)" },
                { broker: "Trade Republic", doc: "Steuerreport (PDF, in der Trade Republic App unter Konto → Dokumente)" },
              ].map((row) => (
                <div key={row.broker} className="border border-border p-3">
                  <p className="text-xs font-medium text-foreground">{row.broker}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{row.doc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Abgabefrist und Konsequenzen">
            <p>
              Die Einkommensteuererklärung mit E1kv muss bis <strong className="text-foreground">30. April</strong> (Papier) oder <strong className="text-foreground">30. Juni</strong> (elektronisch via FinanzOnline) des Folgejahres eingereicht werden. Wer einen Steuerberater beauftragt, erhält in der Regel eine Fristverlängerung. Wer die Frist versäumt, riskiert Verspätungszuschläge.
            </p>
            <p>
              Das Finanzamt weiß in der Regel nicht, was du bei ausländischen Brokern hältst. Trotzdem bist du verpflichtet, alle steuerpflichtigen Erträge zu melden — auch ohne Aufforderung.
            </p>
            <p>
              Quelle: <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — Fristen &amp; Fälligkeiten</a>
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Das übernimmt KestKlar</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              PDF hochladen, ÖEKB-Daten automatisch abrufen, FIFO-Berechnung, Verlustausgleich über mehrere Broker, Quellensteuer-Anrechnung — KestKlar liefert dir die fertigen E1kv-Zeilen in unter 10 Minuten.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
                Auf die Warteliste →
              </Link>
              <Link href="/broker/interactive-brokers" className="inline-block text-xs font-medium border border-border text-foreground px-4 py-2 hover:bg-background transition-colors">
                Interactive Brokers →
              </Link>
              <Link href="/broker/scalable-capital" className="inline-block text-xs font-medium border border-border text-foreground px-4 py-2 hover:bg-background transition-colors">
                Scalable Capital →
              </Link>
            </div>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">Weitere Ratgeber</p>
        <div className="space-y-2">
          <Link href="/ratgeber/e1kv-ausfuellen" className="block text-sm text-foreground hover:underline underline-offset-2">
            E1kv ausfüllen: Schritt-für-Schritt-Anleitung →
          </Link>
          <Link href="/ratgeber/ausschuettungsgleiche-ertraege" className="block text-sm text-foreground hover:underline underline-offset-2">
            Ausschüttungsgleiche Erträge: Was sie sind und wie du sie versteuern musst →
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
