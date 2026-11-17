# Museum of the Cappadocian Greeks: website

Next.js rebuild of museumofcappadociangreeks.gr (Historical & Ethnographical Museum of the Cappadocian Greeks, Nea Karvali, Kavala).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
```

## Where things are

| Path | What |
|---|---|
| `content/site.ts` | Hours, admission, address, contacts, navigation, image list: edit here and every page updates |
| `content/home.ts` | Home hero objects, quote, the three collections |
| `app/*/page.tsx` | The five pages (`/`, `/collections/`, `/events/`, `/about/`, `/contact/`) |
| `components/blocks.tsx` | Shared sections: inner-page hero, pattern feature, madder editorial block, outlined rows, visit CTA |
| `components/site-header.tsx`, `site-footer.tsx` | Top bar + full-screen menu, footer |
| `lib/pixels.ts` | Pixel paths for the logo mark and ornaments |
| `public/images/` | Web-sized photos (originals are in `photos/`) |
| `docs/` | Site map, plan, brand guide and the final design spec (`docs/design/site-design.md`) |

## Contact form

Set `RESEND_API_KEY` and `CONTACT_TO` (optionally `CONTACT_FROM`) in the hosting environment to deliver messages. Without them, submissions are only logged.
