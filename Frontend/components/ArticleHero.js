import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import HeroText from "./HeroText";
import React from "react";

const ArticleHero = ({ data }) => {
  if (!data) return null;

  const heroParts = parseStrapiRichText(data);
  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}
      <div className="relative z-10">
        <h2
          className="uppercase text-[38px] md:text-[56px] lg:text-[70px] xl:text-[94px] leading-[108%] text-center pt-[112px] 
        md:pt-[152px] lg:pt-[208px] pb-[30px] md:pb-10 lg:pb-12 text-[#EEECDE]"
        >
          {heroParts.map((part, index) => {
            if (part.br) {
              return <br key={index} />;
            } else if (part.span) {
              return (
                <span className="highlight" key={index}>
                  {part.text}
                </span>
              );
            } else {
              return <React.Fragment key={index}>{part.text}</React.Fragment>;
            }
          })}
        </h2>
      </div>
    </section>
  );
};

export default ArticleHero;
