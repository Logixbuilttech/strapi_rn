"use client";
import BackgroundBlock from "./BackgroundBlock";
import Button from "./Button";
import Container from "./Container";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import { useState, useEffect, useRef } from "react";

// Animation configuration
const totalAnimationTime = 60; // seconds for full cycle
const numItems = 30; // Total 30 items for the slider
const itemDelay = totalAnimationTime / numItems;
const centerPositionTime = (2 * totalAnimationTime) / numItems;

const VerticalSlider = ({ data }) => {
  const itemRef = useRef();
  const [isActive, setIsActive] = useState(false);

  const sliderItems = data?.SliderItem || [];
  const defaultActive = sliderItems.length > 0 ? Math.floor(sliderItems.length / 2) : 0;
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const directionRef = useRef(1);
  const sliderRef = useRef(null);

  // Repeat slider items to make a total of 30 items
  const repeatedSliderItems = Array.from({ length: numItems }, (_, index) => {
    return sliderItems[index % sliderItems.length]; // Repeat items cyclically
  });

  // Auto-rotate slides with ping-pong effect
  useEffect(() => {
    if (repeatedSliderItems.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);

        setActiveIndex((prev) => {
          const next = prev + directionRef.current;

          // Reverse direction at boundaries
          if (next >= repeatedSliderItems.length) {
            directionRef.current = -1;
            return repeatedSliderItems.length - 2; // Adjusted to keep center position
          } else if (next < 0) {
            directionRef.current = 1;
            return 1; // Adjusted to keep center position
          }
          return next;
        });

        setTimeout(() => setIsAnimating(false), 500000000000);
      }, 5000000000000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, repeatedSliderItems.length]);

  if (!data) return null;

  const smallTitle = data.SmallTitle;
  const titleParts = parseStrapiRichText(data.Title);
  const buttonText = data.Button?.text || "Get Reliable Repairs";
  const buttonHref = data.Button?.href || "#";

  // Handle slide click
  const handleSlideClick = (index) => {
    if (isAnimating || index === activeIndex) return;

    clearTimeout(timeoutRef.current);
    setIsAnimating(true);
    setActiveIndex(index);

    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Extracting text content from ItemContent
  const extractTextContent = (itemContent) => {
    return itemContent.map((content, idx) => {
      return content.children.map((child, childIdx) => (
        <>{child.text}</>
      ));
    });
  };

  return (
    <BackgroundBlock>
      <Container className="text-center grid gap-8 md:gap-12 xl:gap-[54px]">
        <div className="grid gap-4">
          <p className="uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]">
            {smallTitle}
          </p>
          <h2 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
            {titleParts.map((part, idx) => {
              if (part.br) return <br key={idx} />;
              if (part.span)
                return (
                  <span className="highlight" key={idx}>
                    {part.text}
                  </span>
                );
              return <span key={idx}>{part.text}</span>;
            })}
          </h2>
        </div>

        <div className="verticalSlide relative" ref={sliderRef}>
          {repeatedSliderItems.map((item, index) => {
            const itemContent = item?.ItemContent || [];
            const animationDelay = -centerPositionTime + index * itemDelay;
            return (
              <div
                ref={itemRef}
                className={`carousel__item ${isActive ? "active-slide" : ""}`}
                key={index}
                style={{
                  animationDelay: `${index * itemDelay - 2 * itemDelay}s`,
                }}
              >
                {itemContent.length > 0 ? (
                  <span>{extractTextContent(itemContent)}</span>
                ) : (
                  <span>No content available</span> // Fallback content
                )}
              </div>
            );
          })}
        </div>
        <Button label={buttonText} href={buttonHref} />
      </Container>
    </BackgroundBlock>
  );
};

export default VerticalSlider;
