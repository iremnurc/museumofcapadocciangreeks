# Rebuild plan: Museum of Cappadocian Greeks

See `sitemap.md` for the current and proposed structure.

## Stack (proposed)

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Pages are static (SSG/ISR), so the site is fast and cheap to host |
| Styling / UI | **Tailwind CSS v4 + shadcn/ui-style Radix wrappers** | shadcn for the parts with behaviour (nav menu, sheet/mobile menu, dialog/lightbox, tabs, form, carousel); everything visual stays custom |
| i18n | English only at launch; **next-intl** when Greek is added | All copy already lives in `content/`, so adding `/el` means adding Greek content files and a locale segment. English URLs stay unprefixed |
| Content | **Typed TypeScript modules in `content/`** (site facts, home) + copy in the page files | Built: the pages are short and highly structured, so typed data is simpler than MDX and type-checks every edit. Revisit MDX only if long-form articles are added |
| Images | `next/image` (files in repo) | The current site serves 1–2 MB scaled JPEGs |
| Map | Static map image + link to Google Maps (or a Leaflet/OSM embed) | Avoids heavy Google embeds and cookie banners |
| Contact form | Server Action + Resend + honeypot | Built: set `RESEND_API_KEY`, `CONTACT_TO` (and optionally `CONTACT_FROM`) to deliver mail; without them messages are only logged |
| Hosting | Vercel (or any Node host) | Preview deploys per branch |
| Analytics | Plausible / Vercel Analytics (cookieless) | Removes the need for a cookie banner |

## Design direction: final

See `brand.md` for the final branding: logo B (Woven), the madder, parchment and ink palette, EB Garamond + Commissioner, the ornament library, the photo treatments and the photography brief. The live design canvas is linked there.

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
