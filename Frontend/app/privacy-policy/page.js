import { fetchStrapi } from "@/lib/strapiApi.js";
import { PrivacyPolicyPopulate } from "@/lib/populateMap.js";
import HomeHero from "@/components/Home/HomeHero.js";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import SectionBlock from "@/components/SectionBlock";

export const revalidate = 3600;

export async function generateMetadata() {

  const data = await fetchStrapi("privacy-policy", {
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
    title: metadata.metaTitle || "Default Privacy Policy Title",
    description: metadata.metaDescription || "Default privacy policy description.",
    keywords: metadata.keywords || [],
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle || "Default Privacy Policy Title",
      description: metadata.openGraph?.ogDescription || metadata.metaDescription || "Default privacy policy description.",
      url: metadata.openGraph?.ogUrl || `/`,
      type: metadata.openGraph?.ogType || "website",
    },
  };
}

export default async function PrivacyPolicy() {
  const PrivacyPolicyData = await fetchStrapi("privacy-policy", {
    populate: PrivacyPolicyPopulate.populate,
    tag: "privacy-policy",
    revalidate,
  });

  // Helper to parse Strapi rich text to a single string (for title)
  function parseRichTextToString(richText) {
    return richText
      .map((block) =>
        block.children ? block.children.map((child) => child.text).join("") : ""
      )
      .join(" ")
      .trim();
  }

  // Helper to parse Strapi rich text to array of paragraphs (for DescriptionText)
  function parseRichTextToParagraphs(richText) {
    return richText
      .map((block) =>
        block.children ? block.children.map((child) => child.text).join("") : ""
      )
      .filter((text) => text.trim() !== "");
  }

  const blocks = PrivacyPolicyData.PrivacyPolicy || [];

  return (
    <>
      {blocks.map((b, index) => {
        switch (b.__component) {
          case "layout.hero":
            return <HomeHero key={b.id} data={b} />;
          case "layout.privacy-policy":
            return (
              <BackgroundBlock variant="lightBG" key={b.id} className="!pb-5">
                <Container>
                  {b.PrivacyPolicy &&
                    b.PrivacyPolicy.map((policy, idx) => (
                      <SectionBlock
                        key={policy.id}
                        badgeNumber={idx + 1}
                        heading={parseRichTextToString(policy.Title)}
                        DescriptionText={parseRichTextToParagraphs(policy.Info)}
                        widthFull={true}
                      />
                    ))}
                </Container>
              </BackgroundBlock>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
