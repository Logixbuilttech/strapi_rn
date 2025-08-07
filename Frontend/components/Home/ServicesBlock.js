import Image from "next/image";
import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import SectionBlock from "../SectionBlock";
import Button from "@/components/Button";
import { parseStrapiRichText } from "@/lib/parseStrapiRichText";

const ServicesBlock = ({ data }) => {
  if (!data) return null;

  // Parse rightText and subText arrays
  const headingParts = parseStrapiRichText(data.rightText);
  // Parse the whole subText array at once
  const descriptionParts = parseStrapiRichText(data.subText);
  return (
    // <BackgroundBlock variant="lightBG">
    //   <Container>
    //     <SectionBlock
    //       title={data.leftText || ""}
    //       heading={headingParts}
    //       DescriptionText={descriptionParts}
    //       className="!pb-0"
    //     />
    //   </Container>
    // </BackgroundBlock>

    <Container>
      <SectionBlock
        title={data.leftText || ""}
        heading={headingParts}
        DescriptionText={descriptionParts}
      />
    </Container>
  );
};

export default ServicesBlock;
