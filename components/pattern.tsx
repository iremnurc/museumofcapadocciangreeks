"use client";

import { useEffect, useId, useRef, useState } from "react";
import { elibelindeA, elibelindeB, kilimStarA, kilimStarB, lozenge, pitrakA, pitrakB, ramA, ramB } from "@/lib/pixels";

export type Motif = "lozenge" | "star" | "ram" | "elibelinde" | "pitrak";

type Spec = { a: string; b: string; w: number; h: number; pad: [number, number]; scale: number };

// Motifs laid out in half-drop rows: every other column is shifted down by half a row.
const halfDrop: Partial<Record<Motif, Spec>> = {
  elibelinde: { a: elibelindeA, b: elibelindeB, w: 27, h: 29, pad: [14, 10], scale: 2 },
  pitrak: { a: pitrakA, b: pitrakB, w: 23, h: 23, pad: [9, 9], scale: 3 },
  // yıldız (kilim star), traced from the reference sheet
  star: { a: kilimStarA, b: kilimStarB, w: 21, h: 17, pad: [11, 9], scale: 3 },
};

function Tile({ motif, id }: { motif: Motif; id: string }) {
  const hd = halfDrop[motif];
  if (hd) {
    const W = hd.w + hd.pad[0];
    const H = hd.h + hd.pad[1];
    const m = (x: number, y: number) => (
      <g transform={`translate(${x},${y})`}>
        <path fill="#8E2A22" d={hd.a} />
        <path fill="#1A1612" d={hd.b} />
      </g>
    );
    const px = hd.pad[0] / 2;
    const py = hd.pad[1] / 2;
    return (
      <pattern id={id} width={W * 2} height={H} patternUnits="userSpaceOnUse" patternTransform={`scale(${hd.scale})`}>
        {m(px, py)}
        {m(W + px, py - H / 2)}
        {m(W + px, py + H / 2)}
      </pattern>
    );
  }
  if (motif === "lozenge")
    return (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="scale(6)">
        <path fill="#8E2A22" d={lozenge} />
      </pattern>
    );
  const r = (x: number, y: number) => (
    <g transform={`translate(${x},${y})`}>
      <path fill="#8E2A22" d={ramA} />
      <path fill="#1A1612" d={ramB} />
    </g>
  );
  return (
    <pattern id={id} width="48" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(3)">
      {r(1, 2)}
      {r(25, 28)}
    </pattern>
  );
}

// Size of one repeat on screen, in px.
const tileSize: Record<Motif, { w: number; h: number }> = {
  lozenge: { w: 16 * 6, h: 16 * 6 },
  star: { w: (21 + 11) * 2 * 3, h: (17 + 9) * 3 },
  ram: { w: 48 * 3, h: 52 * 3 },
  elibelinde: { w: (27 + 14) * 2 * 2, h: (29 + 10) * 2 },
  pitrak: { w: (23 + 9) * 2 * 3, h: (23 + 9) * 3 },
};

/**
 * Pixel-pattern field that fills its box with whole repeats only, centred, so it starts
 * and ends the same way at the top and bottom (and left and right). It fades out from
 * the middle towards the right edge.
 */
export function PatternField({ motif, className }: { motif: Motif; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const t = tileSize[motif];
  const cols = Math.floor(box.w / t.w);
  const rows = Math.floor(box.h / t.h);
  const w = cols * t.w;
  const h = rows * t.h;
  const x = Math.round((box.w - w) / 2);
  const y = Math.round((box.h - h) / 2);
  const p = `p-${uid}`;
  const g = `g-${uid}`;
  const m = `m-${uid}`;

  return (
    <svg ref={ref} aria-hidden className={className} shapeRendering="crispEdges" width="100%" height="100%">
      <defs>
        <Tile motif={motif} id={p} />
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.92" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={m} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#${g})`} />
        </mask>
      </defs>
      {cols > 0 && rows > 0 ? (
        // the group is moved so the pattern's own grid starts exactly at the block's corner
        <g transform={`translate(${x},${y})`} mask={`url(#${m})`}>
          <rect width={w} height={h} fill={`url(#${p})`} />
        </g>
      ) : null}
    </svg>
  );
}
