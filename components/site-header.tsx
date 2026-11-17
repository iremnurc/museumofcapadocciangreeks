"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lockup, Mark } from "@/components/mark";
import { images, nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10 border-b border-rule-dark bg-ink text-parchment">
      <div className="gutter flex items-center justify-between gap-4 py-[18px]">
        <Link href="/" className="text-parchment hover:text-parchment" aria-label={`${site.name}, home`}>
          <Lockup />
        </Link>
        <div className="flex items-center gap-2.5">
          <Link href="/contact#visit" className="pill hidden sm:inline-flex">
            Visit us
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              aria-label="Open menu"
              className="flex h-[46px] w-[46px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-parchment"
            >
              <span className="block h-[1.5px] w-[18px] bg-parchment" />
              <span className="block h-[1.5px] w-[18px] bg-parchment" />
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="gutter flex flex-col pt-[18px] pb-10">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setOpen(false)} aria-label="Home" className="text-parchment">
                  <Mark className="h-[30px] w-[57px]" />
                </Link>
                <DialogClose
                  aria-label="Close menu"
                  className="h-[46px] w-[46px] cursor-pointer rounded-full border border-parchment text-xl text-parchment"
                >
                  ×
                </DialogClose>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-10 py-10">
                <nav aria-label="Main" className="flex flex-[1_1_520px] flex-col gap-1">
                  {nav.map((item, i) => {
                    const current = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={current ? "page" : undefined}
                        className={`flex items-baseline gap-[18px] py-1.5 ${current ? "text-parchment" : "text-stone"} hover:text-parchment`}
                      >
                        <span className="text-sm text-ash">0{i + 1}</span>
                        <span className="font-serif leading-none" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <figure className="m-0 flex flex-[0_1_340px] flex-col gap-2.5">
                  <div className="arch relative aspect-[3/4] w-full">
                    <Image src={images.dress.src} alt={images.dress.alt} fill sizes="340px" className="object-cover object-[50%_30%]" />
                  </div>
                  <figcaption className="text-xs text-ash">Embroidered velvet dress · Costumes &amp; jewellery</figcaption>
                </figure>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-rule-dark pt-[18px] text-sm text-ash">
                <span>
                  Mon–Sat {site.hours.winter.time} ({site.hours.winter.short}) · {site.hours.summer.time} ({site.hours.summer.short})
                </span>
                <span>Nea Karvali, Kavala</span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
