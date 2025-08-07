import HeroText from "../HeroText";

const heroParts = [
  { text: " Achieve financial " },
  { br: true },
  { text: "nirvana." },
];

const ArticalHero = () => {
  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}
      <div className="relative z-10">
        <HeroText heroParts={heroParts} className="pb-12 lg:pb-[64px]" />
      </div>
    </section>
  );
};

export default ArticalHero;
