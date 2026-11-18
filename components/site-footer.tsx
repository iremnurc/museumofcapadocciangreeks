import Link from "next/link";
import { Mark } from "@/components/mark";
import { eyeDark, eyeLight } from "@/lib/pixels";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  const contact = site.contacts[0];
  return (
    <footer className="overflow-hidden bg-ink pb-[22px] text-[15px] text-sand">
      <svg width="100%" height="46" aria-hidden shapeRendering="crispEdges" className="block bg-madder">
        <defs>
          <pattern id="eye-band" width="24" height="23" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path fill="#F1E8D8" d={eyeLight} />
            <path fill="#1A1612" d={eyeDark} />
          </pattern>
        </defs>
        <rect width="100%" height="46" fill="url(#eye-band)" />
      </svg>

      <div className="mx-auto max-w-[1344px] px-4 pt-16 sm:px-12">
        <div data-queued-reveal-children className="flex flex-wrap gap-x-14 gap-y-10">
          <div className="flex min-w-0 flex-[1.4_1_260px] flex-col gap-2 leading-[1.6]">
            <span className="text-xs tracking-[0.16em] text-terracotta">VISIT</span>
            <span>
              {site.fullName.replace(" of the Cappadocian Greeks", "")}
              <br />
              <span className="text-ash">{site.place}</span>
            </span>
          </div>
          <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-2 leading-normal">
            <span className="text-xs tracking-[0.16em] text-terracotta">OPENING HOURS</span>
            {[site.hours.winter, site.hours.summer].map((s) => (
              <span key={s.label}>
                <span className="text-ash">{s.months}</span>
                <br />
                Mon–Sat {s.time}
              </span>
            ))}
            <span>
              Sunday closed · Adults {site.admission.adult}
            </span>
          </div>
          <nav aria-label="Footer" className="flex min-w-0 flex-[1_1_140px] flex-col">
            <span className="mb-1 text-xs tracking-[0.16em] text-terracotta">MUSEUM</span>
            {[{ href: "/", label: "Home" }, ...nav].map((n) => (
              <Link key={n.href} href={n.href} className="py-[5px] text-sand hover:text-parchment">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-2">
            <span className="text-xs tracking-[0.16em] text-terracotta">CONTACT</span>
            <a href={`mailto:${contact.email}`} className="py-[3px] text-sand hover:text-parchment">
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`} className="py-[3px] text-sand hover:text-parchment">
              {contact.phoneLabel}
            </a>
            <a href={site.mapUrl} className="u-link self-start py-[3px] text-sand hover:text-parchment">
              Directions
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1344px] px-4 pt-14 sm:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule-dark pt-[18px] text-xs text-ash">
          <span className="flex items-center gap-3.5">
            <Mark className="h-[22px] w-[42px] text-parchment" />© {new Date().getFullYear()} {site.fullName}
          </span>
          <Link href="/privacy" className="u-link text-ash hover:text-parchment">
            Privacy
          </Link>
        </div>
      </div>

      <Link
        href="/"
        aria-label={`${site.name}, home`}
        className="mx-auto block max-w-[1344px] px-4 pt-6 sm:px-12"
        style={{ fontSize: "clamp(48px, 11.67vw, 168px)" }}
      >
        <div className="h-[1.09em] overflow-hidden">
          <span className="block whitespace-nowrap font-serif leading-none tracking-[-0.02em] text-parchment">
            Cappadocian <span className="italic text-terracotta">Greeks</span>
          </span>
        </div>
      </Link>
    </footer>
  );
}
