import React from "react";
import Image from "next/image";
import Container from "@/components/Container";
import BackgroundBlock from "@/components/BackgroundBlock";
import CenterTitle from "../CenterTitle";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";

// Helper for rich text rendering
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

const OurValues = ({ data }) => {
  if (!data) return null;

  return (
    <BackgroundBlock variant="lightBG">
      <Container>
        <CenterTitle
          SmallTitle={data.SubTitile || "Our Values"}
          Title={data.Title || "The Principles That Drive Us"}
        />
        <div className="flex flex-wrap gap-3">
          {Array.isArray(data.Card) &&
            data.Card.map((item, index) => (
              <div
                key={item.id}
                className={`${
                  index === 2 ? "w-full" : "w-full lg:w-[calc(50%-6px)]"
                }`}
              >
                <div className="bg-[#16363D] rounded-[16px] p-6 flex flex-col justify-between gap-[46px] md:gap-2 h-auto md:h-[342px] lg:h-[388px] text-center ">
                  <h3 className="text-[24px] md:text-[28px] text-[#EEECDE] leading-[113%] uppercase">
                    {renderRichText(parseStrapiRichText(item.Title))}
                  </h3>
                  <span className="w-[64px] h-[64px] bg-[rgba(255,255,255,.1)] rounded-[8px] flex items-center justify-center m-auto">
                    {item.Image && item.Image.url && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.Image.url}`}
                        alt={item.Image.alternativeText || item.Description}
                        width={item.Image.width || 64}
                        height={item.Image.height || 64}
                      />
                    )}
                  </span>
                  <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium leading-[120%] tracking-[.03em] max-w-[500px] mx-auto text-[#EEECDE]">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default OurValues;
