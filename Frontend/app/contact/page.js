import ArticleHero from "@/components/ArticleHero";
import ContactForm from "@/components/Contact/ContactForm";
import ContactHero from "@/components/Contact/ContactHero";
import { contactPopulate } from "@/lib/populateMap";
import { fetchStrapi } from "@/lib/strapiApi";

export const revalidate = 3600;

export default async function Contact () {
    const contactData = await fetchStrapi("contact", {
      populate: contactPopulate.populate,
      tag: "contact",
      revalidate,
    });
  
  return (
    <>
        <ContactHero data={contactData} />
    </>
  );
};
