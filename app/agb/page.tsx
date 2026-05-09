import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB – KestKlar",
  description: "Allgemeine Geschäftsbedingungen von KestKlar, einem Produkt der Stackforge GmbH.",
};

export default function AGBPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-serif text-3xl text-foreground mb-2">Allgemeine Geschäftsbedingungen</h1>
      <p className="text-xs text-muted-foreground mb-12">Stand: Mai 2026</p>

      <div className="prose-legal">

        <Section title="1. Anbieter und Geltungsbereich">
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung des Online-Dienstes KestKlar, betrieben von:
          </p>
          <address className="not-italic mt-3 text-sm text-muted-foreground leading-relaxed">
            Stackforge GmbH<br />
            [Straße und Hausnummer]<br />
            [PLZ] Wien, Österreich<br />
            E-Mail: <a href="mailto:hallo@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">hallo@kestklar.at</a>
          </address>
          <p className="mt-3">
            Mit der Nutzung von KestKlar erklärt sich der Nutzer mit diesen AGB einverstanden. Abweichende Bedingungen des Nutzers werden nicht anerkannt.
          </p>
        </Section>

        <Section title="2. Leistungsbeschreibung">
          <p>
            KestKlar ist ein webbasiertes Berechnungswerkzeug für österreichische Privat­anleger. Der Dienst ermöglicht:
          </p>
          <ul>
            <li>den automatisierten Import von Broker-Jahresabrechnungen (PDF oder CSV)</li>
            <li>die Berechnung der österreichischen Kapitalertragsteuer (KeSt) nach §§ 27 ff. EStG</li>
            <li>die Aufbereitung der berechneten Werte für die Beilage E1kv zur Einkommensteuererklärung</li>
            <li>die optionale Speicherung von Transaktionsdaten für Folgejahre</li>
          </ul>
          <p>
            <strong>KestKlar ist kein Steuerberater und ersetzt keine steuerliche Beratung.</strong> Die bereitgestellten Berechnungen sind technische Hilfsmittel. Der Nutzer bleibt für die Richtigkeit und Vollständigkeit seiner Steuererklärung selbst verantwortlich. Bei Unsicherheiten empfehlen wir die Konsultation eines zugelassenen Steuerberaters.
          </p>
        </Section>

        <Section title="3. Registrierung und Warteliste">
          <p>
            Die Eintragung in die Warteliste erfolgt durch Angabe einer gültigen E-Mail-Adresse. Es entsteht dadurch kein Vertragsverhältnis. Die Eintragung ist kostenlos und jederzeit widerrufbar.
          </p>
          <p>
            Für die vollständige Nutzung des Dienstes ist eine Registrierung mit gültiger E-Mail-Adresse erforderlich. Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich.
          </p>
        </Section>

        <Section title="4. Preise und Zahlung">
          <p>KestKlar wird in folgenden Tarifen angeboten:</p>
          <ul>
            <li>
              <strong>Free</strong> — kostenlos. Umfasst die Berechnung der KeSt-Summe und die Anzeige der E1kv-Kennzahlen. Kein PDF-Export, keine Datenspeicherung über die aktuelle Sitzung hinaus.
            </li>
            <li>
              <strong>Standard — € 29 / Jahr</strong>. Umfasst zusätzlich den PDF-Export des Steuerberichts und die Speicherung der Transaktionsdaten für Folgejahre (bis zu 3 Broker).
            </li>
            <li>
              <strong>Pro — € 69 / Jahr</strong>. Umfasst alle Standard-Funktionen sowie unbegrenzte Broker-Konten, CSV-Import und priorisierter Support.
            </li>
          </ul>
          <p>
            Alle Preise verstehen sich inklusive der gesetzlichen Umsatzsteuer. Die Abrechnung erfolgt jährlich im Voraus. Es werden gängige Zahlungsmethoden (Kreditkarte, SEPA-Lastschrift) akzeptiert.
          </p>
          <p>
            Aktionspreise und Rabatte gelten nur für den jeweils angegebenen Zeitraum und können nicht nachträglich gewährt werden.
          </p>
        </Section>

        <Section title="5. Widerrufsrecht">
          <p>
            Verbrauchern steht gemäß § 11 FAGG ein Widerrufsrecht von 14 Tagen ab Vertragsabschluss zu, sofern die Leistung noch nicht vollständig erbracht wurde. Da es sich um digitale Inhalte handelt, erlischt das Widerrufsrecht mit Beginn der Leistungserbringung, wenn der Nutzer ausdrücklich zugestimmt hat, dass die Ausführung vor Ablauf der Widerrufsfrist beginnen soll.
          </p>
        </Section>

        <Section title="6. Pflichten des Nutzers">
          <p>Der Nutzer verpflichtet sich:</p>
          <ul>
            <li>ausschließlich eigene Broker-Unterlagen hochzuladen, für deren Verarbeitung er berechtigt ist</li>
            <li>keine automatisierten Abfragen, Scraping oder missbräuchliche Nutzung des Dienstes durchzuführen</li>
            <li>die bereitgestellten Berechnungen eigenverantwortlich zu überprüfen, bevor er sie in seiner Steuererklärung verwendet</li>
            <li>seine Zugangsdaten nicht an Dritte weiterzugeben</li>
          </ul>
        </Section>

        <Section title="7. Verfügbarkeit und Haftung">
          <p>
            Wir streben eine Verfügbarkeit von 99 % an, können jedoch keine ununterbrochene Erreichbarkeit garantieren. Wartungsarbeiten werden nach Möglichkeit außerhalb der Hauptnutzungszeiten (Jänner–Mai) durchgeführt.
          </p>
          <p>
            Die Haftung der Stackforge GmbH ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Eine Haftung für die steuerrechtliche Richtigkeit der berechneten Werte wird ausgeschlossen, da KestKlar ein technisches Berechnungswerkzeug und kein Steuerberatungsprodukt ist. Dies gilt nicht für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
          </p>
        </Section>

        <Section title="8. Kündigung">
          <p>
            Jahresabonnements können bis zu 14 Tage vor Verlängerung gekündigt werden. Die Kündigung erfolgt per E-Mail an <a href="mailto:hallo@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">hallo@kestklar.at</a> oder über die Kontoeinstellungen. Eine anteilige Rückerstattung für nicht genutzte Monate ist nicht vorgesehen, außer im Falle eines berechtigten Widerrufs.
          </p>
          <p>
            Wir behalten uns das Recht vor, Konten bei schwerwiegendem Missbrauch fristlos zu sperren.
          </p>
        </Section>

        <Section title="9. Änderungen der AGB">
          <p>
            Wir behalten uns vor, diese AGB mit einer Ankündigungsfrist von 30 Tagen per E-Mail zu ändern. Widerspricht der Nutzer nicht innerhalb dieser Frist, gelten die neuen AGB als akzeptiert. Im Falle des Widerspruchs hat der Nutzer das Recht, das Vertragsverhältnis zum Zeitpunkt des Inkrafttretens der neuen AGB zu kündigen.
          </p>
        </Section>

        <Section title="10. Anwendbares Recht und Gerichtsstand">
          <p>
            Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist Wien, Österreich, sofern der Nutzer Unternehmer ist. Für Verbraucher gelten die gesetzlichen Zuständigkeitsregelungen.
          </p>
          <p>
            Für Verbraucher innerhalb der EU steht die Online-Streitbeilegungsplattform der EU-Kommission zur Verfügung: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">https://ec.europa.eu/consumers/odr</a>. Wir sind zur Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
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
