import React from "react";
import Button from "@/components/Button";
import Link from "next/link";

const HeroText = ({
  heroParts = [],
  smallText,
  showButton = false,
  buttonText = "Discover More",
  buttonHref,
  className = "",
  smallTextIsHtml = true,
  parentText = false,
}) => {
  const renderSmallText = () => {
    if (!smallText) return null;

    if (smallTextIsHtml) {
      return (
        <p
          className="font-medium leading-[120%] tracking-[-0.02em] text-[14px] md:text-[18px] lg:text-[22px] text-[#EEECDE]"
          dangerouslySetInnerHTML={{ __html: smallText }}
        />
      );
    } else {
      const lines = smallText.split("\n");
      return (
        <p className="font-medium leading-[120%] tracking-[-0.02em] text-[14px] md:text-[18px] lg:text-[22px] text-[#EEECDE]">
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    }
  };

  return (
    <>
      <div
        className="uppercase text-[38px] md:text-[56px] lg:text-[70px] xl:text-[94px] leading-[108%] text-center pt-[112px] md:pt-[152px] 
        lg:pt-[208px] pb-[30px] md:pb-10 lg:pb-12 text-[#EEECDE] grid gap-4 px-1"
      >
        {parentText ? (
          <p className="text-[#EEECDE] text-[10px] md:text-[14px] lg:text-[18px] font-medium -tracking-[.02em] uppercase leading-[100%]">
            {parentText}
          </p>
        ) : null}

        <h2>
          {heroParts.map((part, index) => {
            if (part.br) {
              return <br key={index} />;
            } else if (part.span) {
              return (
                <span className="highlight" key={index}>
                  {part.text}
                </span>
              );
            } else {
              return <React.Fragment key={index}>{part.text}</React.Fragment>;
            }
          })}
        </h2>
      </div>

      {(smallText || showButton) && (
        <div
          className={`border-t-[1px] border-[rgba(238,236,222,.15)] pt-[30px] md:pt-10 xl:pt-12 px-5 ${className}`}
        >
          <div className="justify-center grid text-center max-w-[650px] mx-auto">
            {renderSmallText()}
            {showButton && (
              <div className="pt-9 md:pt-12 lg:pt-[52px]">
                {buttonHref ? (
                  <Button label={buttonText} color="light" href={buttonHref} />
                ) : (
                  <Button label={buttonText} color="light" />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeroText;
