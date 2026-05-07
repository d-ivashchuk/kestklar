import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "ETF Meldefonds prüfen: OeKB-Anleitung Österreich — KestKlar",
  description:
    "So prüfst du, ob dein ETF ein Meldefonds ist und wie du die steuerlichen Daten auf my.oekb.at findest. Mit Pauschalbesteuerungs-Formel nach §186 InvFG für Schwarzfonds und allen Fristen.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/etf-meldefonds-pruefen",
    languages: { en: "https://kestklar.at/en/ratgeber/etf-reporting-funds-check" },
  },
};

export default function MeldefondsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="ETF Meldefonds prüfen: OeKB-Anleitung Österreich"
        description="Prüfung von Meldefonds-Status, Pauschalbesteuerung von Schwarzfonds und Walkthrough durch das OeKB-Portal."
        url="https://kestklar.at/ratgeber/etf-meldefonds-pruefen"
        datePublished="2026-05-03"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "ETF Meldefonds prüfen", url: "https://kestklar.at/ratgeber/etf-meldefonds-pruefen" },
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
            Meldefonds · OeKB · §186 InvFG · 9 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            ETF Meldefonds prüfen: OeKB-Anleitung Österreich
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Ist dein ETF ein <strong className="text-foreground">Meldefonds</strong>, gilt das günstige reguläre Besteuerungsregime. Ist er es nicht, greift die <strong className="text-foreground">Pauschalbesteuerung</strong> mit faktischer Mindeststeuer von 2,75% p.a. des Fondswerts. Diese Anleitung zeigt, wie du den Status auf my.oekb.at prüfst und welche Daten du in der E1kv brauchst.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Was ist ein Meldefonds?">
            <p>
              Ein <strong className="text-foreground">Meldefonds</strong> ist ein Investmentfonds, dessen steuerlicher Vertreter die steuerrelevanten Daten fristgerecht über die <strong className="text-foreground">Oesterreichische Kontrollbank (OeKB)</strong> als gesetzliche Meldestelle veröffentlicht — Rechtsgrundlage{" "}
              <a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §186 Abs 2 Z 2 InvFG 2011
              </a>{" "}i.V.m. der{" "}
              <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009222" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Fonds-Melde-Verordnung 2015 (BGBl II 167/2015)
              </a>.
            </p>
            <p>
              Erfolgt keine Meldung, gilt der Fonds als <strong className="text-foreground">Nichtmeldefonds</strong> (umgangssprachlich &bdquo;Schwarzfonds&ldquo;) und unterliegt der Pauschalbesteuerung nach §186 Abs 2 Z 3 InvFG.
            </p>
            <p>
              Maßgebliche Verwaltungsauslegung:{" "}
              <a href="https://findok.bmf.gv.at/findok/volltext(suche:Standardsuche)?dokumentId=b85f1a99-5c1f-488b-b94a-5ac662824f68" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Investmentfondsrichtlinien (InvFR) 2018, GZ BMF-010200/0019-IV/1/2018
              </a>.
            </p>
          </Section>

          <Section title="Meldefonds vs. Nichtmeldefonds — direkter Vergleich">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { feature: "Datenmeldung", meldefonds: "Steuerlicher Vertreter meldet AgE, Quellensteuern, AK-Korrektur an OeKB", nicht: "Keine fristgerechte Meldung" },
                { feature: "Steuerbasis", meldefonds: "Tatsächliche AgE und Ausschüttung", nicht: "Pauschal: 90% Differenz / mind. 10% vom Rücknahmepreis" },
                { feature: "Steuersatz", meldefonds: "27,5% auf tatsächliche Beträge", nicht: "27,5% auf Pauschalbasis" },
                { feature: "AK-Korrektur", meldefonds: "Ja, jährlich nach jeder Meldung", nicht: "Nur bei Selbstnachweis" },
                { feature: "Verlust", meldefonds: "Verluste verrechenbar (§27 Abs 8 EStG)", nicht: "Pauschalbasis kennt keine Verluste" },
              ].map((row) => (
                <div key={row.feature} className="p-4 grid grid-cols-12 gap-3">
                  <p className="col-span-3 text-xs font-mono font-medium text-foreground">{row.feature}</p>
                  <p className="col-span-5 text-xs text-muted-foreground">{row.meldefonds}</p>
                  <p className="col-span-4 text-xs text-muted-foreground">{row.nicht}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Pauschalbesteuerung Schwarzfonds — exakte Formel">
            <p>
              §186 Abs 2 Z 3 InvFG 2011 wörtlich (sinngemäß): Erfolgt keine Meldung, sind die ausschüttungsgleichen Erträge in Höhe von <strong className="text-foreground">90% des Unterschiedsbetrags</strong> zwischen dem ersten und dem letzten im Kalenderjahr festgesetzten Rücknahmepreis zu schätzen, <strong className="text-foreground">mindestens jedoch 10% des am Ende des Kalenderjahres festgesetzten Rücknahmepreises</strong>.
            </p>
            <p>
              Zuflusszeitpunkt der Pauschalwerte: <strong className="text-foreground">31. Dezember</strong> des Kalenderjahres.
            </p>
            <div className="mt-4 p-4 border border-border bg-secondary">
              <p className="text-xs font-medium text-foreground mb-2">Beispiel:</p>
              <p className="text-xs text-muted-foreground">
                Rücknahmepreis 1.1.: 100 EUR · Rücknahmepreis 31.12.: 110 EUR<br/>
                Differenz: 10 EUR · 90% davon: 9 EUR<br/>
                Mindestbasis: 10% &times; 110 = 11 EUR<br/>
                Bemessungsgrundlage = max(9 ; 11) = <strong className="text-foreground">11 EUR pro Anteil</strong><br/>
                ESt: 11 &times; 27,5% = <strong className="text-foreground">3,025 EUR pro Anteil pro Jahr</strong>
              </p>
            </div>
            <p>
              <strong className="text-foreground">Selbstnachweis:</strong> Anleger können die tatsächliche Höhe der AgE durch Vorlage entsprechender Unterlagen nachweisen (§186 Abs 2 Z 3 letzter Satz InvFG). Der VwGH (16.11.2023, Ra 2021/15/0085) hat strenge Anforderungen aufgestellt: Berechnung, tatsächliche Ausschüttungen und AgE-Ermittlung müssen lückenlos erkennbar sein. Quelle:{" "}
              <a href="https://lesen.lexisnexis.at/news/vwgh-anforderungen-an-einen-selbstnachweis-nach-186-abs-2-z-3-in/o_stz/aktuelles/2024/23/lnat_news_035511.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                LexisNexis zur VwGH-Entscheidung
              </a>
            </p>
          </Section>

          <Section title="Schritt-für-Schritt: Meldefonds-Status auf my.oekb.at prüfen">
            <p>
              Die OeKB betreibt seit Dezember 2020 das Portal <strong className="text-foreground">my.oekb.at</strong> (Vorgänger profitweb.at ist abgelöst). Zugriff für Privatanleger ist kostenlos und ohne Registrierung möglich.
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Aufrufen:{" "}
                <a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                  my.oekb.at &mdash; Fonds-Info / Steuerdaten
                </a>
              </li>
              <li>Im Suchfeld nach <strong className="text-foreground">ISIN</strong> oder Fondsname suchen.</li>
              <li>Ist dein ETF in der Liste &rarr; <strong className="text-foreground">Meldefonds</strong>. Nicht in der Liste &rarr; <strong className="text-foreground">Schwarzfonds</strong>, Pauschalbesteuerung greift.</li>
              <li>Auf den Fonds klicken &rarr; Reiter &bdquo;Steuerdaten&ldquo; / &bdquo;KESt-Meldungen&ldquo; öffnen.</li>
              <li>Pro Geschäftsjahr werden u.a. angezeigt: Ausschüttung, ausschüttungsgleicher Ertrag, anrechenbare Quellensteuer, Anschaffungskosten-Korrektur, Meldedatum.</li>
            </ol>
            <p className="text-xs">
              Für die OeKB-Datenfelder im Detail:{" "}
              <a href="https://www.oekb.at/dam/jcr:5a83a4b7-c695-45ab-ad87-2de5b811a580/Anhang_Feldliste_Steuerdaten_Fonds_(gesamt)_2023-02-13.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB Feldliste Steuerdaten Fonds (PDF)
              </a>
            </p>
          </Section>

          <Section title="Geschäftsjahresende vs. Kalenderjahr — der unterschätzte Unterschied">
            <p>
              <strong className="text-foreground">Bei Meldefonds (thesaurierend):</strong> Der steuerlich relevante Zuflusszeitpunkt der AgE ist der Tag, an dem die Depotbank die KeSt abführt — spätestens jedoch <strong className="text-foreground">4 Monate nach dem Geschäftsjahresende des Fonds</strong>. Das ist nicht der 31.12.! Geschäftsjahresende vieler ETFs: 30.06., 30.09. (iShares), 31.12. (Xtrackers/Lux), 28./29.02.
            </p>
            <p>
              <strong className="text-foreground">Bei Schwarzfonds (Pauschalierung):</strong> Zuflusszeitpunkt ist der <strong className="text-foreground">31. Dezember</strong> des Kalenderjahres &mdash; weil die Formel an Kalenderjahres-Rücknahmepreise anknüpft.
            </p>
          </Section>

          <Section title="Meldefristen für steuerliche Vertreter">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Inländische Fonds:</strong> Meldung der ausschüttungsgleichen Erträge innerhalb von <strong className="text-foreground">5 Monaten</strong> nach Geschäftsjahresende.</li>
              <li><strong className="text-foreground">Ausländische Fonds</strong> (typische Retail-ETFs aus IE/LU): innerhalb von <strong className="text-foreground">7 Monaten</strong> nach Geschäftsjahresende.</li>
              <li><strong className="text-foreground">(Zwischen-)Ausschüttungen und KeSt-Auszahlungen inländischer Fonds:</strong> spätestens 1 Tag vor Zahltag.</li>
            </ul>
            <p className="text-xs">
              Quelle: §5 Fonds-Melde-Verordnung 2015 i.V.m. §186 InvFG 2011.{" "}
              <a href="https://www.oekb.at/kapitalmarkt-services/meldungen-und-hinterlegungen-von-dokumenten/meldungen-zu-investmentfonds/meldungen-von-steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                OeKB &mdash; Meldungen Steuerdaten
              </a>
            </p>
          </Section>

          <Section title="Anschaffungskosten-Korrektur: Wie die Doppelbesteuerung verhindert wird">
            <p>
              Bei thesaurierenden Meldefonds zahlst du jedes Jahr Steuer auf den AgE, ohne Geld erhalten zu haben. Damit derselbe Betrag beim späteren Verkauf nicht nochmal als Veräußerungsgewinn erfasst wird, <strong className="text-foreground">erhöht</strong> die OeKB-Meldung den steuerlichen Anschaffungswert pro Anteil um den AgE.
            </p>
            <p>
              Spätere KeSt-Auszahlungen (von bereits versteuerten AgE) <strong className="text-foreground">vermindern</strong> die korrigierten Anschaffungskosten wieder. Beim Verkauf wird dann der Erlös minus korrigierter AK besteuert — sauberes Endergebnis ohne Doppelbesteuerung.
            </p>
            <p>
              Bei steuereinfachen inländischen Brokern erfolgt das automatisch. Bei Auslandsdepots musst du die korrigierten AK selbst aus den OeKB-Daten zusammenrechnen.
            </p>
          </Section>

          <Section title="Korrekturmeldungen und Selbstnachweis-Meldungen">
            <p>
              Die OeKB unterscheidet drei Meldungstypen:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Erstmeldung</strong> &mdash; reguläre Meldung innerhalb der 5-/7-Monats-Frist.</li>
              <li><strong className="text-foreground">Korrekturmeldung</strong> &mdash; Korrektur einer Erstmeldung vor Ablauf der Korrekturfrist.</li>
              <li><strong className="text-foreground">Selbstnachweis-Meldung</strong> &mdash; nach Ablauf der Frist; wird im Portal als Selbstnachweis publiziert.</li>
            </ul>
            <p>
              Bei steuereinfachen Banken führt eine Korrektur in der Regel zu einer automatischen Nachverrechnung. Bei Auslandsdepot trägst du die korrigierten Werte in der nächsten E1kv ein oder beantragst eine Wiederaufnahme nach §303 BAO.
            </p>
          </Section>

          <Section title="Vier Anleger-Konstellationen">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { case: "Meldefonds + steuereinfacher Broker", action: "Bank zieht KeSt automatisch, AK werden automatisch korrigiert. Keine Pflichteintragung in E1kv." },
                { case: "Meldefonds + Auslandsdepot (IBKR, Scalable, DEGIRO)", action: "Manuelle Eintragung: Ausschüttung KZ 898, AgE KZ 937, AK-Erhöhung selbst tracken für Verkauf (KZ 994)." },
                { case: "Schwarzfonds + steuereinfacher Broker", action: "Bank wendet 90/10-Pauschalbesteuerung automatisch zum 31.12. an. Selbstnachweis möglich, um auf tatsächliche Werte umzuschalten." },
                { case: "Schwarzfonds + Auslandsdepot", action: "Pauschalbesteuerung selbst berechnen (90%/10%-Regel) und in KZ 937 erklären. Alternativ Selbstnachweis mit allen Unterlagen." },
              ].map((row) => (
                <div key={row.case} className="p-4 grid grid-cols-2 gap-3">
                  <p className="text-xs font-medium text-foreground">{row.case}</p>
                  <p className="text-xs text-muted-foreground">{row.action}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Häufige Fehler">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Annahme &bdquo;Vanguard ist immer Meldefonds&ldquo;:</strong> Falsch &mdash; nicht alle Vanguard-Tranchen sind in Österreich gemeldet. Immer per ISIN auf my.oekb.at prüfen.</li>
              <li><strong className="text-foreground">Geschäftsjahr mit Kalenderjahr verwechselt:</strong> Bei Meldefonds zählt Geschäftsjahresende plus 4 Monate, nicht 31.12.</li>
              <li><strong className="text-foreground">AK-Korrektur vergessen:</strong> Bereits versteuerte AgE müssen die Anschaffungskosten erhöhen, sonst Doppelbesteuerung beim Verkauf.</li>
              <li><strong className="text-foreground">profitweb.at noch verwendet:</strong> Portal ist seit Dezember 2020 abgelöst. Aktuell ist my.oekb.at.</li>
              <li><strong className="text-foreground">Schwarzfonds-Pauschale unterschätzt:</strong> 10% vom Rücknahmepreis &times; 27,5% = 2,75% Mindeststeuer pro Jahr &mdash; auch wenn der Fonds Verlust macht.</li>
              <li><strong className="text-foreground">Anrechenbare Quellensteuer aus OeKB-Daten ignoriert:</strong> Bei Meldefonds steht sie explizit drin und gehört in KZ 998.</li>
            </ol>
          </Section>

          <Section title="Offizielle Quellen">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007389&Paragraf=186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011 (RIS, tagesaktuell)</a></li>
              <li><a href="https://www.jusline.at/gesetz/invfg_2011/paragraf/186" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§186 InvFG 2011 (JUSLINE)</a></li>
              <li><a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20009222" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Fonds-Melde-Verordnung 2015</a></li>
              <li><a href="https://findok.bmf.gv.at/findok/volltext(suche:Standardsuche)?dokumentId=b85f1a99-5c1f-488b-b94a-5ac662824f68" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">InvFR 2018 (BMF Findok)</a></li>
              <li><a href="https://www.oekb.at/kapitalmarkt-services/unser-datenangebot/fonds/steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Steuerdaten &mdash; Übersicht</a></li>
              <li><a href="https://my.oekb.at/kapitalmarkt-services/fonds-info/sd/af/f" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">my.oekb.at &mdash; Fonds-Info-Portal</a></li>
              <li><a href="https://www.oekb.at/kapitalmarkt-services/meldungen-und-hinterlegungen-von-dokumenten/meldungen-zu-investmentfonds/meldungen-von-steuerdaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB &mdash; Meldungen Steuerdaten (Prozess)</a></li>
              <li><a href="https://www.oekb.at/dam/jcr:ce16295f-10e1-49a8-a66e-8477dd227a6f/OeKB-Steuerdaten-Meldeformat_2024-10-07.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Meldeformat 2024-10-07 (PDF)</a></li>
              <li><a href="https://www.oekb.at/dam/jcr:0ac4175d-b596-4738-b7bb-3532607300cd/OeKB-Steuerdaten-Ertragsteuerliche-Behandlung-2016-12.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">OeKB Ertragsteuerliche Behandlung (PDF)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG (Sondersteuersatz 27,5%)</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
            </ul>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar prüft alle deine ETFs automatisch.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Aus deinem Broker-Statement liest KestKlar alle ISINs aus, prüft sie gegen die OeKB-Meldefonds-Liste, holt AgE-Daten pro Geschäftsjahr und korrigiert die Anschaffungskosten. Schwarzfonds werden erkannt und automatisch nach der 90/10-Regel pauschalisiert.
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
          <Link href="/ratgeber/ausschuettungsgleiche-ertraege" className="block text-sm text-foreground hover:underline underline-offset-2">
            Ausschüttungsgleiche Erträge: Was sie sind &rarr;
          </Link>
          <Link href="/ratgeber/e1kv-ausfuellen" className="block text-sm text-foreground hover:underline underline-offset-2">
            E1kv ausfüllen: Schritt-für-Schritt &rarr;
          </Link>
          <Link href="/ratgeber/interactive-brokers-steuer-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Interactive Brokers Steuer Österreich &rarr;
          </Link>
          <Link href="/ratgeber/verlustausgleich-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Verlustausgleich Österreich &rarr;
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
