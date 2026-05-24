# First-Treatment-Offer Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/first-treatment-offer`, a standalone, noindex Google Ads landing page for the "20% Off Your First Treatment" offer, using the existing site's design system and reusable components, with every CTA driving to Mangomint booking or a phone call.

**Architecture:** A single Astro page (`src/pages/first-treatment-offer.astro`) renders directly through `BaseLayout` (NOT `PageLayout`, which injects the full-nav header/footer we intentionally omit). `BaseLayout` gains an optional `noindex` prop. The page composes focused, page-specific section components from a new `src/components/offer/` folder, reusing the canonical `Button`, `SectionHeading`, and `CTABanner` components. No on-page form — CTAs point to `siteConfig.booking.url` or `tel:`.

**Tech Stack:** Astro 6, Tailwind CSS 4 (existing `@theme` tokens in `src/styles/global.css`), Material Symbols icons, Mangomint booking overlay.

**Spec:** `docs/superpowers/specs/2026-05-23-first-treatment-offer-landing-design.md`

**Verification model:** This is static Astro with no unit-test framework. The per-task gate is `pnpm build` (runs `astro check && astro build`) finishing with `0 errors` and `[build] Complete!`, plus the page being present/renderable. Pre-existing `astro(4000)` `is:inline` hints are expected and not errors. Frequent commits after each task.

**Design-system tokens to use (all defined in `src/styles/global.css`):** `bg-rose-soft`, `bg-background-light`, `bg-background-dark`, `text-primary` / `bg-primary` / `hover:bg-primary-dark`, `text-gold` / `bg-gold`, `text-text-main`, `text-text-body`, `font-display`, `font-body`, `shadow-soft`. Fonts (Playfair Display + Manrope) and Material Symbols are already loaded by `BaseLayout`.

---

### Task 1: Add `noindex` support to BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Confirm a green baseline**

Run: `pnpm build`
Expected: `astro check` `0 errors`; `[build] 38 page(s) built`; `[build] Complete!`. If not green, STOP and report.

- [ ] **Step 2: Add the `noindex` prop to the Props interface and destructure**

In `src/layouts/BaseLayout.astro`, change the `Props` interface and the destructure block to add `noindex` (default `false`):

```astro
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

const {
  title,
  description = 'Luxury physician-guided med spa in Tierra Verde, FL — advanced treatments for body contouring, skin rejuvenation, and total wellness transformation.',
  ogImage = '/images/general/logo.png',
  noindex = false,
} = Astro.props;
```

- [ ] **Step 3: Render the robots meta conditionally**

In the `<head>`, immediately after the `<meta name="description" ... />` line, add:

```astro
    {noindex && <meta name="robots" content="noindex, nofollow" />}
```

- [ ] **Step 4: Verify build stays green and existing pages are unaffected**

Run: `pnpm build`
Expected: `0 errors`, `38 page(s) built`, `Complete!`.

Run: `grep -rl "noindex, nofollow" dist/ || echo "none yet"`
Expected: `none yet` — no existing page opts in, so the robots meta appears nowhere yet (proves the default is non-breaking).

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(layout): add optional noindex prop to BaseLayout"
```

---

### Task 2: Copy offer imagery into public assets

**Files:**
- Create: `public/images/offer/` (6 PNGs copied from the kit)

- [ ] **Step 1: Copy the hero and service images from the kit**

Run:
```bash
mkdir -p public/images/offer
cp google_ads_sale/assets/images/hero-spa-treatment.png public/images/offer/
cp google_ads_sale/assets/images/service-hydrafacial.png public/images/offer/
cp google_ads_sale/assets/images/service-microneedling.png public/images/offer/
cp google_ads_sale/assets/images/service-body-contouring.png public/images/offer/
cp google_ads_sale/assets/images/service-chemical-peels.png public/images/offer/
cp google_ads_sale/assets/images/service-injectables.png public/images/offer/
```

- [ ] **Step 2: Verify all six landed**

Run: `ls public/images/offer/`
Expected: `hero-spa-treatment.png`, `service-body-contouring.png`, `service-chemical-peels.png`, `service-hydrafacial.png`, `service-injectables.png`, `service-microneedling.png` (6 files).

- [ ] **Step 3: Commit**

```bash
git add public/images/offer/
git commit -m "chore(offer): add placeholder imagery for landing page"
```

---

### Task 3: OfferHeader + page skeleton (page exists and renders)

**Files:**
- Create: `src/components/offer/OfferHeader.astro`
- Create: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/OfferHeader.astro`**

