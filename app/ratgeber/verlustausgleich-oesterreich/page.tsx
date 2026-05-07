import type { Metadata } from "next";
import Link from "next/link";
import { JsonLdArticle, JsonLdBreadcrumb } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Verlustausgleich Österreich: Was wirklich verrechenbar ist — KestKlar",
  description:
    "Welche Kapitalverluste lassen sich mit welchen Gewinnen verrechnen? Komplette Übersicht zu §27 Abs 8 EStG mit Buckets, Beispielen, Krypto-Regeln und der Steuerreporting-Verordnung 2025.",
  alternates: {
    canonical: "https://kestklar.at/ratgeber/verlustausgleich-oesterreich",
    languages: { en: "https://kestklar.at/en/ratgeber/austrian-loss-netting" },
  },
};

export default function VerlustausgleichPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <JsonLdArticle
        headline="Verlustausgleich Österreich: Was wirklich verrechenbar ist"
        description="Vollständiger Leitfaden zum Verlustausgleich bei Einkünften aus Kapitalvermögen nach §27 Abs 8 EStG."
        url="https://kestklar.at/ratgeber/verlustausgleich-oesterreich"
        datePublished="2026-05-03"
        inLanguage="de"
      />
      <JsonLdBreadcrumb
        items={[
          { name: "KestKlar", url: "https://kestklar.at" },
          { name: "Ratgeber", url: "https://kestklar.at/ratgeber" },
          { name: "Verlustausgleich Österreich", url: "https://kestklar.at/ratgeber/verlustausgleich-oesterreich" },
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
            Verlustausgleich · §27 EStG · KeSt · 9 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            Verlustausgleich Österreich: Was wirklich verrechenbar ist
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Der Verlustausgleich bei Einkünften aus Kapitalvermögen ist in §27 Abs 8 EStG abschließend geregelt — und enger, als viele denken. Sparbuchzinsen lassen sich nicht mit Aktienverlusten verrechnen, ein Verlustvortrag in Folgejahre ist nicht möglich, und ab 2025 gilt eine neue Steuerreporting-Verordnung.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Die Grundregel: nur innerhalb desselben Jahres, nur innerhalb der Buckets">
            <p>
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27 Abs 8 EStG 1988
              </a>{" "}eröffnet mit dem Satz: &bdquo;Der Verlustausgleich ist nur nach Maßgabe der folgenden Vorschriften zulässig.&ldquo; Daraus folgen vier harte Einschränkungen:
            </p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Nur innerhalb des <strong className="text-foreground">27,5%-Buckets</strong> &mdash; nicht mit Sparbuchzinsen oder Stiftungs-Zuwendungen.</li>
              <li>Stille Beteiligungen sind ein eigener Topf (Wartetastenverlust).</li>
              <li>Kein Ausgleich zwischen 27,5%-Bucket und tarifbesteuerten Kapitaleinkünften.</li>
              <li><strong className="text-foreground">Kein Verlustvortrag</strong> in Folgejahre. Was zum 31.12. nicht ausgeglichen ist, verfällt.</li>
            </ol>
          </Section>

          <Section title="Drei Steuerbuckets — strikt getrennt">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                {
                  bucket: "Bucket A — 27,5%",
                  legal: "§27a Abs 1 Z 2 EStG",
                  what: "Realisierte Kursgewinne/-verluste aus Aktien, ETFs, Anleihen · Dividenden · Zinsen aus öffentlich angebotenen Anleihen · Erträge aus verbrieften Derivaten · Krypto-Wertsteigerungen (§27b)",
                },
                {
                  bucket: "Bucket B — 25%",
                  legal: "§27a Abs 1 Z 1 EStG",
                  what: "Sparbuchzinsen · Sichteinlagen · Termingelder · Privatstiftungs-Zuwendungen (§27 Abs 5 Z 7)",
                },
                {
                  bucket: "Bucket C — Tarifsteuersatz",
                  legal: "§27a Abs 2 EStG",
                  what: "Privatdarlehen · nicht öffentlich angebotene Anleihen · Krypto-Lending- und Staking-Pool-Erträge",
                },
              ].map((row) => (
                <div key={row.bucket} className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-xs font-mono font-medium text-foreground">{row.bucket}</p>
                    <p className="text-[10px] text-muted-foreground">{row.legal}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{row.what}</p>
                </div>
              ))}
            </div>
            <p className="mt-3">
              Verluste aus Bucket A können <strong className="text-foreground">nur</strong> mit Gewinnen aus Bucket A verrechnet werden — niemals mit B oder C.
            </p>
          </Section>

          <Section title="Was geht — was nicht">
            <div className="mt-2 border border-border divide-y divide-border">
              {[
                { l: "Aktienverlust ↔ Aktiengewinn", ok: true, comment: "Beides Bucket A." },
                { l: "Aktienverlust ↔ Dividende ausländischer Aktie", ok: true, comment: "Beides Bucket A, beides 27,5%." },
                { l: "Aktienverlust ↔ Anleihezinsen (öffentlich angeboten)", ok: true, comment: "Bucket A." },
                { l: "Aktienverlust ↔ Krypto-Gewinn (Direktbesitz)", ok: true, comment: "§27b ist Teil Bucket A." },
                { l: "Aktienverlust ↔ Sparbuchzinsen", ok: false, comment: "Bucket B — explizit ausgeschlossen, §27 Abs 8 Z 1." },
                { l: "Aktienverlust ↔ Stiftungs-Zuwendung (§27 Abs 5 Z 7)", ok: false, comment: "Bucket B." },
                { l: "Aktienverlust ↔ Privatdarlehens-Zinsen", ok: false, comment: "Bucket C — Tarifsteuersatz." },
                { l: "Krypto-Verlust ↔ Aktiengewinn", ok: true, comment: "Beides 27,5%-Bucket." },
                { l: "Krypto-Verlust ↔ Krypto-Lending-Ertrag", ok: false, comment: "Lending = Tarif (Bucket C)." },
                { l: "Aktienverlust ↔ §30-Immobilienveräußerungs-Gewinn", ok: false, comment: "§30 ist eigener Pool, strikt getrennt." },
                { l: "Stille-Beteiligungs-Verlust ↔ Aktiengewinn", ok: false, comment: "Wartetastenverlust, §27 Abs 8 Z 2." },
              ].map((row) => (
                <div key={row.l} className="p-4 grid grid-cols-12 gap-3 items-start">
                  <p className={`col-span-1 text-xs font-mono font-medium ${row.ok ? "text-foreground" : "text-muted-foreground"}`}>
                    {row.ok ? "OK" : "✗"}
                  </p>
                  <p className="col-span-5 text-xs font-medium text-foreground">{row.l}</p>
                  <p className="col-span-6 text-xs text-muted-foreground">{row.comment}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Automatischer vs. manueller Verlustausgleich">
            <p>
              <strong className="text-foreground">Automatisch:</strong> nur durch <em>inländische</em> depotführende Stellen (z.B. Erste, BAWAG, easybank, dadat, flatex Austria, Hello Bank, Bank Direkt, Wiener Privatbank). Pro Kalenderjahr, pro Steuerpflichtigem, alle Depots <em>derselben</em> Bank.
            </p>
            <p>
              <strong className="text-foreground">Manuell über E1kv:</strong>
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Mehrere inländische Banken (bankübergreifend)</li>
              <li>Inland + Ausland (z.B. Erste + IBKR, BAWAG + Scalable)</li>
              <li>Nur ausländische Broker (IBKR, DEGIRO Deutschland, Scalable Capital, Lightyear)</li>
              <li>Krypto + Wertpapiere (auch wenn beide bei derselben inländischen Bank liegen)</li>
              <li>Gemeinschafts- und Treuhanddepots</li>
            </ul>
            <p>
              Rechtsgrundlage automatischer Ausgleich: §93 i.V.m. §97 Abs 2 EStG.
            </p>
          </Section>

          <Section title="Neu ab 1. Jänner 2025: Steuerreporting-Verordnung">
            <p>
              Die <strong className="text-foreground">Verlustausgleichsbescheinigung</strong> nach §96 Abs 4 Z 2 EStG (alt) wird durch das einheitliche <strong className="text-foreground">Steuerreporting</strong> nach §96 Abs 5 EStG (neu) und der{" "}
              <a href="https://www.ris.bka.gv.at/eli/bgbl/ii/2024/213/20240731" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                Steuerreportingverordnung BGBl II 213/2024
              </a>{" "}ersetzt.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Erstmals anwendbar für Steuerjahr <strong className="text-foreground">2025</strong>.</li>
              <li>Verlustausgleich erfolgt jetzt auf Ebene der <strong className="text-foreground">Bruttoeinkünfte</strong>, nicht mehr auf KeSt-Beträgen.</li>
              <li>Pflicht für alle KeSt-Abzugsverpflichteten (Banken, Kryptodienstleister).</li>
              <li>Inhalt: alle Kapitaleinkünfte, auch jene ohne Verlustausgleich (Sparbuchzinsen).</li>
              <li>Abrufbar bis spätestens 31. März des Folgejahres.</li>
            </ul>
            <p>
              Für Veranlagungszeiträume bis einschließlich 2024 gilt weiter die alte Verlustausgleichsbescheinigung.
            </p>
          </Section>

          <Section title="Krypto: Was geht, was geht nicht">
            <p>
              Seit 1. März 2022 sind Kryptowährungen in{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §27b EStG
              </a>{" "}geregelt. Krypto-<em>Neuvermögen</em> (Anschaffung ab 1.3.2021) unterliegt dem 27,5%-Sondersteuersatz.
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Krypto-Verluste &harr; Aktien-Gewinne:</strong> Verrechenbar (Bucket A).</li>
              <li><strong className="text-foreground">Krypto-Lending / Staking-Pools:</strong> Tarifsteuersatz (Bucket C) — NICHT verrechenbar mit Aktien.</li>
              <li><strong className="text-foreground">Krypto-Altvermögen</strong> (vor 1.3.2021): Spekulationsfrist 1 Jahr — bei Verkauf nach 1 Jahr ggf. steuerfrei.</li>
              <li><strong className="text-foreground">Automatischer Krypto-Wertpapier-Ausgleich:</strong> Auch ab 2025 nicht möglich — nur über E1kv.</li>
            </ul>
            <p className="text-xs">
              Quelle:{" "}
              <a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/steuerliche-behandlung-von-kryptowaehrungen.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                BMF: Kryptowährungen
              </a>
            </p>
          </Section>

          <Section title="§30 Immobilien — strikt getrennt">
            <p>
              Verluste aus privaten Grundstücksveräußerungen sind nach{" "}
              <a href="https://www.jusline.at/gesetz/estg/paragraf/30" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                §30 Abs 7 EStG
              </a>{" "}intern verrechenbar. Restverluste werden auf 60% gekürzt und über 15 Jahre mit Vermietungs-Einkünften (§28) ausgeglichen — niemals mit §27-Kapitalvermögen.
            </p>
          </Section>

          <Section title="Drei Rechenbeispiele">
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Beispiel 1 — Inland, ein Broker, automatisch</p>
              <p>Aktien-Gewinn +5.000 EUR · ETF-Verlust &minus;2.000 EUR · Dividende +1.000 EUR &rarr; 4.000 EUR &times; 27,5% = <strong className="text-foreground">1.100 EUR ESt</strong>. Sparbuch-Zinsen 50 EUR werden separat mit 25% besteuert (12,50 EUR), nicht mit dem Aktienverlust verrechnet.</p>
            </div>
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Beispiel 2 — Erste Bank + IBKR (manuell via E1kv)</p>
              <p>Erste: &minus;3.000 EUR Aktienverlust (KeSt-Bescheinigung zeigt unverbrauchten Verlust). IBKR: +5.000 EUR Aktiengewinn US, +500 EUR US-Dividende mit 75 EUR US-Quellensteuer.</p>
              <p>E1kv: KZ 994 +5.500, KZ 891/892 &minus;3.000 &rarr; Saldo 2.500 &times; 27,5% = 687,50 EUR. Anrechnung 75 EUR (KZ 998) &rarr; <strong className="text-foreground">finale ESt 612,50 EUR</strong>.</p>
            </div>
            <div className="mt-2 border border-border bg-secondary p-5 space-y-2 text-xs">
              <p className="text-foreground font-medium">Beispiel 3 — Verlustverfall</p>
              <p>Aktienverlust &minus;1.000 EUR · Aktien-Gewinn andere Position +200 EUR · Sparbuchzinsen +800 EUR.</p>
              <p>Verrechnet: &minus;1.000 + 200 = &minus;800 Restverlust. Sparbuchzinsen voll mit 25% (200 EUR). Restverlust verfällt zum 31.12. <strong className="text-foreground">Kein Vortrag</strong> in 2026 möglich. Tipp: Vor Jahreswechsel offene Gewinne realisieren, um den Verlust zu &bdquo;verbrauchen&ldquo;.</p>
            </div>
          </Section>

          <Section title="Wichtige Sonderregeln">
            <ul className="list-disc pl-4 space-y-2">
              <li><strong className="text-foreground">Keine Wash-Sale-Regel:</strong> Österreich verbietet Verkauf-Rückkauf zum Zweck der Verlustrealisierung nicht. Tax-Loss-Selling ist zulässig (außer in Extremfällen §22 BAO Missbrauch).</li>
              <li><strong className="text-foreground">Anschaffungsnebenkosten nicht abzugsfähig:</strong> Ordergebühren erhöhen nicht die AK im Privatvermögen (§27a Abs 4 Z 2 EStG; VfGH G 168/2017).</li>
              <li><strong className="text-foreground">Pro-Land-Höchstbetrag bei Quellensteuer:</strong> DBA-Anrechnung pro Quellenstaat einzeln rechnen (USA 15%, Schweiz 15%, Frankreich 12,8%).</li>
              <li><strong className="text-foreground">Gemeinschaftsdepots:</strong> Kein automatischer Ausgleich — jede:r Mitinhaber:in veranlagt separat.</li>
            </ul>
          </Section>

          <Section title="Häufige Fehler">
            <ol className="list-decimal pl-4 space-y-2">
              <li>Sparbuchzinsen mit Aktienverlusten verrechnen wollen (§27 Abs 8 Z 1 verbietet das).</li>
              <li>Auf Verlustvortrag in Folgejahre hoffen — gibt es bei §27 nicht.</li>
              <li>Bei mehreren Brokern auf automatischen Ausgleich vertrauen (nur intra-Bank).</li>
              <li>Auslandsbroker übersehen Verlustausgleich gar nicht erst &mdash; muss aktiv via E1kv geschehen.</li>
              <li>Krypto + Aktien intra-Bank automatisch erwartet (auch 2025 nicht).</li>
              <li>Anschaffungsnebenkosten/Spesen geltend machen (im Privatvermögen ausgeschlossen).</li>
              <li>Bucket-C-Erträge (Privatdarlehen, Krypto-Lending) im 27,5%-Bucket eintragen.</li>
            </ol>
          </Section>

          <Section title="Offizielle Quellen">
            <ul className="list-disc pl-4 space-y-2">
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27 EStG (Abs 8 Verlustausgleich)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27a" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27a EStG (Sondersteuersätze, Buckets)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/27b" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§27b EStG (Krypto)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/93" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§93 EStG (KeSt-Abzug)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/96" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§96 EStG (Bescheinigung / Steuerreporting)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/97" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§97 EStG (Verlustausgleich auf Antrag)</a></li>
              <li><a href="https://www.jusline.at/gesetz/estg/paragraf/30" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">§30 EStG (Immobilien-Pool)</a></li>
              <li><a href="https://www.ris.bka.gv.at/eli/bgbl/ii/2024/213/20240731" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">Steuerreportingverordnung BGBl II 213/2024</a></li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/verluste-aus-veraeusserung-von-kapitalvermoegen-und-derivaten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: Verluste aus Veräußerung Kapitalvermögen</a></li>
              <li><a href="https://www.bmf.gv.at/themen/steuern/sparen-veranlagen/besteuerung-kapitalertraege-inland.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF: Besteuerung Kapitalerträge Inland</a></li>
              <li><a href="https://www.usp.gv.at/themen/steuern-finanzen/einkommensteuer-ueberblick/weitere-informationen-est/bescheinigung-kapitalertraege.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">USP: Bescheinigung Kapitalerträge</a></li>
              <li><a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF E1kv 2024 (PDF)</a></li>
            </ul>
            <p className="text-xs mt-2 italic">
              Stand: Mai 2026. Steuerrechtliche Aussagen sind keine Rechtsberatung &mdash; bei größeren Beträgen Steuerberater oder verbindliche Auskunft (§90 BAO) einholen.
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar verrechnet automatisch über alle Broker.</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Du lädst deine Statements von IBKR, Scalable, DEGIRO &amp; Co. hoch, KestKlar erkennt die richtigen Buckets, verrechnet Verluste mit Gewinnen innerhalb des 27,5%-Topfs, rechnet Quellensteuer an und liefert dir die fertigen E1kv-Kennzahlen.
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
          <Link href="/ratgeber/kest-berechnen" className="block text-sm text-foreground hover:underline underline-offset-2">
            KeSt berechnen bei nicht-steuereinfachen Brokern &rarr;
          </Link>
          <Link href="/ratgeber/e1kv-ausfuellen" className="block text-sm text-foreground hover:underline underline-offset-2">
            E1kv ausfüllen: Schritt-für-Schritt &rarr;
          </Link>
          <Link href="/ratgeber/interactive-brokers-steuer-oesterreich" className="block text-sm text-foreground hover:underline underline-offset-2">
            Interactive Brokers Steuer Österreich &rarr;
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
