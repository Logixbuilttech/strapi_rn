"use client";
import { useState } from "react";
import BackgroundBlock from "../BackgroundBlock";
import Container from "@/components/Container";
import SectionBlock from "../SectionBlock";
import { ChevronDown, X } from "lucide-react";
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

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <BackgroundBlock variant="lightBG">
      <Container>
        <div className="flex pb-12 lg:pb-[64px]">
          <span className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2 break-all  text-[#16363D] text-[10px] md:text-[14px] lg:text-[18px] tracking-[.02em] leading-[100%] font-semibold !font-Archivo uppercase">
            {data?.LeftText}
          </span>
          <h2 className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2 text-[#16363D] text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] uppercase leading-[113%]">
            {data?.rightText}
          </h2>
        </div>
        <div className="space-y-3">
          {data?.FAQ?.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-[#16363D] rounded-[16px] p-4 md:p-6"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left transition-colors duration-300 rounded cursor-pointer border-0 outline-0`}
              >
                <div className="w-1/2 hidden lg:block">
                  <span
                    className=" bg-[rgba(238,236,222,0.04)] w-[42px] h-[42px] rounded-full flex items-center justify-center
                font-Archivo font-medium text-[22px] -tracking-[.02em] text-[#EEECDE]"
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="w-full lg:w-1/2 flex justify-between items-center gap-1">
                  <span className="text-[#EEECDE] font-normal font-Anton text-[24px] md:text-[28px] leading-[113%] uppercase">
                    {faq.Question}
                  </span>
                  <span
                    className={` border-[2px] min-w-[42px] min-h-[42px]  w-[42px] h-[42px] rounded-full flex 
                  justify-center items-center text-[#EEECDE]
                  ${
                    activeIndex === index
                      ? "border-[#E9F5AC] bg-[#E9F5AC]"
                      : "border-[rgba(238,236,222,0.2)] bg-[#16363D]"
                  }`}
                  >
                    {activeIndex === index ? (
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.4853 1.22185L2.22183 17.4853M17.7782 17.4853L1.51472 1.22185"
                          stroke="#16363D"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 1.5V24.5M24.5 13.5H1.5"
                          stroke="#EEECDE"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-fit opacity-100 pt-4"
                    : "max-h-0 opacity-0 pt-0"
                } `}
              >
                <div className="w-full lg:w-1/2 ml-auto text-[#EEECDE] font-Archivo font-medium text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] -tracking-[.03em]">
                  {renderRichText(parseStrapiRichText(faq.Answer))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default FAQ;
