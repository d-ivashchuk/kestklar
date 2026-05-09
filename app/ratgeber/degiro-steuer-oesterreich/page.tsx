import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "DEGIRO Steuererklärung Österreich: Anleitung 2025 — KestKlar",
  description:
    "DEGIRO Austria existiert nicht mehr. Wer DEGIRO heute nutzt, nutzt DEGIRO Deutschland — und ist nicht steuereinfach. Schritt-für-Schritt-Anleitung für E1kv mit offiziellen BMF-Quellen.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/degiro-steuer-oesterreich",
    languages: { en: "https://kestklar.at/en/ratgeber/degiro-austria-tax" },
  },
};

export default function DegiroSteuerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="DEGIRO Steuererklärung Österreich: Anleitung 2025"
        description="DEGIRO ist kein steuereinfacher Broker für Österreich. So versteuerst du dein Depot korrekt via E1kv."
        url="https://kestklar.at/ratgeber/degiro-steuer-oesterreich"
        datePublished="2026-05-03"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "DEGIRO Steuer Österreich", url: "https://kestklar.at/ratgeber/degiro-steuer-oesterreich" },
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
            DEGIRO · KeSt · E1kv · Österreich · 9 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            DEGIRO Steuererklärung Österreich: Anleitung 2025
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            DEGIRO Österreich gibt es seit 31.&nbsp;Januar 2024 nicht mehr — alle österreichischen Konten wurden zu flatex Austria migriert. Wer DEGIRO heute aus Österreich nutzt, hat ein Konto bei <strong className="text-foreground">DEGIRO Deutschland</strong>, und damit einen <strong className="text-foreground">nicht steuereinfachen Broker</strong>. Diese Anleitung erklärt, was du in der E1kv eintragen musst und wo die typischen Fallen liegen.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Wichtig zuerst: DEGIRO Austria existiert nicht mehr">
            <p>
              flatexDEGIRO Bank AG hat alle österreichischen DEGIRO-Konten zum <strong className="text-foreground">31.&nbsp;Januar 2024</strong> gekündigt. Bestandskunden wurden zu <strong className="text-foreground">flatex Austria</strong> migriert — das ist ein steuereinfacher Broker. Neue DEGIRO-Konten für Personen mit Wohnsitz Österreich sind seither nicht mehr möglich.
            </p>
            <p>
              Wer trotzdem über DEGIRO handelt, hat ein Konto bei DEGIRO Deutschland (Sitz: Amsterdam, NL). DEGIRO Deutschland ist <strong className="text-foreground">keine inländische depotführende Stelle</strong> im Sinne des §93 EStG. Es gibt also keinen automatischen KeSt-Abzug, und du musst alle Einkünfte selbst in der Beilage E1kv erklären.
            </p>
            <p className="text-xs">
              Quellen:{" "}
              <a href="https://www.broker-test.at/news/flatexdegiro-degiro-kuendigt-nun-endgueltig-alle-accounts-in-oesterreich/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">broker-test.at zur DEGIRO-Kündigung</a>{" · "}
              <a href="https://www.degiro.at/degiro-flatex" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO &times; flatex Migration</a>
            </p>
          </Section>

          <Section title="Rechtsgrundlage: Warum DEGIRO Selbstdeklaration verlangt">
            <p>
              Nach{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}
              unterliegen deine Einkünfte aus Kapitalvermögen dem besonderen Steuersatz von <strong className="text-foreground">27,5%</strong>. Da DEGIRO keine inländische depotführende Stelle ist (§93 Abs 2 Z 2 EStG), entfällt der KeSt-Abzug — die Einkünfte sind im Wege der Veranlagung zu erklären.
            </p>
            <p>
              Wegen der seit 2023 verschärften{" "}
              <a href="https://www.broker-test.at/news/knaller-aufzeichnungspflicht-fuer-nicht-endbesteuertes-kapitalvermoegen-ab-2023/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Aufzeichnungspflicht für nicht endbesteuertes Kapitalvermögen
              </a>{" "}
              (§126 BAO i.V.m. AbgÄG 2022) musst du sämtliche Transaktionen, Anschaffungskosten und Quellensteuern lückenlos dokumentieren.
            </p>
          </Section>

          <Section title="Schritt 1: Jahresübersicht herunterladen">
            <p>
              DEGIRO stellt für jedes Steuerjahr eine <strong className="text-foreground">Jahresübersicht</strong> bereit (Annual Report). Verfügbar ab Ende Februar / Anfang März des Folgejahres.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>WebTrader öffnen → <em>Posteingang → Dokumente</em></li>
              <li>Steuerjahr wählen → <em>Jahresübersicht</em> als PDF herunterladen</li>
              <li>Zusätzlich: Kontoauszug (CSV) und Transaktionsübersicht für Eigenkalkulationen</li>
            </ol>
            <p className="text-xs">
              DEGIRO selbst weist explizit darauf hin, dass die Jahresübersicht <em>&bdquo;keine Steuerbescheinigung&ldquo;</em> ist und nicht als Jahressteuerbescheinigung im Sinne österreichischen Rechts gilt. Quelle:{" "}
              <a href="https://www.degiro.de/helpdesk/steuer/kann-degiro-eine-steuerbescheinigung-ausstellen" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                DEGIRO Helpdesk
              </a>
            </p>
          </Section>

          <Section title="Schritt 2: Anschaffungskosten richtig berechnen">
            <p>
              Österreich verlangt nach{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a Abs 4 Z 3 EStG
              </a>{" "}
              den <strong className="text-foreground">gleitenden Durchschnittspreis</strong>: bei mehreren Käufen derselben ISIN wird ein gewichteter Mittelwert pro Stück gebildet, in <strong className="text-foreground">Euro</strong>.
            </p>
            <p>
              Wichtig: <strong className="text-foreground">Anschaffungsnebenkosten</strong> (Order-Provisionen, externe Gebühren der Handelsplätze) sind im Privatvermögen <em>nicht</em> abzugsfähig — §27a Abs 4 Z 2 EStG i.V.m. §20 Abs 2 EStG (Werbungskostenabzugsverbot, vom VfGH bestätigt G&nbsp;168/2017). Die in DEGIROs P&amp;L-Ansicht ausgewiesenen Gewinne können daher nicht 1:1 übernommen werden.
            </p>
          </Section>

          <Section title="Schritt 3: Fremdwährung umrechnen">
            <p>
              Alle Beträge in EUR umrechnen — zum Tageskurs am Zufluss-/Abflusstag, nicht zum Jahresdurchschnitt. Maßgeblich sind die{" "}
              <a href="https://www.oenb.at/Statistik/Standardisierte-Tabellen/zinssaetze-und-wechselkurse/Wechselkurse/T-gliche-Referenzkurse-der-EZB.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                EZB-Referenzkurse (OeNB)
              </a>.
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Dividenden &rarr; Kurs am Zahltag</li>
              <li>Verkaufserlöse &rarr; Kurs am Handelstag</li>
              <li>Anschaffungskosten &rarr; Kurs am Kauftag (geht in den Durchschnittspreis ein)</li>
            </ul>
            <p>
              DEGIROs Jahresübersicht zeigt Beträge in der Kontowährung — die EUR-Umrechnung musst du selbst durchführen.
            </p>
          </Section>

          <Section title="Schritt 4: ETFs &mdash; Meldefonds und ausschüttungsgleiche Erträge">
            <p>
              Hältst du thesaurierende ETFs, musst du jährlich die <strong className="text-foreground">ausschüttungsgleichen Erträge</strong> (AgE) versteuern, obwohl kein Geld fließt. DEGIRO meldet diese nicht. Die Daten holst du dir auf{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                my.oekb.at
              </a>{" "}— Suche nach ISIN, Betrag pro Anteil je Geschäftsjahr mit deiner Stückzahl multiplizieren.
            </p>
            <p>
              <strong className="text-foreground">Achtung Schwarzfonds:</strong> Ist dein ETF <em>kein</em> Meldefonds, greift die Pauschalbesteuerung nach{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 Abs 2 Z 3 InvFG 2011
              </a>: 90% des Unterschiedsbetrags zwischen erstem und letztem Rücknahmepreis im Kalenderjahr, mindestens jedoch 10% des letzten Rücknahmepreises. Auf diese Bemessungsgrundlage 27,5% ESt &rarr; faktisch mindestens 2,75% p.a. des Fondswerts.
            </p>
            <p>
              Mehr dazu im{" "}
              <Link href="/ratgeber/etf-meldefonds-pruefen" className="text-foreground underline underline-offset-2">Ratgeber zu Meldefonds</Link>{" "}und{" "}
              <Link href="/ratgeber/ausschuettungsgleiche-ertraege" className="text-foreground underline underline-offset-2">zu AgE</Link>.
            </p>
          </Section>

          <Section title="Schritt 5: DEGIRO-spezifische Gebühren richtig behandeln">
            <p>
              DEGIRO hat zwei Gebührenarten, die steuerlich unterschiedlich behandelt werden:
            </p>
            <div className="mt-4 border border-border divide-y divide-border">
              {[
                {
                  fee: "Order-Provision",
                  desc: "Bei jedem Kauf/Verkauf. Anschaffungs- bzw. Veräußerungsnebenkosten. Im Privatvermögen NICHT abzugsfähig (§27a Abs 4 Z 2 EStG).",
                },
                {
                  fee: "Konnektivitätsgebühr",
                  desc: "EUR 2,50 p.a. pro fremder Börse. Kein Bezug zu konkretem Erwerb/Veräußerung — nicht abzugsfähig (§20 Abs 2 EStG).",
                },
                {
                  fee: "Custody-Dividendengebühr",
                  desc: "Im Custody-Profile prozentuale Gebühr auf Dividendenzahlung. Du musst die BRUTTO-Dividende deklarieren — die Gebühr ist nicht absetzbar.",
                },
                {
                  fee: "Auto-FX-Gebühr",
                  desc: "0,25% pro Währungstausch bei Settlement. Beeinflusst nur den effektiven EUR-Betrag des Erlöses; reduziert nicht den steuerlichen Gewinn separat.",
                },
              ].map((row) => (
                <div key={row.fee} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.fee}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Schritt 6: E1kv ausfüllen — die wichtigsten Kennzahlen">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { kz: "KZ 863", label: "Ausländische Zinsen (27,5%)", desc: "Zinsen aus ausländischen Anleihen, Cash-Bestand. Brutto, in EUR." },
                { kz: "KZ 898", label: "Ausländische Ausschüttungen aus Investmentfonds", desc: "Cash-Dividenden ausschüttender ETFs/Fonds. Brutto vor Quellensteuer." },
                { kz: "KZ 937", label: "Ausschüttungsgleiche Erträge (Auslandsdepot)", desc: "AgE thesaurierender Meldefonds laut OeKB-Daten. Pro Anteil &times; Stückzahl am Stichtag." },
                { kz: "KZ 994", label: "Realisierte Kursgewinne (ausländisch, 27,5%)", desc: "Aktien-/ETF-Verkaufsgewinne mit gleitendem Durchschnittspreis berechnet." },
                { kz: "KZ 892", label: "Realisierte Kursverluste (ausländisch)", desc: "Verluste aus Verkäufen. Innerhalb desselben Jahres mit Gewinnen verrechenbar." },
                { kz: "KZ 409", label: "Ausländische Dividenden auf Aktien (27,5%)", desc: "Bardividenden auf Einzelaktien. Brutto vor Quellensteuer." },
                { kz: "KZ 998", label: "Anrechenbare ausländische Quellensteuer", desc: "Z.B. 15% US-Quellensteuer (mit W-8BEN). Reduziert die KeSt-Schuld direkt." },
                { kz: "KZ 937", label: "Pauschal ermittelte AgE bei Nichtmeldefonds", desc: "Bei Auslandsdepot ebenfalls im Fonds-Block erfassen; 90/10-Regel nach §186 Abs 2 Z 3 InvFG, falls einer deiner Fonds kein Meldefonds ist." },
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
            <p className="text-xs mt-2">
              Die Kennzahlen können in einzelnen Jahrgängen variieren — Original prüfen:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="Quellensteuer auf US-Dividenden">
            <p>
              DEGIRO behält bei korrekt eingereichtem <strong className="text-foreground">W-8BEN</strong> 15% US-Quellensteuer ein (sonst 30%). Die 15% sind nach{" "}
              <a href="https://www.wko.at/steuern/doppelbesteuerungsabkommen-usa" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                DBA Österreich-USA
              </a>{" "}voll auf die österreichische KeSt anrechenbar (KZ 998). Effektive Steuerbelastung: 15% USA + 12,5% Österreich = 27,5%. Ohne W-8BEN: 30% USA + 0% anrechenbar &rarr; du zahlst zu viel. Prüfe in der DEGIRO-Plattform unter Einstellungen, ob das Formular aktiv ist.
            </p>
          </Section>

          <Section title="Verlustausgleich">
            <p>
              Verluste aus DEGIRO können innerhalb desselben Kalenderjahres mit Gewinnen und laufenden Erträgen aus dem 27,5%-Bucket verrechnet werden — auch broker-übergreifend (z.B. Erste-Bank-Gewinne mit DEGIRO-Verlusten). Ein <strong className="text-foreground">Verlustvortrag in Folgejahre ist nicht möglich</strong> (§27 Abs 8 Z 4 EStG).
            </p>
            <p>
              Details:{" "}
              <Link href="/ratgeber/verlustausgleich-oesterreich" className="text-foreground underline underline-offset-2">
                Verlustausgleich Österreich &rarr;
              </Link>
            </p>
          </Section>

          <Section title="Häufige Fehler">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Fremdwährung nicht umgerechnet:</strong> DEGIRO zeigt USD/GBP/CHF — du musst zum EZB-Tageskurs umrechnen.</li>
              <li><strong className="text-foreground">AgE vergessen:</strong> Thesaurierende ETFs erfordern jährliche AgE aus OeKB. DEGIRO meldet sie nicht.</li>
              <li><strong className="text-foreground">Anschaffungskosten-Korrektur beim Verkauf:</strong> Bereits versteuerte AgE erhöhen die AK — sonst Doppelbesteuerung.</li>
              <li><strong className="text-foreground">Schwarzfonds übersehen:</strong> Nicht-Meldefonds &rarr; Pauschalbesteuerung 90/10 nach §186 InvFG.</li>
              <li><strong className="text-foreground">Konnektivitäts- oder Depotgebühren als Werbungskosten:</strong> Nicht abzugsfähig.</li>
              <li><strong className="text-foreground">Quellensteuer nicht angerechnet:</strong> KZ 998 vergessen &rarr; 15% mehr Steuerlast als nötig.</li>
              <li><strong className="text-foreground">FIFO-Zahlen aus DEGIRO 1:1 übernehmen:</strong> Österreich verlangt gleitenden Durchschnittspreis in EUR.</li>
            </ol>
          </Section>

          <Section title="Abgabefrist">
            <p>
              Einkommensteuererklärung mit E1kv: <strong className="text-foreground">30. Juni</strong> des Folgejahres via FinanzOnline (30. April bei Papierabgabe). Mit Steuerberater gilt regelmäßig eine Quotenregelung mit verlängerter Frist. Bei nicht-endbesteuerten Kapitaleinkünften besteht <strong className="text-foreground">Pflichtveranlagung</strong>.
            </p>
            <p className="text-xs">
              Quelle:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF Fristen &amp; Fälligkeiten
              </a>{" · "}
              <a href="https://www.bmf.gv.at/themen/steuern/fuer-unternehmen/einkommensteuer/einkommensteuererklaerungspflicht.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Erklärungspflicht
              </a>
            </p>
          </Section>

          <Section title="Offizielle Quellen">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG 1988</a> &mdash; Sondersteuersatz, gleitender Durchschnittspreis</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG</a> &mdash; KeSt-Abzug nur durch inländische depotführende Stellen</li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011</a> &mdash; AgE und Pauschalbesteuerung Schwarzfonds</li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: Besteuerung von Kapitalerträgen</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Fonds-Info / Meldefonds</a></li>
              <li><a href="https://www.degiro.de/helpdesk/steuer" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO Helpdesk Steuer</a></li>
              <li><a href="https://www.degiro.at/degiro-flatex" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">DEGIRO &times; flatex Migration Österreich</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Manuell ist viel Arbeit. KestKlar macht es automatisch.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar liest deine DEGIRO-Jahresübersicht, rechnet Fremdwährungen zum EZB-Kurs um, berechnet den gleitenden Durchschnittspreis, holt OeKB-Daten für deine ETFs, erkennt Schwarzfonds und liefert dir die fertigen E1kv-Kennzahlen samt Quellensteuer-Anrechnung.
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
          <Link href="/ratgeber/interactive-brokers-steuer-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Interactive Brokers Steuer Österreich &rarr;
          </Link>
          <Link href="/ratgeber/scalable-capital-steuer-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Scalable Capital Steuer Österreich 2025 &rarr;
          </Link>
          <Link href="/ratgeber/verlustausgleich-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Verlustausgleich Österreich: was wirklich verrechenbar ist &rarr;
          </Link>
          <Link href="/ratgeber/etf-meldefonds-pruefen" className="block text-sm text-foreground hover:underline underline-offset-2">
            ETF Meldefonds prüfen: OeKB-Anleitung &rarr;
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
