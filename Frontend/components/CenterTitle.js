import React from "react";

const CenterTitle = ({ SmallTitle, Title }) => {
  return (
    <div className="text-center pb-12 lg:pb-[64px] grid gap-3 md:gap-4">
      <p className="text-[#16363D] text-[10px] md:text-[14px] lg:text-[18px] tracking-[.02em] font-Archivo font-semibold leading-[100%] uppercase">
        {SmallTitle}
      </p>
      <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] uppercase text-[#16363D]">
        {Title}
      </h3>
    </div>
  );
};

export default CenterTitle;
