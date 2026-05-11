import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLdOrganization, JsonLdWebApplication, JsonLdFaq } from "@/components/json-ld";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KestKlar — KeSt berechnen für österreichische Anleger | E1kv in 10 Minuten",
  description:
    "KeSt berechnen für Interactive Brokers, Scalable Capital & Co. PDF hochladen, ausschüttungsgleiche ETF-Erträge via ÖEKB, Verlustausgleich und E1kv-Kennzahlen für die Steuererklärung.",
  metadataBase: new URL("https://kestklar.at"),
  keywords: [
    "KeSt berechnen Österreich",
    "Kapitalertragsteuer Österreich",
    "E1kv ausfüllen",
    "Interactive Brokers Steuer Österreich",
    "Scalable Capital KeSt Österreich",
    "ausschüttungsgleiche Erträge berechnen",
    "ÖEKB Meldefonds",
    "Verlustausgleich Österreich Aktien",
    "Trade Republic Steuererklärung Österreich",
    "Einkommensteuererklärung Kapitalvermögen",
  ],
  openGraph: {
    title: "KestKlar — KeSt berechnen für österreichische Anleger",
    description:
      "PDF hochladen, KeSt berechnen, E1kv-Kennzahlen vorbereiten. Für Interactive Brokers, Scalable Capital, DEGIRO und andere nicht-steuereinfache Broker in Österreich.",
    type: "website",
    locale: "de_AT",
    siteName: "KestKlar",
    url: "https://kestklar.at",
  },
  twitter: {
    card: "summary_large_image",
    title: "KestKlar — KeSt berechnen in 10 Minuten",
    description: "Austrian investor tax calculations for non-tax-simple brokers. Upload your broker PDF and get E1kv field values.",
  },
  alternates: {
    canonical: "https://kestklar.at",
    languages: {
      "de-AT": "https://kestklar.at",
      "en": "https://kestklar.at/en/ratgeber",
    },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <JsonLdOrganization />
        <JsonLdWebApplication />
        <JsonLdFaq />
        <LangProvider>
          <Nav />
          {children}
          <Footer />
          <Toaster position="bottom-center" richColors />
        </LangProvider>
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "984f607851734c41b2696cc7dfbd927b"}'
        />
      </body>
    </html>
  );
}
