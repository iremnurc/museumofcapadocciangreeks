"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Headings marked `data-heading-reveal` rise line by line from behind a mask as they
 * come into view: a quiet, typographic reveal (no fading letters, no bounce).
 * Runs again after every page change; off for visitors who prefer reduced motion.
 */
export function HeadingReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLElement>("[data-heading-reveal]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      headings.forEach((h) => (h.style.visibility = "visible"));
      return;
    }

    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      headings.forEach((h) => {
        const split = new SplitText(h, { type: "lines", mask: "lines" });
        splits.push(split);
        // give the masks room so descenders and italic overhangs aren't clipped
        split.masks.forEach((m) => {
          const el = m as HTMLElement;
          el.style.paddingBottom = "0.3em";
          el.style.marginBottom = "-0.3em";
          el.style.paddingRight = "0.08em";
          el.style.marginRight = "-0.08em";
        });
        gsap.set(split.lines, { yPercent: 110 });
        h.style.visibility = "visible";
        triggers.push(
          ScrollTrigger.create({
            trigger: h,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(split.lines, {
                yPercent: 0,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.09,
                delay: 0.05,
                // put the heading back exactly as it was, so the masks never trim descenders
                onComplete: () => split.revert(),
              }),
          }),
        );
      });
    });

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      headings.forEach((h) => (h.style.visibility = "visible"));
    };
  }, [pathname]);

  return null;
}
