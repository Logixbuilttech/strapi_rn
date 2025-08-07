import React from "react";

const Button = ({ variant, ButtonText }) => {
  let baseClasses =
    "flex items-center gap-2 px-4 py-2 rounded font-medium transition";
  let variantClasses = "";

  switch (variant) {
    case "whiteBDR":
      variantClasses =
        "border-[2px] border-[#EEECDE] bg-transparent px-6 py-5 font-semibold text-[14px] tracking-[-0.02em] uppercase font-Archivo";
      break;
    case "whiteBG":
      variantClasses =
        "border-[2px] border-[#EEECDE] bg-[#EEECDE] px-8 py-5 font-semibold text-[18px] tracking-[-0.02em] uppercase font-Archivo";
      break;
    case "dark-border":
      variantClasses =
        "border border-custom-dark text-custom-dark bg-transparent";
      break;
    case "dark-bg":
      variantClasses = "border border-custom-dark bg-custom-dark text-white";
      break;
    default:
      variantClasses = "border border-gray-300 bg-gray-100 text-black";
  }

  return (
    <button className={`flex gap-1 ${baseClasses} ${variantClasses}`}>
      <span className="rounded-full">{ButtonText}</span>
      <i className="rounded-full flex">
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 16L15.5 2M15.5 2V14.6M15.5 2H2.9"
            stroke="currentColor"
            strokeEidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </i>
    </button>
  );
};

export default Button;
