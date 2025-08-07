"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import Container from "@/components/Container";
import Link from "next/link";
import Facebook from "@/public/images/facebook-02.svg";
import whatsUp02 from "@/public/images/whatsUp02.svg";
import Twitter from "@/public/images/Twitter.svg";
import Linkedin from "@/public/images/Linkedin.svg";

// --- Utility: Slugify & Ensure Unique IDs ---
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlugify(text, existingIds) {
  let slug = slugify(text);
  let counter = 1;
  while (existingIds.has(slug)) {
    slug = `${slug}-${counter++}`;
  }
  existingIds.add(slug);
  return slug;
}

// --- Scroll Spy Hook ---
function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    if (!ids.length) return;

    const handleObserve = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);

      if (visible.length > 0) {
        const lastVisible = [...ids]
          .reverse()
          .find((id) => visible.includes(id));
        setActiveId(lastVisible);
      }
    };

    const observer = new IntersectionObserver(handleObserve, {
      rootMargin: `-20% 0% -80% 0%`,
      threshold: 0,
    });

    const timeout = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100); // Delay to ensure DOM is ready

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
}

// --- Extract plain text from children ---
function getTextFromChildren(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(getTextFromChildren).join("");
  if (children && typeof children === "object" && children.props)
    return getTextFromChildren(children.props.children);
  return "";
}

