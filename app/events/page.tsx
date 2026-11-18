import type { Metadata } from "next";
import { Accent, Blush, EditorialBlock, OutlinedRow, PageHero, PatternFeature, VisitCta } from "@/components/blocks";
import { images, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Events",
  description: "The Great Festival at Akontisma every summer, and symposiums and book presentations about the Cappadocian Greeks.",
};

const themes = [
  { title: "Their historical course" },
  { title: "Traditions and identity" },
  { title: "Religious life", note: "And monastic communities such as Gelveri and Zincidere (Caesarea)." },
  { title: "Artistic and cultural achievements" },
];

export default function EventsPage() {
  const academic = site.contacts[1];
  return (
    <>
      <PageHero
        info={["Festival · symposiums · books", "Every summer at Akontisma", "Nea Karvali · Kavala"]}
        title={
          <>
            What’s <Accent onRed>on</Accent>
          </>
        }
        intro="Symposiums about the Cappadocian Greeks, book presentations and concerts, and every summer the Great Festival at Akontisma."
        image={images.aerial}
        archival={false}
        tone="madder"
      />

      <section aria-label="Programme">
        <div className="gutter flex flex-col gap-7 py-[clamp(64px,8vw,112px)]">
          <span className="label">The programme</span>
          <OutlinedRow href="#festival" kicker="Every summer" title="The Great Festival at Akontisma" text="Performances, concerts and theatre that celebrate artistic expression." />
          <OutlinedRow href="#symposiums" kicker="Throughout the year" title="Symposiums & book presentations" text="On the history, traditions and identity of the Greeks of Cappadocia." />
        </div>
      </section>

      <PatternFeature
        id="festival"
        motif="ram"
        image={images.festival}
        position="30% 60%"
        label="Every summer · Akontisma"
        title={
          <>
            The Great <Accent>Festival</Accent>
          </>
        }
        text="The traditional settlement of Akontisma plays a central role in presenting the work of local cultural contributors. Every summer it comes to life through the Great Festival, with performances, concerts and theatre that attract visitors and celebrate artistic expression."
      >
        <dl className="m-0 mt-1 flex flex-wrap gap-x-8 gap-y-2 border-t border-rule pt-4 text-[15px]">
          <div className="flex gap-2"><dt className="text-madder">When</dt><dd className="m-0">Every summer</dd></div>
          <div className="flex gap-2"><dt className="text-madder">Where</dt><dd className="m-0">Akontisma, Nea Karvali</dd></div>
        </dl>
      </PatternFeature>

      <EditorialBlock
        id="symposiums"
        tone="ink"
        label="Throughout the year"
        statement={
          <>
            Symposiums and book presentations <Blush>on the history and heritage of the Cappadocian Greeks.</Blush>
          </>
        }
      >
        <ul role="list" className="m-0 list-none border-b border-rule-dark p-0">
          {themes.map((t, i) => (
            <li key={t.title} className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-rule-dark py-[22px]">
              <span className="w-10 text-[13px] text-terracotta">0{i + 1}</span>
              <span className="flex-[1_1_260px] font-serif text-[26px] text-parchment sm:text-[30px]">{t.title}</span>
              <span className="flex-[1_1_300px] text-[15px] leading-normal">{t.note}</span>
            </li>
          ))}
        </ul>
      </EditorialBlock>

      <VisitCta
        label="Academic interest & ideas"
        title={
          <>
            Talk to <Accent>{academic.name}</Accent>
          </>
        }
        text="For symposiums, book presentations and academic enquiries, get in touch with the museum."
        primary={{ href: `mailto:${academic.email}`, label: `Email ${academic.name.split(" ")[0]}` }}
        secondary={{ href: "/contact", label: "all contacts" }}
        left={images.building}
        right={images.festival}
      />
    </>
  );
}
