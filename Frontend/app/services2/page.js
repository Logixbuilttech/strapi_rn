import BackgroundBlock from "@/components/BackgroundBlock";
import Container from "@/components/Container";
import Button from "@/components/Button";
import IMG01 from "@/public/images/01.jpg";
import IMG02 from "@/public/images/02.jpg";
import IMG03 from "@/public/images/03.jpg";
import IMG04 from "@/public/images/04.jpg";
import IMG05 from "@/public/images/05.jpg";
import Image from "next/image";

export default async function whatwedo() {
  return (
    <>
      <section>
        <div
          className="uppercase text-[38px] md:text-[56px] lg:text-[70px] xl:text-[94px] leading-[108%] text-center 
        pt-[112px] md:pt-[152px] lg:pt-[208px] pb-[84px] md:pb-[102px] lg:pb-[116px] text-[#EEECDE] grid gap-4"
        >
          <h2>
            IT Infrastructure <br /> & Support
          </h2>
        </div>
      </section>

      <BackgroundBlock variant="lightBG">
        <div className={`pb-12 lg:pb-[64px]`}>
          <Container className="flex pb-[30px] md:pb-10 lg:pb-[48px]">
            <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
              <p className="break-words lg:whitespace-nowrap font-semibold text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] w-1/2 text-[#16363D] uppercase tracking-[-0.02em]">
                STABILITY. SECURITY. SCALABILITY.
              </p>
            </div>

            <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
              <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
                Building the Digital <br /> Backbone for Your <br />
                Growth. Less Downtime, <br />
                More Control.
              </h3>
            </div>
          </Container>
          <Container
            className="relative pt-[30px] md:pt-10 lg:pt-[48px] before:content-[''] before:bg-[rgba(22,54,61,.15)] before:absolute 
            before:top-0 before:left-[-50%] before:w-[200%] before:h-[1px] overflow-hidden"
          >
            <div
              className={`grid gap-4  ml-auto w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2 `}
            >
              <p className="text-[14px] md:text-[18px] lg::text-[20px] xl:text-[22px] text-[#16363D] leading-[120%] tracking-[-0.02em]">
                Your business or institution runs on technology. When networks
                fail, systems crash, or support is unreliable, productivity
                stalls and risks increase. At RenewEdge-Solutions, we design and
                support secure, scalable IT systems, from networks and backups
                to cybersecurity and day-to-day tech support
              </p>
            </div>
          </Container>
        </div>
      </BackgroundBlock>

      <BackgroundBlock>
        <Container className="text-center">
          <div className="grid gap-4 mb-[54px]">
            <p class="uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]">
              WHEN TECH GETS IN THE WAY OF WORK
            </p>
            <h2 class="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
              {" "}
              When Tech Becomes a Daily <br /> Frustration
            </h2>
          </div>
          <div className="mb-13 verticalSlide">
            <ul>
              <li className="secondly">
                &quot;We have no IT support unless something <br />{" "}
                breaks.&quot;
              </li>
              <li className="firstly">
                &quot;The Wi-Fi keeps dropping and <br /> no one knows
                why.&quot;
              </li>
              <li className="active">
                &quot;Our systems are slow, outdated, and no longer <br />{" "}
                reliable.&quot;
              </li>
              <li className="firstly">
                &quot;There’s no proper backup — and we don’t know <br /> what
                would happen if something failed.&quot;
              </li>
              <li className="secondly">
                &quot;We have no IT support unless something <br />{" "}
                breaks.&quot;
              </li>
            </ul>
          </div>
          <Button label="Let’s Strengthen Your IT Foundation" />
        </Container>
      </BackgroundBlock>

      <BackgroundBlock variant="lightBG">
        <div className={`pb-12 lg:pb-[64px]`}>
          <Container className="flex pb-[64px]">
            <div className="w-[80px] max-[767px]:mr-2.5 md:w-[176px] lg:w-1/2">
              <p className="break-words lg:whitespace-nowrap font-semibold text-[10px] md:text-[14px] lg:text-[18px] leading-[100%] w-1/2 text-[#16363D] uppercase tracking-[-0.02em]">
                What We Deliver
              </p>
            </div>

            <div className="w-[calc(100%-90px)] md:w-[calc(100%-176px)] lg:w-1/2">
              <h3 className="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] leading-[113%] font-normal uppercase text-[#16363D] flex gap-2 items-center">
                Our infrastructure <br /> and support services <br />
                include:
              </h3>
            </div>
          </Container>

          <Container>
            <ul className="grid lg:flex flex-wrap gap-3">
              <li className="w-full lg:w-[calc(50%-6px)] relative">
                <span>
                  <Image className="rounded-[16px] w-full" src={IMG01} alt="" />
                </span>
                <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[24px] leading-[113%] font-normal uppercase !font-Anton p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                  Backup systems and disaster recovery planning
                </p>
              </li>
              <li className="w-full lg:w-[calc(50%-6px)] relative">
                <span>
                  <Image className="rounded-[16px] w-full" src={IMG02} alt="" />
                </span>
                <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[24px] leading-[113%] font-normal uppercase !font-Anton p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                  Firewall installation and cybersecurity hardening
                </p>
              </li>
              <li className="w-full lg:w-[calc(41.5%-6px)] relative">
                <span>
                  <Image
                    className="rounded-[16px] h-full w-full"
                    src={IMG03}
                    alt=""
                  />
                </span>
                <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[24px] leading-[113%] font-normal uppercase !font-Anton p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                  On-call and scheduled IT support
                </p>
              </li>
              <li className="w-full lg:w-[calc(58.5%-6px)] relative">
                <span>
                  <Image className="rounded-[16px] w-full" src={IMG04} alt="" />
                </span>
                <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[24px] leading-[113%] font-normal uppercase !font-Anton p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                  Network design, setup, and optimization (wired and wireless)
                </p>
              </li>
              <li className="w-full relative">
                <span>
                  <Image className="rounded-[16px] w-full" src={IMG05} alt="" />
                </span>
                <p className="rounded-full bg-[#EEECDE] text-center text-[#16363D] text-[24px] leading-[113%] font-normal uppercase !font-Anton p-5 w-[calc(100%-48px)] absolute bottom-6 left-1/2 -translate-x-1/2 ">
                  Computer setup, upgrades, and maintenance
                </p>
              </li>
            </ul>
          </Container>
        </div>
      </BackgroundBlock>

      <BackgroundBlock>
        <Container className="text-left">
          <div className="grid gap-4 mb-[64px] text-center">
            <p class="uppercase text-[10px] md:text-[14px] lg:text-[18px] font-semibold leading-[100%] tracking-[.02em] text-[#EEECDE]">
              Tailored Solutions for Every Need
            </p>
            <h2 class="text-[30px] md:text-[44px] lg:text-[56px] xl:text-[66px] text-[#EEECDE] leading-[113%] uppercase">
              Reliable and Secure Systems
            </h2>
          </div>
          <div className="mb-13 grid gap-3">
            <div className="bg-[rgba(255,255,255,0.07)] rounded-[16px] p-10 flex group hover:bg-[#E9F5AC] transition delay-150 duration-300 ease-in-out">
              <div className="w-1/2">
                <h2 className="text-[#EEECDE] text-[48px] leading-[113%] uppercase group-hover:text-[#16363D] transition delay-150 duration-300 ease-in-out">
                  For <br />
                  Homeowners
                </h2>
              </div>
              <div className="w-1/2">
                <ul
                  className="grid gap-3 [&>li]:transition [&>li]:delay-150 [&>li]:duration-300 [&>li]:ease-in-out [&>li]:pl-5 [&>li]:text-[#EEECDE] [&>li]:text-[22px] [&>li]:leading-[120%] [&>li]:-tracking-[.03em] [&>li]:font-Archivo [&>li]:font-medium
                [&>li]:relative [&>li:before]:content-[''] [&>li:before]:w-[8px] [&>li:before]:h-[8px] [&>li:before]:rounded-full [&>li:before]:absolute
                [&>li:before]:top-2 [&>li:before]:left-0 [&>li:before]:bg-[#E9F5AC] 
                [&>li:before]:transition [&>li:before]:delay-150 [&>li:before]:duration-300 [&>li:before]:ease-in-out
                [&>li]:group-hover:text-[#16363D] group-hover:[&>li:before]:bg-[#16363D]"
                >
                  <li>
                    Secure your home network with professional-grade Wi-Fi and
                    firewall setup
                  </li>
                  <li>Protect personal files with automatic backups</li>
                  <li>
                    Get tech support that actually shows up when you need it
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.07)] rounded-[16px] p-10 flex group hover:bg-[#E9F5AC] transition delay-150 duration-300 ease-in-out">
              <div className="w-1/2">
                <h2 className="text-[#EEECDE] text-[48px] leading-[113%] uppercase group-hover:text-[#16363D] transition delay-150 duration-300 ease-in-out">
                  For Small <br />
                  Businesses
                </h2>
              </div>
              <div className="w-1/2">
                <ul
                  className="grid gap-3 [&>li]:transition [&>li]:delay-150 [&>li]:duration-300 [&>li]:ease-in-out [&>li]:pl-5 [&>li]:text-[#EEECDE] [&>li]:text-[22px] [&>li]:leading-[120%] [&>li]:-tracking-[.03em] [&>li]:font-Archivo [&>li]:font-medium
                [&>li]:relative [&>li:before]:content-[''] [&>li:before]:w-[8px] [&>li:before]:h-[8px] [&>li:before]:rounded-full [&>li:before]:absolute
                [&>li:before]:top-2 [&>li:before]:left-0 [&>li:before]:bg-[#E9F5AC] 
                [&>li:before]:transition [&>li:before]:delay-150 [&>li:before]:duration-300 [&>li:before]:ease-in-out
                [&>li]:group-hover:text-[#16363D] group-hover:[&>li:before]:bg-[#16363D]"
                >
                  <li>
                    Upgrade your network to support staff, systems, and
                    point-of-sale tools without interruption
                  </li>
                  <li>
                    Implement cybersecurity protections to keep client data and
                    business IP secure
                  </li>
                  <li>
                    Set up reliable backups and recovery plans for peace of mind
                  </li>
                  <li>
                    Get support that responds quickly and solves issues properly
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0.07)] rounded-[16px] p-10 flex group hover:bg-[#E9F5AC] transition delay-150 duration-300 ease-in-out">
              <div className="w-1/2">
                <h2 className="text-[#EEECDE] text-[48px] leading-[113%] uppercase group-hover:text-[#16363D] transition delay-150 duration-300 ease-in-out">
                  For Government <br />& Institutions
                </h2>
              </div>
              <div className="w-1/2">
                <ul
                  className="grid gap-3 [&>li]:transition [&>li]:delay-150 [&>li]:duration-300 [&>li]:ease-in-out [&>li]:pl-5 [&>li]:text-[#EEECDE] [&>li]:text-[22px] [&>li]:leading-[120%] [&>li]:-tracking-[.03em] [&>li]:font-Archivo [&>li]:font-medium
                [&>li]:relative [&>li:before]:content-[''] [&>li:before]:w-[8px] [&>li:before]:h-[8px] [&>li:before]:rounded-full [&>li:before]:absolute
                [&>li:before]:top-2 [&>li:before]:left-0 [&>li:before]:bg-[#E9F5AC] 
                [&>li:before]:transition [&>li:before]:delay-150 [&>li:before]:duration-300 [&>li:before]:ease-in-out
                [&>li]:group-hover:text-[#16363D] group-hover:[&>li:before]:bg-[#16363D]"
                >
                  <li>
                    Build or improve network infrastructure for entire buildings
                    or campuses
                  </li>
                  <li>Implement security protocols and user access controls</li>
                  <li>
                    Set up IT systems with documentation and handover training
                  </li>
                  <li>
                    Ensure uptime and performance with proactive service and
                    reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Button label="Let’s Strengthen Your IT Foundation" />
        </Container>
      </BackgroundBlock>
    </>
  );
}
