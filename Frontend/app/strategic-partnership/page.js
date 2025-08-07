import HomeHero from "@/components/Home/HomeHero";
import ServicesBlock from "@/components/Home/ServicesBlock";
import ApplicationForm from "@/components/StrategicPartnership/ApplicationForm";
import ApplyIdea from "@/components/StrategicPartnership/ApplyIdea";
import FAQ from "@/components/StrategicPartnership/FAQ";
import HowWePartner from "@/components/StrategicPartnership/HowWePartner";
import Intro from "@/components/StrategicPartnership/Intro";
import OurPartner from "@/components/StrategicPartnership/OurPartner";
import StrategicPartnershipHero from "@/components/StrategicPartnership/StrategicPartnershipHero";
import { ArticlePopulate, StrategicPopulate } from "@/lib/populateMap";
import { fetchStrapi } from "@/lib/strapiApi";

export const revalidate = 3600;

export async function generateMetadata() {
  const data = await fetchStrapi("strategic-partnership", {
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
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.openGraph?.ogTitle || metadata.metaTitle,
      description:
        metadata.openGraph?.ogDescription || metadata.metaDescription,
      url: metadata.openGraph?.ogUrl,
      type: metadata.openGraph?.ogType,
    },
  };
}

export default async function StrategicPartnership() {
  const supportNeededTabs = await fetchStrapi("support-needed-tabs", {
    populate: StrategicPopulate.populate,
    tag: "support-needed-tab",
    revalidate,
  });

  const strategicPartnershipData = await fetchStrapi("strategic-partnership", {
    populate: StrategicPopulate.populate,
    tag: "strategic-partnership",
    revalidate,
  });

  // const strategicPartnershipForm = await fetchStrapi("partnership-applications", {
  //   populate: StrategicPopulate.populate,
  //   tag: "partnership-application",
  //   revalidate,
  // });

  const industryFocus = await fetchStrapi("industry-focus-tabs", {
    populate: StrategicPopulate.populate,
    tag: "industry-focus-tab",
    revalidate,
  });

  const blocks = strategicPartnershipData.StrategicPartnership || [];

  return (
    <>
      {/* <StrategicPartnershipHero />
      <Intro />
      <HowWePartner />
      <OurPartner />
      <ApplyIdea />
      <FAQ />
      <ApplicationForm industryFocusTabs={industryFocus} supportNeededTabs={supportNeededTabs} /> */}
      {blocks.map((b) => {
        switch (b.__component) {
          case "layout.hero":
            return <StrategicPartnershipHero key={b.id} data={b} />;
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
          case "layout.titlewith-short-text":
            return <HowWePartner key={b.id} data={b} />;
          case "layout.our-partnership":
            return <OurPartner key={b.id} data={b} />;
          case "layout.apply-idea":
            return <ApplyIdea key={b.id} data={b} />;
          case "layout.partnership-faq":
            return <FAQ key={b.id} data={b} />;
          default:
            return null;
        }
      })}
      <ApplicationForm
        industryFocusTabs={industryFocus}
        supportNeededTabs={supportNeededTabs}
      />
    </>
  );
}
