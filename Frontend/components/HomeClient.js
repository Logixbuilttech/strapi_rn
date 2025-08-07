"use client";

import React, { useState, useCallback } from "react";
import HomeHero from "@/components/Home/HomeHero";
import ServicesBlock from "@/components/Home/ServicesBlock";
import FeatureCard from "@/components/Home/FeatureCard";
import OurProcess from "@/components/Home/OurProcess";
import WhatWeDo from "@/components/Home/WhatWeDo";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import VisibilityWrapper from "./VisibilityWrapper";

export default function HomeClient({ blocks }) {
  const [updateKey, setUpdateKey] = useState(0);
  const handleVisible = useCallback(() => {
    setUpdateKey((k) => k + 1);
  }, []);

  return (
    <>
      {blocks.map((b) => {
        switch (b.__component) {
          case "layout.hero":
            return <HomeHero key={b.id} data={b} />;

          case "layout.content-block":
            return (
              <div key={b.id} className={`bg-[#EEECDE] rounded-[16px_16px_0_0] pt-[64px] md:pt-[72px] lg:pt-[82px] xl:pt-[96px] relative z-10 -mt-5 overflow-hidden ${
                  b.Background && "darkBG"
                }`}>
                <ServicesBlock data={b} />
              </div>
            );

          case "layout.feature-card":
            return (
              <VisibilityWrapper key={b.id} onVisible={handleVisible}>
                <FeatureCard data={b} />
              </VisibilityWrapper>
            );

          case "layout.feature-item":
            return (
              <VisibilityWrapper key={b.id} onVisible={handleVisible}>
                <WhyChooseUs data={b} />
              </VisibilityWrapper>
            );

          case "layout.step-item":
            return (
              <OurProcess
                key={`${b.id}-${updateKey}`} 
                data={b}
              />
            );

          case "layout.target-audience-section":
            return (
              <div key={b.id}  className="pb-[84px] md:pb-[92px] lg:pb-[102px] xl:pb-[116px]">
                <WhatWeDo data={b} />
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
