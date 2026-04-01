# PRD: Rose Gold Glam Redesign

## Overview

Complete visual redesign of the Love Yourself Med Spa website from the current turquoise/gold palette to a warm rose gold and plum aesthetic. Based on the design concept in `docs/concept-3-rose-gold-glam.html`. Adds new homepage sections, restructures navigation, introduces video hero, and adds an About page for Shari.

## Design Reference

- **Concept mockup:** `docs/concept-3-rose-gold-glam.html`
- **Logo icon:** `docs/logo 3.png` (lotus/face emblem, rose gold metallic)
- **Logo wordmark:** `docs/logo 2.png` ("LOVE YOURSELF MED SPA" + tagline text)

---

## 1. Color System Update

**File:** `src/styles/global.css` — `@theme` block

| Token                     | Old Value              | New Value                    | Usage                        |
| ------------------------- | ---------------------- | ---------------------------- | ---------------------------- |
| `--color-primary`         | `#00c2a2` (turquoise)  | `#C9986A` (rose gold)        | CTAs, links, accents         |
| `--color-primary-dark`    | `#00a68a`              | `#A67B50` (deeper rose gold) | Hover states, active         |
| `--color-primary-light`   | `#e6f9f6`              | `#FFF8F6` (warm cream)       | Light backgrounds            |
| `--color-gold`            | `#C9A961`              | `#E8C4A0` (light rose gold)  | Secondary accents, gradients |
| `--color-gold-light`      | `#E5C889`              | `#F0D4B8`                    | Subtle highlights            |
| `--color-rose-soft`       | `#FFF0F2`              | `#FFF0EC` (warm peach)       | Section backgrounds          |
| `--color-background-dark` | `#0f2320` (dark green) | `#3D2B35` (plum)             | Dark sections, footer        |
| `--color-text-main`       | `#1A1A1A`              | `#3D2B35` (plum)             | Headings                     |
| `--color-text-body`       | `#4A4A4A`              | `#6B5660` (muted plum)       | Body text                    |

**New tokens to add:**

- `--color-rose` → `#E8B4C0` (keep existing, used for soft accents)
- `--color-background-offwhite` → `#FDF7F4` (warm off-white)

**Gradient pattern** (used on CTAs throughout):

```css
background: linear-gradient(135deg, #c9986a, #e8c4a0, #c9986a);
background-size: 200% 200%;
```

**Shimmer animation** (for primary CTAs):

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

**Button updates:**

- `.btn-primary` — rose gold gradient with shimmer, white text, pill shape (`border-radius: 50px`)
- `.btn-secondary` — transparent with rose gold border, plum text
- `.btn-ghost` — update hover color to rose gold

**Shadow updates:**

- `--shadow-hover` → `0 20px 50px -12px rgba(201, 152, 106, 0.25)` (rose gold glow)

---

## 2. Header / Navigation Restructure

**File:** `src/components/layout/Header.astro`

### Layout: Centered Logo with Split Navigation

```
[ Services | Gallery ]  —  [ LOGO ]  —  [ Blog | Contact ]  [ BOOK NOW ]
```

- **Left links:** Services, Gallery
- **Center:** Logo (icon `logo 3.png` + wordmark `logo 2.png` combined, or icon-only on mobile)
- **Right links:** Blog, Contact
- **Far right:** "Book Now" pill button (rose gold gradient + shimmer)

### Desktop Behavior

- Nav background: transparent on homepage (overlays video hero), solid `#3D2B35` on other pages
- Nav link color: white on homepage, white on dark bg pages
- Bottom border: `1px solid rgba(201, 152, 106, 0.3)`
- On scroll: background transitions to `rgba(61, 43, 53, 0.95)` with backdrop blur
- Logo height: ~80-100px desktop, ~50px mobile

### Mobile Behavior

- Hamburger menu (right side)
- Logo centered (icon only on small screens)
- Full-screen mobile menu overlay with plum background

### Logo Files

