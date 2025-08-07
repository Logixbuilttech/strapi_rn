"use client";

import { useState, useMemo } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";

import gallery01 from "@/public/images/gallery/01.jpg";
import gallery02 from "@/public/images/gallery/02.jpg";
import gallery03 from "@/public/images/gallery/03.jpg";
import gallery04 from "@/public/images/gallery/04.jpg";
import gallery05 from "@/public/images/gallery/05.jpg";
import gallery06 from "@/public/images/gallery/06.jpg";
import gallery07 from "@/public/images/gallery/07.jpg";
import gallery08 from "@/public/images/gallery/08.jpg";
import gallery09 from "@/public/images/gallery/09.jpg";
import gallery10 from "@/public/images/gallery/10.jpg";
import gallery11 from "@/public/images/gallery/11.jpg";
import gallery12 from "@/public/images/gallery/12.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function GalleryGrid({ articleData, articleCategoryData }) {
  const [active, setActive] = useState("All");
  const CATEGORIES = useMemo(
    () => ["All", ...articleCategoryData.map((c) => c.Name)],
    [articleCategoryData]
  );

  const dynamicImages = useMemo(() => {
    return articleData
      .map((article) => ({
        id: article.id.toString(),
        src: article.CoverImage?.url ? `${article.CoverImage.url}` : "",
        category: article.Category?.Name || "Other",
        width: article.CoverImage?.formats?.small?.width,
        height: article.CoverImage?.formats?.small?.height,
        text:
          article.Description?.[0]?.children?.[0]?.text ||
          article.Content ||
          "No description available",
        createdAt: article.createdAt,
        slug: article.Slug,
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
  }, [articleData]);

  const images = useMemo(
    () =>
      dynamicImages.filter((i) => active === "All" || i.category === active),
    [active, dynamicImages]
  );

  return (
    <BackgroundBlock variant="lightBG">
      <Container>
        <div className="grid gap-9 md:gap-10 lg:gap-[58px]">
          <nav className="overflow-auto md:overflow-visible flex gap-3 md:justify-center md:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`cursor-pointer transition px-[14px] lg:px-[30px] py-[13px] lg:py-[19px] border-[2px] border-[rgba(22,54,61,.6)] uppercase text-[14px] lg:text-[18px] font-Archivo tracking-[-.02em] leading-[100%]  whitespace-nowrap rounded-full font-semibold ${
                  active === cat
                    ? "bg-[#16363D] text-[#EEECDE]"
                    : "bg-[#EEECDE] text-[#16363D] hover:bg-[#16363D] hover:text-[#EEECDE]"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
          <div className="w-full">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="12px">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group rounded-[16px] overflow-hidden transition w-full"
                  >
                    <div className="absolute inset-0 transition before:content-[''] before:absolute before:inset-0 group-hover:before:bg-black/20"></div>
                    <Image
                      key={img.id}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.src}`}
                      alt={img.category}
                      width={img.width || 500} // Optional: based on your backend data
                      height={img.height || 500} // Optional
                      className="rounded-[16px] w-full h-full"
                    />
                    <span
                      className="absolute top-6 left-6 text-[14px] text-white tracking-[.02em] leading-[100%] font-semibold font-Archivo uppercase
                      bg-[rgba(255,255,255,0.25)]  backdrop-sepia-[blur(2px)] px-4 py-[9px] rounded-full"
                    >
                      {img.category}
                    </span>
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 w-[calc(100%-48px)] grid gap-4 transition">                      
                        <Button label="Know More" align="left" color="dark" href={`/article/${img.slug}`} />
                      <div className="bg-[#EEECDE] py-6 px-8 rounded-full">
                        <p className=" text-[#16363D]  text-[22px] font-medium font-Archivo leading-[26px] tracking-[.02em] line-clamp-2">
                          {img.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="">
            <Button label="show more" color="dark" />
          </div>
        </div>
      </Container>
    </BackgroundBlock>
  );
}