Slim sticky header — logo (non-linking, to avoid an escape route to the main site), a Call link, and a Book Now button. Reads `siteConfig`.

```astro
---
import { siteConfig } from '../../data/siteConfig';
import Button from '../ui/Button.astro';

const telHref = `tel:+1${siteConfig.phone.replace(/\D/g, '')}`;
---

<header
  class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur border-b border-gold/20"
>
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <img
      src="/images/general/logo.png"
      alt="Love Yourself Med Spa"
      class="h-12 w-auto"
    />
    <div class="flex items-center gap-3">
      <a
        href={telHref}
        class="hidden sm:inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-primary transition-colors"
      >
        <span class="material-symbols-outlined text-lg">call</span>
        {siteConfig.phone}
      </a>
      <Button href={siteConfig.booking.url} variant="primary" size="sm">
        Book Now
      </Button>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Create `src/pages/first-treatment-offer.astro` skeleton**

Uses `BaseLayout` with `noindex`, renders the header and an empty `<main>` (sections added in later tasks).

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import OfferHeader from '../components/offer/OfferHeader.astro';
---

<BaseLayout
  title="20% Off Your First Treatment"
  description="New client offer: enjoy 20% off your first treatment at Love Yourself Med Spa in Tierra Verde, near St. Pete."
  noindex={true}
>
  <OfferHeader />
  <main class="flex-1">
    {/* Sections added in subsequent tasks */}
  </main>
</BaseLayout>
```

- [ ] **Step 3: Verify build + the new page exists + is noindex**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`. The output lists `/first-treatment-offer/index.html`.

Run: `grep -l "noindex, nofollow" dist/first-treatment-offer/index.html`
Expected: prints the path (proves the page is noindex).

Run: `grep -rL "noindex" dist/index.html`
Expected: prints `dist/index.html` (proves the homepage is NOT noindex — default still safe).

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/OfferHeader.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add slim header and landing page skeleton"
```

---

### Task 4: OfferHero

**Files:**
- Create: `src/components/offer/OfferHero.astro`
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/OfferHero.astro`**

```astro
---
import { siteConfig } from '../../data/siteConfig';
import Button from '../ui/Button.astro';

const telHref = `tel:+1${siteConfig.phone.replace(/\D/g, '')}`;
---

<section class="bg-rose-soft px-6 py-16 md:py-24">
  <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <p class="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4">
        New Client Exclusive
      </p>
      <h1 class="font-display font-bold text-text-main leading-none">
        <span class="block text-6xl md:text-7xl text-primary">20% Off</span>
        <span class="block text-3xl md:text-4xl mt-2">Your First Treatment</span>
      </h1>
      <p class="mt-6 text-text-body text-lg max-w-md">
        Physician-guided care and personalized aesthetic treatments designed to
        help you look radiant, feel confident, and love yourself.
      </p>
      <p class="mt-4 text-primary font-semibold uppercase tracking-wide text-sm">
        Proudly serving Tierra Verde &amp; the St. Pete area
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <Button href={siteConfig.booking.url} variant="primary" size="lg">
          Book Your Consultation
        </Button>
        <Button href={telHref} variant="secondary" size="lg">
          <span class="material-symbols-outlined mr-2">call</span> Call Now
        </Button>
      </div>
    </div>
    <div class="rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square">
      <img
        src="/images/offer/hero-spa-treatment.png"
        alt="Relaxing med spa facial treatment"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add it to the page**

In `src/pages/first-treatment-offer.astro`, add the import below the `OfferHeader` import:
```astro
import OfferHero from '../components/offer/OfferHero.astro';
```
and replace the `{/* Sections added in subsequent tasks */}` comment with:
```astro
    <OfferHero />
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/OfferHero.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add hero section"
```

---

### Task 5: TrustStrip

