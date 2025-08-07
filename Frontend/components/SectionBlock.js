import React from "react";

// Helper to render parsed rich text arrays (with highlight support)
function renderRichText(parts) {
  if (!Array.isArray(parts)) {
    if (typeof parts === "string") return parts;
    return null;
  }
  // If array of strings, render each as a <p> for paragraph spacing
  if (parts.length > 0 && typeof parts[0] === "string") {
    return parts.map((str, idx) => (
      <p
        key={idx}
        style={{
          margin: 0,
          marginBottom: idx !== parts.length - 1 ? "1em" : 0,
        }}
      >
        {str}
      </p>
    ));
  }
  // Otherwise, assume array of objects (old usage)
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

const SectionBlock = ({
  title,
  badgeNumber,
  heading,
  DescriptionText = [],
  className = "",
  widthFull = null,
}) => {
  return (
    <div className={`pb-12 lg:pb-[64px] ${className}`}>
      <div className="flex pb-[30px] md:pb-10 lg:pb-[48px]">
        <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
          {title && (
            <p className="break-words lg:whitespace-nowrap font-semibold text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] w-1/2 text-[#16363D] uppercase tracking-[-0.02em]">
              {title}
            </p>
          )}

          {badgeNumber && (
            <div className="w-1/2">
              <p
                className="bg-[rgba(22,54,61,0.15)] w-[24px] h-[24px] md:w-[44px] md:h-[44px] lg:w-[42px] lg:h-[42px] flex items-center justify-center rounded-full
                text-[12px] md:text-[18px] lg:text-[22px] font-medium font-Archivo tracking-[-0.02em] text-[#16363D]"
              >
                {badgeNumber}
              </p>
            </div>
          )}
        </div>

        <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
          <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
            {renderRichText(heading)}
          </h3>
        </div>
      </div>

      <div
        className="relative pt-[30px] md:pt-10 lg:pt-[48px] before:content-[''] before:bg-[rgba(22,54,61,.15)] before:absolute before:top-0 before:left-[-50%] 
        before:w-[200%] before:h-[1px]"
      >
        <div
          className={`grid gap-4  ml-auto w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2 ${
            widthFull === true && " w-full "
          }`}
        >
          {Array.isArray(DescriptionText) && DescriptionText.length > 0 ? (
            <p className="text-[14px] md:text-[18px] lg::text-[20px] xl:text-[22px] text-[#16363D] leading-[120%] tracking-[-0.02em]">
              {renderRichText(DescriptionText)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionBlock;
