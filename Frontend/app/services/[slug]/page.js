import ArticleHero from "@/components/ArticleHero";
import CardItems from "@/components/CardItems";
import ServicesBlock from "@/components/Home/ServicesBlock";
import ImageSectionForSlug from "@/components/ImageSectionForSlug";
import VerticaleSlider from "@/components/VerticaleSlider";
import { fetchStrapi } from "@/lib/strapiApi";
import qs from "qs";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const pagesData = await fetchStrapi("pages", {
    populate: {
      SEO: { populate: "*" },
    },
  });

  const matchingPage = pagesData.find((Page) => Page.Slug === slug);

  if (!matchingPage) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }

  const metadata = Array.isArray(matchingPage.SEO)
    ? matchingPage.SEO[0] || {}
    : matchingPage.SEO || {};

  return {
    title:
      metadata.metaTitle ||
      matchingPage.Title?.map((t) => t.text).join(" ") ||
      "Untitled Page",
    description: metadata.metaDescription || "No description available.",
    keywords: metadata.keywords || [],
    openGraph: {
      title:
        metadata.openGraph?.ogTitle || metadata.metaTitle || "Untitled Page",
      description:
        metadata.openGraph?.ogDescription ||
        metadata.metaDescription ||
        "No description available.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const queryString = qs.stringify(
    {
      filters: { Slug: { $eq: slug } },
      populate: "*",
    },
    { encode: false }
  );

  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pages?${queryString}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    next: { tags: ["pages-slug"], revalidate: 60 },
  });

  if (!res.ok) {
    return <div>Error loading article</div>;
  }

  const { data } = await res.json();
  const pageData = data && data[0] && data[0];
  const blocks = pageData?.SlugPageComponent || [];
  //   if (!article) return <div>Article not found</div>;

  return (
    <>
      <div className="[&>section>div>h2]:!pb-[84px] md:[&>section>div>h2]:!pb-[92px] lg:[&>section>div>h2]:!pb-[102px] xl:[&>section>div>h2]:!pb-[116px]">
        <ArticleHero data={pageData.Title} />
      </div>
      {blocks.map((b) => {
        switch (b.__component) {
          case "layout.content-block":
            return (
              <div
                key={b.id}
                className={`bg-[#EEECDE] rounded-[16px_16px_0_0] pt-[64px] md:pt-[72px] lg:pt-[82px] xl:pt-[96px] relative z-10 -mt-5 overflow-hidden ${
                  b.Background && "darkBG"
                }`}
              >
                <ServicesBlock key={b.id} data={b} />
              </div>
            );
          case "layout.verticale-slider":
            return <VerticaleSlider key={b.id} data={b} />;
          case "layout.image-section":
            return <ImageSectionForSlug key={b.id} data={b} />;
          case "layout.items-card-slug-page":
            return <CardItems key={b.id} data={b} />;
          default:
            return null;
        }
      })}
    </>
  );
}
