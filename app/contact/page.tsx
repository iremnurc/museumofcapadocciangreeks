import type { Metadata } from "next";
import { Accent, PageHero } from "@/components/blocks";
import { ContactForm } from "@/components/contact-form";
import { SeasonHours } from "@/components/season-hours";
import { images, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & visit",
  description: "Opening hours, admission, directions and contacts for the Museum of the Cappadocian Greeks in Nea Karvali, Kavala.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        info={["Visit & contact", "8 km from Kavala", "Since 1987"]}
        title={
          <>
            Contact <Accent dark>us</Accent>
          </>
        }
        intro={`Find us in Nea Karvali village, ${site.directions.charAt(0).toLowerCase()}${site.directions.slice(1)}`}
        image={images.building}
      />

      <section aria-label="People">
        <div data-queued-reveal-children className="gutter flex flex-col gap-7 pt-[clamp(64px,8vw,112px)]">
          <span className="label">Who to write to</span>
          {site.contacts.map((c) => (
            <div key={c.email} className="flex flex-wrap items-center gap-x-10 gap-y-3 border border-rule px-7 py-[26px]">
              <span className="flex-[0_0_240px] text-[13px] uppercase tracking-[0.1em] text-stone">{c.role}</span>
              <span className="flex-[1_1_280px] font-serif text-[30px] font-medium">{c.name}</span>
              <a href={`mailto:${c.email}`} className="flex-[1_1_240px] py-1.5 text-[15px]">{c.email}</a>
              <a href={`tel:${c.phone}`} className="flex-[0_1_160px] py-1.5 text-[15px]">{c.phoneLabel}</a>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Send a message">
        <div className="gutter flex flex-wrap items-start gap-x-20 gap-y-14 py-[clamp(96px,11vw,160px)]">
          <div data-queued-reveal-children className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
            <span className="label">Write to us</span>
            <h2 data-heading-reveal className="h2 m-0">
              Send a <Accent>message</Accent>
            </h2>
            <p className="m-0 max-w-[420px] font-serif text-[21px] leading-normal text-body">
              Planning a visit, bringing a group or school, or writing about the Cappadocian Greeks? We&apos;ll reply as soon as we can.
            </p>
          </div>
          <div data-queued-reveal-item className="min-w-0 flex-[1.3_1_480px]">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="visit" aria-label="Visit us" className="scroll-mt-4 bg-ink text-sand">
        <div className="gutter py-[clamp(96px,11vw,160px)]">
          <SeasonHours />
        </div>
      </section>
    </>
  );
}
