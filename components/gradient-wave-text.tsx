"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Text that reveals letter by letter while you scroll: each letter goes from a faint
 * start colour, flashes through the wave colour and settles on the element's own CSS colour.
 * Based on Osmo's "Gradient Wave Text on Scroll". Off for visitors who prefer reduced motion.
 */
export function GradientWaveText({
  children,
  className,
  start = "top 85%",
  end = "center 40%",
  startColor = "rgba(26, 22, 18, 0.16)",
  waveColor = "#D6503F",
  duration = 0.5,
  scrub = 0.2,
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
  startColor?: string;
  waveColor?: string;
  duration?: number;
  scrub?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const endColor = getComputedStyle(el).color;
    const split = new SplitText(el, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        const chars = self.chars as HTMLElement[];
        const active = new Set<HTMLElement>();
        const progress = { value: 0 };
        let ready = false;

        const sync = () => {
          const count = Math.round(progress.value * chars.length);
          chars.forEach((c, i) => {
            gsap.killTweensOf(c);
            gsap.set(c, { color: i < count ? endColor : startColor });
            if (i < count) active.add(c);
            else active.delete(c);
          });
        };

        return gsap.context(() => {
          gsap.set(chars, { color: startColor });
          gsap.to(progress, {
            value: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              onRefresh: () => {
                ready = false;
                sync();
                requestAnimationFrame(() => (ready = true));
              },
            },
            onUpdate: () => {
              if (!ready) return;
              const count = Math.round(progress.value * chars.length);
              chars.forEach((c, i) => {
                const on = i < count;
                if (on && !active.has(c)) {
                  active.add(c);
                  gsap.killTweensOf(c);
                  gsap
                    .timeline()
                    .to(c, { color: waveColor, duration: duration * 0.3, ease: "power2.out" })
                    .to(c, { color: endColor, duration: duration * 0.7, ease: "power2.in" });
                } else if (!on && active.has(c)) {
                  active.delete(c);
                  gsap.killTweensOf(c);
                  gsap.to(c, { color: startColor, duration: duration * 0.5, ease: "none" });
                }
              });
            },
          });
        }, el);
      },
    });

    return () => split.revert();
  }, [start, end, startColor, waveColor, duration, scrub]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
