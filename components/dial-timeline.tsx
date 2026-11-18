"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { StepTimeline, type Step } from "@/components/step-timeline";

gsap.registerPlugin(ScrollTrigger);

const STEP_DEG = 40; // how far the dial turns between two dates

/** One digit column that rolls to its value, like a counter. */
function Digit({ value, delay }: { value: number; delay: number }) {
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
      <span
        className="flex flex-col transition-transform duration-[900ms] ease-[cubic-bezier(.65,0,.35,1)]"
        style={{ transform: `translateY(${-value * 1.2}em)`, transitionDelay: `${delay}ms` }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block h-[1.2em] leading-[1.2em]">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * About timeline as a dial: the section holds still while you scroll, a large circle on
 * the left turns, and each date comes round to the marker; the year rolls like a counter
 * and its text changes. Visitors who prefer reduced motion get the plain step timeline.
 */
export function DialTimeline({ steps }: { steps: Step[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    const dial = dialRef.current;
    if (!root || !dial) return;
    const last = steps.length - 1;
    const ctx = gsap.context(() => {
      gsap.to(dial, {
        rotation: -STEP_DEG * last,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => setActive(Math.min(last, Math.round(self.progress * last))),
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, steps.length]);

  if (reduced) return <StepTimeline steps={steps} />;

  const step = steps[active];
  const digits = step.year.split("").map(Number);

  return (
    <section ref={rootRef} aria-label="Timeline" className="relative" style={{ height: `${steps.length * 75 + 25}svh` }}>
      {/* the dates for screen readers; the dial itself is decorative */}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.year}>
            {s.year}: {s.text}
          </li>
        ))}
      </ol>

      <div aria-hidden className="sticky top-0 h-svh overflow-hidden">
        {/* the dial: centre off-screen to the left, its right edge at the marker */}
        <div
          ref={dialRef}
          className="absolute top-1/2 aspect-square"
          style={{
            width: "var(--dial)",
            left: "calc(var(--marker) - var(--dial))",
            marginTop: "calc(var(--dial) / -2)",
            ["--dial" as string]: "min(92svh, 150vw)",
            ["--marker" as string]: "clamp(72px, 18vw, 260px)",
          }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
            <circle cx="50" cy="50" r="49.6" fill="none" stroke="#8E2A22" strokeWidth="0.35" />
            {Array.from({ length: 72 }, (_, i) => {
              const long = i % 6 === 0;
              const a = (i * 5 * Math.PI) / 180;
              const r1 = long ? 46.6 : 47.9;
              return (
                <line
                  key={i}
                  x1={50 + r1 * Math.cos(a)}
                  y1={50 + r1 * Math.sin(a)}
                  x2={50 + 49.2 * Math.cos(a)}
                  y2={50 + 49.2 * Math.sin(a)}
                  stroke="#8E2A22"
                  strokeOpacity={long ? 0.7 : 0.35}
                  strokeWidth={long ? 0.25 : 0.15}
                />
              );
            })}
          </svg>
        </div>

        {/* fixed marker on the circle's right edge */}
        <span
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-madder shadow-[0_0_0_5px_var(--color-parchment),0_0_0_6px_rgb(142_42_34/0.5)]"
          style={{ left: "clamp(72px, 18vw, 260px)" }}
        />

        {/* year + text: the year sits level with the marker, its label above and text below */}
        <div
          className="absolute top-1/2 right-4 -translate-y-1/2 sm:right-10"
          style={{ left: "calc(clamp(72px, 18vw, 260px) + clamp(28px, 4vw, 64px))" }}
        >
          <span className="absolute bottom-full mb-3 text-[13px] tracking-[0.2em] text-madder">
            0{active + 1} / 0{steps.length}
          </span>
          <div className="font-serif text-[clamp(72px,11vw,168px)] leading-none text-ink">
            {digits.map((d, i) => (
              <Digit key={i} value={d} delay={i * 70} />
            ))}
          </div>
          <p
            key={step.year}
            className="dial-text absolute top-full mt-4 max-w-[560px] font-serif text-[clamp(19px,1.7vw,24px)] leading-normal text-body"
          >
            {step.text}
          </p>
        </div>
      </div>
    </section>
  );
}
