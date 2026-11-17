import { markKnots, markPath } from "@/lib/pixels";

/** The Woven logo mark: a pixel double spiral with two knots. */
export function Mark({
  className,
  knot = "#D6503F",
  title,
}: {
  className?: string;
  knot?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 21 11"
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d={markPath} />
      <path fill={knot} d={markKnots} />
    </svg>
  );
}

export function Lockup({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <span className="flex items-center gap-3.5">
      <Mark className="h-[30px] w-[57px]" knot={dark ? "#D6503F" : "#8E2A22"} />
      <span className="flex flex-col">
        <span className={`text-[10px] leading-none tracking-[0.3em] ${dark ? "text-terracotta" : "text-madder"}`}>
          MUSEUM OF THE
        </span>
        <span className="font-serif text-[21px] font-medium leading-[1.1] sm:text-[23px]">Cappadocian Greeks</span>
      </span>
    </span>
  );
}
