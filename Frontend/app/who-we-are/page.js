// import OurGoals from "@/components/WhoWeAre/OurGoals";
// import OurValues from "@/components/WhoWeAre/OurValues";
// import WhoWeAreHero from "@/components/WhoWeAre/WhoWeAreHero";

// const WhoWeAre = () => {
//   return (
//     <>
// <WhoWeAreHero />
// <OurValues />
//       <OurGoals />
//     </>
//   );
// };

// export default WhoWeAre;

import { fetchStrapi } from "@/lib/strapiApi.js";
import { whoWeAreblocksMap } from "../blocksMap.js";
import { WhoWeArePopulate } from "@/lib/populateMap.js";
import WhoWeAreHero from "@/components/WhoWeAre/CardWithLogo.js";
import OurValues from "@/components/WhoWeAre/OurValues";
import CardWithLogo from "@/components/WhoWeAre/CardWithLogo.js";
export const revalidate = 3600;


export async function generateMetadata() {

  const data = await fetchStrapi("who-we-are", {
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
    title: metadata.metaTitle || "Default Who We Are Title",
    description: metadata.metaDescription || "Default who we are description.",
    keywords: metadata.keywords || [],
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle || "Default Who We Are Title",
      description: metadata.openGraph?.ogDescription || metadata.metaDescription || "Default who we are description.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function WhoWeAre() {
  const whoWeAreData = await fetchStrapi("who-we-are", {
    populate: WhoWeArePopulate.populate,
    tag: "whoWeAre",
    revalidate,
  });

  const blocks = whoWeAreData.WhoWeAre || [];
  const cardWithLogoBlock = blocks.find(
    (b) => b.__component === "layout.card-with-logo"
  );
  return (
    <>
      {blocks.map((b) => {
        const Comp = whoWeAreblocksMap[b.__component];
        const uniqueKey = `${b.__component}-${b.id}`;

        if (b.__component === "layout.hero" && Comp) {
          return (
            <div key={uniqueKey} className="who-we-are-hero-wrapper">
              <Comp data={b} CardWithLogoData={cardWithLogoBlock} />
              {/* {cardWithLogoBlock && (
                <div className="inside-hero-wrapper">
                  <CardWithLogo data={cardWithLogoBlock} />
                </div>
              )} */}
            </div>
          );
        }

        return Comp ? <Comp key={uniqueKey} data={b} /> : null;
      })}
    </>
  );
}
