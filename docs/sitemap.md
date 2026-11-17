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

## 2. Site map (final: same five pages as today)

The museum won't provide more content, so the new site keeps the **existing five pages and URLs**. There are no new sections, no per-object pages and no event listings.

```
/                Home: hero, today's hours, admission, find us, 3 collections, our story + 1997 award, events teaser, visit
/collections/    3 collections (costumes & jewellery, church treasures, rugs/kilims/ceramics) + object gallery with filters and lightbox
/events/         The Great Festival at Akontisma + symposiums & book presentations
/about/          Who were the Cappadocian Greeks, short timeline (1850, 1924, 1987, 1997), our story
/contact/        Director + academic contact (email, phone), contact form, visit info (hours, admission, map)
```

**Main navigation:** Collections · Events · About · Contact, plus a "Visit us" button. The logo links to Home.
**Redirects:** none needed, because every existing URL is kept.
