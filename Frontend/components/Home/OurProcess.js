"use client";

import React, { useState, useRef } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

const OurProcess = ({ data }) => {
  const [activeStep, setActiveStep] = useState(0);
  const container = useRef();

  useGSAP((ctx) => {
    const steps = container.current?.querySelectorAll(".OurProcessBox") || [];

    steps.forEach((stepEl, idx) => {
      ScrollTrigger.create({
        trigger: stepEl,
        start: "top 30%",
        end: "bottom 30%",
        // markers: true, // disable in production
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });

      const next = steps[idx + 1];
      if (next) {
        // Use gsap.timeline() instead of context.timeline()
        gsap.timeline({
          scrollTrigger: {
            trigger: stepEl,
            start: "top -70%",
            endTrigger: next,
            end: "top -40%",
            scrub: 1,
          },
        }).to(stepEl, {
          opacity: 0,
          ease: "power1.out",
        });
      }
    });
  }, { scope: container, dependencies: [data], revertOnUpdate: true });

  if (!data?.Step || !Array.isArray(data.Step)) return null;

  return (
     <section ref={container} className="pb-[84px] sm:pb-[92px] lg:pb-[102px] xl:pb-[116px] bg-[#EEECDE]">
      <Container className="relative">
        {/* Fixed position number indicator */}

        <div className="relative grid OurProcess md:pl-[173px] lg:pl-[110px]">
          {data.Step.map((item, index) => (
            <div
              key={item.id}
             
              className="OurProcessBox relative md:sticky md:top-[150px] md:will-change-transform md:transform
              bg-[#EEECDE] w-full py-[30px] md:py-10 lg:flex items-center gap-4 md:gap-6 lg:gap-0
                border-t-[1px] border-[#D3D8D9] 
                last:border-b-[1px] last:border-[#D3D8D9]
                max-[767px]:pl-[90px]"
            >
              <div
                className="md:hidden flex justify-center items-center font-Archivo font-medium text-[#EEECDE]
              bg-[#16363D] size-[24px]  rounded-full text-[12px] absolute left-0 top-[31px] z-30"
              >
                {index + 1}
              </div>
              <div className="w-full lg:w-[calc(50%-55px)] mb-4 md:mb-6 lg:mb-0 relative">
                <h3 className="text-[#16363D] text-[24px] md:text-[28px] lg:text-[48px] leading-[113%] lg:leading-[100%] uppercase w-full">
                  {renderRichText(parseStrapiRichText(item.LeftText))}
                </h3>
                <div
                  className="counterBox absolute top-0 z-50 -left-[90px] md:-left-[173px] lg:-left-[110px]
                  bg-[#16363D] size-[42px] rounded-full justify-center items-center flex
                   md:text-[18px] lg:text-[20px] font-Archivo font-medium text-[#EEECDE] transition-all 
                    duration-300"
                >
                  {activeStep + 1}
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-[#16363D] text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] lg:leading-[27px] font-medium tracking-[-0.02em]">
                  {renderRichText(parseStrapiRichText(item.RightText))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:pl-[174px] lg:pl-[110px] pt-9 md:pt-12 lg:pt-[52px] grid lg:flex gap-[30px] md:gap-10 lg:gap-0">
          <div className="w-full lg:w-[calc(50%-55px)]">
            <p className="text-[14px] md:text-[18px] lg:text-[22px] font-medium tracking-[.02em] leading-[120%] text-[#16363D]">
              {data.text}
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            {data.Button && data.Button.text && (
              <Button
                label={data.Button.text}
                color="dark"
                align="left"
                href={data.Button.href}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurProcess;
