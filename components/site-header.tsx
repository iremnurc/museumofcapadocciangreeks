"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lockup, Mark } from "@/components/mark";
import { images, nav, site } from "@/content/site";

/**
 * Dark top bar + full-screen menu. The menu wipes down from the top, the links rise
 * into place one after another and the close button draws itself into an ×, after
 * Osmo's "Bold Full Screen Navigation". Hovering a link sets it in italic and dims the rest.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Collections and Events have red heroes, so the bar turns red with them
  const red = ["/collections", "/events"].some((p) => pathname.startsWith(p));
  const close = () => setOpen(false);

  return (
    <header className={`relative z-10 border-b text-parchment ${red ? "border-rule-madder bg-madder" : "border-rule-dark bg-ink"}`}>
      <div className="gutter flex items-center justify-between gap-4 py-[18px]">
        <Link href="/" className="text-parchment hover:text-parchment" aria-label={`${site.name}, home`}>
          <Lockup />
        </Link>
        <div className="flex items-center gap-2.5">
          <Link href="/contact#visit" className={`pill hidden sm:inline-flex ${red ? "bg-ink! hover:bg-parchment! hover:text-ink!" : ""}`}>
            Visit us
          </Link>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="ring-btn group flex h-[46px] w-[46px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-parchment bg-transparent hover:bg-parchment"
            >
              <span className="block h-[1.5px] w-[18px] origin-right bg-parchment transition-[transform,background-color] duration-500 ease-[cubic-bezier(.7,0,.3,1)] group-hover:scale-x-50 group-hover:bg-ink" />
              <span className="block h-[1.5px] w-[18px] origin-left bg-parchment transition-[transform,background-color] duration-500 ease-[cubic-bezier(.7,0,.3,1)] group-hover:scale-x-50 group-hover:bg-ink" />
            </Dialog.Trigger>
            <Dialog.Portal forceMount>
              <Dialog.Content
                forceMount
                aria-describedby={undefined}
                // full-screen, so there is no "outside"; also stops the opening click from closing it
                onInteractOutside={(e) => e.preventDefault()}
                className="menu-tile gutter fixed inset-0 z-50 flex flex-col overflow-auto bg-ink pt-[18px] pb-10 text-parchment focus:outline-none"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="flex items-center justify-between">
                  <Link href="/" onClick={close} aria-label="Home" className="text-parchment">
                    <Mark className="h-[30px] w-[57px]" />
                  </Link>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="menu-x ring-btn group relative h-[46px] w-[46px] cursor-pointer rounded-full border border-parchment bg-transparent hover:bg-parchment"
                  >
                    <span className="absolute top-1/2 left-1/2 -mt-px -ml-[9px] block h-[1.5px] w-[18px] bg-parchment group-hover:bg-ink" />
                    <span className="absolute top-1/2 left-1/2 -mt-px -ml-[9px] block h-[1.5px] w-[18px] bg-parchment group-hover:bg-ink" />
                  </Dialog.Close>
                </div>
                <div className="flex flex-1 flex-wrap items-center gap-10 py-10">
                  <nav aria-label="Main" className="flex-[1_1_520px]">
                    <ul className="menu-list m-0 flex list-none flex-col gap-1 p-0">
                      {nav.map((item, i) => {
                        const current = pathname.startsWith(item.href);
                        return (
                          <li key={item.href} className="menu-li overflow-hidden">
                            <Link
                              href={item.href}
                              onClick={close}
                              aria-current={current ? "page" : undefined}
                              className={`menu-link flex items-baseline gap-[18px] py-1.5 ${current ? "text-parchment" : "text-stone"} hover:text-parchment`}
                            >
                              <span className="text-sm text-ash not-italic">0{i + 1}</span>
                              <span className="menu-word font-serif leading-none" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
                                {item.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <figure className="menu-fade m-0 flex flex-[0_1_340px] flex-col gap-2.5">
                    <div className="arch relative aspect-[3/4] w-full">
                      <Image src={images.dress.src} alt={images.dress.alt} fill sizes="340px" className="object-cover object-[50%_30%]" />
                    </div>
                    <figcaption className="text-xs text-ash">Embroidered velvet dress · Costumes &amp; jewellery</figcaption>
                  </figure>
                </div>
                <div className="menu-fade flex flex-wrap gap-x-8 gap-y-2 border-t border-rule-dark pt-[18px] text-sm text-ash">
                  <span>
                    Mon–Sat {site.hours.winter.time} ({site.hours.winter.short}) · {site.hours.summer.time} ({site.hours.summer.short})
                  </span>
                  <span>Nea Karvali, Kavala</span>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
