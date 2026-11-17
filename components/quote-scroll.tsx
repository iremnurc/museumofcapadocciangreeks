import Link from "next/link";
import type { ReactNode } from "react";
import { GradientWaveText } from "@/components/gradient-wave-text";
import { ScalingMedia, type MediaItem } from "@/components/scaling-media";

/**
 * The scroll quote used on Home and About: a sticky section where the quote reveals
 * with the gradient wave while a few objects fly out from behind it.
 */
export function QuoteScroll({
  id,
  label,
  items,
  children,
  link,
  note,
}: {
  id: string;
  label: string;
  items: readonly MediaItem[];
  children: ReactNode;
  link?: { href: string; label: string };
  note?: string;
}) {
  return (
    <ScalingMedia id={id} label={label} items={items}>
      <GradientWaveText
        triggerId={id}
        start="top 70%"
        end="top -60%"
        className="m-0 max-w-[1000px] text-center font-serif text-[clamp(32px,4.6vw,64px)] leading-[1.12] text-ink"
      >
        {children}
      </GradientWaveText>
      {link ? (
        <Link href={link.href} className="text-link mt-8 inline-block">
          {link.label}
        </Link>
      ) : null}
      {note ? <span className="mt-8 inline-block text-[13px] text-stone">{note}</span> : null}
    </ScalingMedia>
  );
}
