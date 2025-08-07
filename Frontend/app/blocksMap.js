
import FeatureCard from "@/components/Home/FeatureCard";
import HomeHero from "@/components/Home/HomeHero";
import OurProcess from "@/components/Home/OurProcess";
import ServicesBlock from "@/components/Home/ServicesBlock";
import WhatWeDo from "@/components/Home/WhatWeDo";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import ServiceOfferings from "@/components/WhatWeDo/ServiceOfferings";
import CardWithLogo from "@/components/WhoWeAre/CardWithLogo";
import OurGoals from "@/components/WhoWeAre/OurGoals";
import OurValues from "@/components/WhoWeAre/OurValues";


export const homeBlocksMap = {
  "layout.hero": HomeHero, 
  "layout.content-block": ServicesBlock ,
  "layout.feature-card": FeatureCard, 
  "layout.feature-item": WhyChooseUs, 
  "layout.step-item": OurProcess,
  "layout.target-audience-section": WhatWeDo,
};

export const whoWeAreblocksMap = {
  "layout.hero": HomeHero, 
  "layout.feature-item-who-we-are": OurValues, 
  "layout.goals-who-we-are": OurGoals,
};

export const whatWeDoblocksMap = {
  "layout.content-block": ServicesBlock, 
  "layout.feature-item": WhyChooseUs, 
  "layout.explore-capabilities": ServiceOfferings,
};