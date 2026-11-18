import type { Metadata } from "next";
import Image from "next/image";
import { Parallax } from "@/components/parallax";
import { Accent, Blush, EditorialBlock, PageHero, VisitCta } from "@/components/blocks";
import { QuoteScroll } from "@/components/quote-scroll";
import { DialTimeline } from "@/components/dial-timeline";
import type { MediaItem } from "@/components/scaling-media";
import { images } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who were the Cappadocian Greeks, and how the people of Nea Karvali built the museum: from Gelveri to Nea Karvali.",
};

const quoteObjects: MediaItem[] = [
  { img: images.necklace, frame: "arch" },
  { img: images.pouch, frame: "circle" },
  { img: images.buckle, frame: "rect" },
  { img: images.cross, frame: "pill" },
  { img: images.rugColumns, frame: "arch", pos: "50% 35%" },
];

const dates = [
  { year: "1850", text: "The community council of Gelveri rules that jewellery may be worn in public only at baptisms and weddings." },
  { year: "1924", text: "With the exchange of populations, the Greeks of Cappadocia leave their homeland. Families from Gelveri (Karvali) settle near Kavala and name their new village Nea Karvali." },
  { year: "1987", text: "The people of Nea Karvali found the House of Culture and begin collecting documents, books, photographs, costumes, icons and objects of daily life." },
  { year: "1997", text: "The museum shares the European Museum of the Year Award with the Museum of Anatolian Civilisations in Ankara, a sign of the undivided heritage of Anatolia." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        info={["From Gelveri to Nea Karvali", "1924 · 1987 · 1997", "Rum · Karamanlides"]}
        title={
          <>
            Who were the <Accent dark>Cappadocian Greeks</Accent>
          </>
        }
        titleClassName="max-w-[991px] text-[clamp(56px,9vw,140px)]!"
        intro="Orthodox Christian communities of Cappadocia, in the heart of Anatolia, the Rum or Karamanlides. Many spoke Cappadocian Greek; others spoke Turkish and wrote it in Greek letters. In 1924, under the exchange of populations, they left their villages for Greece."
        image={images.festival}
        position="30% 55%"
      />

      <section aria-label="From Gelveri to Nea Karvali">
        <div className="gutter flex flex-wrap items-end justify-between gap-4 pt-[clamp(96px,11vw,168px)]">
          <h2 data-heading-reveal className="h2 m-0">
            From Gelveri <Accent>to Nea Karvali</Accent>
          </h2>
        </div>
      </section>
      <DialTimeline steps={dates} />

      <EditorialBlock
        label="Our story"
        statement={
          <>
            Collecting has been laborious <Blush>and deeply rewarding.</Blush>
          </>
        }
      >
        <div className="flex flex-wrap items-end gap-12">
          <div className="arch relative aspect-[4/5] min-w-[240px] flex-[0_1_380px]">
            <Parallax>
              <Image src={images.display.src} alt={images.display.alt} fill sizes="380px" className="object-cover object-[70%_55%]" />
            </Parallax>
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 border-t border-rule-madder pt-7 font-serif text-[21px] leading-[1.6]">
            <p className="m-0">
              Objects, testimonies, documents, books, manuscripts and photographs of daily life, monuments and people. This ancient and luminous civilisation was at risk of fading into scattered, unorganised traces, unable to form a coherent story for future historians.
            </p>
            <p className="m-0">Members and friends of the Cappadocian Studies Center around the world continue to expand what we know.</p>
          </div>
        </div>
      </EditorialBlock>

      <QuoteScroll id="why-we-collect" label="Why we collect" items={quoteObjects} note="From our story">
        “The road ahead is long. Together we continue to illuminate the unseen corners of this history.”
      </QuoteScroll>

      <VisitCta
        label="The collections"
        title={
          <>
            See what <Accent>they carried</Accent>
          </>
        }
        text="Costumes and jewellery, treasures from the churches, rugs, kilims and ceramics."
        primary={{ href: "/collections", label: "Explore the collections" }}
        secondary={{ href: "/contact", label: "academic enquiries" }}
        left={images.building}
        right={images.dress}
      />
    </>
  );
}

