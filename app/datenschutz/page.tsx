import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – KestKlar",
  description: "Datenschutzerklärung von KestKlar gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-serif text-3xl text-foreground mb-2">Datenschutzerklärung</h1>
      <p className="text-xs text-muted-foreground mb-12">Stand: Mai 2026</p>

      <div className="prose-legal">

        <Section title="1. Verantwortlicher">
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <address className="not-italic mt-3 text-sm text-muted-foreground leading-relaxed">
            Stackforge GmbH<br />
            Schönbrunnerstraße 102<br />
            1050 Wien, Österreich<br />
            E-Mail: <a href="mailto:datenschutz@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">datenschutz@kestklar.at</a>
          </address>
        </Section>

        <Section title="2. Welche Daten wir verarbeiten">
          <p>Wir verarbeiten nur die Daten, die für den Betrieb von KestKlar notwendig sind:</p>
          <ul>
            <li><strong>E-Mail-Adresse</strong> — wenn du dich auf die Warteliste einträgst oder ein Konto erstellst. Zweck: Benachrichtigung bei Produktstart, Versand von Transaktions-E-Mails.</li>
            <li><strong>Broker-PDFs</strong> — wenn du eine Jahresabrechnung hochlädst. Diese Dateien werden unmittelbar nach der Verarbeitung automatisch gelöscht. Wir speichern keine Originaldateien.</li>
            <li><strong>Transaktionsdaten</strong> — die aus deinem PDF extrahierten Einzel­transaktionen (Kauf, Verkauf, Dividende, ETF-Ausschüttung). Diese werden für die Steuerberechnung und optional für die Vorjahresspeicherung aufbewahrt.</li>
            <li><strong>Technische Zugriffsdaten</strong> — IP-Adresse, Browser-Typ, Zugriffszeitpunkt. Zweck: Sicherheit und Fehlerbehebung. Speicherdauer: 30 Tage.</li>
          </ul>
        </Section>

        <Section title="3. Rechtsgrundlagen">
          <p>Wir verarbeiten deine Daten auf Basis folgender Rechtsgrundlagen nach Art. 6 DSGVO:</p>
          <ul>
            <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung) — für den E-Mail-Versand im Rahmen der Warteliste.</li>
            <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragserfüllung) — für die Verarbeitung deiner Broker-Daten zur Berechnung der Kapitalertragsteuer.</li>
            <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigte Interessen) — für technische Zugriffslogs zur Sicherstellung des Betriebs.</li>
          </ul>
        </Section>

        <Section title="4. Weitergabe an Dritte">
          <p>
            Wir verkaufen deine Daten nicht und geben sie nicht zu Werbezwecken weiter. Für den Betrieb des Dienstes setzen wir folgende Auftragsverarbeiter ein:
          </p>
          <ul>
            <li><strong>Loops.so</strong> — für den Versand von Wartelisten- und Transaktions-E-Mails. Es wird ausschließlich deine E-Mail-Adresse übertragen. Loops.so verarbeitet diese Daten gemäß eigenem Datenschutzvertrag.</li>
            <li><strong>Europäischer Hosting-Anbieter (Deutschland)</strong> — für die Speicherung von Transaktionsdaten auf Servern innerhalb der EU.</li>
            <li><strong>Europäischer KI-Anbieter</strong> — für die Plausibilitätsprüfung berechneter Steuerwerte. Es werden keine personenbezogenen Daten übertragen, nur anonymisierte Zahlenwerte.</li>
          </ul>
          <p>
            Mit allen Auftragsverarbeitern bestehen Datenverarbeitungsverträge gemäß Art. 28 DSGVO.
          </p>
        </Section>

        <Section title="5. Speicherdauer">
          <ul>
            <li><strong>Broker-PDFs:</strong> Sofortige Löschung nach Extraktion der Transaktionsdaten.</li>
            <li><strong>Transaktionsdaten:</strong> Bis zur Löschung des Kontos oder auf ausdrücklichen Wunsch des Nutzers, maximal 7 Jahre (steuerrechtliche Aufbewahrungspflicht).</li>
            <li><strong>E-Mail-Adresse (Warteliste):</strong> Bis zum Widerruf der Einwilligung oder bis zum Produktstart, danach Überführung ins reguläre Nutzerkonto oder Löschung.</li>
            <li><strong>Technische Zugriffslogs:</strong> 30 Tage.</li>
          </ul>
        </Section>

        <Section title="6. Deine Rechte">
          <p>Du hast nach DSGVO folgende Rechte, die du jederzeit per E-Mail an <a href="mailto:datenschutz@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">datenschutz@kestklar.at</a> geltend machen kannst:</p>
          <ul>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO) — welche Daten wir über dich gespeichert haben.</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO) — Korrektur unrichtiger Daten.</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO) — Löschung deiner Daten, soweit keine gesetzliche Aufbewahrungspflicht besteht.</li>
            <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Herausgabe deiner Daten in maschinenlesbarem Format.</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO) — gegen die Verarbeitung auf Basis berechtigter Interessen.</li>
            <li><strong>Widerruf der Einwilligung</strong> — jederzeit ohne Angabe von Gründen für die Wartelisten-E-Mails.</li>
          </ul>
          <p>
            Du hast außerdem das Recht, Beschwerde bei der österreichischen Datenschutzbehörde einzulegen:<br />
            <strong>Datenschutzbehörde</strong>, Barichgasse 40–42, 1030 Wien, <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">www.dsb.gv.at</a>
          </p>
        </Section>

        <Section title="7. Cookies und Tracking">
          <p>
            KestKlar verwendet keine Tracking-Cookies, keine Werbenetzwerke und kein Google Analytics. Technisch notwendige Session-Cookies (für die Anmeldung) werden ausschließlich für die Funktionsfähigkeit des Dienstes gesetzt und nicht an Dritte weitergegeben.
          </p>
        </Section>

        <Section title="8. Änderungen dieser Erklärung">
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei wesentlichen Änderungen des Dienstes zu aktualisieren. Nutzer mit bestehendem Konto werden per E-Mail informiert. Das Datum der letzten Änderung ist oben angegeben.
          </p>
        </Section>

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-lg text-foreground mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed [&_ul]:mt-2 [&_ul]:space-y-2 [&_ul]:pl-4 [&_ul]:list-disc [&_strong]:text-foreground [&_a]:text-foreground">
        {children}
      </div>
    </div>
  );
}
