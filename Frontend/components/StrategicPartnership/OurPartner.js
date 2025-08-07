import BackgroundBlock from "../BackgroundBlock";
import Container from "@/components/Container";
import Image from "next/image";
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

const OurPartner = ({ data }) => {
  // Helper to get full image URL if needed
  const getImageUrl = (img) => {
    if (!img?.url) return "";
    // If your Strapi uploads are on the same domain, this is fine.
    // Otherwise, prefix with your API base URL, e.g.:
    // return process.env.NEXT_PUBLIC_STRAPI_URL + img.url;
    return img.url;
  };

  // Parse right heading
  const rightHeading = parseStrapiRichText(data?.RightText);

  return (
    <BackgroundBlock variant="lightBG">
      <Container>
        <div className="flex pb-12 lg:pb-[64px]">
          <span className="w-[85px] md:w-[176px] lg:w-1/2 break-words  text-[#16363D] text-[10px] md:text-[14px] lg:text-[18px] tracking-[.02em] leading-[100%] font-semibold !font-Archivo uppercase">
            {data?.leftText}
          </span>
          <h2 className="w-[calc(100%-85px)] md:w-[calc(100%-176px)] lg:w-1/2 text-[#16363D] text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] uppercase leading-[113%]">
            {renderRichText(rightHeading)}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {data?.Card?.slice(0, 3).map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center text-center bg-[#16363D] rounded-[16px] h-[198px] md:h-[220px] lg:h-[260px] justify-between p-6"
              >
                <span className="bg-[rgba(255,255,255,.1)] rounded-[8px] w-[64px] h-[64px] mx-auto flex items-center justify-center">
                  <Image
                    width={partner.Image?.width || 34}
                    height={partner.Image?.height || 34}
                    src={`${
                      process.env.NEXT_PUBLIC_STRAPI_API_URL
                    }${getImageUrl(partner.Image)}`}
                    alt={
                      partner.Image?.alternativeText ||
                      "Our partnerships may take the form of"
                    }
                  />
                </span>
                <h3 className="text-[24px] md:text-[28px] text-[#EEECDE] leading-[113%] uppercase">
                  {renderRichText(parseStrapiRichText(partner.Title))}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {data?.Card?.slice(3).map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center text-center bg-[#16363D] rounded-[16px] h-[198px] md:h-[220px] lg:h-[260px] justify-between p-6"
              >
                <span className="bg-[rgba(255,255,255,.1)] rounded-[8px] w-[64px] h-[64px] mx-auto flex items-center justify-center">
                  <Image
                    width={partner.Image?.width || 34}
                    height={partner.Image?.height || 34}
                    src={`${
                      process.env.NEXT_PUBLIC_STRAPI_API_URL
                    }${getImageUrl(partner.Image)}`}
                    alt={
                      partner.Image?.alternativeText ||
                      "Our partnerships may take the form of"
                    }
                  />
                </span>
                <h3 className="text-[24px] md:text-[28px] text-[#EEECDE] leading-[113%] uppercase">
                  {renderRichText(parseStrapiRichText(partner.Title))}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </BackgroundBlock>
  );
};

export default OurPartner;
