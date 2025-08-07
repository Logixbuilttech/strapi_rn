import React from "react";
import Image from "next/image";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import solutions01 from "@/public/images/Solutions.svg";

const solution = [
  {
    id: 1,
    title: "Strategic",
    img: solutions01,
    text: (
      <>
        Aligned with your <br />
        goals, challenges, and <br />
        future ambitions
      </>
    ),
  },
  {
    id: 2,
    title: "Sustainable",
    img: solutions01,
    text: (
      <>
        Designed for <br />
        long - term performance <br />
        and evolution
      </>
    ),
  },
  {
    id: 3,
    title: "Simple",
    img: solutions01,
    text: (
      <>
        Easy to <br />
        understand, integrate, <br />
        and manage
      </>
    ),
  },
  {
    id: 4,
    title: "Impactful",
    img: solutions01,
    text: (
      <>
        {" "}
        Focused on real results, <br />
        not just technology for technology’s sake
      </>
    ),
  },
];

const EverySolutions = ({ data }) => {
  return (
    <BackgroundBlock>
      <Container>
        <div className="grid gap-4 justify-center text-center pb-12 lg:pb-[64px]">
          <p className="text-[#EEECDE] text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] tracking-[-0.02em] uppercase font-semibold">
            Why Choose Us
          </p>
          <h3 className="text-[30px] md:text-[44px] lg:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
            Every solution we deliver <br /> is built to be:
          </h3>
        </div>
      </Container>

      <div className="flex gap-3 overflow-auto px-6 m-auto max-w-[1360px] w-full">
        {solution.map(({ id, title, img, text }) => (
          <div
            key={id}
            className="bg-[rgba(255,255,255,.07)] rounded-[16px] p-6 flex flex-col gap-2 justify-between text-center items-center
        h-[342px] lg:h-[382px] w-[300px] md:w-[334px] lg:w-[319px] min-w-[300px] md:min-w-[334px] lg:min-w-[319px]"
          >
            <h4 className="uppercase text-white text-[24px] md:text-[28px] leading-[113%]">
              {title}
            </h4>

            <span className="min-w-[64px] min-h-[64px] rounded-[8px] flex items-center justify-center m-auto bg-[rgba(255,255,255,.1)] p-2.5">
              <Image src={img} alt={title} width={40} height={40} />
            </span>

            <p className="text-[#EEECDE] text-[18px] lg:text-[22px] font-medium leading-[120%] tracking-[-0.03em]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </BackgroundBlock>
  );
};

export default EverySolutions;
