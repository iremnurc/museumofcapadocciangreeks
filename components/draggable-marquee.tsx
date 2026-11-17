"use client";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(Observer, ScrollTrigger);

/**
 * Looping marquee you can fling with the mouse or a finger; it speeds up in the drag
 * direction, then settles back to a slow drift that way. After Osmo's "Draggable Marquee
 * (Directional)". Pauses off-screen; with reduced motion it becomes a plain scrollable row.
 */
export function DraggableMarquee({
  children,
  className,
  duration = 70,
  multiplier = 35,
  sensitivity = 0.01,
  direction = "left",
  label,
}: {
  children: ReactNode;
  className?: string;
  duration?: number; // seconds per full list width
  multiplier?: number; // max speed boost from a drag
  sensitivity?: number;
  direction?: "left" | "right";
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const collRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapRef.current;
    const collection = collRef.current;
    const list = listRef.current;
    if (!wrapper || !collection || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrapper.style.overflowX = "auto";
      return;
    }

    const clones: HTMLElement[] = [];
    let marquee: gsap.core.Tween | undefined;
    let observer: Observer | undefined;
    let trigger: ScrollTrigger | undefined;

    const setup = () => {
      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const listWidth = list.scrollWidth;
      if (!wrapperWidth || !listWidth) return;

      while (collection.scrollWidth < wrapperWidth + listWidth + 2) {
        const c = list.cloneNode(true) as HTMLElement;
        c.setAttribute("aria-hidden", "true");
        c.querySelectorAll("img").forEach((img) => img.setAttribute("alt", ""));
        collection.appendChild(c);
        clones.push(c);
      }

      const wrapX = gsap.utils.wrap(-listWidth, 0);
      gsap.set(collection, { x: 0 });
      const loop = gsap.to(collection, {
        x: -listWidth,
        duration,
        ease: "none",
        repeat: -1,
        onReverseComplete: () => {
          loop.progress(1);
        },
        modifiers: { x: (x) => `${wrapX(parseFloat(x))}px` },
      });
      marquee = loop;

      const base = direction === "right" ? -1 : 1;
      const scale = { value: base };
      if (base < 0) loop.progress(1);
      const apply = () => {
        loop.timeScale(scale.value);
        wrapper.dataset.direction = scale.value < 0 ? "right" : "left";
      };
      apply();

      observer = Observer.create({
        target: wrapper,
        type: "pointer,touch",
        preventDefault: false, // keep vertical page scrolling on phones (touch-action: pan-y)
        onChangeX: (e) => {
          const v = gsap.utils.clamp(-multiplier, multiplier, e.velocityX * -sensitivity);
          gsap.killTweensOf(scale);
          gsap
            .timeline({ onUpdate: apply })
            .to(scale, { value: v, duration: 0.1, overwrite: true })
            .to(scale, { value: v < 0 ? -1 : 1, duration: 1 });
        },
      });

      trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            loop.resume();
            apply();
            observer?.enable();
          } else {
            loop.pause();
            observer?.disable();
          }
        },
      });
    };

    // Wait for images to have their size before measuring.
    const imgs = [...list.querySelectorAll("img")];
    let cancelled = false;
    Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => undefined)))).then(() => {
      if (!cancelled) setup();
    });

    return () => {
      cancelled = true;
      marquee?.kill();
      observer?.kill();
      trigger?.kill();
      clones.forEach((c) => c.remove());
      gsap.set(collection, { clearProps: "transform" });
    };
  }, [duration, multiplier, sensitivity, direction]);

  return (
    <div
      ref={wrapRef}
      role="region"
      aria-label={label}
      data-direction={direction}
      className={`flex w-full cursor-grab touch-pan-y items-center overflow-hidden select-none active:cursor-grabbing ${className ?? ""}`}
    >
      <div ref={collRef} className="flex flex-none items-end will-change-transform">
        <div ref={listRef} className="flex flex-none items-end">
          {children}
        </div>
      </div>
    </div>
  );
}
