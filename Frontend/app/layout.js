import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import qs from "qs";
import { fetchStrapi } from "@/lib/strapiApi";
import { globalPopulate } from "@/lib/populateMap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RenewEdge Solutions",
  description: "Empowering Smarter Growth Through Technology, Design, and Digital Innovation",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://renewedge-solutions.com'),
  alternates: {
    canonical: './',
  },
};

export default async function RootLayout({ children }) {
   const global = await fetchStrapi('global', {
    populate: globalPopulate.populate,
    tag: 'global',
    revalidate: 3600,
  });
   

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
           <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RenewEdge Solutions",
              "url": "https://renewedge-solutions.com",
              "description": "A technology, design, and digital solutions company helping people and organizations solve problems, simplify systems, and scale smarter. Works with individuals, entrepreneurs, organizations, and governments to modernize infrastructure, install smart systems, repair electronics, build digital presence, and more, focusing on sustainable growth."
            })
          }}
        />
      </head>
      <body>
        <Header HeaderData={global.TopNav} />
        {children}
        <Footer FooterData={global.Footer}/>
      </body>
    </html>
  );
}
