"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function SeasonHours() {
  const month = new Date().getMonth(); // 0 = January
  const [season, setSeason] = useState<"winter" | "summer">(month >= 4 && month <= 9 ? "summer" : "winter");
  const s = site.hours[season];
  const btn = (on: boolean) =>
    `cursor-pointer rounded-full border-0 px-[18px] py-[11px] text-sm ${on ? "bg-parchment font-medium text-ink" : "bg-transparent text-parchment"}`;

  return (
    <div className="flex flex-col gap-[clamp(48px,6vw,80px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="m-0 font-serif text-[clamp(64px,9vw,136px)] font-normal leading-[0.9] text-parchment">
          Visit <span className="italic text-terracotta">us</span>
        </h2>
        <div role="group" aria-label="Season" className="flex gap-1 rounded-full border border-[#5A524A] p-1">
          {(["winter", "summer"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={season === k} onClick={() => setSeason(k)} className={btn(season === k)}>
              {site.hours[k].label} · {site.hours[k].short}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap border-t border-rule-dark">
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 pt-8 pr-8 pb-2">
          <span className="text-xs tracking-[0.2em] text-terracotta">HOURS</span>
          <span className="font-serif text-[56px] leading-none text-parchment" aria-live="polite">{s.time}</span>
          <span className="text-[15px]">{site.hours.days} · {site.hours.closed}</span>
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 pt-8 pb-2 sm:border-l sm:border-rule-dark sm:px-8">
          <span className="text-xs tracking-[0.2em] text-terracotta">ADMISSION</span>
          <span className="font-serif text-[56px] leading-none text-parchment">{site.admission.adult}</span>
          <span className="text-[15px] leading-normal">Adults. {site.admission.free}</span>
        </div>
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 pt-8 pb-2 sm:border-l sm:border-rule-dark sm:pl-8">
          <span className="text-xs tracking-[0.2em] text-terracotta">FIND US</span>
          <span className="font-serif text-[40px] leading-[1.05] text-parchment">
            Nea Karvali, <span className="italic">Kavala</span>
          </span>
          <span className="text-[15px] leading-normal">About 8 km from Kavala, above the old Kavala–Xanthi road.</span>
          <a href={site.mapUrl} className="pill mt-2 self-start">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
