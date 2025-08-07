import HeroText from "../HeroText";
import React from "react";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";

const StrategicPartnershipHero = ({ data }) => {
  const smallTextData = data.smallText;
  const heroParts = parseStrapiRichText(data.text);

  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}

      <div className="relative z-10 pb-10 md:pb-12 lg:pb-[68px]">
        {/* <p className="font-medium leading-[120%] tracking-[-0.02em] text-[14px] md:text-[18px] lg:text-[22px] text-[#EEECDE]">
          {smallTextData}
        </p> */}

        <HeroText
          heading5={smallTextData}
          heroParts={heroParts}
          className="pb-66 md:pb-76 lg:pb-[109px]"
          parentText={smallTextData}
        />
      </div>
    </section>
  );
};

export default StrategicPartnershipHero;
