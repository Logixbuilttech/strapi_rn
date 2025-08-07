import HeroText from "../HeroText";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import SectionBlock from "../SectionBlock";

const heroParts = [{ text: " Privacy Policy." }];

const smallText =
  " Confidence, like art, never comes from having all the <br/> answers it comes from being open to all the questions.";

const PrivacyPolicyHero = () => {
  return (
    <>
      <section className="headBG">
        {/* <div className="headBG-Bottam"></div> */}
        <div className="relative z-10">
          <HeroText heroParts={heroParts} smallText={smallText} />
        </div>
      </section>
      <BackgroundBlock variant="lightBG">
        <Container>
          <SectionBlock
            badgeNumber="1"
            heading="Personal information we collect"
            DescriptionText={[
              "n order to register on the Platform and identify yourself, we will request your email. To create your profile on the Platform you may include personal information such as your country or city of residence, a photograph, first and last names, education, work experience, and any other additional information you might want to share in your profile. The profile information helps you make the most out of our Services, like helping other professionals find you and finding business opportunities or projects you might be interested in. However, if you do not want this information to be published, you may leave the profile information fields blank or delete the information already provided.",
              "When you visit or use our Services, We register data such as frequency of use, date and time Services were accessed, when you see or click a specific content, your content preferences. We use information when you log in, when you read our emails, and Internet protocol ('IP') addresses to identify you and register your use in the Platform.",
              "We do not make decisions based on profiles, beyond personalization of advertisement and for the purpose of the legitimate prevention of Internet fraud.",
              "We obtain information through other platforms, for example, when you register via Facebook or similar technologies. This might include personal texts or images available in an external website.",
            ]}
          />
          <SectionBlock
            badgeNumber="2"
            heading="Purpose."
            DescriptionText={[
              "Awwwards Online SL as the Party Responsible of Data Handling, will handle your personal data for the following purposes:",
              "1. Manage your registration as Platform user, to identify you and give you access to Services available for registered Platform users.",
              "2. Contacting you through email regarding updates or information related to features, products or services and updates, as long as they are needed or reasonable.",
              "3. Respond to any request or inquiry you make through the customer service channels available at our Platform.",
              "4. We also use your information to generate aggregated non-identifying data. For instance, generate statistics regarding our users, their jobs or areas of expertise, number of impressions or clicks in a specific project or visitor demographics.",
            ]}
          />
          <SectionBlock
            badgeNumber="3"
            heading="Options."
            DescriptionText={[
              "The provision of AWWWARDS ONLINE SL. Service might entail the use of your personal data, with your express consent, to make available to you personalized advertisement related to our products and services, through emails or other electronic communication means from us or third party collaborators. With the goal of improving our services, please know that personal information regarding your purchases, interests and preferences might be used by AWWWARDS ONLINE SL for the purpose of analysis, user profiling, marketing studies, quality surveys, and improving interaction with our clients.",
              "If you do not want to receive certain type of email communications, simply access the Settings section in your User Profile to manage your preferences.",
              "Likewise, you will be able to cancel your notifications by following the instructions in each communication you receive.",
            ]}
          />
        </Container>
      </BackgroundBlock>
    </>
  );
};

export default PrivacyPolicyHero;