- **Full logo (desktop):** Use both `logo 3.png` (icon) and `logo 2.png` (wordmark) side by side, or icon only with wordmark below
- **Icon only (mobile/compact):** Use `logo 3.png` alone
- Copy both files to `public/images/general/logo-icon.png` and `public/images/general/logo-text.png` for clean paths

---

## 3. Hero Section Update

**File:** `src/components/sections/Hero.astro`

### Homepage Hero (Video Background)

- **Video source:** Pexels video ID 4264879
  - HD: `https://videos.pexels.com/video-files/4264879/4264879-hd_1920_1080_30fps.mp4`
  - SD fallback: `https://videos.pexels.com/video-files/4264879/4264879-sd_640_360_30fps.mp4`
- **Video attributes:** `autoplay muted loop playsinline`
- **Overlay:** Linear gradient `rgba(61, 43, 53, 0.7)` top → `rgba(61, 43, 53, 0.5)` middle → `rgba(61, 43, 53, 0.8)` bottom
- **Full viewport height** (`min-height: 100vh`)
- **Content (centered):**
  - Headline: `RESTORE · SCULPT · ELEVATE · TRANSFORM` (Playfair Display, 3.5rem, white, letter-spacing 3px)
  - Tagline: `Love yourself enough to transform.` (Playfair Display italic, 1.6rem, rose gold)
  - Two buttons:
    - "BOOK CONSULTATION" → primary (rose gold gradient, links to Mangomint)
    - "EXPLORE TREATMENTS" → secondary (transparent, rose gold border, links to services)

### Interior Page Hero (Non-homepage)

- Keep the current simpler hero pattern — short height, page title, optional subtitle
- Background: solid plum `#3D2B35` or a subtle gradient
- No video on interior pages

### Props Interface

```typescript
interface Props {
  title: string;
  subtitle?: string;
  isHomepage?: boolean;
  showCtas?: boolean;
}
```

---

## 4. Homepage Sections

**File:** `src/pages/index.astro`

Implement the following sections in order (matching the concept):

### 4a. "Elevate Your Beauty" — Welcome Section

- White background
- Left: vertical rose gold accent bar (4px wide gradient)
- Right: heading + 2-3 paragraphs of brand story
- Content from concept: talks about true beauty, confidence, certified professionals, premium-grade products

### 4b. "Loved by Clients" — Testimonials

- Background: `#FFF0EC` (warm peach)
- Grid of 5 review cards (3 top row, 2 bottom row centered)
- Each card: white bg, rose gold border, 5-star rating, italic quote, author name
- Hover: lift + rose gold shadow
- Use the testimonials from the concept as placeholder content

### 4c. "Our Signature Treatments" — Treatment Categories

- White background
- 3 cards in a grid:
  1. **Advanced Facial Sculpting** — icon ✨
  2. **Body Contouring** — icon 💎
  3. **Skin Renewal & Care** — icon 🌹
- Each card: gradient background (`#FFF8F6` → `#FFF0EC`), colored icon header area, title (Playfair italic), description, "LEARN MORE →" link
- Cards link to filtered services page or relevant service category

### 4d. Scripture Quote Banner

- Full-width, plum background `#3D2B35`
- Decorative rose gold lines above and below
- Quote: Proverbs 31:30-31 (Playfair Display italic, 1.8rem, `#F5E6E0`)
- Reference in rose gold

### 4e. "Packages & Memberships" — Pricing Cards

- Background: `#FFF0EC`
- 3 pricing cards:
  1. **Radiance Package** — $299
  2. **Luxe Membership** — $199/mo
  3. **Transformation Bundle** — $899
- Each card: white bg, rose gold border (3px), centered layout, price in rose gold, description, "BOOK NOW" button
- Hover: scale(1.05) + shadow
- All buttons link to Mangomint booking

### Section Order on Homepage

1. Video Hero
2. Elevate Your Beauty (welcome)
3. Loved by Clients (testimonials)
4. Our Signature Treatments (categories)
5. Scripture Quote
6. Packages & Memberships
7. Footer

