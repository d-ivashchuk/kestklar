import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLdOrganization, JsonLdWebApplication, JsonLdFaq } from "@/components/json-ld";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLdOrganization />
      <JsonLdWebApplication />
      <JsonLdFaq />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
