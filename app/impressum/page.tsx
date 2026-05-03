import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – KestKlar",
  description: "Impressum von KestKlar, einem Produkt der Stackforge GmbH.",
};

export default function ImpressumPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-serif text-3xl text-foreground mb-2">Impressum</h1>
      <p className="text-xs text-muted-foreground mb-12">Angaben gemäß § 5 ECG und § 25 MedienG</p>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Medieninhaber und Diensteanbieter</h2>
          <address className="not-italic space-y-1">
            <p className="text-foreground font-medium">Stackforge GmbH</p>
            <p>[Straße und Hausnummer]</p>
            <p>[PLZ] Wien</p>
            <p>Österreich</p>
          </address>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a href="mailto:hallo@kestklar.at" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity">
              hallo@kestklar.at
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Unternehmensangaben</h2>
          <dl className="space-y-2">
            <div className="flex gap-4">
              <dt className="w-40 shrink-0">Rechtsform</dt>
              <dd className="text-foreground">Gesellschaft mit beschränkter Haftung (GmbH)</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-40 shrink-0">Firmenbuchnummer</dt>
              <dd className="text-foreground">[FN XXXXXX x]</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-40 shrink-0">Firmenbuchgericht</dt>
              <dd className="text-foreground">Handelsgericht Wien</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-40 shrink-0">UID-Nummer</dt>
              <dd className="text-foreground">[ATU XXXXXXXX]</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-40 shrink-0">Geschäftsführung</dt>
              <dd className="text-foreground">Dmytro Ivashchuk</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Unternehmensgegenstand</h2>
          <p>
            Entwicklung und Betrieb von Software für die Berechnung der österreichischen Kapitalertragsteuer für Privatanleger. KestKlar ist kein konzessioniertes Finanz- oder Steuerberatungsunternehmen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Aufsichtsbehörde</h2>
          <p>
            Magistrat der Stadt Wien (Gewerbebehörde)
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Haftungsausschluss</h2>
          <p>
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Stackforge GmbH übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers.
          </p>
          <p className="mt-3">
            KestKlar ist ein technisches Berechnungswerkzeug. Die bereitgestellten Steuerberechnungen ersetzen keine individuelle steuerrechtliche Beratung durch einen zugelassenen Steuerberater oder Wirtschaftsprüfer.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg text-foreground mb-4">Urheberrecht</h2>
          <p>
            Die durch Stackforge GmbH erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der Stackforge GmbH.
          </p>
        </div>

      </div>
    </main>
  );
}