// --- Main Component ---
export default function ArticleWithTOC({ article }) {
  const {
    HeroText,
    Title,
    Description,
    Content,
    Author,
    PublishedTime,
    Category,
    CoverImage,
    Time,
  } = article;

  const title = parseStrapiRichText(Title);
  const coverUrl = CoverImage?.url
    ? process.env.NEXT_PUBLIC_STRAPI_API_URL + CoverImage.url
    : null;

  const plainTitle = title.map((part) => part.text || "").join("");

  const plainDescription =
    Description?.[0]?.children?.map((c) => c.text).join(" ") || "";

  // Remove first image from markdown if it matches cover
  let filteredContent = Content;
  if (coverUrl && Content) {
    const coverFileName = CoverImage.name;
    filteredContent = Content.replace(
      new RegExp(`!\\[.*\\]\\([^\\)]*${coverFileName}[^\\)]*\\)\\s*`, "i"),
      ""
    );
  }

  // --- Generate Headings ---
  const [headings, setHeadings] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    const regex = /^##\s+(.+)$/gm;
    const found = [];
    const existingIds = new Set();
    let match;
    while ((match = regex.exec(filteredContent))) {
      const text = match[1].trim();
      const id = uniqueSlugify(text, existingIds);
      found.push({ text, id });
    }
    setHeadings(found);
  }, [filteredContent]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const headingIds = headings.map((h) => h.id);
  const activeId = useScrollSpy(headingIds);
  const timeArray = PublishedTime.split("-");

  // --- Markdown Rendering ---
  const components = {
    h2: ({ node, children, ...props }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="text-[#16363D] text-[24px] md:text-[28px] lg:text-[48px] font-Anton leading-[113%] uppercase pb-[30px] md:pb-10 lg:pb-12 block border-t-[1px] border-[rgba(22,54,61,0.15)] pt-[30px] md:pt-10 lg:pt-12"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ node, ...props }) => (
      <h3
        className="text-[#16363D] text-[24px] md:text-[28px] lg:text-[48px] font-Anton leading-[113%] uppercase pb-[30px] md:pb-10 lg:pb-12 block"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="text-[#16363D] text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] -tracking-[.02em] font-medium pb-[30px] md:pb-10 lg:pb-12 block"
        {...props}
      />
    ),
    img: ({
      node,
      src = "",
      alt = "",
      width = 800,
      height = 600,
      ...props
    }) => {
      let finalSrc = src;
      if (src?.startsWith("/uploads")) {
        finalSrc = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
      }
      return (
        <Image
          {...props}
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          className="rounded-[16px] w-full "
        />
      );
    },
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 mb-4" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 mb-4" {...props} />
    ),
    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
  };

  return (
    <div className="bg-[#EEECDE] rounded-[16px_16px_0_0] relative z-10 -mt-5">
      <section className="pt-[64px] md:pt-[72px] lg:pt-[82px] xl:pt-[96px]">
        <div className="w-full pb-12">
          <Container className="flex">
            <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
              <span className="break-all bg-[#16363D] rounded-full px-4 py-[9px] font-Archivo font-medium -tracking-[.02em] text-[14px] leading-[14px] text-white uppercase w-fit block">
                {Category?.Name}
              </span>
            </div>
            <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
              <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
                {title.map((part, index) => {
                  if (part.br) return <br key={index} />;
                  if (part.span)
                    return (
                      <span className="highlight" key={index}>
                        {part.text}
                      </span>
                    );
                  return (
                    <React.Fragment key={index}>{part.text}</React.Fragment>
                  );
                })}
              </h3>
            </div>
          </Container>
        </div>
        <div className="relative py-[30px] md:py-10 lg:py-12 border-[rgba(22,54,61,.15)] border-t-[1px]">
          <Container className="grid md:flex items-baseline gap-[30px] md:gap-0">
            <div className="w-[80px] max-[767px]:mr-2.5 break-words md:w-[176px] lg:w-1/2 text-[14px] lg:text-[16px] text-[#000] leading-[120%] -tracking-[.02em] font-Archivo">
              <span className="break-words block">{Author}</span>
              <span className="break-words block">{`${timeArray[2]},${timeArray[0]}`}</span>
              <span className="break-words block">{Time}</span>
            </div>
            <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
              {Description && (
                <p className="text-[#16363D] text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] -tracking-[.02em] font-medium font-Archivo">
                  {Description[0]?.children?.map((c) => c.text).join(" ")}
                </p>
              )}
            </div>
          </Container>
        </div>
      </section>
      <section className="pb-[30px] md:pb-10 lg:pb-12">
        <Container>
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={CoverImage.Title || "Inside the Modern Workspace"}
              width={CoverImage.width}
              height={CoverImage.height}
              className="rounded-lg w-full object-cover h-[186px] md:h-[360px] lg:h-[695px]"
              priority
            />
          )}
        </Container>
      </section>
      <section className="pb-24">
        <Container className="grid gap-[30px] md:gap-10 lg:gap-[120px] lg:flex items-baseline">
          <aside className="w-full lg:w-[215px] lg:sticky lg:top-32 h-fit bg-[#EEECDE]">
            {headings.length > 0 && (
              <ul className="grid gap-3">
                {headings.map(({ text, id }) => (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      className={`break-words inline-block text-[rgba(22,54,61,.5)] relative text-[14px] lg:text-[16px] font-Archivo pl-3 -tracking-[.03em] font-medium leading-[19px] 
                        before:content-[''] before:w-[5px] before:h-[5px] before:absolute before:left-0 before:top-1.5 
                        before:bg-[rgba(22,54,61,.5)] before:rounded-full hover:text-[#199E88] hover:before:bg-[#199E88] ${
                          activeId === id
                            ? "!text-[#199E88] before:!bg-[#199E88]"
                            : "text-[#16363D] before:bg-[rgba(22,54,61,.5)]"
                        }`}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
          <div
            className="w-full lg:w-[calc(100%-662px)] text-[#16363D]"
            ref={contentRef}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {filteredContent}
            </ReactMarkdown>
          </div>
          <div className="w-full lg:w-[210px] grid gap-3 lg:sticky lg:top-32 h-fit">
            <p className="text-[rgba(22,54,61,.6)] text-[18px] font-semibold leading-[100%] uppercase -tracking-[.02em]">
              Share this article
            </p>
            <ul className="flex gap-3">
              <li>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Image src={Facebook} alt="Facebook" />
                </Link>
              </li>
              <li>
                <Link
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Check out this article: ${currentUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <Image src={whatsUp02} alt="WhatsApp" />
                </Link>
              </li>
              <li>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentUrl
                  )}&text=${encodeURIComponent(plainTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Image src={Twitter} alt="Twitter" />
                </Link>
              </li>
              <li>
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    currentUrl
                  )}&title=${encodeURIComponent(
                    plainTitle
                  )}&summary=${encodeURIComponent(plainDescription)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <Image src={Linkedin} alt="LinkedIn" />
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
