import BackgroundBlock from "../BackgroundBlock";
import Container from "../Container";
import HeroText from "../HeroText";

const heroParts = [
  { text: " Achieve financial " },
  { br: true },
  { text: "nirvana." },
];

const ArticalHead = () => {
  return (
    <>
      <BackgroundBlock variant="lightBG">
        <section className="border-b-[1px] border-[22,54,61,.15] pb-12">
          <Container className="flex">
            <div className="w-1/2">
              <span className="text-white font-Archivo text-[14px] uppercase font-semibold tracking-[.02em] leading-[100%] px-4 py-[9px] bg-[#16363D] rounded-full">
                Tech
              </span>
            </div>
            <div className="w-1/2">
              <h2 className="text-[66px] text-[#16363D] uppercase leading-[113%]">
                Everything You Need to <br /> Know About Wireframe <br /> Design
                and Prototypes
              </h2>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container className="flex">
            <div className="w-1/2">
              <span className="font-Archivo text-[16px]  font-medium tracking-[-.02em] leading-[120%] text-[#000]">
                By RenewEdge Solutions
                <br />
                14, 2025 <br />
                11 min read
              </span>
            </div>
            <div className="w-1/2">
              <p className="text-[22px] text-[#16363D] tracking-[-.02em] leading-[120%]">
                Learn everything you need to know about wireframe design and
                <br />
                prototypes, from early concepts to interactive models. Discover
                how they shape structure, usability, and user experience.
              </p>
            </div>
          </Container>
        </section>
      </BackgroundBlock>
    </>
  );
};

export default ArticalHead;
