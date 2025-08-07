import Button from "@/components/Button";
import Container from "@/components/Container";
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div
        className="md:pl-[90px] xl:pl-[110px] relative animated-text [&>h4]:flex [&>h4]:justify-center [&>h4]:font-Anton [&>h4]:leading-[.95] md:[&>h4]:leading-[.86] [&>h4]:tracking-[.06em] 
        [&>h4]:uppercase [&>h4]:whitespace-nowrap [&>h4]:font-normal [&>h4]:text-[81px] md:[&>h4]:text-[148px] lg:[&>h4]:text-[200px] xl:[&>h4]:text-[290px]
        [&>h4>span]:opacity-[.2] [&>h4>span]:filter [&>h4>span]:blur-[7.445px]
        overflow-hidden
      "
      >
        <h4 className="max-[389px]:!text-[70px] !flex md:!hidden">
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#E9F5AC]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
        </h4>
        <h4 className="max-[389px]:!text-[70px] xl:-mt-20 pb-3">
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#E9F5AC]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
        </h4>
        <h4 className="max-[389px]:!text-[70px]">
          <span className="text-[#E9F5AC]">error 404</span>
          <span className="text-[#D2E7D3]  !filter-none !opacity-100 !blur-none">
            error 404
          </span>
          <span className="text-[#E9F5AC]">error 404</span>
        </h4>
        <h4 className="max-[389px]:!text-[70px]">
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
        </h4>
        <h4 className="max-[389px]:!text-[70px] xl:h-[120px]">
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#E9F5AC]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
        </h4>
        <h4 className="max-[389px]:!text-[70px] !flex md:!hidden">
          <span className="text-[#D2E7D3]">error 404</span>
          <span className="text-[#E9F5AC]">error 404</span>
          <span className="text-[#D2E7D3]">error 404</span>
        </h4>
        <Container className="max-[767px]:w-fit max-[767px]:whitespace-nowrap max-[767px]:pl-15 max-[767px]:pr-0 !absolute max-[389px]:bottom-10 bottom-20 lg:bottom-[116px] left-1/2 -translate-x-1/2">
          <div className=" md:w-1/2 grid gap-6 lg:gap-12 ml-auto">
            <h3 className="text-[#D2E7D3] text-[24px] lg:text-[28px] leading-[113%]">
              THIS PAGE DOES NOT EXIST, <br /> DON&apos;T WORRY
            </h3>
            <Button label="BACK TO HOMEPAGE" align="left" href="/"></Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotFound; 