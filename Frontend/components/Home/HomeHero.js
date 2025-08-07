import HeroText from "../HeroText";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import CardWithLogo from "../WhoWeAre/CardWithLogo";

const HomeHero = ({ data, CardWithLogoData }) => {
  if (!data) return null;

  const heroParts = parseStrapiRichText(data.text);
  const smallText = data.smallText;
  const buttonText = data.Button?.text || "Learn about us";
  const buttonHref = data.Button?.href || "#";

  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}
      <div className="relative z-10">
        <HeroText
          heroParts={heroParts}
          smallText={smallText}
          showButton={!!data.Button}
          buttonText={buttonText}
          buttonHref={buttonHref}
          className="pb-[84px] md:pb-[92px] lg:pb-[116px]"
        />
      </div>
      {CardWithLogoData && <CardWithLogo data={CardWithLogoData} />}
    </section>
  );
};

export default HomeHero;
