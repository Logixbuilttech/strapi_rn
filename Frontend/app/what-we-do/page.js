import ArticalHero from "@/components/Artical/ArticalHero";
import HomeHero from "@/components/Home/HomeHero";
import EverySolutions from "@/components/WhatWeDo/EverySolutions";
import ServiceOfferings from "@/components/WhatWeDo/ServiceOfferings";
import WhatWeDoHero from "@/components/WhatWeDo/WhatWeDoHero";
import { WhatWeDo, WhoWeArePopulate } from "@/lib/populateMap";
import { fetchStrapi } from "@/lib/strapiApi";
import { whatWeDoblocksMap } from "../blocksMap";
import ServicesBlock from "@/components/Home/ServicesBlock";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export const revalidate = 3600;

export async function generateMetadata() {

  const data = await fetchStrapi("what-we-do", {
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
    title: metadata.metaTitle || "Default What We Do Title",
    description: metadata.metaDescription || "Default what we do description.",
    keywords: metadata.keywords || [],
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle || "Default What We Do Title",
      description: metadata.openGraph?.ogDescription || metadata.metaDescription || "Default what we do description.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function whatwedo() {
  const whatWeDoData = await fetchStrapi("what-we-do", {
    populate: WhatWeDo.populate,
    tag: "whatWeDo",
    revalidate,
  });

  const heroData = whatWeDoData.Hero;
  const blocks = whatWeDoData.WhatWeDo || [];
  return (
    <>
      {/* <HomeHero /> */}
      <div className="btmSpace">
        <WhatWeDoHero />
      </div>
      {blocks.map((b) => {
        switch (b.__component) {
          case "layout.explore-capabilities":
            return <ServiceOfferings key={b.id} data={b} />;
          case "layout.feature-item":
            return (
              <div key={b.id}>
                <WhyChooseUs data={b} />
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
