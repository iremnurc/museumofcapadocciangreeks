"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export type Step = { year: string; text: string };

/**
 * Timeline whose line fills as you scroll; each date lights up when it reaches the
 * middle of the screen. After Osmo's "Step-by-step Timeline", restyled for the museum:
 * diamond markers on a thin rule, large serif years. Reduced motion shows the finished state.
 */
export function StepTimeline({ steps, activation = 0.5 }: { steps: Step[]; activation?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const line = root.querySelector<HTMLElement>("[data-line]")!;
    const fill = root.querySelector<HTMLElement>("[data-fill]")!;
    const items = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    const anchors = items.map((i) => i.querySelector<HTMLElement>("[data-marker]") ?? i);
    const last = items.length - 1;
    let fractions = [0];
    let current = -2;

    const measure = () => {
      const base = line.parentElement!.getBoundingClientRect().top;
      const centers = anchors.map((a) => {
        const b = a.getBoundingClientRect();
        return b.top + b.height / 2 - base;
      });
      const span = centers[last] - centers[0];
      line.style.top = `${centers[0]}px`;
      line.style.height = `${span}px`;
      fractions = centers.map((c) => (span > 0 ? (c - centers[0]) / span : 0));
    };

    const setCurrent = (index: number) => {
      if (index === current) return;
      current = index;
      items.forEach((item, i) => {
        item.dataset.status = index >= 0 && i <= index ? "active" : "inactive";
        item.toggleAttribute("data-current", i === index);
      });
    };

    const update = (self: ScrollTrigger) => {
      const reached = self.isActive || self.progress >= 1;
      if (!reached) return setCurrent(-1);
      let idx = 0;
      fractions.forEach((f, i) => {
        if (self.progress + 0.0001 >= f) idx = i;
      });
      setCurrent(idx);
    };

    setCurrent(-1);
    gsap.set(fill, { transformOrigin: "top", scaleY: 0 });
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);
      const pct = `${activation * 100}%`;
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: line, start: `top ${pct}`, end: `bottom ${pct}`, scrub: true, onUpdate: update, onToggle: update, onRefresh: update },
        },
      );
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        ScrollTrigger.removeEventListener("refreshInit", measure);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      measure();
      gsap.set(fill, { scaleY: 1 });
      setCurrent(last);
    });

    return () => mm.revert();
  }, [activation, steps.length]);

  return (
    <div ref={rootRef} className="step-timeline relative">
      <div data-line className="pointer-events-none absolute left-[11px] w-0.5 bg-rule">
        <div data-fill className="absolute inset-0 bg-madder" />
      </div>
      <ol className="m-0 flex list-none flex-col gap-[clamp(64px,9vw,128px)] p-0">
        {steps.map((s) => (
          <li key={s.year} data-step data-status="inactive" className="relative flex items-start gap-[clamp(24px,4vw,56px)]">
            {/* diamond marker, centred on the line */}
            <span data-marker aria-hidden className="relative mt-[clamp(22px,2.6vw,38px)] flex h-6 w-6 flex-none items-center justify-center">
              <span className="step-marker block h-4 w-4 rotate-45 border border-stone/50 bg-parchment" />
            </span>
            <div className="step-content flex min-w-0 max-w-[680px] flex-col gap-4">
              <span className="font-serif text-[clamp(64px,7vw,104px)] leading-[0.9] text-ink">{s.year}</span>
              <span className="font-serif text-[22px] leading-normal text-body">{s.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
