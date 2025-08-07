import HomeHero from "@/components/Home/HomeHero";
import GalleryGrid from "@/components/ThinkForward/GalleryGrid";
import ThinkForwardHero from "@/components/ThinkForward/ThinkForwardHero";
import { ArticlePopulate, ThinkPopulate } from "@/lib/populateMap";
import { fetchStrapi } from "@/lib/strapiApi";

export const revalidate = 3600;

export async function generateMetadata() {

  const data = await fetchStrapi("think-forward", {
    populate: {
      SEO: {
        populate: '*'
      }
    }
  });
  if (!data) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }
  const metadata = data.SEO

  return {
    title: metadata.metaTitle || "Default Think Forward Title",
    description: metadata.metaDescription || "Default think forward description.",
    keywords: metadata.keywords || [],
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle || "Default Think Forward Title",
      description: metadata.openGraph?.ogDescription || metadata.metaDescription || "Default think forward description.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function ThinkForward() {
  const articleData = await fetchStrapi("articles", {
    populate: ArticlePopulate.populate,
    tag: "articles",
    revalidate,
  });
  const articleCategoryData = await fetchStrapi("gallery-categories", {
    populate: ArticlePopulate.populate,
    tag: "galleryCategory",
    revalidate,
  });
    const thinkForwardData = await fetchStrapi("think-forward", {
    populate: ThinkPopulate,
    tag: "think-forward",
    revalidate,
  });

  return (
    <>
      <HomeHero data={thinkForwardData.ThinkForward[0]} />
      <GalleryGrid articleData={articleData} articleCategoryData={articleCategoryData} />
    </>
  );
};

