# Rachna Labs website

The website for **Rachna Labs**, the brand of **Rachna Softech LLP**, an Indian software company building a family of everyday apps (to-do lists, personal finance, health and more). It is a single page plus legal pages, built with [Astro 7](https://astro.build) and Tailwind CSS 4, and deployed on [Vercel](https://vercel.com).

**Live site:** [www.rachnalabs.com](https://www.rachnalabs.com). `rachnalabs.com` redirects to `www`.

## Quick start

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # production build in ./dist
npm run preview   # serve the production build locally
npm run check     # type-check .astro and .ts files
```

Builds use Node.js 24 (LTS), pinned in `package.json` and `.nvmrc` so Vercel never switches major versions on its own. Any Node.js 22.12+ works for local development.

## Where to edit things

| What to change | Where |
| --- | --- |
| **Products**: names, descriptions, features, status, links | `src/data/products.ts` |
| Company details: email, partners, LLPIN, GSTIN, address, phone, socials | `src/config/site.ts` |
| Live domain (canonical URLs, sitemap, robots.txt) | `SITE_URL` in `astro.config.mjs`, or the `SITE_URL` env var at build time |
| FAQ questions | `src/data/faqs.ts` |
| Home page sections | `src/components/home/*.astro` |
| Legal pages | `src/pages/privacy-policy.astro`, `terms.astro`, `cookie-policy.astro`, `refund-policy.astro` |
| Colours, fonts, shared styles | `src/styles/global.css` |
| Logo, favicons, social preview image | `scripts/generate-icons.mjs`, then run `npm run icons` |
| Hosting, caching and security headers | `vercel.json` |

### Products

`src/data/products.ts` drives the whole product story: the hero, the Products section and its category filters, the footer, the contact form's product list and the structured data.

- **Status:** one of `Live`, `Beta`, `In development` or `Coming soon`. It sets the badge and the call to action. Live products with a `url` get an "Open product" link; the others get a "Get in touch" link that pre-fills the contact form.
- **Key:** picks the mini preview drawn on the card (`tasks`, `money`, `health`, `notes`, `habits`). Any other key shows a simple generic preview.
- **Order:** products appear in the order they are listed. The hero badge announces the first Live product, otherwise the first Beta, otherwise the first In development product.

## Company details

Empty fields in `src/config/site.ts` are hidden automatically. Once you fill them in, they appear in the footer, the About section, the legal pages and the structured data.

## Contact form

With no configuration, the form opens the visitor's email app with their message pre-filled and addressed to `hello@rachnalabs.com`. To receive submissions directly, create a form endpoint with Formspree or Web3Forms and paste its URL into `contactFormEndpoint` in `src/config/site.ts`. Both services are already allowed by the Content Security Policy in `vercel.json`. Product cards and "Work with us" buttons pre-select the right topic and product in the form.

## Self-hosted, no third-party CDNs

Everything the site needs ships from this repository and is served from Vercel's own edge network:

- **Fonts:** Plus Jakarta Sans and Geist Mono are bundled through Fontsource, and the main font file is preloaded.
- **Photos:** stored in `src/assets/images/` and converted to responsive AVIF/WebP at build time.
- **Icons and illustrations:** inline SVG from Lucide and Simple Icons.
- **No tracking or external scripts.** The Content Security Policy only allows the site's own origin.

Hashed build assets (`/_astro/*`) are cached for a year; icons and the social image for a week.

## SEO

- Per-page `<title>`, meta description, canonical URL, robots and hreflang tags
- Open Graph and Twitter/X cards, with a 1200×630 preview image (`public/og-image.png`)
- JSON-LD structured data: Organization, WebSite, WebPage, product ItemList, FAQPage and BreadcrumbList
- `sitemap-index.xml` (via `@astrojs/sitemap`) and a `robots.txt` that points to it
- Web app manifest, SVG/ICO favicons, Apple touch icon and maskable icon
- Optional Google Search Console verification: paste the HTML-tag token into `googleSiteVerification` in `src/config/site.ts`

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository. Vercel detects Astro, and the build settings come from `vercel.json`.
2. Click **Deploy**. From then on, every push to `master` goes live automatically, and pull requests get their own preview links.
3. **Custom domain:** `www.rachnalabs.com` is the main domain in Vercel, and `rachnalabs.com` redirects to it. DNS is at Namecheap.

The site is built for `https://www.rachnalabs.com` (`SITE_URL` in `astro.config.mjs`). To change it, set `SITE_URL` in Vercel and run `SITE_URL=<url> npm run icons` locally so the preview image matches.

## Before going live

- [ ] Replace the product names, descriptions and statuses in `src/data/products.ts` with your real apps.
- [ ] Add the LLPIN and registered office address in `src/config/site.ts`. An LLP must show its name, LLPIN and registered office on its official publications.
- [ ] Make sure `hello@rachnalabs.com` is monitored. It is used for enquiries and as the Grievance Officer contact.
- [ ] Check that the statements on the site match reality, for example "no ads", "one account for all our apps", the one-day reply time and the refund terms (7-day window on annual plans, refunds within 7 business days).
- [ ] Have a lawyer or CA review the legal pages.
- [ ] Add partner photos or LinkedIn links if you want them on the About section.

## License

© 2026 Rachna Softech LLP. All rights reserved. The source code is public for transparency. The Rachna Labs name, logo, content and design may not be reused without written permission. Photos are used under their own licences, listed below.

## Image credits

Photos are from [Unsplash](https://unsplash.com/license) and [Pexels](https://www.pexels.com/license/). Both licences allow free commercial use without attribution. Source files are in `src/assets/images/`:

| File | Source |
| --- | --- |
| `coworkers-india.jpg` | Pexels 4308091 (Ketut Subiyanto) |
| `team-jaipur.jpg` | Pexels 18067562 |
| `office-bright.jpg` | Pexels 3184357 (fauxels) |
| `team-collab.jpg` | Unsplash photo-1522071820081 |
| `workshop.jpg` | Unsplash photo-1552664730 |
