"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/home";

const INTERVAL = 5000; // ms per collection when playing on its own

export function CollectionsIndex() {
  const items = home.collections;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  // autoplay waits until the section has scrolled in and its reveal has played
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timer = window.setTimeout(() => setStarted(true), 1600);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay: move to the next collection every few seconds unless the visitor is
  // hovering or focused inside the section, or prefers reduced motion.
  useEffect(() => {
    if (!started || paused || reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduced, started, items.length]);

  const current = items[index];

  return (
    <section
      ref={sectionRef}
      aria-label="The collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="gutter flex flex-wrap items-center gap-x-20 gap-y-14 py-[clamp(96px,11vw,168px)]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
          <span data-queued-reveal-item className="label">The collections</span>
          <ul data-queued-reveal-children role="list" className="m-0 flex list-none flex-col gap-1 p-0">
            {items.map((c, i) => {
              const on = i === index;
              return (
                <li key={c.id} className="flex items-baseline gap-[18px]">
                  <span className="w-7 flex-none text-[13px] text-madder">0{i + 1}</span>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setIndex(i)}
                    onFocus={() => setIndex(i)}
                    onClick={() => setIndex(i)}
                    className={`cursor-pointer border-0 bg-transparent p-0 py-1 text-left font-serif text-[40px] leading-[1.1] transition-colors duration-300 sm:text-[56px] ${
                      on ? "italic text-ink" : "text-mist"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* All three texts share one grid cell, so the block always has the height of the longest. */}
          <div data-queued-reveal-item className="grid sm:ml-[46px]">
            {items.map((c, i) => (
              <p
                key={c.id}
                aria-hidden={i !== index}
                className={`col-start-1 row-start-1 m-0 max-w-[520px] font-serif text-[21px] leading-normal text-body transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "invisible opacity-0"
                }`}
              >
                {c.text}
              </p>
            ))}
          </div>
          <Link href={`/collections#${current.id}`} data-queued-reveal-item className="pill self-start sm:ml-[46px]">
            Explore the collections
          </Link>
        </div>
        <figure data-queued-reveal-item className="m-0 mx-auto flex min-w-[260px] flex-[0_1_460px] flex-col gap-3">
          <div className="arch relative aspect-[4/5] bg-clay">
            {items.map((c, i) => (
              <Image
                key={c.id}
                src={c.img.src}
                alt={i === index ? c.img.alt : ""}
                fill
                sizes="(min-width: 768px) 460px, 100vw"
                className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                style={{ objectPosition: c.pos }}
              />
            ))}
          </div>
          {/* progress: one segment per collection, the current one fills while playing */}
          <div aria-hidden className="flex gap-2">
            {items.map((c, i) => (
              <span key={c.id} className="relative block h-0.5 flex-1 overflow-hidden bg-rule">
                {i < index || (i === index && started && (paused || reduced)) ? <span className="absolute inset-0 bg-madder" /> : null}
                {i === index && started && !paused && !reduced ? (
                  <span key={`p${index}`} className="absolute inset-0 origin-left bg-madder" style={{ animation: `grow ${INTERVAL}ms linear forwards` }} />
                ) : null}
              </span>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
