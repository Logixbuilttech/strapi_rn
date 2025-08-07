"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const WhatWeDo = ({ data }) => {
  const carousel = useRef(null);
  if (!data) return null;

  return (
    <BackgroundBlock>
      <Container>
        <div className="max-w-[1360px] w-full px-6 m-auto">
          <OwlCarousel
            ref={carousel}
            className="owl-theme"
            loop={true}
            margin={24}
            nav={false}
            dots={false}
            autoWidth={true}
            autoplay={true}
            // autoplayTimeout={1000}
          >
            {Array.isArray(data.Item) &&
              data.Item.map((item) => (
                <div className="item" key={item.id}>
                  <div
                    className="bg-[rgba(255,255,255,.07)] p-6 rounded-[16px] flex justify-between items-center flex-col text-center 
                    min-w-[300px] md:min-w-[334px] lg:min-w-[429px] w-[300px] md:w-[334px] lg:w-[429px] h-[342px] lg:h-[412px]"
                  >
                    <h3 className="text-[#EEECDE] text-[24px] md:text-[28px] leading-[113%] uppercase">
                      {item.title}
                    </h3>
                    <span className="bg-[rgba(255,255,255,.07)] rounded-[8px] flex items-center justify-center p-2.5">
                      {item.icon?.url && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.icon.url}`}
                          alt={item.title}
                          width={item.icon.width || 40}
                          height={item.icon.height || 40}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                    </span>
                    <p className="text-[#EEECDE] text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] tracking-[0.03em]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
          </OwlCarousel>
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default WhatWeDo;
