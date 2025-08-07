"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Image from "next/image";

import Logo from "@/public/images/Logo.svg";
import HambergerLogo from "@/public/images/HambergerLogo.svg";
// import HambergerIcon01 from "@/public/images/HambergerIcon-01.svg";
// import HambergerIcon02 from "@/public/images/HambergerIcon-02.svg";
import Mobile from "@/public/images/Mobile.svg";
import HambergerMobile from "@/public/images/HambergerMobile.svg";

const Header = ({ HeaderData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle state
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen]);

  // Dynamic menu and logo from Strapi
  const menu = HeaderData?.headerLink || [];
  const logo = HeaderData?.logo?.Image;
  const logoActive = HeaderData?.logo?.HeaderActiveImage;

  return (
    <header className="fixed top-5 w-full z-100 transition-colors duration-300">
      <Container>
        <div
          className={`headerBox p-[3px] md:p-2 border-[1px] border-transparent ${
            isScrolled
              ? "bg-[#16363d] backdrop-sepia-[blur(10px)] !border-[rgba(238,236,222,.1)]"
              : "bg-[rgba(255,255,255,0.1)] backdrop-sepia-[blur(27px)] "
          } justify-between transition-colors duration-300`}
        >
          <div className="flex justify-between w-full items-center">
            <div
              className="NavIcon cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {logo && logo.url && (
                <Image
                  className="desktopView"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo.url}`}
                  alt={logo.alternativeText || "Logo"}
                  width={logo.width || 120}
                  height={logo.height || 40}
                />
              )}
              {logoActive && logoActive.url && (
                <Image
                  className="Hamberger"
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logoActive.url}`}
                  alt={logoActive.alternativeText || "Logo"}
                  width={logoActive.width || 120}
                  height={logoActive.height || 40}
                />
              )}
            </div>

            <div className="logo flex items-center">
              <h1>
                <Link href="/">
                  <Image
                    className="desktopView"
                    src={Logo}
                    alt="RenewEdge Solutions"
                  />
                  <Image
                    className="Hamberger"
                    src={HambergerLogo}
                    alt="RenewEdge Solutions"
                  />
                </Link>
              </h1>
            </div>

            <div className="mobileIcon">
              <Image className="desktopView" src={Mobile} alt="Mobile Icon" />
              <Image
                className="Hamberger"
                src={HambergerMobile}
                alt="Mobile Icon"
              />
            </div>
          </div>
          <div
            className="HambergerMenu group
              [&>a]:font-Anton [&>a]:uppercase [&>a]:inline-block [&>a]:duration-200
              [&>a]:text-[28px] md:[&>a]:text-[48px] [&>a]:leading-[113%] [&>a]:transition "
          >
            {menu.map((item) => {
              const isHovered = hoveredId === item.id;
              const isOtherHovered =
                hoveredId !== null && hoveredId !== item.id;

              let textColor = "text-[rgba(238,236,222,1)]";
              if (isHovered) textColor = "text-[#E9F5AC]";
              else if (isOtherHovered)
                textColor = "text-[rgba(238,236,222,.6)]";

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`${textColor} opacity-0 slide-up`}
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
