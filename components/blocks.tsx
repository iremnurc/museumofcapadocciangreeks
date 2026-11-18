import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { GradientWaveText } from "@/components/gradient-wave-text";
import { Mark } from "@/components/mark";
import { PatternField, type Motif } from "@/components/pattern";
import type { Img } from "@/content/site";
import { cn } from "@/lib/cn";

/** Dark typographic hero used on every inner page. */
export function PageHero({
  info,
  title,
  intro,
  image,
  archival = true,
  position = "50% 50%",
  titleClassName,
  tone = "ink",
}: {
  info: string[];
  title: ReactNode;
  intro: string;
  image: Img;
  archival?: boolean;
  position?: string;
  titleClassName?: string;
  /** background: ink (default) or madder red */
  tone?: "ink" | "madder";
}) {
  return (
    <section aria-label="Introduction" className={cn("text-parchment", tone === "madder" ? "bg-madder" : "bg-ink")}>
      <div data-queued-reveal-children className="gutter flex flex-col gap-[clamp(40px,5vw,72px)] pt-[clamp(20px,2.5vw,32px)] pb-[clamp(56px,7vw,104px)]">
        <div className={cn("flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px]", tone === "madder" ? "text-blush" : "text-mist")}>
          {info.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
        <h1 data-heading-reveal className={cn("h1 m-0 text-parchment", titleClassName)}>{title}</h1>
        <div className="flex flex-wrap items-end gap-x-[clamp(40px,6vw,96px)] gap-y-8">
          <p className="m-0 min-w-0 max-w-[560px] flex-[1_1_360px] font-serif text-[clamp(20px,1.7vw,24px)] leading-normal text-sand">
            {intro}
          </p>
          <div className="arch relative aspect-[16/7] min-w-0 flex-[2_1_520px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={cn("object-cover", archival && "archival")}
              style={{ objectPosition: position }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Accent({ children, dark = false, onRed = false }: { children: ReactNode; dark?: boolean; onRed?: boolean }) {
  return <span className={cn("italic", onRed ? "text-blush" : dark ? "text-terracotta" : "text-madder")}>{children}</span>;
}

/** Pixel pattern on the left half, photo across the edge, text on the right. */
export function PatternFeature({
  id,
  motif,
  image,
  archival = true,
  position = "50% 50%",
  label,
  title,
  text,
  children,
}: {
  id?: string;
  motif: Motif;
  image: Img;
  archival?: boolean;
  position?: string;
  label: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="relative overflow-hidden bg-paper">
      {/* the pattern runs from the left edge to the centre of the section */}
      <PatternField motif={motif} className="absolute top-0 left-0 h-[40%] w-full sm:h-full sm:w-1/2" />
      {/* three columns on large screens: empty | photo, centred in the section | text */}
      <div className="gutter relative flex flex-col gap-10 py-[clamp(80px,10vw,140px)] lg:grid lg:grid-cols-[1fr_minmax(0,480px)_1fr] lg:items-end lg:gap-12">
        <div aria-hidden className="hidden lg:block" />
        <div data-queued-reveal-item className="relative aspect-[4/5] w-full max-w-[480px] min-w-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 480px, 100vw"
            className={cn("object-cover", archival && "archival")}
            style={{ objectPosition: position }}
          />
        </div>
        <div data-queued-reveal-children className="flex min-w-0 flex-col gap-4 py-2">
          <span className="label">{label}</span>
          <h2 data-heading-reveal className="h2 m-0">{title}</h2>
          <p className="body-serif m-0">{text}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Madder editorial block: label column + big statement, then an indented row. */
export function EditorialBlock({
  id,
  label,
  statement,
  children,
  headingLevel = "h2",
  tone = "madder",
}: {
  id?: string;
  label: string;
  statement: ReactNode;
  children: ReactNode;
  headingLevel?: "h2" | "p";
  /** background: madder red (default) or ink */
  tone?: "madder" | "ink";
}) {
  return (
    <section id={id} className={cn("text-sand", tone === "ink" ? "bg-ink" : "bg-madder")}>
      <div className="gutter flex flex-col gap-[clamp(64px,8vw,120px)] py-[clamp(112px,13vw,200px)]">
        <div className="flex flex-wrap items-start gap-x-12 gap-y-8">
          <div className="flex flex-[0_0_220px] flex-col gap-[18px] pt-3.5">
            <span className="text-xs uppercase tracking-[0.2em] text-terracotta">{label}</span>
            <Mark className="h-[22px] w-[42px] text-parchment" knot={tone === "ink" ? "#D6503F" : "#1A1612"} />
          </div>
          <GradientWaveText
            as={headingLevel}
            waveColor={null}
            startColor="rgba(241, 232, 216, 0.22)"
            className="statement m-0 min-w-0 max-w-[980px] flex-[1_1_560px]"
          >
            {statement}
          </GradientWaveText>
        </div>
        <div data-queued-reveal-item className="indent-editorial">{children}</div>
      </div>
    </section>
  );
}

export function Blush({ children }: { children: ReactNode }) {
  return <span className="italic text-blush">{children}</span>;
}

export function OutlinedRow({
  href,
  kicker,
  title,
  text,
}: {
  href?: string;
  kicker: string;
  title: string;
  text: ReactNode;
}) {
  const inner = (
    <>
      <span className="flex-[0_0_200px] text-[13px] uppercase tracking-[0.1em] text-stone">{kicker}</span>
      <span className="flex-[1_1_320px] font-serif text-[26px] font-medium sm:text-[30px]">{title}</span>
      <span className="flex-[1_1_300px] text-[15px] leading-normal text-body">{text}</span>
    </>
  );
  const cls = `flex flex-wrap items-center gap-x-10 gap-y-3 border border-rule px-7 py-[26px] transition-colors duration-300${href ? " hover:border-madder hover:bg-paper" : ""}`;
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/** Centred call to action framed by two arched photos (hidden on phones). */
export function VisitCta({
  label,
  title,
  text,
  primary,
  secondary,
  left,
  right,
}: {
  label: string;
  title: ReactNode;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  left: Img;
  right: Img;
}) {
  return (
    <section aria-label={label} className="relative overflow-hidden bg-parchment">
      <div className="arch absolute bottom-0 left-[clamp(-120px,-4vw,-40px)] hidden aspect-[3/4] w-[clamp(180px,22vw,320px)] sm:block">
        <Image src={left.src} alt="" fill sizes="320px" className="archival object-cover" />
      </div>
      <div className="arch absolute top-[clamp(48px,6vw,96px)] right-[clamp(-120px,-4vw,-40px)] hidden aspect-[3/4] w-[clamp(160px,18vw,260px)] sm:block">
        <Image src={right.src} alt="" fill sizes="260px" className="object-cover" />
      </div>
      <div data-queued-reveal-children className="relative mx-auto flex max-w-[760px] flex-col items-center gap-6 px-[clamp(24px,5vw,48px)] py-[clamp(112px,12vw,176px)] text-center">
        <span className="label">{label}</span>
        <h2 data-heading-reveal className="h2 m-0">{title}</h2>
        <p className="m-0 max-w-[560px] font-serif text-[21px] leading-[1.55] text-body">{text}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5">
          <Link href={primary.href} className="pill">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="text-link">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
