# Rebuild plan: Museum of Cappadocian Greeks

See `sitemap.md` for the current and proposed structure.

## Stack (proposed)

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Pages are static (SSG/ISR), so the site is fast and cheap to host |
| Styling / UI | **Tailwind CSS + shadcn/ui** | shadcn for the parts with behaviour (nav menu, sheet/mobile menu, dialog/lightbox, tabs, form, carousel); everything visual stays custom |
| i18n | **next-intl** with `/[lang]` routes | Greek + English from day one, with hreflang |
| Content | **Headless CMS** (recommended: Sanity; alternative: Payload) *or* MDX files in the repo | Decision needed: do museum staff edit events and collections themselves? |
| Images | `next/image` + CMS image pipeline | The current site serves 1–2 MB scaled JPEGs |
| Map | Static map image + link to Google Maps (or a Leaflet/OSM embed) | Avoids heavy Google embeds and cookie banners |
| Contact form | Server Action + Resend (or Formspree) + honeypot/Turnstile | No form exists today |
| Hosting | Vercel (or any Node host) | Preview deploys per branch |
| Analytics | Plausible / Vercel Analytics (cookieless) | Removes the need for a cookie banner |

## Design direction (to discuss)

- Quiet, editorial museum look: lots of whitespace, large photography of the objects, and a serif display face (Greek-capable, e.g. *GFS Didot*, *Noto Serif*) paired with a clean sans.
- A colour palette taken from the collection: kilim reds and madder, indigo, ochre, and stone/tuff neutrals (Cappadocian rock).
- One shared component kit: `Hero`, `SectionHeading`, `CollectionCard`, `EventCard`, `ObjectGallery` (lightbox), `HoursTable` + `OpenNowBadge`, `VisitCTA`, `LanguageSwitch`.

## Content model

- **Collection**: title, slug, intro, cover, gallery[], order
- **Object** (P2): title, collection ref, date/period, origin (village), material, description, images[]
- **Event**: title, slug, type (festival / academic / exhibition), start/end, location, poster, body, gallery[]
- **Page**: home, about, history, visit (rich text blocks)
- **Settings**: opening hours (seasonal), prices, address, contacts, socials

All text fields are localised (el/en).

## Phases

1. **Foundation**: repo setup, Next.js, Tailwind, shadcn, next-intl, layout (header/footer), design tokens, deploy preview.
2. **Static pages**: Home, Visit, About, History, Contact, using existing content migrated from WordPress plus Greek translations.
3. **Collections + Events**: CMS (or MDX) wiring, listing and detail pages, gallery/lightbox.
4. **Polish & launch**: SEO (metadata, sitemap.xml, hreflang, JSON-LD `Museum` + `Event`), accessibility pass, Lighthouse, 301 redirects, DNS switch.
5. **P2**: object-level catalogue, research/publications, Turkish language, newsletter.

## Content gaps (needed from the museum)

- Greek texts (or approval of translations)
- High-resolution photos of objects and the building; event photos and posters
- A list of past/upcoming events with dates
- Accessibility info, group/school visit policy, how to buy tickets (on-site only?)
- Social media links, logo files (vector)
