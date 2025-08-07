"use client"
import React, { useEffect } from "react";
import Container from "@/components/Container";
import BackgroundBlock from "@/components/BackgroundBlock";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const OurGoals = ({ data }) => {

  useEffect(() => {
    if (!data.Goals || data.Goals.length === 0) return;

    const containers = gsap.utils.toArray(".goal-container");
    
    containers.forEach((container) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: ``,
          scrub: true,
          pin: true,
          pinSpacing: false,
          // markers: true, // Enable for debugging
        }
      });

      tl.to(container, { autoAlpha: 1 })
        .to(container, { autoAlpha: 0 }, 0.5);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [data.Goals]);

  const content = [{id: 270, ShortText: data.Title?.ShortText , Title:data.Title?.Title},...data.Goals]

  //   useEffect(() => {
  //   if (!data.Goals || data.Goals.length === 0) return;

  //   const containers = gsap.utils.toArray(".goal-container");
    
  //   containers.forEach((container) => {
  //     let tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: container,
  //         start: "top top",
  //         end: "",
  //         scrub: true,
  //         pin: true,
  //         pinSpacing: false,
  //       }
  //     });

  //     tl.to(container, { autoAlpha: 1 })
  //       .to(container, { autoAlpha: 0 }, 0.7);
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //   };
  // }, [data.Goals]);

  return (
    <BackgroundBlock>
      {/* <div className="grid gap-4 text-center px-5 pb-[48px] border-b-[1px] border-[rgba(238,236,222,.15)]">
        <p className="uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]">
          {data.Title?.ShortText ||
            "Our goals reflect our ambition to drive real change:"}
        </p>
        <h2 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
          {renderRichText(parseStrapiRichText(data.Title?.Title))}
        </h2>
      </div> */}
      
      <Container>
        <div className="grid gap-12 md:gap-[72px] lg:gap-[96px] text-center pt-[64px] md:pt-[72px] lg:pt-[96px]">
          {Array.isArray(data.Goals) &&
            content.map((goal,index) => (
              <div 
                key={goal.id}
                className={`goal-container opacity-0 invisible h-screen flex flex-col justify-center items-center text-center`}
              >
                <div className="grid gap-4">
                  <small className={` ${index === 0 ? 'uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]':`text-[rgba(238,236,222,.3)] text-[10px] md:text-[18px] tracking-[.02em] font-semibold leading-[100%] uppercase`}`}>
                    {goal.ShortText}
                  </small>
                  <h4 className={`${index === 0 ? 'text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase' : 'text-[30px] md:text-[44px] lg:text-[48px] uppercase leading-[113%] font-Anton text-[#EEECDE]'}`}>
                    {renderRichText(parseStrapiRichText(goal.Title))}
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default OurGoals;
