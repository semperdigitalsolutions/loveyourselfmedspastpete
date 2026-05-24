# First-Treatment-Offer Landing Page — Design Spec

**Date:** 2026-05-23
**Status:** Approved for planning

## Purpose

A standalone Google Ads landing page for the new-client offer **"20% Off Your First Treatment."** It is reachable **only** via its direct URL (the Google Ads sitelink) — not linked from site nav, and excluded from search indexes. Its single job is conversion: get the visitor to **book** (Mangomint) or **call** the spa.

## Key decisions (locked)

| Decision                             | Choice                                                                                                                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL / route                          | `/first-treatment-offer` (`src/pages/first-treatment-offer.astro`)                                                                                                                                    |
| Design system                        | **Existing site tokens** — Playfair Display + Manrope, our palette (turquoise primary `#00c2a2`, gold `#C9A961`, `rose-soft` backgrounds, `background-dark`). NOT the kit's rose-gold/Cormorant look. |
| Page chrome                          | **Focused landing (B):** slim header = logo + Call + Book Now (no nav links); slim footer = contact + legal only (no nav links).                                                                      |
| Lead capture                         | **CTA-only.** No form. Every CTA points to Mangomint booking (`siteConfig.booking.url`) or `tel:` the spa.                                                                                            |
| Imagery                              | Kit placeholder images now (copied into `public/images/offer/`), swappable later.                                                                                                                     |
| SEO                                  | `noindex, nofollow` robots meta. Not added to nav, sitemap, or internal links.                                                                                                                        |
| Source of truth for business details | `src/data/siteConfig.ts` (NOT the mockup, whose footer phone/address are incorrect AI artifacts).                                                                                                     |

## Architecture

The page is **not** wrapped in `PageLayout` (that injects the full-nav `Header` + `Footer`, which are the escape routes we're removing). Instead:

- **`BaseLayout` gains an optional `noindex?: boolean` prop** (default `false`). When `true`, it renders `<meta name="robots" content="noindex, nofollow" />`. This is a small, broadly-useful addition (one conditional in the head). All existing pages are unaffected (default keeps current behavior, i.e. no robots meta).
- **`src/pages/first-treatment-offer.astro`** uses `BaseLayout` directly with `noindex={true}` and composes the landing from focused, page-specific section components.
- **Landing-specific components live in `src/components/offer/`** — isolated from the main-site components so the focused-landing chrome never leaks into the rest of the site and the page file stays small. Each is a self-contained `.astro` component with a typed `Props` interface where it takes data.

### Components to build (in `src/components/offer/`)

1. **`OfferHeader.astro`** — slim sticky header: logo (left), `Call` (`tel:`) + `Book Now` (Mangomint) buttons (right). No nav links.
2. **`OfferHero.astro`** — "20% OFF / Your First Treatment", value subhead, "Proudly serving Tierra Verde & the St. Pete area" accent, `Book Your Consultation` (primary) + `Call Now` (secondary) CTAs, hero image. Reuses `Button`.
3. **`TrustStrip.astro`** — 4 inline trust items (Physician-Guided Care, Personalized Plans, Luxury Experience, Tierra Verde Location), each Material Symbol icon + label + one-line sub. Data is a local array.
4. **`OfferServices.astro`** — `SectionHeading` "Our Signature Services" + a grid of 5 service cards (HydraFacial, Microneedling, Body Contouring, Chemical Peels, Injectables): image + title + one-line description. **Cards are non-linking** (no per-card "Learn More" → service detail pages; those are escape routes). The section closes with one `Book Your Consultation` CTA. Service data is a local array in this component.
5. **`WhyChoose.astro`** — "Why Choose Love Yourself Med Spa?" + 4 trust points (Medical Expertise, Natural Results, Compassionate Care, Premium Products) + a testimonial/expectations card (see open item #4).
6. **`OfferCTABand.astro`** — full-bleed `background-dark` band: "Limited Time Offer — 20% Off Your First Treatment", short line, `Book Your Consultation` + `Call` CTAs.
7. **`OfferFooter.astro`** — slim footer: logo, phone, address, hours (from `siteConfig`), legal links (Privacy/Terms), offer fine print. **No nav links.**

`first-treatment-offer.astro` imports these in order and passes nothing they can't source themselves (most read `siteConfig` directly).

## Content (from `google_ads_sale/content.json`, adapted)

- **Offer headline:** "20% Off Your First Treatment"
- **Subhead:** "Physician-guided care and personalized aesthetic treatments designed to help you look radiant, feel confident, and love yourself."
- **Fine print:** "New clients only. Consultation required. Cannot be combined with other offers. Some exclusions may apply." + **expiration date (open item #2)**
- **Services (5):** HydraFacial · Microneedling · Body Contouring · Chemical Peels · Injectables (one-line descriptions from `content.json`)
- **CTAs:** Primary "Book Your Consultation" → `siteConfig.booking.url`; Secondary "Call Now" → `tel:+17277395070`

## Assets

Copy the kit's images into `public/images/offer/`:

- Hero: `hero-spa-treatment.png`
- Service crops: `service-hydrafacial.png`, `service-microneedling.png`, `service-body-contouring.png`, `service-chemical-peels.png`, `service-injectables.png`

Trust/why-choose icons use **Material Symbols** (already loaded site-wide) rather than the kit's SVGs, to match site convention: e.g. `health_and_safety`, `person`, `diamond`, `location_on`, `verified`, `spa`, `favorite`, `science`.

## Conversion tracking

Book and Call CTAs are the conversion events. Implementation adds a small, centralized click hook (e.g. a `data-conversion="book|call"` attribute + one inline `gtag` event dispatcher) wired to **placeholder Google Ads conversion IDs/labels** that the owner fills in (open item #1). No analytics library is added beyond a `gtag` snippet stub; if the owner prefers, the stub is inert until real IDs are supplied.

## Out of scope (YAGNI)

- No on-page lead form / form provider.
- No A/B test variants.
- No new nav/sitemap entries.
- No changes to existing pages beyond the additive `noindex` prop on `BaseLayout`.

## Open items (need owner input — non-blocking for build; use placeholders)

1. **Google Ads conversion ID + labels** for Book/Call tracking — build with clearly-marked placeholders.
2. **Offer expiration date** and final terms confirmation — build with the standard fine print; insert date when provided.
3. **Real approved photos** to replace kit placeholders — file-swap in `public/images/offer/`.
4. **Testimonial:** the mockup's "Jessica M." review is unverified. Default to a brand-safe "what to expect" card (no fabricated named review) unless the owner supplies a real, permitted testimonial.

## Verification

- `pnpm build` green; `/first-treatment-offer/` renders at 39 pages total (was 38).
- Page source contains `noindex, nofollow`; no other page does.
- No link on the page points to site nav destinations (no `/services`, `/about`, `/blog`, etc.); only booking + `tel:` + legal.
- Visual check at `pnpm dev` against the mockup, adapted to site tokens.
