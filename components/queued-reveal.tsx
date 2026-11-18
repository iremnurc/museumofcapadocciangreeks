"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Queued scroll reveal, after Osmo's "Queued Scroll Reveal": elements fade and rise in as
 * they enter the screen, one after another from a single shared queue, so several entering
 * at once still arrive in order. Mark elements with `data-queued-reveal-item`, or put
 * `data-queued-reveal-children` on a parent to reveal each of its direct children.
 * Runs again after every page change; off for visitors who prefer reduced motion.
 */
export function QueuedReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const queue: Element[] = [];
    let running = false;
    const triggers: ScrollTrigger[] = [];

    const reveal = (item: Element) => {
      // keep the final opacity/visibility inline: the CSS hides items until they are revealed
      gsap.to(item, { autoAlpha: 1, duration: 1.2, ease: "power1.out" });
      gsap.to(item, { y: "0em", duration: 1.2, ease: "expo.out", clearProps: "transform" });
    };
    const next = () => {
      const item = queue.shift();
      if (!item) {
        running = false;
        return;
      }
      reveal(item);
      gsap.delayedCall(0.075, next); // stagger
    };

    const items = new Set<Element>([
      ...document.querySelectorAll("[data-queued-reveal-item]"),
      ...[...document.querySelectorAll("[data-queued-reveal-children]")].flatMap((g) => [...g.children]),
    ]);

    // headings have their own line reveal; leave them (and anything holding one) alone
    items.forEach((item) => {
      if (item.matches("[data-heading-reveal]") || item.querySelector("[data-heading-reveal]")) return;
      if (item.getBoundingClientRect().bottom <= 0) {
        gsap.set(item, { autoAlpha: 1 }); // already scrolled past
        return;
      }
      gsap.set(item, { autoAlpha: 0, y: "4em" });
      triggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: "top 100%",
          once: true,
          onEnter: () => {
            queue.push(item);
            if (queue.length > 12) reveal(queue.shift()!); // keep the backlog short
            if (!running) {
              running = true;
              gsap.delayedCall(0.1, next);
            }
          },
        }),
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      items.forEach((i) => gsap.set(i, { autoAlpha: 1, clearProps: "transform" }));
    };
  }, [pathname]);

  return null;
}
