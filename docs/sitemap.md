# Site map

## 1. Current site (WordPress, crawled 2026-11-17)

Stack: WordPress + Astra theme + Elementor + Astra Starter Sites + CookieYes (cookie-law-info).
Only one sitemap (`page-sitemap.xml`): no posts, no custom post types. English only (`lang="en-US"`), with no Greek version.

```
/                 Home
├── /collections/ Collections
├── /events/      Events
├── /about/       About
└── /contact/     Contact
```

Same top menu and footer on every page: Home · Collections · Events · About · Contact.
Every page except Contact ends with the same "Visit us" block.

### What each page contains today

| URL | Content |
|---|---|
| `/` | Hero with the museum name · opening hours: winter (Nov–Apr, Mon–Sat 09:00–14:00) and summer (May–Oct, Mon–Sat 08:00–18:00), closed Sundays · admission (adult €8, students and under-12s free) · teaser cards for Collections and Events · short About blurb (Nea Karvali House of Culture, founded 1987) · Visit us |
| `/collections/` | Three sections on a single page: **Traditional costumes** · **Treasures from Cappadocian churches** (17th century onwards; Gelveri and Zincidere brotherhoods) · **Rugs, kilims and ceramics** · mentions the 1997 European Museum of the Year Award |
| `/events/` | Two static text blocks, with no event listings or dates: **Cultural events at Akontisma** (the summer Great Festival) · **Academic events** (symposiums, book presentations) |
| `/about/` | "Who are we?": Our Story (the collecting work, the 1997 EMYA award shared with the Museum of Anatolian Civilisations in Ankara, the Cappadocian Studies Center) |
| `/contact/` | Two contact cards: Kaplanis Iosifidis (Director) and Murat Eser (academic enquiries), each with email and phone · Google Maps link. No contact form and no embedded map |

### Structural problems

- **Visitor information is split across pages.** Opening hours and prices are on Home, the address is in the footer block, and the map link is on Contact. There is no single "Visit" page, which is the page museum visitors look for first.
- **Collections and events are walls of text.** There are no item pages and no dated events, so nothing can be shared, linked to or indexed individually.
- **No Greek.** A Greek museum has an English-only site.
- **There is no "who were the Cappadocian Greeks" page.** That is the museum's core story and its strongest search topic.
- The "Visit us" block is repeated on every page, but it's only a sentence and a button.

---

## 2. Proposed site map (Next.js)

Launch is **English only, at the root** (no `/en` prefix). Greek can be added later under `/el/...`, and Turkish is a possible option after that.
Items marked **(P2)** are phase 2. The site launches without them.

```
/
├── /                               Home
├── /visit                          Plan your visit         ← NEW (hours, tickets, getting there, map, accessibility, groups/schools)
├── /collections                    Collections overview
│   ├── /collections/costumes-textiles
│   ├── /collections/church-treasures
│   ├── /collections/rugs-kilims-ceramics
│   ├── /collections/documents-photographs   ← material already mentioned in About
│   └── /collections/[collection]/[object]   (P2) single-object pages with image gallery
├── /events                         Upcoming + past events (filter: festival / academic / exhibition)
│   ├── /events/[slug]              Single event (date, place, poster, description, gallery)
│   └── /events/akontisma-festival  Recurring summer festival (landing page)
├── /history                        The Cappadocian Greeks   ← NEW (Rum / Karamanlides, the 1924 exchange, Nea Karvali)
├── /about                          The museum
│   ├── /about#story                Founding (1987), the House of Culture
│   ├── /about#award                European Museum of the Year Award 1997
│   └── /about/research             (P2) Cappadocian Studies Center, publications, academic contact
├── /contact                        People, form, map
├── /privacy
├── /cookies
└── 404 / not-found
```

### Primary navigation (max 5 + language switch)

`Visit` · `Collections` · `Events` · `History` · `About` (language switch added when Greek launches)

Contact moves to the footer and to a button in the header. "Home" is the logo.

### Footer

Address + map link · opening hours (live "Open now / Closed" badge) · contact · social links · language · Privacy / Cookies · © year.

### Redirects from the old URLs (301)

| Old | New |
|---|---|
All five existing URLs keep the same path (`/`, `/collections`, `/events`, `/about`, `/contact`), so no redirects are needed at launch.
Only the trailing slash changes, and Next.js `trailingSlash: true` keeps it identical.