**Files:**
- Create: `src/components/offer/TrustStrip.astro`
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/TrustStrip.astro`**

```astro
---
const items = [
  {
    icon: 'health_and_safety',
    label: 'Physician-Guided Care',
    sub: 'Expert medical oversight for your safety and results',
  },
  {
    icon: 'person',
    label: 'Personalized Plans',
    sub: 'Customized treatments for your unique goals',
  },
  {
    icon: 'diamond',
    label: 'Luxury Experience',
    sub: 'Premium products, modern technology, exceptional care',
  },
  {
    icon: 'location_on',
    label: 'Tierra Verde Location',
    sub: 'Conveniently serving Tierra Verde, St. Pete & surrounding areas',
  },
];
---

<section class="bg-white px-6 py-10 border-y border-rose-soft">
  <div
    class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
  >
    {
      items.map((item) => (
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-primary text-3xl shrink-0">
            {item.icon}
          </span>
          <div>
            <p class="font-display font-bold text-text-main">{item.label}</p>
            <p class="text-sm text-text-body">{item.sub}</p>
          </div>
        </div>
      ))
    }
  </div>
</section>
```

- [ ] **Step 2: Add it to the page**

In `src/pages/first-treatment-offer.astro`, add the import:
```astro
import TrustStrip from '../components/offer/TrustStrip.astro';
```
and add `<TrustStrip />` immediately after `<OfferHero />`.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/TrustStrip.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add trust strip"
```

---

### Task 6: OfferServices

**Files:**
- Create: `src/components/offer/OfferServices.astro`
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/OfferServices.astro`**

Five non-linking service cards (no per-card links — those would be escape routes), closing with a single Book CTA. Reuses `SectionHeading` and `Button`.

```astro
---
import SectionHeading from '../ui/SectionHeading.astro';
import Button from '../ui/Button.astro';
import { siteConfig } from '../../data/siteConfig';

const services = [
  {
    title: 'HydraFacial',
    description: 'Deeply cleanse, hydrate and reveal your natural glow.',
    image: '/images/offer/service-hydrafacial.png',
  },
  {
    title: 'Microneedling',
    description: 'Stimulate collagen, smooth texture and support skin renewal.',
    image: '/images/offer/service-microneedling.png',
  },
  {
    title: 'Body Contouring',
    description:
      'Tone, tighten and sculpt with advanced non-invasive technology.',
    image: '/images/offer/service-body-contouring.png',
  },
  {
    title: 'Chemical Peels',
    description: 'Refine, brighten and reveal smoother, clearer-looking skin.',
    image: '/images/offer/service-chemical-peels.png',
  },
  {
    title: 'Injectables',
    description: 'Enhance your natural beauty with personalized aesthetic options.',
    image: '/images/offer/service-injectables.png',
  },
];
---

<section class="bg-background-light px-6 py-16 md:py-24">
  <div class="max-w-7xl mx-auto">
    <SectionHeading label="Inside-Out Beauty" title="Our Signature Services" />
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {
        services.map((s) => (
          <article class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft">
            <div class="aspect-[4/3] overflow-hidden bg-rose-soft">
              <img
                src={s.image}
                alt={s.title}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-5">
              <h3 class="font-display font-bold text-text-main mb-2">
                {s.title}
              </h3>
              <p class="text-sm text-text-body">{s.description}</p>
            </div>
          </article>
        ))
      }
    </div>
    <div class="mt-12 text-center">
      <Button href={siteConfig.booking.url} variant="primary" size="lg">
        Book Your Consultation
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add it to the page**

Add the import:
```astro
import OfferServices from '../components/offer/OfferServices.astro';
```
and add `<OfferServices />` immediately after `<TrustStrip />`.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/OfferServices.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add signature services section"
```

---

### Task 7: WhyChoose (with brand-safe expectations card)

**Files:**
- Create: `src/components/offer/WhyChoose.astro`
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/WhyChoose.astro`**

