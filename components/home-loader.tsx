"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images, type Img } from "@/content/site";

gsap.registerPlugin(SplitText, CustomEase);

// Order matters: the middle one (index 2) is the image that grows to fill the screen.
const strip: Img[] = [images.rugStars, images.necklace, images.display, images.censer, images.dress];
const CENTER = 2;
const SEEN_KEY = "mcg-loader-seen";

/**
 * Opening animation for Home, after Osmo's "Crisp Loading Animation": a strip of objects
 * slides through, the side ones shrink, the middle photo grows to fill the screen, then it
 * fades away and the hero title rises in. Plays once per browser session; skipped with
 * reduced motion. A CSS fallback removes the overlay after a few seconds if scripts fail.
 */
export function HomeLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const html = document.documentElement;
    const finish = () => {
      html.style.overflow = "";
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setDone(true);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    root.style.animation = "none"; // cancel the no-JS fallback

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const title = hero?.querySelector<HTMLElement>("[data-hero-title]");
    const fades = hero ? [...hero.querySelectorAll<HTMLElement>("[data-hero-fade]")] : [];
    const singles = root.querySelectorAll<HTMLElement>("[data-loader-single]");
    const shrink = root.querySelectorAll<HTMLElement>("[data-loader-shrink]");
    const medias = root.querySelectorAll<HTMLElement>("[data-loader-media]");
    const radius = root.querySelector<HTMLElement>("[data-loader-radius]");

    CustomEase.create("museum-wipe", "0.625, 0.05, 0, 1");
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      if (title) {
        split = new SplitText(title, { type: "words", mask: "words" });
        gsap.set(split.words, { yPercent: 110 });
      }
      gsap.set(fades, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" }, onComplete: finish });
      tl.fromTo(singles, { xPercent: 500 }, { xPercent: -500, duration: 2.5, stagger: 0.05 })
        .to(shrink, {
          scale: 0.5,
          duration: 2,
          stagger: { each: 0.05, from: "edges", ease: "none" },
        }, "-=0.1")
        .fromTo(medias, { width: "10em", height: "10em" }, { width: "100vw", height: "100dvh", duration: 2 }, "<0.5")
        // the arch opens into a full rectangle as the photo fills the screen
        .call(() => radius?.style.setProperty("border-radius", "0"), undefined, "<0.9")
        .to(root, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.2")
        .to(split?.words ?? [], { yPercent: 0, stagger: 0.075, ease: "expo.out", duration: 1 }, "<0.2")
        .to(fades, { opacity: 1, ease: "power1.inOut", duration: 0.6, stagger: 0.1 }, "<0.15");
    });

    return () => {
      ctx.revert();
      split?.revert();
      html.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const group = (duplicate: boolean) => (
    <div
      className={duplicate ? "absolute top-0 left-0 flex items-center justify-center" : "relative left-full flex items-center justify-center"}
      aria-hidden
    >
      {strip.map((img, i) => {
        const center = !duplicate && i === CENTER;
        return (
          <div key={i} data-loader-single className="relative px-[1em]">
            <div
              data-loader-media=""
              data-loader-radius={center ? "" : undefined}
              className={`relative flex h-[10em] w-[10em] items-center justify-center overflow-hidden ${
                center ? "rounded-t-full transition-[border-radius] duration-500 ease-[cubic-bezier(1,0,0,1)]" : "rounded-t-full"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                priority
                sizes={center ? "100vw" : "20vw"}
                data-loader-shrink={!duplicate && !center ? "" : undefined}
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="loader-fallback fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
      style={{ fontSize: "max(1vw, 1.8vh)" }}
    >
      <div className="relative flex items-center justify-center">
        <div className="relative overflow-hidden">
          {group(true)}
          {group(false)}
        </div>
        <div className="pointer-events-none absolute -top-px -left-px h-[calc(100%+2px)] w-[5em] bg-gradient-to-r from-ink from-20% to-transparent" />
        <div className="pointer-events-none absolute -top-px -right-px h-[calc(100%+2px)] w-[5em] bg-gradient-to-l from-ink from-20% to-transparent" />
      </div>
    </div>
  );
}
