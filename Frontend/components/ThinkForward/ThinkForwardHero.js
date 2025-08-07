import HeroText from "../HeroText";

const heroParts = [
  { text: "Insights That Power" },
  { br: true },
  { span: true, text: "Smart Growth" },
];

const smallText =
  "Stay ahead with expert insights, industry trends, technology <br/> strategies, and digital growth tips. Explore how innovation can move <br/> your business — and your community — forward";

const ThinkForwardHero = () => {
  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}
      <div className="relative z-10 pb-[84px] md:pb-[92px] lg:pb-[102px] xl:pb-[116px]">
        <HeroText
          heroParts={heroParts}
          smallText={smallText}
          bottomSpacing={116} // Optional
        />
      </div>
    </section>
  );
};

export default ThinkForwardHero;
