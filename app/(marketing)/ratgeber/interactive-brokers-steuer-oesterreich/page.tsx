import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Interactive Brokers Steuererklärung Österreich: Komplette Anleitung — KestKlar",
  description:
    "Schritt-für-Schritt: So versteuerst du dein Interactive Brokers Depot in Österreich. Activity Statement lesen, KeSt berechnen, E1kv-Kennzahlen korrekt ausfüllen. Mit offiziellen BMF-Quellen.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/interactive-brokers-steuer-oesterreich",
  },
};

export default function IBSteuerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Interactive Brokers Steuererklärung Österreich: Komplette Anleitung"
        description="So versteuerst du dein Interactive Brokers Depot in Österreich korrekt. Activity Statement, KeSt-Berechnung, E1kv-Kennzahlen."
        url="https://kestklar.at/ratgeber/interactive-brokers-steuer-oesterreich"
        datePublished="2025-05-04"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "Interactive Brokers Steuer Österreich", url: "https://kestklar.at/ratgeber/interactive-brokers-steuer-oesterreich" },
        ]}
      />
      <div className="mb-2">
        <Link href="/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          &larr; Ratgeber
        </Link>
      </div>

      <article>
        <header className="mt-6 mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Interactive Brokers · KeSt · E1kv · Österreich · 8 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Interactive Brokers Steuererklärung Österreich: Komplette Anleitung
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Interactive Brokers (IBKR) ist als irischer Broker nicht steuereinfach in Österreich. Du musst deine Kapitalerträge selbst berechnen und in der Beilage E1kv melden. Diese Anleitung erklärt den gesamten Prozess — vom Activity Statement bis zur fertigen Steuererklärung.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Warum muss ich als IBKR-Nutzer selbst versteuern?">
            <p>
              Interactive Brokers ist ein ausländischer Broker mit Sitz in Irland. Es gibt keine österreichische depotführende Stelle, die automatisch KeSt abführt. Nach{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}
              unterliegen deine Kapitalerträge dem besonderen Steuersatz von <strong className="text-foreground">27,5%</strong>, müssen aber mangels inländischer auszahlender Stelle in der Einkommensteuererklärung deklariert werden.
            </p>
            <p>
              Rechtsgrundlage:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/information-zu-einkuenften-aus-kapitalvermoegen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF — Einkünfte aus Kapitalvermögen
              </a>. Dort heißt es: Erträge, für die es keine inländische depotführende oder auszahlende Stelle gibt, sind in der Steuererklärung anzuführen.
            </p>
          </Section>

          <Section title="Schritt 1: Activity Statement herunterladen">
            <p>
              Das Activity Statement ist dein zentrales Dokument. Es enthält alle Transaktionen, Dividenden, Zinsen, Quellensteuern und Währungsumrechnungen des Jahres.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Melde dich im <strong className="text-foreground">IBKR Client Portal</strong> an (portal.interactivebrokers.com).</li>
              <li>Navigiere zu <em>Performance &amp; Reports → Statements</em>.</li>
              <li>Wähle <strong className="text-foreground">Activity Statement</strong>, Zeitraum <strong className="text-foreground">Annual</strong>, und das relevante Steuerjahr.</li>
              <li>Format: PDF oder CSV (CSV ist maschinenlesbar und lässt sich einfacher verarbeiten).</li>
            </ol>
            <p>
              Quelle:{" "}
              <a href="https://www.interactivebrokers.com/en/support/tax-management-and-reporting.php" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                IBKR Tax Management & Reporting
              </a>
            </p>
          </Section>

          <Section title="Schritt 2: Was du aus dem Statement brauchst">
            <p>
              Für die österreichische Steuererklärung sind folgende Abschnitte relevant:
            </p>
            <div className="mt-4 border border-border divide-y divide-border">
              {[
                {
                  section: "Dividends",
                  desc: "Alle erhaltenen Dividenden (brutto). Achtung: IBKR zeigt oft den Nettobetrag nach US-Quellensteuer — du brauchst den Bruttobetrag.",
                },
                {
                  section: "Withholding Tax",
                  desc: "Einbehaltene ausländische Quellensteuer (v.a. US 15% bei W-8BEN). Anrechenbar auf deine KeSt laut DBA Österreich-USA.",
                },
                {
                  section: "Trades (Realized P&L)",
                  desc: "Realisierte Kursgewinne und -verluste. IBKR berechnet FIFO — Österreich verlangt den gleitenden Durchschnittspreis (§27a Abs 4 Z 3 EStG).",
                },
                {
                  section: "Interest",
                  desc: "Guthabenzinsen und bezahlte Margin-Zinsen. Guthabenzinsen sind steuerpflichtig, Margin-Zinsen nicht abzugsfähig bei Privatanlegern.",
                },
                {
                  section: "Corporate Actions",
                  desc: "Aktiensplits, Spin-offs, Mergers. Können die Anschaffungskosten deiner Positionen verändern.",
                },
              ].map((row) => (
                <div key={row.section} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.section}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Schritt 3: Kostenbasis korrekt berechnen (gleitender Durchschnittspreis)">
            <p>
              Das ist der Punkt, an dem die meisten Fehler passieren. IBKR berechnet den Gewinn nach <strong className="text-foreground">FIFO</strong> (First In, First Out). Österreich verlangt aber den <strong className="text-foreground">gleitenden Durchschnittspreis</strong> — also den gewichteten Mittelwert aller bisherigen Käufe derselben Position.
            </p>
            <p>
              Rechtsgrundlage:{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a Abs 4 Z 3 EStG 1988
              </a>: <em>&ldquo;Bei Wirtschaftsgütern [...] mit derselben Wertpapierkennnummer ist bei Erwerb in zeitlicher Aufeinanderfolge der gleitende Durchschnittspreis in Euro anzusetzen.&rdquo;</em>
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Beispiel:</p>
              <p className="text-xs text-muted-foreground">
                Kauf 1: 10 Aktien zu je 100 EUR = 1.000 EUR<br/>
                Kauf 2: 10 Aktien zu je 120 EUR = 1.200 EUR<br/>
                Durchschnittspreis: (1.000 + 1.200) / 20 = <strong className="text-foreground">110 EUR pro Aktie</strong><br/>
                <br/>
                Verkauf: 5 Aktien zu 130 EUR = 650 EUR<br/>
                Gewinn: 650 - (5 &times; 110) = <strong className="text-foreground">100 EUR steuerpflichtig</strong>
              </p>
            </div>
            <p className="mt-3">
              Wichtig: Anschaffungsnebenkosten (Ordergebühren) werden bei der Gewinnermittlung mit dem besonderen Steuersatz <em>nicht</em> berücksichtigt (§27a Abs 4 Z 2 EStG). Die von IBKR gezeigten Realized P&amp;L-Zahlen kannst du also nicht 1:1 übernehmen.
            </p>
          </Section>

          <Section title="Schritt 4: Fremdwährung umrechnen">
            <p>
              Wenn du in USD, GBP oder anderen Währungen handelst, müssen alle Beträge zum <strong className="text-foreground">Kurs am Zuflusstag</strong> in EUR umgerechnet werden. Das betrifft:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Dividenden → EUR-Kurs am Zahltag</li>
              <li>Verkaufserlöse → EUR-Kurs am Handelstag</li>
              <li>Anschaffungskosten → EUR-Kurs am Kauftag (fließt in den Durchschnitt ein)</li>
            </ul>
            <p>
              EZB-Referenzkurse findest du auf{" "}
              <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                ecb.europa.eu
              </a>. Alternativ akzeptiert das Finanzamt auch die IBKR-Kurse, wenn diese konsistent verwendet werden.
            </p>
          </Section>

          <Section title="Schritt 5: Ausschüttungsgleiche Erträge (ETFs)">
            <p>
              Hältst du thesaurierende ETFs bei IBKR, musst du die jährlichen ausschüttungsgleichen Erträge separat versteuern — obwohl IBKR sie <em>nicht</em> in seinem Statement ausweist (weil kein Geld fließt).
            </p>
            <p>
              Die Daten findest du auf{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/kms-output/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                my.oekb.at
              </a>{" "}
              — suche nach der ISIN deines ETFs und entnimm den Betrag pro Anteil für das Steuerjahr. Multipliziere mit deiner Stückzahl am Meldestichtag.
            </p>
            <p>
              Rechtsgrundlage:{" "}
              <a href="https://findok.bmf.gv.at/findok?fassungsNr=3&stammNr=19973" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                InvFR 2018 (BMF Investmentfondsrichtlinien)
              </a>. Nur Meldefonds (auf profitweb.at gelistet) profitieren von der günstigen Besteuerung — nicht gemeldete Fonds werden mit der pauschalen Ersatzbesteuerung belastet.
            </p>
          </Section>

          <Section title="Schritt 6: In die E1kv eintragen">
            <p>
              Wenn du alle Beträge berechnet hast, trägst du sie in FinanzOnline in der Beilage E1kv ein. Die wichtigsten Kennzahlen für IBKR-Nutzer:
            </p>
            <div className="mt-4 border border-border divide-y divide-border">
              {[
                {
                  kz: "KZ 985",
                  label: "Ausländische Dividenden und Zinsen",
                  desc: "Brutto-Dividenden und Guthabenzinsen aus dem IBKR-Statement. In EUR umgerechnet.",
                },
                {
                  kz: "KZ 937",
                  label: "Ausschüttungsgleiche Erträge (ausl. Depot)",
                  desc: "Summe der AgE deiner ETFs (von ÖEKB), da dein Depot bei einem ausländischen Broker liegt.",
                },
                {
                  kz: "KZ 994",
                  label: "Realisierte Kursgewinne",
                  desc: "Summe aller Gewinne aus Verkäufen, berechnet mit dem gleitenden Durchschnittspreis in EUR.",
                },
                {
                  kz: "KZ 996",
                  label: "Realisierte Kursverluste",
                  desc: "Summe aller Verluste. Wird mit Gewinnen und laufenden Erträgen desselben Jahres verrechnet.",
                },
                {
                  kz: "KZ 998",
                  label: "Anrechenbare ausländische Quellensteuer",
                  desc: "Z.B. US-Quellensteuer (15% bei korrekt eingereichtem W-8BEN). Reduziert deine KeSt-Schuld.",
                },
              ].map((row) => (
                <div key={row.kz} className="p-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs font-mono font-medium text-foreground">{row.kz}</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">{row.label}</p>
                  </div>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Quelle:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                BMF Formular E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="Verlustausgleich: Was du mit Verlusten machen kannst">
            <p>
              Realisierte Verluste (KZ 996) werden innerhalb desselben Kalenderjahres mit Gewinnen und laufenden Erträgen verrechnet. Hast du mehrere Broker (z.B. IBKR + Scalable), kannst du die Verluste broker-übergreifend verrechnen — genau dafür dient die E1kv.
            </p>
            <p>
              <strong className="text-foreground">Wichtig:</strong> Ein Verlustvortrag in Folgejahre ist bei Einkünften aus Kapitalvermögen <em>nicht</em> möglich (§27 Abs 8 Z 3 EStG). Nicht ausgleichbare Verluste verfallen.
            </p>
          </Section>

          <Section title="US-Quellensteuer und DBA">
            <p>
              Erhältst du Dividenden von US-Unternehmen, behält der Broker 15% US-Quellensteuer ein (bei korrekt eingereichtem <strong className="text-foreground">Formular W-8BEN</strong>). Diese 15% kannst du auf deine österreichische KeSt anrechnen.
            </p>
            <p>
              Deine effektive Steuerbelastung: 15% (USA) + 12,5% (Österreich) = 27,5% gesamt. Ohne W-8BEN: 30% USA + 0% Österreich anrechenbar = du zahlst zu viel. Prüfe in deinem IBKR-Konto unter <em>Settings → Tax Information</em>, ob dein W-8BEN aktiv ist.
            </p>
            <p>
              Rechtsgrundlage:{" "}
              <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                DBA Österreich-USA (BGBl. Nr. 232/1997)
              </a>
            </p>
          </Section>

          <Section title="Häufige Fehler bei IBKR-Nutzern">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">FIFO statt Durchschnittspreis:</strong> Die Realized P&amp;L im IBKR-Statement basiert auf FIFO. In Österreich gilt der gleitende Durchschnittspreis. Die Zahlen können deutlich abweichen.</li>
              <li><strong className="text-foreground">Nettodividenden statt brutto:</strong> Manche übernehmen den Nettobetrag aus dem Statement. In die E1kv gehört aber der Bruttobetrag vor ausländischer Quellensteuer.</li>
              <li><strong className="text-foreground">Ausschüttungsgleiche Erträge vergessen:</strong> Sie stehen nicht im IBKR-Statement. Du musst sie separat von der ÖEKB holen.</li>
              <li><strong className="text-foreground">Währungskurse ignoriert:</strong> Alle Beträge müssen in EUR umgerechnet werden — nicht zum Jahresdurchschnitt, sondern zum Tageskurs.</li>
              <li><strong className="text-foreground">Ordergebühren abziehen:</strong> Bei Privatanlegern mit §27a-Einkünften sind Anschaffungsnebenkosten nicht absetzbar.</li>
            </ol>
          </Section>

          <Section title="Abgabefrist">
            <p>
              Die Einkommensteuererklärung (inkl. E1kv) muss bis <strong className="text-foreground">30. Juni</strong> des Folgejahres elektronisch via FinanzOnline eingereicht werden (30. April bei Papierabgabe). Mit Steuerberater gilt in der Regel eine Fristverlängerung.
            </p>
            <p>
              Quelle:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF — Fristen & Fälligkeiten
              </a>
            </p>
          </Section>

          <Section title="Offizielle Quellen">
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/information-zu-einkuenften-aus-kapitalvermoegen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  BMF: Einkünfte aus Kapitalvermögen
                </a>{" "}— Überblick, was zu melden ist
              </li>
              <li>
                <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  BMF: Formular E1kv 2024 (PDF)
                </a>{" "}— offizielles Formular mit Kennzahlen
              </li>
              <li>
                <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  §27a EStG 1988
                </a>{" "}— besonderer Steuersatz, Durchschnittspreis-Regelung
              </li>
              <li>
                <a href="https://findok.bmf.gv.at/findok?fassungsNr=3&stammNr=19973" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  InvFR 2018
                </a>{" "}— Investmentfondsrichtlinien (ausschüttungsgleiche Erträge)
              </li>
              <li>
                <a href="https://my.oekb.at/kapitalmarkt-services/kms-output/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  ÖEKB: Fondsinfo / Meldefonds
                </a>{" "}— steuerliche Daten für ETFs
              </li>
              <li>
                <a href="https://www.interactivebrokers.com/en/support/tax-management-and-reporting.php" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  IBKR: Tax Management & Reporting
                </a>{" "}— Statements herunterladen
              </li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Das ist viel Arbeit. KestKlar macht es automatisch.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar liest dein IBKR Activity Statement (PDF oder CSV), berechnet den gleitenden Durchschnittspreis, holt die ÖEKB-Daten für deine ETFs, rechnet alle Fremdwährungsbeträge um und liefert dir die fertigen E1kv-Kennzahlen — inklusive Quellensteuer-Anrechnung und Verlustausgleich.
            </p>
            <Link href="/#waitlist" className="inline-block text-xs font-medium bg-foreground text-background px-4 py-2 hover:opacity-80 transition-opacity">
              Kostenlos auf die Warteliste &rarr;
            </Link>
          </div>

        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground mb-4">Weitere Ratgeber</p>
        <div className="space-y-2">
          <Link href="/ratgeber/e1kv-ausfuellen" className="block text-sm text-foreground hover:underline underline-offset-2">
            E1kv ausfüllen: Schritt-für-Schritt-Anleitung &rarr;
          </Link>
          <Link href="/ratgeber/ausschuettungsgleiche-ertraege" className="block text-sm text-foreground hover:underline underline-offset-2">
            Ausschüttungsgleiche Erträge: Was sie sind und wie du sie versteuerst &rarr;
          </Link>
          <Link href="/ratgeber/kest-berechnen" className="block text-sm text-foreground hover:underline underline-offset-2">
            KeSt berechnen bei nicht-steuereinfachen Brokern &rarr;
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
