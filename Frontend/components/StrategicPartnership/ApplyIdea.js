"use client";

import BackgroundBlock from "../BackgroundBlock";
import Container from "@/components/Container";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

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

const ApplyIdea = ({ data }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = marqueeRef.current.scrollWidth;
      const containerWidth = marqueeRef.current.offsetWidth;

      // Infinite marquee animation
      gsap.fromTo(
        marqueeRef.current,
        { x: 0 },
        {
          x: `-${totalWidth / 2}`,
          duration: 10,
          ease: "linear",
          repeat: -1,
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // Extract the relevant fields
  const shortText = data?.TitleWithShortText?.ShortText;
  const titleParts = parseStrapiRichText(data?.TitleWithShortText?.Title);

  // Find the "project startup..." line and split it for highlighting
  const projectLineObj = data?.TitleWithShortText?.Title?.find(
    (block) =>
      block.children &&
      block.children[0] &&
      block.children[0].text &&
      block.children[0].text.includes("project startup")
  );
  const projectWords = projectLineObj?.children[0]?.text.split(" ") || [
    "project",
    "startup",
    "small business",
    "big ideas",
    "project",
    "startup",
  ];

  // Get the rest of the title lines
  const titleLines = titleParts.filter(
    (part) =>
      !(typeof part.text === "string" && part.text.includes("project startup"))
  );

  // Parse the submit pitch section
  const submitPitchParts = parseStrapiRichText(data?.SubmitPitch);

  // The last part is the highlighted one (with .span or .code)
  const lastPitch = submitPitchParts.find((part) => part.span);

  return (
    <BackgroundBlock>
      <div className="text-center pb-[30px] md:pb-10 lg:pb-12">
        <span className="text-[10px] md:text-[14px] lg:text-[18px] tracking-[.02em] text-[#EEECDE] font-semibold font-Archivo mb-3 leading-[100%] uppercase block">
          {shortText}
        </span>
        <h2 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] uppercase leading-[113%]">
          {titleLines[0]?.text || "If you have"}
        </h2>
        {/* <div
          className="flex gap-4 [&>span]:bg-[#E9F5AC] [&>span]:text-[#16363D] [&>span]:leading-[100%] justify-center
        [&>span]:p-1 [&>span]:rounded-[3px] [&>span]:uppercase [&>span]:inline-block [&>span]:align-top [&>span]:font-Anton whitespace-nowrap
        [&>span]:text-[30px] [&>span]:md:text-[44px] [&>span]:lg:text-[56px] [&>span]:xl:text-[66px]"
        >
          {projectWords.map((word, idx) => (
            <span key={idx}>{word}</span>
          ))}
        </div> */}
        <div className="overflow-hidden w-full">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap gap-3"
            style={{ willChange: "transform" }}
          >
            {/* Repeat content twice for infinite loop illusion */}
            {[...projectWords, ...projectWords].map((word, idx) => (
              <div key={idx} className="item">
                <span className="bg-[#E9F5AC] text-[#16363D] leading-[100%] p-1 rounded-[3px] uppercase inline-block align-top font-Anton whitespace-nowrap text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px]">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] uppercase leading-[113%]">
          {titleLines.slice(1).map((part, idx) => (
            <React.Fragment key={idx}>
              {part.text}
              {/* {part.br && <br />} */}
            </React.Fragment>
          ))}
        </h2>
      </div>
      <div className="pt-12 flex flex-col items-center gap-4 border-t-[1px] border-[rgba(238,236,222,.15)] text-center px-2">
        {submitPitchParts
          .filter((part) => !part.span)
          .map((part, idx) => (
            <p
              key={idx}
              className="text-[14px] md:text-[18px] lg:text-[22px] font-medium text-[#EEECDE] -tracking-[.02em] leading-[17px] md:leading-[22px] lg:leading-[26px]"
            >
              {part.text}
            </p>
          ))}
        {lastPitch && (
          <p className="bg-[#E9F5AC] rounded-[4px] p-0.5 text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] text-[#16363D] font-Archivo tracking-[.02em] font-medium inline-block align-top">
            {lastPitch.text}
          </p>
        )}
      </div>
    </BackgroundBlock>
  );
};

export default ApplyIdea;
