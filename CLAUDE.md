# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

This is a static HTML website with no build process. To preview locally:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` (or port shown).

## Architecture

Single-page site (`index.html`) for Flora's Cakes, a home bakery in Borivali West, Mumbai.
No framework, no build step, no third-party JavaScript. Fonts come from Google Fonts
(Shrikhand for headings, Instrument Sans for everything else).

| File | Purpose |
|------|---------|
| `index.html` | All markup, the Bakery JSON-LD, and an inline SVG sprite (logo rosette and icons) |
| `styles.css` | All styles. Phone first, with layouts at 760px and 1040px |
| `app.js` | The Plan your cake message builder, the gallery reveal, and the photo lightbox |
| `favicon.svg`, `apple-touch-icon.png`, `icon-512.png`, `site.webmanifest` | Icons and install metadata |
| `img/cakes/cakeN-1200.webp` | Full photos, 1200px on the long side, used in the lightbox and the hero |
| `img/cakes/cakeN-600.webp` | 600px square crops used in the gallery and the cake cards |
| `img/og.jpg` | Social preview image |

**Sections:** hero, What we bake (4 cards), Custom Cakes in Mumbai gallery (12 shown, 36 in
total), Plan your cake, Visit us, footer. Phones get a fixed Call and WhatsApp bar.

**Colours** (all pairs pass WCAG 2.2 AA): cream `#fff6ec`, plum text `#2a1238`, purple
`#8a44d6`, deep purple `#5b22a3`, orange `#eb810a` (buttons only, always with a plum
border and plum text), lilac `#f1e8fd`.

## Adding content

**A new cake photo:** make two WebP files from the original, `cakeN-1200.webp` (long side
1200px) and `cakeN-600.webp` (600px square, centre crop), put them in `img/cakes/`, then add
an `<li class="more" hidden>` entry to the gallery in `index.html` with a descriptive `alt`.
The gallery button text says how many cakes there are, so update "See all 36 cakes" too.

**WhatsApp number:** it appears in `app.js` (`WHATSAPP_NUMBER`) and in every `wa.me` link in
`index.html`. Change all of them together.

**Hosting:** the site is also published on MakeMySiteLive at flora.makemysitelive.com.
