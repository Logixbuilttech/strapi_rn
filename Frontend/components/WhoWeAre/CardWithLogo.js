import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";

const CardWithLogo = ({ data }) => {
  if (!data) return null;

  return (
    <section className="-mt-11 lg:-mt-12">
      <div className="pb-[116px]">
        <Container>
          <div
            className="bg-[rgba(255,255,255,.07)] border-[1px] lg:border-[2px] border-[rgba(255,255,255,.1)] rounded-[16px] grid lg:flex 
            overflow-hidden z-10 relative h-auto lg:h-[593px]"
          >
            <div className="w-full lg:w-1/2 gap-[38px] grid lg:flex lg:justify-between text-center flex-col py-10 px-5 lg:px-0">
              {data.Logo && data.Logo.url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data.Logo.url}`}
                  alt={data.Logo.alternativeText || "Founded on the principles"}
                  width={data.Logo.width || 52}
                  height={data.Logo.height || 52}
                  className="mx-auto"
                />
              )}
              <p
                className="text-[14px] md:text-[18px] lg:text-[22px] leading-[120%] tracking[-0.03em] text-[#EEECDE]
              max-w-[300px] md:max-w-[410px] lg:max-w-[500px] mx-auto"
              >
                {data.Text}
              </p>
              {data.Button && data.Button.text && (
                <Button
                  size="sm"
                  label={data.Button.text}
                  variant="outline"
                  href={data.Button.href}
                />
              )}
            </div>
            <div
              className="w-[calc(100%-8px)] mx-auto  lg:w-1/2 bg-[rgba(255,255,255,.08)] backdrop-sepia-[blur(37px)] flex justify-center items-center 
            py-5 lg:py-6 rounded-[0_0_16px_16px] lg:rounded-none mb-1 lg:mb-0"
            >
              {data.Image && data.Image.url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${data.Image.url}`}
                  alt={
                    data.Image.alternativeText || "Founded on the principles"
                  }
                  width={data.Image.width || 400}
                  height={data.Image.height || 300}
                  className="align-top h-[320px] lg:h-auto w-auto"
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default CardWithLogo;
