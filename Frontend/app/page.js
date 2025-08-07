import { fetchStrapi } from "@/lib/strapiApi.js";
import { homePopulate } from "@/lib/populateMap.js";
import HomeClient from "@/components/HomeClient";


export const revalidate = 3600;

export async function generateMetadata() {
  const data = await fetchStrapi("home", {
    populate: {
      SEO: {
        populate: "*",
      },
    },
  });

  if (!data) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }
  const metadata = data.SEO;

  return {
    title: metadata.metaTitle || "Default Home Title",
    description: metadata.metaDescription || "Default home description.",
    keywords: metadata.keywords  || [],
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle || "Default Home Title",
      description:
        metadata.openGraph?.ogDescription || metadata.metaDescription || "Default home description.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function Home() {
  const homeData = await fetchStrapi("home", {
    populate: homePopulate.populate,
    tag: "home",
    revalidate,
  });

  const blocks = homeData.Home || [];

 return <HomeClient blocks={blocks} />;
}
