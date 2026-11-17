import Link from "next/link";
import { Accent, OutlinedRow, PatternFeature, VisitCta } from "@/components/blocks";
import { CollectionsIndex } from "@/components/collections-index";
import { HomeHero } from "@/components/home-hero";
import { QuoteScroll } from "@/components/quote-scroll";
import { Mark } from "@/components/mark";
import { home } from "@/content/home";
import { images, site } from "@/content/site";

export default function HomePage() {
  const { winter, summer } = site.hours;
  return (
    <>
      <HomeHero />

      <section aria-label="Today" className="border-b border-rule">
        <div className="gutter flex flex-wrap justify-between gap-x-8 gap-y-2.5 py-[18px] text-sm">
          <span>
            Mon–Sat {winter.time} <span className="text-stone">{winter.short}</span> · {summer.time}{" "}
            <span className="text-stone">{summer.short}</span>
          </span>
          <span>
            Adults {site.admission.adult} <span className="text-stone">· students and under 12 free</span>
          </span>
          <span>Nea Karvali, 8 km from Kavala</span>
        </div>
      </section>

      <QuoteScroll id="purpose" label="Our purpose" items={home.flyingObjects} link={{ href: "/about", label: "why we collect" }}>
        {home.quote}
      </QuoteScroll>

      <CollectionsIndex />

      <PatternFeature
        motif="lozenge"
        image={images.festival}
        position="30% 60%"
        label="Every summer · Akontisma"
        title="The Great Festival"
        text="Performances, concerts and theatre in the traditional settlement above Nea Karvali."
      />

      <section aria-label="Events">
        <div className="gutter flex flex-col gap-7 py-[clamp(64px,8vw,112px)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="m-0 font-serif text-[clamp(48px,6vw,88px)] font-normal italic leading-[0.95] text-madder">what&apos;s on</h2>
            <Link href="/events" className="pill">
              All events
            </Link>
          </div>
          <OutlinedRow href="/events#festival" kicker="Every summer" title="The Great Festival at Akontisma" text="Performances, concerts and theatre that celebrate artistic expression." />
          <OutlinedRow href="/events#symposiums" kicker="Throughout the year" title="Symposiums & book presentations" text="On the history, traditions and identity of the Greeks of Cappadocia." />
        </div>
      </section>

      <section aria-label="About the museum" className="bg-madder text-sand">
        <div className="gutter-wide mx-auto flex max-w-[1360px] flex-col gap-[clamp(80px,10vw,144px)] py-[clamp(120px,14vw,220px)]">
          <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
            <div className="flex flex-[0_0_220px] flex-col gap-[18px] pt-3.5">
              <span className="text-xs tracking-[0.2em] text-terracotta">SINCE 1987</span>
              <Mark className="h-[22px] w-[42px] text-parchment" />
            </div>
            <p className="m-0 min-w-0 max-w-[980px] flex-[1_1_560px] font-serif text-[clamp(36px,4.6vw,68px)] leading-[1.1] text-parchment">
              In Nea Karvali the locals founded the House of Culture to protect their heritage,{" "}
              <span className="italic text-terracotta">and began to collect the relics of the past.</span>
            </p>
          </div>
          <div className="indent-editorial flex flex-wrap gap-12 border-t border-rule-madder pt-12">
            <p className="m-0 min-w-0 flex-[1_1_280px] font-serif text-[21px] leading-[1.6]">
              Documents, books, photographs, costumes, pictures, icons and objects of everyday life, gathered by the families who carried them from Cappadocia.
            </p>
            <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-3">
              <span className="font-serif text-[72px] leading-[0.9] text-terracotta">1997</span>
              <span className="text-sm leading-[1.6]">European Museum of the Year Award, shared with the Museum of Anatolian Civilisations, Ankara</span>
            </div>
            <div className="flex min-w-0 flex-[0_1_200px] items-end">
              <Link href="/about" className="pill pill-light">
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VisitCta
        label="Visit us"
        title={
          <>
            Find us in <Accent>Nea Karvali</Accent>
          </>
        }
        text={site.directions}
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: site.mapUrl, label: "get directions" }}
        left={images.building}
        right={images.aerial}
      />
    </>
  );
}

