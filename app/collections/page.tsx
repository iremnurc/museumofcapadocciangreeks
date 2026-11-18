import type { Metadata } from "next";
import Image from "next/image";
import { Accent, Blush, EditorialBlock, PageHero, PatternFeature, VisitCta } from "@/components/blocks";
import { images, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Collections",
  description: "Costumes and jewellery, treasures from the churches, rugs, kilims and ceramics of the Cappadocian Greeks.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        info={["Three collections", "Costumes · church treasures · rugs", "Nea Karvali · Kavala"]}
        title={
          <>
            The <Accent onRed>collections</Accent>
          </>
        }
        intro="Plenty of historical material about Greek culture in Cappadocia: costumes and jewellery, treasures from the churches, rugs, kilims and ceramics."
        image={images.display}
        position="62% 60%"
        tone="madder"
      />

      <nav aria-label="Collections" className="border-b border-rule">
        <div data-queued-reveal-children className="gutter flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-2.5 py-[18px] text-sm">
          <a href="#costumes"><span className="text-madder">01</span>&nbsp; Costumes &amp; jewellery</a>
          <a href="#church"><span className="text-madder">02</span>&nbsp; Treasures from the churches</a>
          <a href="#rugs"><span className="text-madder">03</span>&nbsp; Rugs, kilims &amp; ceramics</a>
        </div>
      </nav>

      <section id="costumes" aria-label="Costumes and jewellery" className="scroll-mt-4 overflow-hidden">
        <div className="gutter-wide mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-20 gap-y-14 py-[clamp(96px,11vw,168px)]">
          <div data-queued-reveal-children className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <span className="label">01 · Costumes &amp; jewellery</span>
            <h2 className="h2 m-0 max-w-[544px]">
              Garments of the <Accent>Greeks of the East</Accent>
            </h2>
            <p className="m-0 max-w-[560px] font-serif text-[21px] leading-normal text-body">
              Fabrics and traditional garments worn by the Rum or Karamanlides. They reflect everyday life, cultural identity and social expression, combining local traditions with influences from the wider Eastern world.
            </p>
            <p className="m-0 max-w-[520px] border-l-2 border-madder pl-5 font-serif text-[21px] italic leading-normal text-madder">
              In 1850 the community of Gelveri allowed women to wear their jewellery in public only at baptisms and weddings.
            </p>
          </div>
          <div data-queued-reveal-item className="relative mx-auto min-w-[280px] flex-[0_1_520px] pb-14 pl-14">
            <div className="arch relative aspect-[4/5] bg-clay">
              <Image src={images.dress.src} alt={images.dress.alt} fill sizes="(min-width: 768px) 460px, 90vw" className="object-cover object-[50%_30%]" />
            </div>
            <div className="absolute bottom-0 left-0 aspect-square w-[42%] overflow-hidden rounded-full border-8 border-parchment">
              <Image src={images.earrings.src} alt={images.earrings.alt} fill sizes="220px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <EditorialBlock
        id="church"
        tone="ink"
        label="02 · From the 17th century"
        statement={
          <>
            Treasures from the churches, <Blush>used in religious practice and church life.</Blush>
          </>
        }
      >
        <div className="flex flex-wrap items-end gap-12">
          <div className="arch relative aspect-[4/5] min-w-[240px] flex-[0_1_380px]">
            <Image src={images.censer.src} alt={images.censer.alt} fill sizes="380px" className="archival object-cover" />
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 border-t border-rule-dark pt-7">
            <p className="m-0 font-serif text-[21px] leading-[1.6]">
              Rare ecclesiastical objects that show the presence of the Monastic Brotherhood of Gelveri and the Brotherhood of Saint John the Forerunner in Zincidere (Caesarea).
            </p>
          </div>
        </div>
      </EditorialBlock>

      <PatternFeature
        id="rugs"
        motif="lozenge"
        image={images.rugColumns}
        archival={false}
        position="50% 40%"
        label="03 · Rugs, kilims & ceramics"
        title={
          <>
            Patterns <Accent>and clay</Accent>
          </>
        }
        text="Valuable Cappadocian carpets with vivid patterns and colours, and original ceramics of exceptional beauty by Cappadocian potters: a highly developed tradition of craft and artistic expression."
      >
        <div className="mt-3 flex gap-4">
          <div className="arch relative aspect-[3/4] w-[120px]">
            <Image src={images.lionRug.src} alt={images.lionRug.alt} fill sizes="120px" className="object-cover" />
          </div>
          <div className="arch relative flex aspect-[3/4] w-[120px] items-end justify-center bg-clay">
            <Image src={images.jug.src} alt={images.jug.alt} fill sizes="120px" className="object-contain p-2 mix-blend-multiply" />
          </div>
        </div>
      </PatternFeature>

      <VisitCta
        label="Visit us"
        title={
          <>
            See them <Accent>in Nea Karvali</Accent>
          </>
        }
        text="The collections are on show at the museum, Monday to Saturday, about 8 km from Kavala."
        primary={{ href: "/contact#visit", label: "Plan your visit" }}
        secondary={{ href: site.mapUrl, label: "get directions" }}
        left={images.building}
        right={images.goldThread}
      />
    </>
  );
}
