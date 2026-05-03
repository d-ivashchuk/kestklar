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
  ].map((slug) => ({
    url: `${base}/en/ratgeber/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/preise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ratgeber`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/en/ratgeber`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...ratgeberPages,
    ...enRatgeberPages,
    ...brokerPages,
  ];
}
