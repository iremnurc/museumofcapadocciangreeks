# Brand: Woven Stone (final)

Live design canvas: https://claude.ai/artifact/W9Y3jGLaQpK1fRbyEU5WUP (private, so share it from the page's Share menu).
Philosophy: `design/philosophy.md`. The first PDF direction is kept in `design/archive-v1/` for history only.

## Logo: B, "Woven"

The museum's double spiral, counted onto a kilim grid (21 × 11 knots), with two contrasting knots at the spiral centres.

| File (`brand/logo/`) | Use |
|---|---|
| `mark-light.svg` | Ink mark with madder knots, on parchment or paper |
| `mark-dark.svg` | Parchment mark with bright-red knots (#D6503F), on ink |
| `mark-on-madder.svg` | Paper mark with ink knots, on madder |
| `mark-mono-ink.svg`, `mark-mono-madder.svg` | One colour: stamps, engraving, fax |
| `favicon.svg`, `favicon-dark.svg` | Square icons (madder, ink) |

**Lockups** are built in code with live type, not as outlined SVG:

- **Horizontal:** mark → 26 px gap → text block:
  - "MUSEUM OF THE": Commissioner 12 px, tracking 0.3em, madder.
  - Then, tight below it: "Cappadocian Greeks", EB Garamond 500 at 46 px, line-height 1.1.
  - Then, 8 px below: "HISTORICAL & ETHNOGRAPHICAL · NEA KARVALI", Commissioner 11 px, letter-spaced (about 0.265em) to span exactly the width of the name. No divider.
- **Stacked:** mark, then 18 px, then "MUSEUM OF THE" with "Cappadocian / Greeks" (36 px, line-height 1.08) directly under it.
- **Clear space:** 2 knots on every side.
- **Minimum size:** mark 21 px wide on screen, 10 mm in print. Always render with `shape-rendering: crispEdges`.

## Colour

| Token | Hex | Share | Use |
|---|---|---|---|
| parchment | `#F1E8D8` | 45% | page ground |
| paper | `#F8F3EA` | 7% | cards, panels |
| madder | `#8E2A22` | 25% | lead colour: hero fields, buttons, cards |
| madder-deep | `#6E1F19` | n/a | hover, depth |
| ink | `#1A1612` | 18% | text, dark sections, archive |
| gold | `#B8893F` | 4% | thin lines and border bands only |
| stone | `#6A6258` | n/a | small secondary text |
| indigo | `#1E2940` | ~1% | rare |
| knot-bright | `#D6503F` | n/a | red accent on ink |
| text-on-madder | `#F1E3DC` / `#F0D9A8` | n/a | body / eyebrow text on madder |

## Type: two fonts

- **EB Garamond** (400, 500, italic 400): headlines, story text, and the **lowercase italic section titles** ("the collections", "welcome", "what's on", "plan your visit"), plus italic numbering like `/01`.
- **Commissioner** (400–600): navigation, buttons, hours, prices, labels, eyebrows (uppercase, tracked).
- Both are on Google Fonts and cover Greek. Load them through `next/font/google` with the `latin` and `greek` subsets.

## Ornaments (`brand/ornaments/`)

All are drawn on the same knot grid as the logo, so they scale cleanly. Use **one motif, large, per section**.

| Motif | Use |
|---|---|
| `star.svg` | section openers |
| `eye.svg` | visit and contact |
| `rams-horn.svg` | events and the festival; crop it big off the edge of a card |
| `tree-of-life.svg` | history, families, people |
| `spiral.svg` | the mark as a giant motif |
| `border-band-tile.svg` | repeat horizontally as a section divider |
| `lattice-tile.svg` | repeat as a parchment knock-out over photos |

**Photo treatments (all in code):**

| Treatment | What it is | Used for |
|---|---|---|
| Window | photo clipped to a stepped kilim lozenge | collection cards |
| Knock-out | lattice in parchment or madder laid over part of a photo | hero, events |
| Archive ★ | black-and-white photo on madder with large pixel motifs | history, people (the user's favourite) |
| Object on arch | single object in a red rock-cut arch on a dotted catalogue grid | object pages |

## Photography brief

1. **Objects:** one object per photo, centred, on a plain neutral background (white, grey or parchment card). Even soft light with no harsh shadows, and the whole object in frame with some margin. These go into the arch and window frames.
2. **Details:** close-ups of embroidery, weave, silver work and coins. These fill the lozenge windows and the hero.
3. **People and archive:** old family photos (scans), festival photos, and dancers in costume. These get the black-and-white archive treatment, so colour quality matters less than the moment.
4. **Places:** the museum building, the Akontisma settlement, the village, and landscape.
5. **Specs:** the original files, at least 2400 px on the long side, JPG or HEIC. No filters, no watermarks, and no text on the image. Keep a note of what each object is (name, origin village, period, inventory number if there is one) and who took the photo, for credits.
