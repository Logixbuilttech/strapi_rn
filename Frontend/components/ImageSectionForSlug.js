"use client";
import BackgroundBlock from "./BackgroundBlock";
import Container from "./Container";
import Image from "next/image";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import React from "react";

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

const ImageSectionForSlug = ({ data }) => {
  if (!data) return null;

  const leftText = data.leftText;
  const rightTextParts = parseStrapiRichText(data.RightText);
  const images = data.ImageWithText || [];

  // Responsive width classes for images, matching the original design
  const getWidthClass = (idx, total) => {
    if (total === 5) {
      if (idx === 2) return "w-full lg:w-[calc(41.5%-6px)]";
      if (idx === 3) return "w-full lg:w-[calc(58.5%-6px)]";
      if (idx === 4) return "w-full lg:w-full";
      return "w-full lg:w-[calc(50%-6px)]";
    }
    // fallback for other counts
    return "w-full lg:w-[calc(50%-6px)]";
  };

  return (
    <>
      <BackgroundBlock variant="lightBG">
        <Container className="flex pb-12 lg:pb-[64px]">
          <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
            <p className="break-words font-semibold text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] w-1/2 text-[#16363D] uppercase tracking-[-0.02em]">
              {leftText}
            </p>
          </div>
          <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
            <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
              {renderRichText(rightTextParts)}
            </h3>
          </div>
        </Container>

        <Container>
          <ul className="grid lg:flex flex-wrap gap-3">
            {images.map((item, idx) => {
              const titleParts = parseStrapiRichText(item.Title);
   
              const img = item.Image;
              const widthClass = getWidthClass(idx, images.length);
              return (
                <li className={`${widthClass} relative`} key={item.id}>
                  <span>
                    {img && img.url && (
                      <Image
                        className="rounded-[16px] w-full h-full"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`}
                        alt={img.alternativeText || titleParts?.[0]?.text}
                        width={img.width || 500}
                        height={img.height || 500}
                      />
                    )}
                  </span>
                  <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[14px] md:text-[24px] leading-[113%] font-normal uppercase !font-Anton p-3 md:p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                    {renderRichText(titleParts)}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </BackgroundBlock>
    </>
  );
};

export default ImageSectionForSlug;
