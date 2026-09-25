import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://baggystreet.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
