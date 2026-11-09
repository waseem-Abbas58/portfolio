import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { caseStudies } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: p.featured ? 0.8 : 0.5 })),
  ];
}
