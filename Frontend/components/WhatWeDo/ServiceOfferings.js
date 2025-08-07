"use client";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import BackgroundBlock from "../BackgroundBlock";
import SectionBlock from "../SectionBlock";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const ServiceOfferings = ({ data }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!cardsRef.current) return;

    cardsRef.current.forEach((card, index) => {
      const next = cardsRef.current[index + 1];
      if (next) {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 20%",
              endTrigger: next,
              end: "bottom 40%",
              scrub: 1,
            },
          })
          .to(card, {
            // opacity: 0,
            scale: 0.95,
            ease: "power1.out",
            duration: 0.5,
          });
      }
    });
  }, []);
  if (!data || !Array.isArray(data.Card)) return null;
  return (
    <BackgroundBlock variant="lightBG" className="overflow-visible">
      <div className="md:border-b-[1px] md:border-[rgba(22,54,61,.15)]">
        <Container className="flex pb-[48px]">
          <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
            <p className="break-words md:whitespace-nowrap font-semibold text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] w-full md:w-1/2 text-[#16363D] uppercase tracking-[-0.02em]">
              Service Offerings
            </p>
          </div>

          <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
            <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
              Explore Our Capabilities
            </h3>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-3 md:gap-12">
          {data.Card.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className=" bg-[#EEECDE] 
              md:sticky md:top-[100px] z-10 md:will-change-transform md:transform
              md:gap-[46px] flex 
              md:border-0 md:border-t-[1px] md:border-[rgba(22,54,61,.15)] md:first:border-t-0 
              border-[1px] border-[#16363D] flex-col-reverse md:flex-row
              p-1 md:py-12 rounded-[12px] md:rounded-none
              max-[767px]:!transform"
            >
              <div className="w-full md:w-1/2">
                <div
                  className="bg-[rgba(182,225,200,0.3)] w-full md:w-[300px] lg:w-[422px] h-[274px] md:h-[272px] lg:h-[382px] border-[1px] lg:border-[2px] border-[rgba(22,54,61,.2)] flex items-center 
                justify-center rounded-[10px]"
                >
                  {service.Image && service.Image.url && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL || ""}${
                        service.Image.url
                      }`}
                      alt={
                        service.Image.alternativeText ||
                        service.Title?.[0]?.children?.[0]?.text ||
                        "Service Image"
                      }
                      width={service.Image.width || 292}
                      height={service.Image.height || 354}
                      style={{ maxHeight: "100%" }}
                      className="max-[767px]:w-auto"
                    />
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 grid gap-5 md:gap-8 text-center md:text-left py-6 md:py-0">
                <h2 className="text-[24px] md:text-[28px] lg:text-[48px] text-[#16363D] leading-[113%] md:leading-[130%] uppercase">
                  {renderRichText(parseStrapiRichText(service.Title))}
                </h2>
                {Array.isArray(service.Content) &&
                  service.Content.length > 0 &&
                  service.Content.map((contentBlock, idx) => {
                    if (
                      contentBlock.type === "list" &&
                      contentBlock.format === "unordered"
                    ) {
                      return (
                        <ul
                          className="grid gap-3 list-disc list-outside !pl-5 md:!mb-2 lg:!md:0 md:pr-0 pr-1"
                          key={idx}
                        >
                          {contentBlock.children &&
                            contentBlock.children.map((item, i) => (
                              <li
                                className="text-[#16363D] text-[14px] md:text-[18px] lg:text-[22px] font-medium font-Archivo leading-[120%] tracking-[.03em] text-left"
                                key={i}
                              >
                                {item.children &&
                                  item.children[0] &&
                                  item.children[0].text}
                              </li>
                            ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                {service.Button && service.Button.text && (
                  <div className="inline-block mx-auto md:m-0">
                    <Button
                      label={service.Button.text}
                      color="dark"
                      align="left"
                      size="sm"
                      variant="outline"
                      href={service.Button.href}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default ServiceOfferings;
