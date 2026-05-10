import type { MetadataRoute } from "next";
import { brokers } from "@/lib/brokers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kestklar.at";

  const brokerPages = brokers
    .filter((b) => b.status === "supported")
    .map((b) => ({
      url: `${base}/broker/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const ratgeberPages = [
    "e1kv-ausfuellen",
    "ausschuettungsgleiche-ertraege",
    "kest-berechnen",
    "interactive-brokers-steuer-oesterreich",
    "degiro-steuer-oesterreich",
    "scalable-capital-steuer-oesterreich",
    "verlustausgleich-oesterreich",
    "etf-meldefonds-pruefen",
  ].map((slug) => ({
    url: `${base}/ratgeber/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const enRatgeberPages = [
    "e1kv-guide",
    "deemed-distributions",
    "how-to-calculate-kest",
    "interactive-brokers-austria-tax",
    "degiro-austria-tax",
    "scalable-capital-austria-tax",
    "austrian-loss-netting",
    "etf-reporting-funds-check",
  ].map((slug) => ({
    url: `${base}/en/ratgeber/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const toolsPages = [
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/tools/kest-rechner`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/tools/meldefonds-vergleich`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/en/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/en/tools/kest-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/en/tools/meldefonds-comparison`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/preise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ratgeber`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/ratgeber`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...toolsPages,
    ...ratgeberPages,
    ...enRatgeberPages,
    ...brokerPages,
  ];
}
