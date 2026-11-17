"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import type { Img } from "@/content/site";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type MediaItem = { img: Img; frame: "arch" | "pill" | "rect" | "circle"; pos?: string };

const frames = { arch: "rounded-t-full", pill: "rounded-full aspect-[3/4]!", rect: "", circle: "rounded-full" } as const;

/**
 * Sticky section: the content stays centred while objects fly out from the middle,
 * growing and fading as you scroll. Based on Osmo's "Scaling Media on Scroll (Sticky)".
 * With reduced motion the objects stay hidden and the section is one screen tall.
 */
export function ScalingMedia({
  id,
  items,
  children,
  label,
  distance = 35,
}: {
  id?: string;
  items: readonly MediaItem[];
  children: ReactNode;
  label: string;
  distance?: number; // scroll per object, in % of the screen height
}) {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    if (!root || !sticky) return;
    const els = [...root.querySelectorAll<HTMLElement>("[data-media-item]")];

    const scaleStart = 0.4, scaleEnd = 1.5, offsetStart = 0.4, offsetEnd = 1, stagger = 0.3;
    const offset = Math.random() * Math.PI * 2;
    const angles = els.map((_, i) => offset + i * 2.399963 + (Math.random() - 0.5) * 0.6);
    let width = root.clientWidth;
    let height = sticky.offsetHeight;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const measure = () => {
        width = root.clientWidth;
        height = sticky.offsetHeight;
        root.style.height = `${height + (els.length * distance * height) / 100}px`;
      };
      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${root.offsetHeight - sticky.offsetHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      els.forEach((el, i) => {
        const dx = Math.cos(angles[i]);
        const dy = Math.sin(angles[i]);
        const at = i * stagger;
        tl.fromTo(
          el,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => dx * width * (offsetStart * 0.5 + (1 - scaleStart) * 0.3),
            y: () => dy * height * (offsetStart * 0.5 + (1 - scaleStart) * 0.3),
            scale: scaleStart,
            transformOrigin: () => `${el.offsetWidth / 2 - dx * width * 0.3}px ${el.offsetHeight / 2 - dy * height * 0.3}px`,
          },
          {
            x: () => dx * width * (offsetEnd * 0.5 + (1 - scaleEnd) * 0.3),
            y: () => dy * height * (offsetEnd * 0.5 + (1 - scaleEnd) * 0.3),
            scale: scaleEnd,
            duration: 1,
          },
          at,
        );
        tl.fromTo(el, { autoAlpha: 0, filter: "blur(0.75em)" }, { autoAlpha: 1, filter: "blur(0em)", duration: 0.2 }, at);
        tl.to(el, { autoAlpha: 0, filter: "blur(0.75em)", duration: 0.2 }, at + 0.8);
      });

      const ro = new ResizeObserver(() => {
        if (width !== root.clientWidth || height !== sticky.offsetHeight) ScrollTrigger.refresh();
      });
      ro.observe(root);
      ro.observe(sticky);

      return () => {
        ro.disconnect();
        ScrollTrigger.removeEventListener("refreshInit", measure);
        root.style.height = "";
      };
    });

    return () => mm.revert();
  }, [distance, items.length]);

  return (
    <section id={id} ref={rootRef} aria-label={label} className="relative min-h-screen">
      <div ref={stickyRef} className="sticky top-0 h-svh overflow-hidden">
        <div className="relative z-[1] flex h-full w-full flex-col items-center justify-center px-4">{children}</div>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {items.map((m, i) => (
            <div
              key={i}
              data-media-item
              className="invisible absolute top-1/2 left-1/2 flex w-[28vw] items-center justify-center opacity-0 md:w-[clamp(9em,14vw,16em)]"
            >
              <div className={cn("relative aspect-[3/4] w-full overflow-hidden", frames[m.frame], m.frame === "circle" && "aspect-square")}>
                <Image src={m.img.src} alt="" fill sizes="(min-width: 768px) 360px, 40vw" className="object-cover" style={{ objectPosition: m.pos }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
