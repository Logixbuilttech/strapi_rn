"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const FeatureCard = ({ data }) => {
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

  if (!data || !Array.isArray(data.card)) return null;

  return (
    <div className="bg-[#EEECDE] z-10 relative pb-[96px]">
      <Container>
        <div className="relative grid gap-2 md:gap-3">
          {data.card.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="md:sticky md:top-[100px] z-[2] md:will-change-transform md:transform max-[767px]:!transform"
            >
              <div
                className="grid lg:flex border-[1px] border-[#16363D] rounded-[16px] 
              bg-[#DCEDE3] text-center overflow-hidden 
              lg:h-[500px] xl:h-[600px] lg:p-0 p-1"
              >
                <div className="w-full lg:w-1/2 bg-[#16363D] p-10 flex flex-col justify-between gap-[46px] md:gap-10 lg:gap-2 text-center rounded-[12px] lg:rounded-none ">
                  <h3 className="text-[#EEECDE] text-[24px] md:text-[28px] lg:text-[44px] xl:text-[48px] uppercase leading-[113%] text-center">
                    {renderRichText(parseStrapiRichText(card.title))}
                  </h3>
                  <p className="text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] font-medium tracking-[-0.02em] max-w-[420px] lg:max-w-fit mx-auto xl:m-0 text-[#EEECDE]">
                    {card.text}
                  </p>
                  {card.button && card.button.text && (
                    <Button
                      href={card.button.href} 
                      label={card.button.text}
                      variant="outline"
                      size="sm"
                    />
                  )}
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-0">
                  {card.Image && card.Image.url && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${card.Image.url}`}
                      alt={
                        card.Image.alternativeText ||
                        "Tech That Works Strategy That Scales Design That Connects"
                      }
                      width={card.Image.width || 400}
                      height={card.Image.height || 300}
                      className="max-[1300px]:max-h-[310px] min-[1301px]:max-h-fit w-fit"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FeatureCard;
