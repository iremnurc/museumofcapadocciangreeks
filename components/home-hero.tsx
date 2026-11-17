import Image from "next/image";
import { home } from "@/content/home";
import { cn } from "@/lib/cn";

const frames = { arch: "rounded-t-full", rect: "", pill: "rounded-full" } as const;

function Figure({ item, n, hidden }: { item: (typeof home.marquee)[number]; n: number; hidden?: boolean }) {
  return (
    <figure aria-hidden={hidden || undefined} className="m-0 flex w-[clamp(180px,17vw,250px)] flex-none flex-col gap-2.5">
      <div className={cn("relative aspect-[3/4] overflow-hidden", frames[item.frame as keyof typeof frames])}>
        <Image
          src={item.img.src}
          alt={hidden ? "" : `${item.img.alt}, detail`}
          fill
          sizes="250px"
          className="object-cover"
          style={{ objectPosition: item.pos, transform: `scale(${item.zoom})`, transformOrigin: item.pos }}
        />
      </div>
      <figcaption className="text-[11px] text-mist">
        <strong className="font-semibold text-parchment">(FIG. {n})</strong> {item.caption}
      </figcaption>
    </figure>
  );
}

export function HomeHero() {
  return (
    <section aria-label="Welcome" className="bg-ink text-parchment">
      <div className="gutter flex flex-col gap-[clamp(40px,5vw,80px)] pt-[clamp(48px,6vw,88px)] pb-[clamp(72px,8vw,128px)]">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-mist">
          {home.info.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
        <h1 className="m-0 font-serif font-normal leading-[0.84] tracking-[-0.02em]" style={{ fontSize: "clamp(64px, 13.6vw, 196px)" }}>
          Cappadocian <span className="whitespace-nowrap italic text-terracotta sm:ml-[1.2em]">Greeks</span>
        </h1>
        <div
          role="region"
          aria-label="Objects from the collection"
          className="group -mx-[clamp(16px,3vw,40px)] overflow-hidden"
        >
          <div className="animate-marquee flex w-max items-end gap-[clamp(40px,5vw,80px)] px-[clamp(16px,3vw,40px)] group-hover:[animation-play-state:paused]">
            {home.marquee.map((m, i) => (
              <Figure key={`a${i}`} item={m} n={i + 1} />
            ))}
            {home.marquee.map((m, i) => (
              <Figure key={`b${i}`} item={m} n={i + 1} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
