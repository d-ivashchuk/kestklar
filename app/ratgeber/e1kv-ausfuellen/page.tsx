import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E1kv ausfüllen: Anleitung für Kapitalvermögen – KestKlar",
  description:
    "Schritt-für-Schritt-Anleitung zur Beilage E1kv für Einkünfte aus Kapitalvermögen. Kennzahlen für Dividenden, Kursgewinne, ETF-Erträge und Verluste in FinanzOnline.",
};

export default function E1kvPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-2">
        <Link href="/ratgeber" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← Ratgeber
        </Link>
      </div>

      <article>
        <header className="mt-6 mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            E1kv · Kapitalvermögen · FinanzOnline · 6 min Lesezeit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            E1kv ausfüllen: Schritt-für-Schritt-Anleitung für Anleger
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Die Beilage E1kv ist das österreichische Formular für Kapitalerträge, die nicht automatisch versteuert wurden. Wer bei einem nicht-steuereinfachen Broker wie Interactive Brokers oder Scalable Capital investiert, muss sie jedes Jahr ausfüllen. Diese Anleitung erklärt was wo hinkommt.
          </p>
        </header>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <Section title="Was ist die E1kv und wer braucht sie?">
            <p>
              Die <strong className="text-foreground">E1kv</strong> (Beilage zur Einkommensteuererklärung für Einkünfte aus Kapitalvermögen) ist ein Zusatzformular zur österreichischen Einkommensteuererklärung. Du brauchst sie, wenn du Kapitalerträge aus Quellen erzielt hast, für die keine österreichische Kapitalertragsteuer (KeSt) automatisch einbehalten wurde.
            </p>
            <p>
              Das betrifft vor allem Anleger bei ausländischen Brokern wie <strong className="text-foreground">Interactive Brokers</strong>, <strong className="text-foreground">Scalable Capital</strong>, <strong className="text-foreground">DEGIRO</strong> oder <strong className="text-foreground">Bitpanda</strong>. Diese Broker sind keine österreichischen Kreditinstitute und führen die 27,5% KeSt nicht automatisch ans Finanzamt ab.
            </p>
            <p>
              Hinweis: <strong className="text-foreground">Trade Republic</strong> ist seit 24. April 2025 steuereinfach in Österreich. Für das Steuerjahr 2024 und den Zeitraum vor April 2025 ist aber noch eine E1kv nötig.
            </p>
          </Section>

          <Section title="Wo findest du die E1kv in FinanzOnline?">
            <p>
              Melde dich in <strong className="text-foreground">FinanzOnline</strong> (finanzonline.bmf.gv.at) an. Navigiere zu <em>Eingaben → Erklärungen → Einkommensteuererklärung E1</em>. Im Formular findest du unter dem Punkt <em>„außerbetriebliche Einkunftsarten"</em> den Abschnitt <em>„Einkünfte aus Kapitalvermögen — Beilage E1kv"</em>.
            </p>
            <p>
              Das aktuelle Formular kannst du auch direkt beim BMF einsehen:{" "}
              <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">
                E1kv 2024 (BMF PDF)
              </a>. Die Kennzahlen können sich von Jahr zu Jahr leicht ändern — prüfe immer die aktuelle Version.
            </p>
          </Section>

          <Section title="Die wichtigsten Kennzahlen der E1kv (Stand 2024)">
            <p>
              Die Kennzahlen sind nach Einkommensart gegliedert. Hier die relevantesten für Privatanleger mit ausländischem Depot. Da Kennzahlen sich jährlich ändern können, verlinken wir auf das offizielle BMF-Formular als Referenz.
            </p>

            <div className="mt-4 border border-border divide-y divide-border">
              {[
                {
                  kz: "KZ 937",
                  label: "Ausschüttungsgleiche Erträge (ausländisches Depot)",
                  desc: "Jährlich steuerpflichtige Erträge thesaurierender ETFs (Meldefonds) bei Verwahrung in einem ausländischen Depot. Daten kommen von der ÖEKB.",
                },
                {
                  kz: "KZ 936",
                  label: "Ausschüttungsgleiche Erträge (inländisches Depot)",
                  desc: "Dasselbe wie 937, aber für ETF-Anteile die bei einer österreichischen Depotbank verwahrt werden.",
                },
                {
                  kz: "KZ 985",
                  label: "Ausländische Dividenden / laufende Erträge",
                  desc: "Dividenden und Zinserträge aus ausländischen Wertpapieren. Bei den meisten Anlegern mit Auslandsbroker die wichtigste laufende Ertragszeile.",
                },
                {
                  kz: "KZ 994",
                  label: "Realisierte Kursgewinne",
                  desc: "Gewinne aus dem Verkauf von Aktien, ETFs, Anleihen. Kaufpreis nach gleitendem Durchschnittspreisverfahren wird abgezogen.",
                },
                {
                  kz: "KZ 996",
                  label: "Realisierte Verluste",
                  desc: "Verluste aus Wertpapierverkäufen. Werden mit Gewinnen verrechnet (Verlustausgleich). Kein Vortrag in Folgejahre möglich.",
                },
                {
                  kz: "KZ 998",
                  label: "Anrechenbare ausländische Quellensteuer",
                  desc: "Im Ausland einbehaltene Quellensteuer (z.B. US-Quellensteuer 15%), die auf die österreichische KeSt angerechnet wird.",
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
              Quelle: <a href="https://formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">BMF Formular E1kv 2024</a>
            </p>
          </Section>

          <Section title="Schritt-für-Schritt: Was du brauchst bevor du anfängst">
            <ol className="list-decimal pl-4 space-y-2">
              <li><strong className="text-foreground">Jahresabrechnung oder Steuerreport</strong> von jedem deiner Broker herunterladen (PDF oder CSV).</li>
              <li>Für thesaurierende ETFs: Auf <strong className="text-foreground">my.oekb.at</strong> nach der ISIN deines Fonds suchen und die ausschüttungsgleichen Erträge pro Anteil für das Steuerjahr notieren.</li>
              <li>Kursgewinne nach <strong className="text-foreground">gleitendem Durchschnittspreisverfahren</strong> berechnen (nicht FIFO): Österreich verwendet für Wertpapiere, die ab dem 1. April 2012 angeschafft wurden, den gewichteten Durchschnittspreis aller Käufe derselben Position.</li>
              <li><strong className="text-foreground">Verlustausgleich</strong> durchführen: Verluste über alle nicht-steuereinfachen Broker summieren und von den Gewinnen abziehen. Ein Vortrag in Folgejahre ist nicht möglich.</li>
              <li>Anrechenbare Quellensteuer aus dem Broker-Bericht entnehmen.</li>
              <li>Alle Beträge in die entsprechenden E1kv-Kennzahlen in FinanzOnline eintragen.</li>
            </ol>
          </Section>

          <Section title="Der häufigste Fehler: ausschüttungsgleiche Erträge vergessen">
            <p>
              Viele Anleger vergessen, die jährlichen ausschüttungsgleichen Erträge ihrer thesaurierenden ETFs anzugeben. Diese tauchen im Broker-Bericht <em>nicht</em> auf, weil kein Geld fließt — der ETF reinvestiert die Erträge intern. Trotzdem sind sie in Österreich jedes Jahr steuerpflichtig.
            </p>
            <p>
              Die Daten dafür kommen ausschließlich von der ÖEKB (my.oekb.at), nicht vom Broker. Das manuelle Nachschlagen, der richtige Devisenkurs am Stichtag und die Anzahl der eigenen Anteile machen diesen Teil besonders aufwändig.
            </p>
          </Section>

          <Section title="Abgabefrist">
            <p>
              Die Einkommensteuererklärung mit E1kv muss bis <strong className="text-foreground">30. April</strong> (Papier) oder <strong className="text-foreground">30. Juni</strong> (elektronisch via FinanzOnline) des Folgejahres eingereicht werden. Wer einen Steuerberater beauftragt, erhält in der Regel eine Fristverlängerung bis 31. März des übernächsten Jahres.
            </p>
            <p>
              Quelle: <a href="https://www.bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">BMF — Fristen & Fälligkeiten</a>
            </p>
          </Section>

          <div className="mt-12 border border-border p-6 bg-secondary">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">KestKlar automatisiert genau das</p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              KestKlar liest deine Broker-PDFs automatisch aus, holt die ÖEKB-Daten für deine ETFs, berechnet den Verlustausgleich und liefert dir die fertigen E1kv-Kennzahlen — in unter 10 Minuten.
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
          <Link href="/ratgeber/ausschuettungsgleiche-ertraege" className="block text-sm text-foreground hover:underline underline-offset-2">
            Ausschüttungsgleiche Erträge: Was sie sind und wie du sie versteuern musst →
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
