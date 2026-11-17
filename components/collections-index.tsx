"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { home } from "@/content/home";

export function CollectionsIndex() {
  const [active, setActive] = useState(home.collections[0].id);
  const current = home.collections.find((c) => c.id === active) ?? home.collections[0];
  const n = home.collections.indexOf(current) + 1;

  return (
    <section aria-label="The collections">
      <div className="gutter-wide mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-20 gap-y-14 py-[clamp(96px,11vw,168px)]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-8">
          <span className="label">The collections</span>
          <ul role="list" className="m-0 flex list-none flex-col gap-1 p-0">
            {home.collections.map((c, i) => {
              const on = c.id === active;
              return (
                <li key={c.id} className="flex items-baseline gap-[18px]">
                  <span className="w-7 flex-none text-[13px] text-madder">0{i + 1}</span>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    onClick={() => setActive(c.id)}
                    className={`cursor-pointer border-0 bg-transparent p-0 py-1 text-left font-serif text-[40px] leading-[1.1] transition-colors sm:text-[56px] ${
                      on ? "italic text-ink" : "text-mist"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="m-0 max-w-[520px] font-serif text-[21px] leading-normal text-body sm:ml-[46px]" aria-live="polite">
            {current.text}
          </p>
          <Link href={`/collections#${current.id}`} className="pill self-start sm:ml-[46px]">
            Explore the collections
          </Link>
        </div>
        <figure className="m-0 mx-auto flex min-w-[260px] flex-[0_1_460px] flex-col gap-3">
          <div className="arch relative aspect-[4/5] bg-clay">
            <Image
              key={current.id}
              src={current.img.src}
              alt={current.img.alt}
              fill
              sizes="(min-width: 768px) 460px, 100vw"
              className="object-cover"
              style={{ objectPosition: current.pos }}
            />
          </div>
          <figcaption className="text-xs tracking-[0.06em] text-stone">
            <span className="font-semibold text-ink">(FIG. {n})</span> {current.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
