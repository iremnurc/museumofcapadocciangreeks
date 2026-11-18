"use client";

import { useEffect, useId, useRef, useState } from "react";
import { elibelindeA, elibelindeB, kilimStarA, kilimStarB, lozenge, pitrakA, pitrakB, ramA, ramB } from "@/lib/pixels";

export type Motif = "lozenge" | "star" | "ram" | "elibelinde" | "pitrak";

type Spec = { a: string; b: string; w: number; h: number; pad: [number, number]; scale: number };

// Motifs laid out in half-drop rows: every other column is shifted down by half a row.
const halfDrop: Partial<Record<Motif, Spec>> = {
  elibelinde: { a: elibelindeA, b: elibelindeB, w: 27, h: 29, pad: [14, 10], scale: 2 },
  pitrak: { a: pitrakA, b: pitrakB, w: 23, h: 23, pad: [10, 10], scale: 2 },
  // yıldız (kilim star), traced from the reference sheet
  star: { a: kilimStarA, b: kilimStarB, w: 21, h: 17, pad: [12, 10], scale: 2 },
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
  star: { w: (21 + 12) * 2 * 2, h: (17 + 10) * 2 },
  ram: { w: 48 * 3, h: 52 * 3 },
  elibelinde: { w: (27 + 14) * 2 * 2, h: (29 + 10) * 2 },
  pitrak: { w: (23 + 10) * 2 * 2, h: (23 + 10) * 2 },
};

/**
 * Pixel-pattern field that fills its whole box. The repeat grid is centred in the box, so
 * whatever is cut off at the top matches the bottom, and the left matches the right.
 * It fades out over its last 40%, ending at the right edge (the section's centre).
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
  // shift the grid by half the leftover so the cut edges are the same on opposite sides
  const x = Math.round((box.w % t.w) / 2);
  const y = Math.round((box.h % t.h) / 2);
  const p = `p-${uid}`;
  const g = `g-${uid}`;
  const m = `m-${uid}`;

  return (
    <svg ref={ref} aria-hidden className={className} shapeRendering="crispEdges" width="100%" height="100%">
      <defs>
        <Tile motif={motif} id={p} />
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
          {/* fully visible for the first 60%, then fades out exactly at the section's centre */}
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={m} maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill={`url(#${g})`} />
        </mask>
      </defs>
      {box.w > 0 ? (
        // the group moves the pattern grid; the rect still covers the whole box
        <g transform={`translate(${x},${y})`}>
          <rect x={-x} y={-y} width={box.w} height={box.h} fill={`url(#${p})`} mask={`url(#${m})`} />
        </g>
      ) : null}
    </svg>
  );
}
