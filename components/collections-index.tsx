"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { home } from "@/content/home";

const INTERVAL = 5000; // ms per collection when playing on its own

export function CollectionsIndex() {
  const items = home.collections;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay: move to the next collection every few seconds unless the visitor is
  // hovering or focused inside the section, or prefers reduced motion.
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduced, items.length]);

  const current = items[index];

  return (
    <section
      aria-label="The collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="gutter-wide mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-20 gap-y-14 py-[clamp(96px,11vw,168px)]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
          <span className="label">The collections</span>
          <ul role="list" className="m-0 flex list-none flex-col gap-1 p-0">
            {items.map((c, i) => {
              const on = i === index;
              return (
                <li key={c.id} className="flex items-baseline gap-[18px]">
                  <span className="w-7 flex-none text-[13px] text-madder">0{i + 1}</span>
                  <div className="flex flex-col">
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
                    {/* progress line under the active name while playing */}
                    <span aria-hidden className="block h-px w-full bg-rule/0">
                      {on && !paused && !reduced ? (
                        <span key={index} className="block h-px origin-left bg-madder" style={{ animation: `grow ${INTERVAL}ms linear forwards` }} />
                      ) : null}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {/* All three texts share one grid cell, so the block always has the height of the longest. */}
          <div className="grid sm:ml-[46px]">
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
          <Link href={`/collections#${current.id}`} className="pill self-start sm:ml-[46px]">
            Explore the collections
          </Link>
        </div>
        <figure className="m-0 mx-auto flex min-w-[260px] flex-[0_1_460px] flex-col gap-3">
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
          <figcaption className="text-xs tracking-[0.06em] text-stone">
            <span className="font-semibold text-ink">(FIG. {index + 1})</span> {current.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
