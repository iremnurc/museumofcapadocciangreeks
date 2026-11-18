"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Picture-in-a-window parallax: the frame scrolls with the page while the picture inside
 * drifts by `travel` px. The inner layer is oversized by `travel` on each side so no edge
 * ever shows. Off for reduced motion.
 */
export function Parallax({ children, travel = 48 }: { children: ReactNode; travel?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      el,
      { y: -travel },
      {
        y: travel,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [travel]);

  return (
    <div ref={ref} className="absolute inset-x-0 will-change-transform" style={{ top: -travel, bottom: -travel }}>
      {children}
    </div>
  );
}
