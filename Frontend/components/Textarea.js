"use client"; // Only if you're using Next.js App Router and need client interactivity

import React from "react";

const Textarea = ({ name, value, placeholder = "", className = "", onChange }) => {
  return (
    <div className={`${className}`}>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-[rgba(22,54,61,.08)] w-full border-0 rounded-[8px] flex items-center p-4 md:p-6 text-[14px] lg:text-[22px] text-[#16363D] 
      leading-[120%] tracking-[-0.03em] !font-Archivo font-medium h-[158px]"
      />
    </div>
  );
};

export default Textarea;
