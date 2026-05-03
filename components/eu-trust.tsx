"use client";

import { IllustrationShield } from "./illustrations";

const trustItems = [
  {
    title: "Nur du siehst deine Daten",
    body: "Dein Depot, deine Gewinne, deine Verluste — das geht niemanden etwas an. KestKlar sieht deine Zahlen nur um sie zu berechnen. Weiterverkauft oder ausgewertet wird nichts.",
  },
  {
    title: "Alles bleibt in Europa",
    body: "Deine Daten liegen auf Servern in Deutschland — nicht in den USA, nicht in der Cloud irgendwo. Europäisches Recht, österreichischer Datenschutz.",
  },
  {
    title: "Wir brauchen deine PDFs nicht",
    body: "Nach dem Hochladen werden die Originaldateien sofort gelöscht. Wir speichern nur die Zahlen die wir für die Berechnung brauchen — nichts mehr.",
  },
  {
    title: "Keine Werbung. Nie.",
    body: "KestKlar verdient Geld mit einem fairen Jahresbeitrag — nicht mit deinen Daten. Du bekommst keine Werbeanrufe, keine Produktempfehlungen, kein Spam.",
  },
  {
    title: "Die KI ist auch europäisch",
    body: "Die KI-Plausibilitätsprüfung läuft über ein europäisches KI-Unternehmen — kein amerikanischer Anbieter bekommt deine Finanzdaten zu sehen.",
  },
  {
    title: "Kein Verkauf an Dritte",
    body: "Wir geben deine Daten an niemanden weiter — weder an Banken, noch an Versicherungen, noch an Steuerberater. Deine Daten gehören dir.",
  },
];

export function EuTrust() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <IllustrationShield className="w-12 h-12 text-foreground mb-5 opacity-75" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Deine Sicherheit
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
              Du lädst hier deine Finanzdaten hoch.{" "}
              <span className="italic">Das nehmen wir ernst.</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xl">
              Wir wissen dass es kein kleiner Schritt ist, einem fremden Tool seine Depotauszüge anzuvertrauen. Deshalb haben wir KestKlar von Grund auf so gebaut, dass deine Daten privat bleiben — nicht weil es Vorschrift ist, sondern weil wir es selbst so nutzen würden.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border bg-border">
            {trustItems.map((item) => (
              <div key={item.title} className="bg-background p-6 space-y-2">
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Fragen zu Datenschutz?{" "}
            <a href="mailto:datenschutz@kestklar.at" className="underline underline-offset-2 hover:text-foreground transition-colors">
              datenschutz@kestklar.at
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
