import Image from "next/image";
import { DraggableMarquee } from "@/components/draggable-marquee";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

const frames = { arch: "rounded-t-full", rect: "", pill: "rounded-full" } as const;

export function HomeHero() {
  return (
    <section data-hero aria-label="Welcome" className="bg-ink text-parchment">
      <div className="gutter flex flex-col gap-[clamp(40px,5vw,80px)] pt-[clamp(20px,2.5vw,32px)] pb-[clamp(72px,8vw,128px)]">
        <div data-hero-fade className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-mist">
          {home.info.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
        <h1 data-hero-title className="m-0 font-serif font-normal leading-[0.84] tracking-[-0.02em]" style={{ fontSize: "clamp(64px, 13.6vw, 196px)" }}>
          Cappadocian <span className="block italic text-terracotta" style={{ marginLeft: "0.18em" }}>Greeks</span>
        </h1>
        <DraggableMarquee label="Objects from the collection (drag to spin)" className="-mx-[clamp(16px,3vw,40px)] w-auto!">
          {home.marquee.map((item, i) => (
            <figure key={i} className="m-0 mr-[clamp(40px,5vw,80px)] flex w-[clamp(180px,17vw,250px)] flex-none flex-col gap-2.5">
              <div className={cn("relative aspect-[3/4] overflow-hidden", frames[item.frame as keyof typeof frames])}>
                <Image
                  src={item.img.src}
                  alt={`${item.img.alt}, detail`}
                  fill
                  sizes="250px"
                  draggable={false}
                  loading="eager"
                  className="pointer-events-none object-cover"
                  style={{ objectPosition: item.pos, transform: `scale(${item.zoom})`, transformOrigin: item.pos }}
                />
              </div>
              <figcaption className="text-[11px] text-mist">
                <strong className="font-semibold text-parchment">(FIG. {i + 1})</strong> {item.caption}
              </figcaption>
            </figure>
          ))}
        </DraggableMarquee>
      </div>
    </section>
  );
}
