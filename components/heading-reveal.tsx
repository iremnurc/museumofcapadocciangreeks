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
 * Fail-safe: headings already on screen animate at once, any error just shows the
 * heading, and nothing can stay hidden for more than a couple of seconds.
 * Runs again after every page change; off for visitors who prefer reduced motion.
 */
export function HeadingReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLElement>("[data-heading-reveal]")];
    const show = (h: HTMLElement) => (h.style.visibility = "visible");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      headings.forEach(show);
      return;
    }

    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];
    let cancelled = false;

    const animate = (split: SplitText) =>
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.05,
        // put the heading back exactly as it was, so the masks never trim descenders
        onComplete: () => split.revert(),
      });

    const setup = () => {
      if (cancelled) return;
      headings.forEach((h) => {
        try {
          const split = new SplitText(h, { type: "lines", mask: "lines" });
          splits.push(split);
          split.masks.forEach((m) => {
            const el = m as HTMLElement;
            el.style.paddingBottom = "0.3em";
            el.style.marginBottom = "-0.3em";
            el.style.paddingRight = "0.08em";
            el.style.marginRight = "-0.08em";
          });
          gsap.set(split.lines, { yPercent: 110 });
          show(h);
          // already on screen (e.g. the page title): play now rather than wait for a scroll event
          if (h.getBoundingClientRect().top < window.innerHeight * 0.88) {
            animate(split);
          } else {
            triggers.push(ScrollTrigger.create({ trigger: h, start: "top 88%", once: true, onEnter: () => animate(split) }));
          }
        } catch {
          show(h);
        }
      });
    };

    // Wait for the web fonts so lines are measured with the real typeface, but never longer than 1.5 s.
    const fontTimeout = new Promise((r) => setTimeout(r, 1500));
    Promise.race([document.fonts?.ready ?? Promise.resolve(), fontTimeout]).then(setup, setup);

    // Last resort: nothing stays invisible.
    const safety = window.setTimeout(() => headings.forEach(show), 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      headings.forEach(show);
    };
  }, [pathname]);

  return null;
}
