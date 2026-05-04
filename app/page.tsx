import { BrokerStrip } from "@/components/broker-strip";
import { CTA } from "@/components/cta";
import { EuTrust } from "@/components/eu-trust";
import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SocialProof } from "@/components/social-proof";
import { TearLine } from "@/components/tear-line";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrokerStrip />
      <TearLine />
      <Features />
      <EuTrust />
      <HowItWorks />
      <SocialProof />
      <TearLine tone="muted" />
      <FAQ />
      <CTA />
    </main>
  );
}
