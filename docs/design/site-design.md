# Site design: final (Home v2 direction)

The approved design lives on the canvas (Site pages: Home, Collections, Events, About, Contact; Phone: the same pages at 390 px; Archive: earlier versions). Branding is in `../brand.md`. This file records the decisions the build must follow.

## Global

| Element | Spec |
|---|---|
| Page background | parchment `#F1E8D8`; alternate sections on paper `#F8F3EA`; ink `#1A1612` for dark blocks; madder `#8E2A22` for editorial blocks |
| Type | EB Garamond for display and body copy, Commissioner for UI, labels and small text |
| H1 | EB Garamond 400, `clamp(64px, 11vw, 168px)`, line-height 0.88, letter-spacing −0.02em; the key word in italic terracotta `#E2A498` |
| H2 | EB Garamond 400, **56px**, line-height 1–1.05; second phrase in italic madder (on light) |
| Editorial statement | EB Garamond 400, `clamp(40px, 4.8vw, 68px)`, parchment on madder with an italic `#F0C9BE` second half |
| Label | Commissioner 12px, letter-spacing 0.2em, uppercase, madder (terracotta on dark) |
| Body | EB Garamond 20–21px, line-height 1.5, `#3E372F` |
| Buttons | pill, radius 999px, madder fill, parchment text, 14px/500, padding 13×24; secondary = italic serif text link with a 1px underline |
| Frames | arch (`border-radius: 999px 999px 0 0`), pill, plain rectangle; images fill and crop (`object-fit: cover`) |
| Archive photos | black and white: `grayscale(1) contrast(1.12) sepia(0.12)` |
| Gutters | `clamp(16px, 3vw, 40px)` for full-bleed sections; content max 1360px for editorial sections |
| Section rhythm | generous: 96–200px vertical padding on desktop |
| Motion | headings rise line by line from behind a mask as they come into view (1.3 s, expo out) · queued scroll reveal on headings, rows, columns and photos (fade + rise, one after another from a shared queue) · hero marquee (70 s loop, pauses on hover) and the Home quote's gradient wave text on scroll (letters go faint ink → knot red → ink); both off with reduced motion |

## Shared components

- **Top bar**: ink, logo (mark + "MUSEUM OF THE / Cappadocian Greeks"), "Visit us" pill (hidden < 600px), round outlined ☰ button.
- **Menu**: full-screen ink overlay; numbered links 01–04 in EB Garamond `clamp(48px, 7vw, 96px)`, current page in parchment, others in stone; arched dress photo; hours and place on the bottom rule.
- **Inner-page hero**: ink; info line (3 small items, space-between); giant H1; row with the intro paragraph and a wide 16:7 arched photo.
- **Pattern feature**: paper background; a pixel pattern from the left edge to the centre of the section (whole repeats only, centred, fading from 50% to 92% of its width); the photo (480px, 4:5) is centred in the section, text in the right-hand column. On phones the pattern is a band behind the top of the photo. **Motifs:** Home = elibelinde (hands on hips), Collections = pitrak (burdock), Events = yıldız (kilim star, traced from the reference sheet).
- **Madder editorial block**: label + small mark in a 220px left column, editorial statement on the right; below, indented by `clamp(0px, (100vw − 640px)/2, 268px)`, an arched photo or a list and copy above a thin rule.
- **Outlined rows**: 1px `#CDBDA3` border, padding 26×28; small caps label (200–240px) · 30px serif title · 15px description.
- **Visit-style CTA**: centred label, 56px H2, one sentence, pill + text link; two arched photos cropped off the left (bottom) and right (top) edges, hidden on phones.
- **Footer** (shared): eye-motif band on madder; four columns (Visit, Opening hours with season first, Museum links, Contact); copyright row with the small mark; giant "Cappadocian *Greeks*" cut by the bottom edge (shows about two thirds).

## Pages

1. **Home**: hero (info line, giant name, object marquee with FIG. captions) · today strip (hours, admission, place) · sticky quote section: the quote reveals with the gradient wave while 12 objects fly out from the centre, scaling and blurring (Osmo "Scaling Media on Scroll"; about 5 screens of scroll) · collections index (hover list 01–03 + switching arched image) · Great Festival pattern feature · what's on (2 outlined rows) · since 1987 madder block · visit CTA · footer.
2. **Collections**: hero (*collections*) · anchor strip 01–03 · costumes (text + arched dress with circular earrings inset) · church treasures (madder block, B&W censer) · rugs, kilims & ceramics (rug-star pattern feature with two small arches) · visit CTA.
3. **Events**: hero (*on*, Akontisma aerial) · programme rows · Great Festival (ram's-horn pattern feature, when/where) · symposiums madder block with four themes · academic contact CTA (Murat Eser).
4. **About**: hero (*Cappadocian Greeks*) · dial timeline (the section holds while you scroll; a large circle on the left with fine ticks turns 40° per date, a fixed red marker on its edge, the year rolls like a counter beside it, its text eases in; reduced motion gets the plain step timeline) · our story madder block · quote with floating objects · collections CTA.
5. **Contact**: hero (*us*, B&W building) · two people as outlined rows · form (underlined fields, pill submit, thank-you state with the eye motif) · visit block on ink (season switch, hours, €8 admission, find us + Google Maps).
