import Image from "next/image";
import BackgroundBlock from "../BackgroundBlock";
import Container from "../Container";
import articalIMG from "@/public/images/blog-img.jpg";
import Link from "next/link";
import Facebook from "@/public/images/facebook-02.svg";
import whatsUp02 from "@/public/images/whatsUp02.svg";
import Twitter from "@/public/images/Twitter.svg";
import Linkedin from "@/public/images/Linkedin.svg";
import img01 from "@/public/images/img-01.jpg";

const Links = [
  { id: 1, label: "What Are Wireframes?", url: "" },
  { id: 2, label: "Different Types of Wireframes", url: "" },
  { id: 3, label: "When to Use Wireframes?", url: "" },
  { id: 4, label: "What Are Prototypes?", url: "" },
  { id: 5, label: "The Benefits of Prototypes", url: "" },
  { id: 6, label: "Conclusion", url: "" },
];

const BlogArtical = () => {
  return (
    <>
      <BackgroundBlock variant="lightBG">
        <Container>
          <span
            className="relative before:rounded-[16px] before:bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] 
          before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-full overflow-hidden"
          >
            <Image src={articalIMG} alt="" className="rounded-[16px]" />
          </span>
          <div className="flex gap-[120px] pt-12 items-baseline">
            <div className="w-[212px]">
              <ul className="grid gap-3">
                {Links.map(({ id, label, url }) => (
                  <li key={id}>
                    <Link
                      href={url}
                      className="text-[rgba(22,54,61,.5)] relative text-[16px] font-Archivo pl-3
                      -tracking-[.03em] font-medium leading-[19px]  before:content-[''] before:w-[5px] before:h-[5px] before:absolute 
                      before:left-0 before:top-1/2 before:bg-[rgba(22,54,61,.5)] before:-translate-y-1/2 before:rounded-full
                      hover:text-[#199E88] hover:before:bg-[#199E88]
                    "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[calc(100%-662px)]">
              <div className="grid gap-12 pb-12 mb-12 border-b-[1px] border-[rgba(22,54,61,.15)]">
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  Learn everything you need to know about wireframe design and
                  prototypes, from early concepts to interactive models.
                  Discover how they shape structure, usability, and user
                  experience.
                </p>
              </div>
              <div className="grid gap-12 pb-12 mb-12 border-b-[1px] border-[rgba(22,54,61,.15)]">
                <h3 className="text-[#16363D] text-[48px] leading-[113%] uppercase">
                  Different Types of Wireframes
                </h3>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  Every wireframe plays a unique role in a project&#39;s overall
                  design. Low-fidelity wireframes are fundamental
                  representations of a product&#39;s layout and do not depict
                  detailed functionalities. Wireframes are often done at the
                  beginning of the design process to aid designers, developers,
                  and other stakeholders in visualizing the architecture of a
                  project and ensure that everyone is on the same page about the
                  user experience.
                </p>
                <span
                  className="relative before:rounded-[16px] before:bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] 
          before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-full overflow-hidden"
                >
                  <Image src={articalIMG} alt="" className="rounded-[16px]" />
                </span>
                <h3 className="text-[#16363D] text-[48px] leading-[113%] uppercase">
                  What Are Wireframes?
                </h3>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  A wireframe is an essential visual representation of a digital
                  product like a website or an app. To create wireframes,
                  designers use various methods and tools to outline the basic
                  structure and navigation of the product. It serves as the
                  basic structure of the product, emphasizing how a user will
                  navigate through the product and its available features
                  instead of focusing on finer details such as typography or
                  color schemes.
                </p>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  Wireframes are often done at the beginning of the design
                  process to aid designers, developers, and other stakeholders
                  in visualizing the architecture of a project and ensure that
                  everyone is on the same page about the user experience.
                </p>
              </div>
              <div className="grid gap-12 pb-12 mb-12">
                <h3 className="text-[#16363D] text-[48px] leading-[113%] uppercase">
                  When to Use Wireframes?
                </h3>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  A wireframe is an essential visual representation of a digital
                  product like a website or an app. To create wireframes,
                  designers use various methods and tools to outline the basic
                  structure and navigation of the product. It serves as the
                  basic structure of the product, emphasizing how a user will
                  navigate through the product and its available features
                  instead of focusing on finer details such as typography or
                  color schemes.
                </p>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  Wireframes are often done at the beginning of the design
                  process to aid designers, developers, and other stakeholders
                  in visualizing the architecture of a project and ensure that
                  everyone is on the same page about the user experience.
                </p>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  Wireframes are often done at the beginning of the design
                  process to aid designers, developers, and other stakeholders
                  in visualizing the architecture of a project and ensure that
                  everyone is on the same page about the user experience.
                </p>
                <div className="flex gap-3">
                  <span>
                    <Image src={img01} alt="" />{" "}
                  </span>
                  <span>
                    <Image src={img01} alt="" />{" "}
                  </span>
                </div>
                <h3 className="text-[#16363D] text-[48px] leading-[113%] uppercase">
                  The Benefits of Prototypes
                </h3>
                <p className="text-[#16363D] text-[22px] font-medium font-Archivo leading-[120%] tracking-[.02em]">
                  A wireframe is an essential visual representation of a digital
                  product like a website or an app. To create wireframes,
                  designers use various methods and tools to outline the basic
                  structure and navigation of the product. It serves as the
                  basic structure of the product, emphasizing how a user will
                  navigate through the product and its available features
                  instead of focusing on finer details such as typography or
                  color schemes.
                </p>
              </div>
            </div>
            <div className="w-[210px] grid gap-3">
              <p className="text-[rgba(22,54,61,.6)] text-[18px] font-semibold leading-[100%] uppercase -tracking-[.02em]">
                Share this article
              </p>
              <ul className="flex gap-3">
                <li>
                  <Link href="">
                    <Image src={Facebook} alt="" />
                  </Link>
                </li>

                <li>
                  <Link href="">
                    <Image src={whatsUp02} alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <Image src={Twitter} alt="" />
                  </Link>
                </li>

                <li>
                  <Link href="">
                    <Image src={Linkedin} alt="" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </BackgroundBlock>
    </>
  );
};

export default BlogArtical;