---

## 5. Footer Update

**File:** `src/components/layout/Footer.astro`

- Background: plum `#3D2B35`
- Text color: rose gold `#C9986A` for headings, `#F5E6E0` for body
- Three-column grid:
  - **Contact:** Phone, email
  - **Location:** Full address (from siteConfig)
  - **Hours:** Mon-Fri, Sat, Sun hours (from siteConfig)
- Rose gold divider line
- Bottom: copyright + "Love Yourself Transformation" tagline
- Keep existing medical disclaimer language (required for compliance)
- Links hover: lighter rose gold

---

## 6. About Page

**File:** `src/pages/about.astro`

- Interior page hero (plum bg, "About" title)
- Main content area: placeholder for Shari's bio
  - Left: image placeholder (solid rose gold div with aspect ratio, labeled "Shari's Photo")
  - Right: text placeholder ("Bio content coming soon — Shari's story, credentials, and philosophy")
- Section for spa philosophy / core values (can pull from existing content)
- CTA section at bottom: "Book a Consultation" with rose gold button

**Note:** Steven will provide the actual image and text for Shari in a follow-up. Build the layout structure now with clearly marked placeholders.

---

## 7. Global Style Updates

**File:** `src/styles/global.css`

Beyond the `@theme` token swap:

- Update `btn-primary` class: rose gold gradient, pill shape, shimmer animation
- Update `btn-secondary` class: transparent bg, rose gold border
- Card hover shadows: use rose gold rgba values
- Links: rose gold on hover (not turquoise)
- Selection highlight color: light rose gold
- Scrollbar accent (if styled): rose gold

---

## 8. Existing Pages — Color Inheritance

These pages should automatically pick up the new colors through the theme tokens, but verify:

- `src/pages/services/index.astro` — services listing
- `src/pages/services/[slug].astro` — individual service pages
- `src/pages/blog/index.astro` — blog listing
- `src/pages/blog/[slug].astro` — individual blog posts
- `src/pages/gallery.astro` — gallery page
- `src/pages/privacy.astro` — privacy policy
- `src/pages/terms.astro` — terms of service
- `src/pages/products.astro` — products page

Any hardcoded colors (not using theme tokens) must be updated to match the new palette.

---

## 9. Logo File Organization

Copy and rename for clean asset paths:

- `docs/logo 3.png` → `public/images/general/logo-icon.png` (lotus emblem)
- `docs/logo 2.png` → `public/images/general/logo-text.png` (wordmark)
- Keep existing `public/images/general/logo.png` as fallback

---

## 10. Build Verification

After all changes:

1. Run `pnpm build` — must exit 0 with no TypeScript errors
2. Run `pnpm dev` and visually verify homepage loads with video hero
3. Confirm no hardcoded turquoise/old colors remain (grep for `#00c2a2`, `#00a68a`, `#0f2320`)

---

## Out of Scope (Future Work)

- Shari's actual bio content and photo (will be provided later)
- Packages & memberships — pricing is placeholder, will be finalized
- Testimonials — placeholder content, real reviews to be added
- Products page redesign
- Gallery page redesign beyond color updates
- Mobile-specific design refinements beyond responsive basics

---

## Acceptance Criteria

- [ ] All theme colors updated to rose gold/plum palette
- [ ] Header shows centered logo with split nav links
- [ ] Homepage has video background hero with correct overlay and CTAs
- [ ] Interior pages have simpler hero (no video)
- [ ] All 6 homepage sections render in correct order
- [ ] Footer uses plum background with rose gold accents
- [ ] About page exists with placeholder content for Shari
- [ ] Logo files copied and used from `public/images/general/`
- [ ] No TypeScript errors — `pnpm build` passes
- [ ] No remaining old color values hardcoded in components
- [ ] Medical compliance disclaimers preserved in footer
- [ ] All Mangomint booking links functional
