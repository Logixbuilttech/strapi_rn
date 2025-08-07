import Link from "next/link";
import React from "react";

const Button = ({
  label,
  variant = "filled", // filled | outline | text
  color = "light", // light | dark
  size = "lg", // lg | sm
  align = "center",
   href = "#",
}) => {
  const isDark = color === "dark";
  const isOutline = variant === "outline";
  const isText = variant === "text";

  const baseText = `font-Archivo font-semibold tracking-[-0.02em] uppercase rounded-full leading-[100%]`;
  const sizeClasses =
    size === "lg"
      ? "text-[14px] lg:text-[18px] px-6 lg:px-8 lg:py-[21px] py-[15px]"
      : "text-[14px] px-6 py-[13px]";
  const textColor = isOutline
    ? isDark
      ? "text-[#16363D]"
      : "text-[#EEECDE]"
    : isDark
    ? "text-[#EEECDE]"
    : "text-[#16363D]";

  const bgColor = isText
    ? "bg-transparent"
    : isOutline
    ? "bg-transparent"
    : isDark
    ? "bg-[#16363D]"
    : "bg-[#EEECDE]";

  const border = isOutline
    ? `border-1 lg:border-2 ${isDark ? "border-[#16363D]" : "border-[#EEECDE]"}`
    : "border-0";

  const iconSize =
    size === "lg"
      ? "w-[44px] h-[44px] lg:w-[60px] lg:h-[60px]"
      : "w-[44px] h-[44px]";
  const iconBorder = isOutline
    ? `border-1 lg:border-2 ${border.split(" ")[1]}`
    : "";
  const alignment = align === "left" ? "m-0" : "mx-auto";

  // Hover class only for default button
  const hoverTextColor =
    variant === "filled" && color === "light"
      ? "group-hover:text-[#0F947E]"
      : variant === "filled" && color === "dark"
      ? "group-hover:text-[#E9F5AC]"
      : "";

  const hoverBgColor =
    isOutline && color === "light"
      ? "group-hover:bg-[#EEECDE] group-hover:border-[#EEECDE] group-hover:text-[#0F947E]"
      : isOutline && color === "dark"
      ? "group-hover:bg-[#16363D] group-hover:border-[#16363D] group-hover:text-[#E9F5AC]"
      : "";

  return (
    
      <Link href={href} className={`transition group flex gap-1 items-center cursor-pointer w-fit ${textColor}
      ${alignment}`}>
        <span
          className={`transition ${baseText} ${bgColor} ${border} ${sizeClasses} ${hoverTextColor} ${hoverBgColor}`}
        >
          {label}
        </span>
        <i
          className={`transition flex items-center justify-center rounded-full ${iconSize} ${bgColor} ${iconBorder} ${hoverTextColor} ${hoverBgColor}`}
        >
          <svg
            width={size === "lg" ? "18" : "17"}
            height={size === "lg" ? "18" : "16"}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 16L16 2M16 2V14.6M16 2H3.4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </i>
      </Link>
  );
};

export default Button;