Four trust points plus a brand-safe "what to expect" card (NOT a fabricated named testimonial — see spec open item #4).

```astro
---
import SectionHeading from '../ui/SectionHeading.astro';

const points = [
  {
    icon: 'verified',
    label: 'Medical Expertise',
    sub: 'Board-certified providers with years of experience',
  },
  {
    icon: 'spa',
    label: 'Natural Results',
    sub: 'Enhancing your beauty — never overdone',
  },
  {
    icon: 'favorite',
    label: 'Compassionate Care',
    sub: 'We listen, we care, we’re with you',
  },
  {
    icon: 'science',
    label: 'Premium Products',
    sub: 'Only industry-leading, medical-grade solutions',
  },
];
---

<section class="bg-rose-soft px-6 py-16 md:py-24">
  <div class="max-w-7xl mx-auto">
    <SectionHeading title="Why Choose Love Yourself Med Spa?" />
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="grid grid-cols-2 gap-8">
        {
          points.map((p) => (
            <div>
              <span class="material-symbols-outlined text-primary text-3xl mb-2">
                {p.icon}
              </span>
              <p class="font-display font-bold text-text-main">{p.label}</p>
              <p class="text-sm text-text-body mt-1">{p.sub}</p>
            </div>
          ))
        }
      </div>
      <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-soft">
        <p class="text-gold text-2xl mb-4">★★★★★</p>
        <p class="font-display text-xl text-text-main italic leading-relaxed">
          “From your first consultation, our team builds a personalized plan
          around your goals — so you feel cared for, informed, and confident
          every step of the way.”
        </p>
        <p class="mt-4 text-sm text-text-body font-semibold">
          — The Love Yourself Med Spa Team
        </p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add it to the page**

Add the import:
```astro
import WhyChoose from '../components/offer/WhyChoose.astro';
```
and add `<WhyChoose />` immediately after `<OfferServices />`.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/WhyChoose.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add why-choose section"
```

---

### Task 8: Offer CTA band (reuse CTABanner)

**Files:**
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Wire the canonical `CTABanner` into the page**

No new component. In `src/pages/first-treatment-offer.astro`, add these imports (alongside the others):
```astro
import CTABanner from '../components/sections/CTABanner.astro';
import { siteConfig } from '../data/siteConfig';
```
Add a `telHref` to the frontmatter (after the imports):
```astro
const telHref = `tel:+1${siteConfig.phone.replace(/\D/g, '')}`;
```
Then add, immediately after `<WhyChoose />`:
```astro
    <CTABanner
      headline="Limited Time: 20% Off Your First Treatment"
      body="Start your journey to radiant, confident skin today."
      primaryCTA={{ text: 'Book Your Consultation', href: siteConfig.booking.url }}
      secondaryCTA={{ text: `Call ${siteConfig.phone}`, href: telHref }}
      variant="dark"
    />
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add limited-time CTA band (reuse CTABanner)"
```

---

### Task 9: OfferFooter

**Files:**
- Create: `src/components/offer/OfferFooter.astro`
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Create `src/components/offer/OfferFooter.astro`**

Slim footer — contact, hours, legal links, and offer fine print. NO site-nav links.

```astro
---
import { siteConfig } from '../../data/siteConfig';

const { address, phone } = siteConfig;
const telHref = `tel:+1${phone.replace(/\D/g, '')}`;
const year = new Date().getFullYear();
---

<footer class="bg-background-dark text-white/80 px-6 py-12">
  <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
    <div>
      <img
        src="/images/general/logo.png"
        alt="Love Yourself Med Spa"
        class="h-12 w-auto mb-4"
      />
      <p class="text-sm">
        Physician-guided aesthetic care in a luxurious, welcoming environment.
      </p>
    </div>
    <div class="text-sm space-y-2">
      <p class="flex items-start gap-2">
        <span class="material-symbols-outlined text-primary text-lg">location_on</span>
        <span>{address.street} {address.suite}, {address.city}, {address.state} {address.zip}</span>
      </p>
      <p class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-lg">call</span>
        <a href={telHref} class="hover:text-primary">{phone}</a>
      </p>
      <p class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-lg">schedule</span>
        <span>Mon–Fri {siteConfig.hours.weekdays}</span>
      </p>
    </div>
    <div class="text-xs text-white/60 space-y-3">
      <p>
        New clients only. Consultation required. Cannot be combined with other
        offers. Some exclusions may apply.
      </p>
      <div class="flex gap-4">
        <a href="/privacy" class="hover:text-primary">Privacy Policy</a>
        <a href="/terms" class="hover:text-primary">Terms of Service</a>
      </div>
      <p>© {year} Love Yourself Med Spa. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Add it to the page (after `</main>`)**

Add the import:
```astro
import OfferFooter from '../components/offer/OfferFooter.astro';
```
and add `<OfferFooter />` immediately after the closing `</main>` tag (so it sits below the main content, inside `BaseLayout`'s flex column).

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`.

- [ ] **Step 4: Commit**

```bash
git add src/components/offer/OfferFooter.astro src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add slim footer"
```

---

### Task 10: Conversion-tracking hook (placeholder) + final verification

**Files:**
- Modify: `src/pages/first-treatment-offer.astro`

- [ ] **Step 1: Add a placeholder Google Ads conversion hook**

`Button` does not forward arbitrary attributes, so the hook targets links by `href` instead of data attributes. Add this `<script is:inline>` block at the very end of the `BaseLayout` content (after `<OfferFooter />`, before `</BaseLayout>`):

```astro
  <script is:inline>
    // Google Ads conversion tracking for this landing page.
    // Replace AW-XXXXXXXXX and the *_LABEL placeholders with the real Google
    // Ads conversion ID + labels (spec open item #1). The gtag base tag must
    // also be added to BaseLayout's <head> once the owner provides the ID;
    // until then this is inert (guarded by the typeof check).
    function lymsTrackConversion(label) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/' + label });
      }
    }
    document
      .querySelectorAll('a[href*="booking.mangomint.com"]')
      .forEach((el) =>
        el.addEventListener('click', () => lymsTrackConversion('BOOK_LABEL')),
      );
    document
      .querySelectorAll('a[href^="tel:"]')
      .forEach((el) =>
        el.addEventListener('click', () => lymsTrackConversion('CALL_LABEL')),
      );
  </script>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: `0 errors`; `39 page(s) built`; `Complete!`. (An `astro(4000)` `is:inline` hint for this script is expected and acceptable — it matches existing pages like `ShareButtons.astro`.)

- [ ] **Step 3: Smoke-test the rendered page and the no-escape-routes guarantee**

Start the dev server in the background, then check the route and assert there are no site-nav escape links:
```bash
pnpm dev &
# wait ~3s for startup, then:
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/first-treatment-offer
```
Expected: `200`.

Run (against the built output):
```bash
grep -oE 'href="(/services|/about|/blog|/gallery|/products|/specials|/reviews|/#contact)[^"]*"' dist/first-treatment-offer/index.html || echo "no nav escape links — good"
```
Expected: `no nav escape links — good`. (Only booking, `tel:`, `/privacy`, and `/terms` links should be present.)

Stop the dev server afterward (kill the background `astro dev` process); confirm port 4321 is free.

- [ ] **Step 4: Commit**

```bash
git add src/pages/first-treatment-offer.astro
git commit -m "feat(offer): add placeholder Google Ads conversion hook"
```

---

## Post-implementation owner inputs (tracked, not blocking the build)

These are deliberately left as placeholders for the owner (see spec open items):
1. **Google Ads conversion ID + Book/Call labels** — replace `AW-XXXXXXXXX` / `BOOK_LABEL` / `CALL_LABEL`, and add the gtag base tag to `BaseLayout` `<head>`.
2. **Offer expiration date + final terms** — confirm and add an expiration line to the hero/footer fine print.
3. **Real approved photos** — replace the six files in `public/images/offer/`.
4. **Real testimonial** — if a permitted client review exists, swap the brand-safe expectations card in `WhyChoose.astro`.

## Self-review notes (completed by plan author)

- **Spec coverage:** noindex (T1), assets (T2), focused header (T3), hero (T4), trust strip (T5), services CTA-only/non-linking (T6), why-choose + brand-safe testimonial (T7), CTA band reusing CTABanner (T8), slim footer no-nav (T9), conversion hook placeholder + no-escape-route verification (T10). All spec sections mapped.
- **No placeholders in steps:** every code step contains complete code; the only intentional placeholders are the owner-input items above, clearly marked and isolated to T10's stub.
- **Type/name consistency:** component filenames, import paths, `siteConfig` fields (`phone`, `booking.url`, `address.*`, `hours.weekdays`), and `Button`/`SectionHeading`/`CTABanner` prop shapes match their real definitions verified in the codebase.
