import { fetchStrapi } from "@/lib/strapiApi";

export async function GET() {
  // Fetch all articles
  const articles = await fetchStrapi("articles", { populate: "*" });
  // Fetch all service pages
  const pages = await fetchStrapi("pages", { populate: "*" });

  // Build URLs
  const baseUrl = "https://renewedge-solutions.com"; // TODO: Replace with your real domain

  const staticUrls = [
    baseUrl + "/",
    baseUrl + "/contact",
    baseUrl + "/privacy-policy",
    baseUrl + "/what-we-do",
    baseUrl + "/who-we-are",
    baseUrl + "/think-forward",
    baseUrl + "/strategic-partnership",
    // Add more static pages as needed
  ];

  const articleUrls = (articles || [])
    .filter((a) => a.Slug)
    .map((a) => `${baseUrl}/article/${a.Slug}`);

  const serviceUrls = (pages || [])
    .filter((p) => p.Slug)
    .map((p) => `${baseUrl}/services/${p.Slug}`);

  const urls = [...staticUrls, ...articleUrls, ...serviceUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) => `<url>\n  <loc>${url}</loc>\n  <changefreq>weekly</changefreq>\n  <priority>0.7</priority>\n</url>`
    )
    .join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
} 