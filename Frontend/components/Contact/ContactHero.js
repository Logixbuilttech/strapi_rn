import { parseStrapiRichText } from "@/lib/parseStrapiRichText";
import HeroText from "../HeroText";
import ContactForm from "./ContactForm";

const ContactHero = ({ data }) => {
  const heroParts = parseStrapiRichText(data.HeroText);
  const smallText = data.ContactForm.Title
  return (
    <section className="headBG">
      {/* <div className="headBG-Bottam"></div> */}
      <div className="relative z-10">
        <HeroText
          heroParts={heroParts}
          smallText={smallText}
          className="pb-12 lg:pb-[64px]"
        />
      </div>
      <ContactForm data={data.ContactForm.Card} />
    </section>
  );
};

export default ContactHero;

