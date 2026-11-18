"use client";

import { useEffect, useRef, useState } from "react";
import { lozenge, ramA, ramB, starA, starB } from "@/lib/pixels";
import type { Motif } from "@/components/pattern";

// One cell per motif: its size in pattern pixels and the scale used on the site.
const cells: Record<Motif, { w: number; h: number; s: number; draw: () => React.ReactNode }> = {
  lozenge: { w: 16, h: 16, s: 6, draw: () => <path fill="#8E2A22" d={lozenge} /> },
  star: {
    w: 18, h: 18, s: 5,
    draw: () => (
      <g transform="translate(1.5,1.5)">
        <path fill="#8E2A22" d={starA} />
        <path fill="#1A1612" d={starB} />
      </g>
    ),
  },
  ram: {
    w: 24, h: 26, s: 4,
    draw: () => (
      <g transform="translate(1.5,2.5)">
        <path fill="#8E2A22" d={ramA} />
        <path fill="#1A1612" d={ramB} />
      </g>
    ),
  },
};

// Small deterministic random, so the layout is the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A field of whole motifs that breaks out of its section: full rows inside, a stepped
 * right edge with the odd stray motif, and a sparse row stepping out above and below
 * into the neighbouring sections. Place it inside a positioned box the size of the
 * pattern area; it overflows that box by one row at the top and bottom.
 */
export function PixelField({
  motif,
  className,
  bleed = "both",
}: {
  motif: Motif;
  className?: string;
  /** which neighbouring sections the motifs may step out into */
  bleed?: "both" | "top" | "bottom" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const c = cells[motif];
  const tw = c.w * c.s;
  const th = c.h * c.s;
  const tiles: { x: number; y: number }[] = [];

  if (size) {
    const rand = rng(motif.length * 977 + 13);
    const cols = Math.max(2, Math.round(size.w / tw));
    const rows = Math.max(2, Math.ceil(size.h / th));
    // rows -1 and `rows` sit outside the section
    for (let r = -1; r <= rows; r++) {
      const outside = r < 0 || r === rows;
      const edge = cols - 1 - Math.floor(rand() * 3); // stepped right edge
      for (let col = 0; col < cols + 2; col++) {
        let show: boolean;
        const allowed = r < 0 ? bleed === "both" || bleed === "top" : bleed === "both" || bleed === "bottom";
        if (outside) show = allowed && col % 2 === (r < 0 ? 0 : 1) && col < cols * 0.6;
        else show = col <= edge || (col === edge + 2 && rand() < 0.25); // occasional stray
        if (show) tiles.push({ x: col * tw, y: r * th });
      }
    }
  }

  return (
    <div ref={ref} aria-hidden className={className}>
      {size ? (
        <svg
          className="absolute left-0 overflow-visible"
          style={{ top: -th }}
          width={size.w + tw * 2}
          height={size.h + th * 2}
          shapeRendering="crispEdges"
        >
          <defs>
            <symbol id={`cell-${motif}`} viewBox={`0 0 ${c.w} ${c.h}`} width={tw} height={th}>
              {c.draw()}
            </symbol>
          </defs>
          {tiles.map((t, i) => (
            <use key={i} href={`#cell-${motif}`} x={t.x} y={t.y + th} width={tw} height={th} />
          ))}
        </svg>
      ) : null}
    </div>
  );
}
