import type { Metadata } from "next";
import Image from "next/image";
import { Accent, Blush, EditorialBlock, PageHero, VisitCta } from "@/components/blocks";
import { images } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who were the Cappadocian Greeks, and how the people of Nea Karvali built the museum: from Gelveri to Nea Karvali.",
};

const dates = [
  { year: "1850", text: "The community council of Gelveri rules that jewellery may be worn in public only at baptisms and weddings." },
  { year: "1924", text: "With the exchange of populations, the Greeks of Cappadocia leave their homeland. Families from Gelveri (Karvali) settle near Kavala and name their new village Nea Karvali." },
  { year: "1987", text: "The people of Nea Karvali found the House of Culture and begin collecting documents, books, photographs, costumes, icons and objects of daily life." },
  { year: "1997", text: "The museum shares the European Museum of the Year Award with the Museum of Anatolian Civilisations in Ankara, a sign of the undivided heritage of Anatolia.", highlight: true },
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

      <section aria-label="Timeline">
        <div className="gutter-wide mx-auto flex max-w-[1360px] flex-col gap-10 py-[clamp(96px,11vw,168px)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h2 m-0">
              From Gelveri <Accent>to Nea Karvali</Accent>
            </h2>
            <span className="label">Four dates</span>
          </div>
          <ol className="m-0 list-none border-b border-rule p-0">
            {dates.map((d) => (
              <li key={d.year} className="flex flex-wrap items-baseline gap-x-[clamp(32px,6vw,96px)] gap-y-3 border-t border-rule py-8">
                <span className={`w-[clamp(160px,18vw,260px)] flex-none font-serif text-[clamp(64px,7vw,104px)] leading-[0.9] ${d.highlight ? "text-madder" : "text-ink"}`}>
                  {d.year}
                </span>
                <span className="min-w-0 max-w-[640px] flex-[1_1_420px] font-serif text-[22px] leading-normal text-body">{d.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
            <Image src={images.display.src} alt={images.display.alt} fill sizes="380px" className="object-cover object-[70%_55%]" />
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 border-t border-rule-madder pt-7 font-serif text-[21px] leading-[1.6]">
            <p className="m-0">
              Objects, testimonies, documents, books, manuscripts and photographs of daily life, monuments and people. This ancient and luminous civilisation was at risk of fading into scattered, unorganised traces, unable to form a coherent story for future historians.
            </p>
            <p className="m-0">Members and friends of the Cappadocian Studies Center around the world continue to expand what we know.</p>
          </div>
        </div>
      </EditorialBlock>

      <section aria-label="Why we collect" className="relative overflow-hidden border-t border-rule bg-paper">
        <div className="relative mx-auto max-w-[1100px] px-[clamp(16px,4vw,48px)] py-[clamp(120px,14vw,200px)] text-center">
          <Float src={images.necklace.src} className="top-[12%] left-[2%] aspect-[4/5] rounded-t-full" />
          <Float src={images.pouch.src} className="top-[18%] right-[3%] aspect-square rounded-full" />
          <Float src={images.buckle.src} className="bottom-[6%] left-[44%] aspect-[3/4]" />
          <p className="relative m-0 font-serif text-[clamp(34px,4.6vw,64px)] leading-[1.12]">
            “The road ahead is long. Together we continue to <Accent>illuminate the unseen corners</Accent> of this history.”
          </p>
          <span className="mt-8 inline-block text-[13px] text-stone">From our story</span>
        </div>
      </section>

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

function Float({ src, className }: { src: string; className: string }) {
  return (
    <div aria-hidden className={`absolute w-[60px] overflow-hidden sm:w-[clamp(90px,10vw,140px)] ${className}`}>
      <Image src={src} alt="" fill sizes="140px" className="object-cover" />
    </div>
  );
}
