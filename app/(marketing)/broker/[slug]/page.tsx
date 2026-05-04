import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { brokers, getBroker } from "@/lib/brokers";
import { MockUI } from "@/components/mock-ui";
import { WaitlistForm } from "@/components/waitlist-form";
import { StatusBadge } from "@/components/status-badge";

export async function generateStaticParams() {
  return brokers.filter((b) => b.status === "supported").map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const broker = getBroker(slug);
  if (!broker) return {};
  return {
    title: broker.metaTitle.de,
    description: broker.metaDesc.de,
    alternates: { canonical: `https://kestklar.at/broker/${slug}` },
    openGraph: {
      title: broker.metaTitle.de,
      description: broker.metaDesc.de,
      type: "website",
    },
  };
}

export default async function BrokerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = getBroker(slug);
  if (!broker || broker.status !== "supported") notFound();

  const otherBrokers = brokers.filter((b) => b.slug !== slug && b.status === "supported");

  return (
    <>
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 dot-grid relative border-b border-border">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          <div className="max-w-site mx-auto relative">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">KestKlar</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-foreground">{broker.name}</span>
            </div>

            <div className="max-w-2xl">
              <div className="mb-6">
                <StatusBadge label="Unterstützt · Warteliste offen" variant="supported" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                KeSt berechnen mit{" "}
                <span className="italic">{broker.name}</span>
              </h1>

              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                {broker.description.de}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
                <WaitlistForm size="large" />
              </div>
            </div>
          </div>
        </section>

        {/* How it works for this broker */}
        <section className="bg-background py-16 sm:py-20 border-b border-border">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl text-foreground mb-8">
                So funktioniert es mit {broker.name}
              </h2>
              <div className="space-y-px border border-border bg-border">
                {broker.keyFacts.de.map((fact, i) => (
                  <div key={i} className="bg-background px-5 py-4 flex items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground/50 mt-0.5 w-4 shrink-0">0{i + 1}</span>
                    <p className="text-sm text-foreground leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mock UI */}
        <section className="bg-secondary py-16 sm:py-20 border-b border-border">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-foreground mb-8 text-center">
              So sieht das Ergebnis aus
            </h2>
            <MockUI />
          </div>
        </section>

        {/* SEO content block */}
        <section className="bg-background py-16 sm:py-20 border-b border-border">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">
              <h2 className="font-serif text-xl text-foreground">
                Warum müssen {broker.name}-Nutzer die KeSt selbst berechnen?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {broker.name} ist kein österreichisches Kreditinstitut im Sinne des EStG. Das bedeutet: anders als bei einer österreichischen Bank (Erste, Raiffeisen, Bank Austria) wird die 27,5% Kapitalertragsteuer nicht automatisch einbehalten und ans Finanzamt abgeführt. Als österreichischer Steuerpflichtiger bist du verpflichtet, diese Erträge selbst in deiner Einkommensteuererklärung — in der Beilage E1kv — anzugeben.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Das klingt simpel, wird aber schnell komplex: Thesaurierende ETFs haben jährliche ausschüttungsgleiche Erträge die auch ohne Dividendenausschüttung versteuert werden müssen. Wenn du neben {broker.name} noch andere Broker nutzt, musst du Verluste über alle Depots hinweg verrechnen (Verlustausgleich). Und für jeden Fonds musst du prüfen ob er bei der ÖEKB als Meldefonds registriert ist.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                KestKlar automatisiert genau diese Schritte: PDF hochladen, ÖEKB-Daten werden automatisch abgerufen, alle Berechnungen laufen im Hintergrund, du bekommst die exakten E1kv-Zeilen. Kein manuelles Nachschlagen, kein Steuerberater für mechanische Arbeit.
              </p>
            </div>
          </div>
        </section>

        {/* Other brokers */}
        {otherBrokers.length > 0 && (
          <section className="bg-secondary py-12 border-b border-border">
            <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">Andere unterstützte Broker</p>
              <div className="flex gap-3 flex-wrap">
                {otherBrokers.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/broker/${b.slug}`}
                    className="border border-border bg-background px-4 py-2.5 text-sm text-foreground hover:border-foreground/30 transition-colors"
                  >
                    {b.name} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-background py-16 sm:py-20">
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-md mx-auto space-y-5">
              <h2 className="font-serif text-2xl text-foreground">
                Bereit deine {broker.name} KeSt zu berechnen?
              </h2>
              <p className="text-sm text-muted-foreground">
                Trag dich ein — wir melden uns sobald KestKlar startet.
              </p>
              <div className="flex flex-col items-center gap-3">
                <WaitlistForm size="large" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
