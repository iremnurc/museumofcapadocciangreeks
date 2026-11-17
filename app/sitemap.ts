import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/collections", "/events", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" }));
}
