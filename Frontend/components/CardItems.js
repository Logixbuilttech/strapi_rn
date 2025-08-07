"use client";

import React from "react";
import BackgroundBlock from "./BackgroundBlock";
import Container from "./Container";
import Button from "./Button";
import Image from "next/image";
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

const CardItems = ({ data }) => {
  if (!data) return null;

  const smallTitle = data.smallTitle;
  const titleParts = parseStrapiRichText(data.Title);
  const button =
    Array.isArray(data.Button) && data.Button.length > 0
      ? data.Button[0]
      : null;
  const titleWithContent = data.TitleWithContent || [];

  return (
    <>
      <BackgroundBlock>
        <Container className="text-left">
          <div className="grid gap-4 mb-12 lg:mb-[64px] text-center">
            <p className="uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]">
              {smallTitle}
            </p>
            <h2 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
              {renderRichText(titleParts)}
            </h2>
          </div>
          <div className="mb-10 lg:mb-13 grid gap-3">
            {titleWithContent.map((item) => (
              <div
                className="bg-[rgba(255,255,255,0.07)] rounded-[16px] p-4 md:p-6 lg:p-10 grid lg:flex group hover:bg-[#E9F5AC] 
                    transition delay-150 duration-300 ease-in-out gap-4 lg:gap-0"
                key={item.id}
              >
                <div className="w-full lg:w-1/2">
                  <h2 className="text-[#EEECDE] text-[24px] md:text-[28px] lg:text-[48px] leading-[113%] uppercase group-hover:text-[#16363D] transition delay-150 duration-300 ease-in-out [&>br]:hidden lg:[&>br]:block">
                    {renderRichText(parseStrapiRichText(item.Title))}
                  </h2>
                </div>
                <div className="w-full lg:w-1/2">
                  {Array.isArray(item.Content) &&
                    item.Content.map((contentBlock, idx) => {
                      if (
                        contentBlock.type === "list" &&
                        contentBlock.format === "unordered"
                      ) {
                        return (
                          <ul
                            className="grid gap-2 lg:gap-3 [&>li]:transition [&>li]:delay-150 [&>li]:duration-300 
                            [&>li]:ease-in-out [&>li]:pl-[14px] md:[&>li]:pl-5 [&>li]:text-[#EEECDE] [&>li]:text-[14px] md:[&>li]:text-[18px] 
                            lg:[&>li]:text-[22px] [&>li]:leading-[120%] [&>li]:-tracking-[.03em] [&>li]:font-Archivo 
                            [&>li]:font-medium [&>li]:relative [&>li:before]:content-[''] [&>li:before]:w-[6px] [&>li:before]:h-[6px] md:[&>li:before]:w-[8px] md:[&>li:before]:h-[8px] 
                            [&>li:before]:rounded-full [&>li:before]:absolute [&>li:before]:top-1 md:[&>li:before]:top-1.5 lg:[&>li:before]:top-2 [&>li:before]:left-0 
                            [&>li:before]:bg-[#E9F5AC] [&>li:before]:transition [&>li:before]:delay-150 [&>li:before]:duration-300 
                            [&>li:before]:ease-in-out [&>li]:group-hover:text-[#16363D] group-hover:[&>li:before]:bg-[#16363D]"
                            key={idx}
                          >
                            {contentBlock.children &&
                              contentBlock.children.map((listItem, i) => (
                                <li key={i}>
                                  {listItem.children &&
                                    listItem.children[0] &&
                                    listItem.children[0].text}
                                </li>
                              ))}
                          </ul>
                        );
                      }
                      return null;
                    })}
                </div>
              </div>
            ))}
          </div>
          {button && <Button label={button.text} href={button.href} />}
        </Container>
      </BackgroundBlock>
    </>
  );
};

export default CardItems;
