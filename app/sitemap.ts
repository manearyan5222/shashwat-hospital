import { MetadataRoute } from "next";
import { treatmentsData } from "@/data/treatments";
import { conditionsData } from "@/data/conditions";
import { doctorsData } from "@/data/doctors";
import { articlesData } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shashwathospital.com";
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/orthopaedics`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/treatments`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/conditions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/doctors`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/facilities`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/rehabilitation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/second-opinion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/patient-stories`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/health-library`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/appointment`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/emergency`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic treatment pages
  const treatmentRoutes: MetadataRoute.Sitemap = treatmentsData.map((t) => ({
    url: `${baseUrl}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic condition pages
  const conditionRoutes: MetadataRoute.Sitemap = conditionsData.map((c) => ({
    url: `${baseUrl}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic doctor pages
  const doctorRoutes: MetadataRoute.Sitemap = doctorsData.map((d) => ({
    url: `${baseUrl}/doctors/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic health library articles
  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((a) => ({
    url: `${baseUrl}/health-library/${a.slug}`,
    lastModified: new Date(a.updatedDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...treatmentRoutes,
    ...conditionRoutes,
    ...doctorRoutes,
    ...articleRoutes,
  ];
}
