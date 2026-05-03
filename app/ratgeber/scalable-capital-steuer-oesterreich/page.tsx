import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Scalable Capital Steuer Österreich 2025: Was sich geändert hat — KestKlar",
  description:
    "Vollbank-Lizenz, Depotmigration weg von Baader, Steuerreport von KPMG: Scalable Capital ist (noch) nicht steuereinfach in Österreich. Vollständige Anleitung für E1kv 2024 und 2025 mit allen rechtlichen Quellen.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/scalable-capital-steuer-oesterreich",
  },
};

export default function ScalableSteuerPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Scalable Capital Steuer Österreich 2025"
        description="Status, Steuerreport, Depotmigration und E1kv-Anleitung für österreichische Scalable-Capital-Nutzer."
        url="https://kestklar.at/ratgeber/scalable-capital-steuer-oesterreich"
        datePublished="2026-05-03"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "Scalable Capital Steuer Österreich", url: "https://kestklar.at/ratgeber/scalable-capital-steuer-oesterreich" },
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
            Scalable · KeSt · E1kv · Österreich · 10 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Scalable Capital Steuer Österreich: Status 2025
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Scalable Capital ist <strong className="text-foreground">noch nicht steuereinfach</strong> in Österreich — auch nach Vollbank-Lizenz im September&nbsp;2025 und der Depotmigration weg von Baader Bank im Dezember&nbsp;2025. Du musst weiterhin selbst über E1kv erklären. Diese Anleitung zeigt, was du tun musst, was sich geändert hat, und was beim Depotübertrag besonders zu beachten ist.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Aktueller Status (Mai 2026)">
            <p>
              Scalable Capital führt für österreichische Kund:innen <strong className="text-foreground">keine österreichische KeSt automatisch ab</strong>. Es bleibt damit ein nicht-steuereinfacher Broker. Das gilt für alle Produkte: Free Broker, Prime+ Broker, Crypto-ETPs und Vermögensverwaltung.
            </p>
            <p>
              Scalable selbst formuliert es so: &bdquo;Wir arbeiten an einer steuereinfachen Lösung für Österreich.&ldquo; Ein verbindlicher Termin existiert nicht. Quelle:{" "}
              <a href="https://help.scalable.capital/de-AT/steuern-de12f868/gibt-es-konkrete-pl%C3%A4ne-in-%C3%B6sterreich-ein-steuereinfache-38bb85e2" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable Help Center &mdash; Pläne Österreich
              </a>
            </p>
          </Section>

          <Section title="Was sich 2025 verändert hat (Timeline)">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { date: "10. Sept 2025", event: "EZB erteilt Scalable Capital die Vollbank-Lizenz (Aufsicht: BaFin / Bundesbank)." },
                { date: "Q4 2025", event: "Beginn der Depotmigration: Verwahrung wechselt von Baader Bank AG zur Scalable Capital Bank GmbH." },
                { date: "6.&ndash;7. Dez 2025", event: "Tatsächliches Migrations-Wochenende. Sämtliche Bestände werden auf die neue Stelle übertragen." },
                { date: "9. Dez 2025", event: "Letzte Frist zur Mitteilung des Depotübertrags via FinanzOnline (§94 Z 7 EStG, Ein-Monats-Regel). Bei Versäumnis: fiktive Veräußerung." },
                { date: "Mitte Jan 2026", event: "Eintragung der Scalable Capital Bank GmbH Zweigniederlassung Österreich (Wieden, 1040 Wien)." },
                { date: "Stand Mai 2026", event: "Trotz Zweigniederlassung wurde der KeSt-Abzug noch nicht aktiviert. Selbstdeklaration weiterhin Pflicht." },
              ].map((row) => (
                <div key={row.date} className="p-4 grid grid-cols-3 gap-3">
                  <p className="text-xs font-mono font-medium text-foreground">{row.date}</p>
                  <p className="col-span-2 text-xs text-muted-foreground">{row.event}</p>
                </div>
              ))}
            </div>
            <p className="text-xs">
              Quellen:{" "}
              <a href="https://de.scalable.capital/en/newsroom/scalable-is-now-a-bank" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Newsroom Vollbank</a>{" · "}
              <a href="https://help.scalable.capital/das-neue-scalable-umstellung-0bb0b7ff/muss-ich-etwas-beim-finanzamt-einreichen-ad9fcea0" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable: Was beim Finanzamt einzureichen ist</a>
            </p>
          </Section>

          <Section title="Wichtig: Depotübertrag und §94 Z 7 EStG">
            <p>
              Der Übertrag von Baader Bank zu Scalable Capital Bank am 6./7. Dezember 2025 ist ein Depotwechsel zwischen unterschiedlichen depotführenden Stellen. Damit das Finanzamt diesen Vorgang <strong className="text-foreground">nicht als fiktive Veräußerung</strong> mit 27,5% wertet, muss eine{" "}
              <strong className="text-foreground">Mitteilung über den Depotübertrag</strong> binnen einem Monat nach Übertrag via FinanzOnline eingereicht werden.
            </p>
            <p>
              Pfad in FinanzOnline: <em>Sonstige Anbringen &rarr; Mitteilung zum Depotübertrag (§27 Abs 6 Z 2 EStG)</em>. Frist im konkreten Fall: <strong className="text-foreground">9. Jänner 2026</strong>. Wer das versäumt hat, muss in der E1kv 2025 den Marktwert der Bestände am Übertragstag als Erlös ansetzen (KZ&nbsp;994).
            </p>
            <p>
              Rechtsgrundlage:{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27 Abs 6 Z 2 EStG
              </a>{" sowie "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/94" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §94 Z 7 EStG
              </a>
            </p>
          </Section>

          <Section title="Der KPMG-Steuerreport: was er ist und was nicht">
            <p>
              Scalable bietet seit Mai 2022 einen kostenlosen <strong className="text-foreground">Steuerreport Österreich</strong>, der von KPMG erstellt wird. Er erscheint typischerweise zwischen Ende März und Ende April des Folgejahres.
            </p>
            <p>
              <strong className="text-foreground">Was er kann:</strong> Beträge sind nach österreichischem Recht aufbereitet, mit gleitendem Durchschnittspreis (§27a Abs 4 Z 3 EStG), in EUR umgerechnet, AgE-Korrektur der Anschaffungskosten enthalten, Mapping zu E1kv-Kennzahlen ist klar.
            </p>
            <p>
              <strong className="text-foreground">Was er nicht ist:</strong> Keine Jahressteuerbescheinigung im Sinne des §96 EStG (es wird ja keine KeSt abgeführt). Es ist ein freiwilliger Service ohne Gewähr. Korrekturen an den OeKB-Daten muss du ggf. selbst nachverfolgen. Quelle:{" "}
              <a href="https://help.scalable.capital/de-AT/steuern-de12f868/bietet-scalable-capital-einen-steuerbericht-an-e0993ae8" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable Help &mdash; Steuerbericht
              </a>
            </p>
            <p>
              <strong className="text-foreground">Achtung:</strong> Die deutsche <em>Erträgnisaufstellung</em> aus deinem Account ist NICHT für die österreichische Steuererklärung geeignet (FIFO statt gleitender Durchschnitt, Vorabpauschale-Logik existiert in Österreich nicht).
            </p>
          </Section>

          <Section title="Kapitalerträge: Was wann besteuert wird">
            <p>
              Nach{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27a EStG 1988
              </a>{" "}gilt für sämtliche Einkünfte aus Kapitalvermögen der Sondersteuersatz <strong className="text-foreground">27,5%</strong>. Da Scalable nicht inländisch abzugsverpflichtet ist (§93 Abs 2 Z 2 EStG), werden Gewinne, Dividenden, Zinsen und ausschüttungsgleiche Erträge im Wege der Veranlagung erklärt.
            </p>
          </Section>

          <Section title="Crypto-ETPs &ne; Kryptowährungen — wichtige Unterscheidung">
            <p>
              Scalable bietet Crypto in Form von <strong className="text-foreground">ETPs</strong> (z.B. ETC Group, 21Shares, VanEck) — das sind <em>Wertpapiere</em>, keine direkten Kryptowährungen. Damit fallen sie unter §27 Abs 3 / §27a EStG (Aktien-/Wertpapier-Bucket), <strong className="text-foreground">nicht</strong> unter §27b EStG (direkte Krypto).
            </p>
            <p>
              Praktisch: Crypto-ETP-Gewinne kommen in dieselben Kennzahlen wie Aktien (KZ 994 / 892), nicht in die Krypto-Kennzahl. Quelle:{" "}
              <a href="https://help.scalable.capital/handeln-1541d52f/crypto-d0f5ddb9/wie-werden-crypto-etps-steuerlich-behandelt-90138dc4" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Scalable: Crypto-ETPs steuerlich
              </a>{" · "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/steuerliche-behandlung-von-kryptowaehrungen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF: Kryptowährungen
              </a>
            </p>
          </Section>

          <Section title="ETF-Sparpläne: gleitender Durchschnittspreis bei vielen Käufen">
            <p>
              Scalable&apos;s Killer-Feature ist der kostenlose ETF-Sparplan. Steuerlich heißt das: bei jeder Sparplan-Ausführung kommt ein neuer Posten in den gewichteten Durchschnittspreis. Der KPMG-Report rechnet das korrekt — manuell ist es bei monatlichen Ausführungen über mehrere Jahre nahezu unzumutbar.
            </p>
            <p>
              Bei thesaurierenden ETFs musst du zusätzlich jährlich die <strong className="text-foreground">ausschüttungsgleichen Erträge</strong> nach{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 InvFG 2011
              </a>{" "}aus den{" "}
              <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB-Daten
              </a>{" "}übernehmen und die Anschaffungskosten entsprechend korrigieren.
            </p>
          </Section>

          <Section title="E1kv 2024 und 2025: Die wichtigsten Kennzahlen">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { kz: "KZ 863", label: "Ausländische Einkünfte aus Kapitalüberlassung (27,5%)", desc: "Zinsen aus Bonds, ggf. Cash-Verzinsung." },
                { kz: "KZ 864", label: "Realisierte Wertsteigerungen (27,5%)", desc: "Aktien-, ETF-, ETP-Verkaufsgewinne mit gleitendem Durchschnittspreis." },
                { kz: "KZ 865", label: "Einkünfte aus Derivaten (27,5%)", desc: "Optionen, Futures, Zertifikate." },
                { kz: "KZ 891", label: "Verluste aus Kapitalvermögen (27,5%)", desc: "Realisierte Verluste — innerhalb desselben Jahres mit Gewinnen verrechenbar." },
                { kz: "KZ 898", label: "Anrechenbare ausländische Quellensteuer", desc: "Z.B. 15% US-Quellensteuer auf Dividenden mit W-8BEN." },
                { kz: "KZ 937", label: "Ausschüttungsgleiche Erträge (Auslandsdepot)", desc: "Thesaurierende Meldefonds laut OeKB-Daten." },
                { kz: "KZ 939", label: "Anschaffungskosten-Korrektur Investmentfonds", desc: "Erhöhung der AK durch versteuerte AgE — verhindert Doppelbesteuerung beim Verkauf." },
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
              Maßgeblich ist immer das aktuelle Jahres-Formular:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF E1kv 2024 (PDF)
              </a>
            </p>
          </Section>

          <Section title="Steuerjahr 2025: Sonderfall &bdquo;Split Year&rdquo;">
            <p>
              Für 2025 ist Scalable durchgehend nicht steuereinfach. <em>Plus</em> der Depotübertrag im Dezember 2025: Hier wird&apos;s heikel.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Mit fristgerechter Mitteilung an FinanzOnline (bis 9.1.2026):</strong> Anschaffungskosten werden auf das neue Depot übertragen, kein steuerlicher Vorgang.</li>
              <li><strong className="text-foreground">Ohne fristgerechte Mitteilung:</strong> Marktwert am Übertragstag gilt als Erlös &rarr; KZ 994 mit fiktivem Gewinn (Marktwert minus AK), 27,5% ESt fällig.</li>
              <li><strong className="text-foreground">Falls Scalable 2026 KeSt-Abzug aktiviert:</strong> du wirst ein Jahr mit zwei Regimes haben (Selbstdeklaration für Q1, automatisch für Q2&ndash;Q4). Genauso wie Trade Republic Österreich nach Aktivierung im April 2025.</li>
            </ul>
          </Section>

          <Section title="Verlustausgleich bei Scalable">
            <p>
              Da keine inländische depotführende Stelle agiert, kann Scalable <strong className="text-foreground">keinen automatischen Verlustausgleich</strong> nach §93 Abs 6 EStG durchführen. Du machst ihn selbst über E1kv. Verluste innerhalb des 27,5%-Buckets sind broker-übergreifend mit Gewinnen verrechenbar — z.B. IBKR-Gewinne mit Scalable-Verlusten.
            </p>
            <p>
              Details:{" "}
              <Link href="/ratgeber/verlustausgleich-oesterreich" className="text-foreground underline underline-offset-2">
                Verlustausgleich Österreich &rarr;
              </Link>
            </p>
          </Section>

          <Section title="Häufige Fehler bei Scalable-Nutzern">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Deutsche Erträgnisaufstellung verwendet:</strong> FIFO-basiert und mit Vorabpauschale-Logik &mdash; in Österreich nicht anwendbar. Nur den KPMG-Steuerreport Österreich nutzen.</li>
              <li><strong className="text-foreground">Depotübertragsmeldung versäumt:</strong> 1-Monats-Frist nach Migration. Sonst fiktive Veräußerung mit 27,5%.</li>
              <li><strong className="text-foreground">Crypto-ETPs als Krypto deklariert:</strong> Gehören in §27 Abs 3 (Aktien-Bucket), nicht in §27b.</li>
              <li><strong className="text-foreground">Vorabpauschale eingetragen:</strong> Gibt es in Österreich nicht. Nicht aus dem deutschen Konzept ableiten.</li>
              <li><strong className="text-foreground">AgE bei thesaurierenden Sparplan-ETFs vergessen:</strong> KPMG-Report enthält sie, aber wer den Report nicht nutzt, übersieht sie meist.</li>
              <li><strong className="text-foreground">Anschaffungskosten beim Verkauf nicht um AgE erhöht:</strong> Doppelbesteuerung droht.</li>
            </ol>
          </Section>

          <Section title="Abgabefrist">
            <p>
              Einkommensteuererklärung 2025: bis <strong className="text-foreground">30. Juni 2026</strong> via FinanzOnline (30. April 2026 bei Papier). Mit Steuerberater gilt die Quotenregelung.
            </p>
            <p className="text-xs">
              <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF Fristen
              </a>
            </p>
          </Section>

          <Section title="Offizielle Quellen">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27 EStG</a> &mdash; Einkünfte aus Kapitalvermögen, Depotübertrag</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG</a> &mdash; Sondersteuersatz, gleitender Durchschnittspreis</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27b EStG</a> &mdash; Kryptowährungen (relevant für direkte Krypto, nicht ETPs)</li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG</a> &mdash; KeSt-Abzugspflicht inländischer Stellen</li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011</a> &mdash; AgE und Pauschalbesteuerung</li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: Besteuerung Kapitalerträge</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Fonds-Info / Meldefonds</a></li>
              <li><a href="https://help.scalable.capital/steuern-de12f868" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Help Center &mdash; Steuern</a></li>
              <li><a href="https://at.scalable.capital/steuerleicht" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Scalable Steuerleicht-Landingpage Österreich</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar liest deinen Scalable-Report.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Auch wenn KPMG die Hauptarbeit macht: Mehrere Broker, Verlustausgleich, AgE-Korrekturen und Quellensteuer-Anrechnung musst du selbst zusammenführen. KestKlar liest den KPMG-Report, kombiniert ihn mit anderen Brokern und liefert dir die fertigen E1kv-Kennzahlen.
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
          <Link href="/ratgeber/degiro-steuer-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            DEGIRO Steuer Österreich &rarr;
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
