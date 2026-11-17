import { useId } from "react";
import { lozenge, ramA, ramB, starA, starB } from "@/lib/pixels";

export type Motif = "lozenge" | "star" | "ram";

function Tile({ motif, id }: { motif: Motif; id: string }) {
  if (motif === "lozenge")
    return (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="scale(6)">
        <path fill="#8E2A22" d={lozenge} />
      </pattern>
    );
  if (motif === "star") {
    const s = (x: number, y: number) => (
      <g transform={`translate(${x},${y})`}>
        <path fill="#8E2A22" d={starA} />
        <path fill="#1A1612" d={starB} />
      </g>
    );
    return (
      <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="scale(4)">
        {s(2, 2)}
        {s(20, 20)}
        <path fill="#8E2A22" d="M18 9h1v1h-1zM0 27h1v1h-1z" />
      </pattern>
    );
  }
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

/** A pixel-pattern field that fills its box and fades out to the right. */
export function PatternField({ motif, className }: { motif: Motif; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const p = `p-${uid}`;
  const g = `g-${uid}`;
  const m = `m-${uid}`;
  return (
    <svg aria-hidden className={className} shapeRendering="crispEdges" width="100%" height="100%">
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
      <rect width="100%" height="100%" fill={`url(#${p})`} mask={`url(#${m})`} />
    </svg>
  );
}
