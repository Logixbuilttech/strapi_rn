import React from "react";
import BackgroundBlock from "../BackgroundBlock";
import Container from "@/components/Container";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";

function renderRichText(parts) {
  if (!Array.isArray(parts)) {
    if (typeof parts === "string") return parts;
    return null;
  }
  return parts.map((part, idx) => {
    if (part.br) return <br key={idx} />;
    if (part.span)
      return (
        <span className="highlight" key={idx}>
          {part.text}
        </span>
      );
    return <React.Fragment key={idx}>{part.text}</React.Fragment>;
  });
}

const HowWePartner = ({ data }) => {
  if (!data) return null;

  return (
    <BackgroundBlock>
      <Container>
        <div className="text-center grid gap-3 md:gap-4">
          <span className="text-[10px] md:text-[14px] lg:text-[18px] font-semibold text-[#EEECDE] tracking-[.02em] leading-[100%] uppercase !font-Archivo">
            {data.ShortText}
          </span>
          <h2 className="font-Anton text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] font-normal leading-[113%] uppercase text-[#EEECDE]">
            {renderRichText(parseStrapiRichText(data.Title))}
          </h2>
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default HowWePartner;
