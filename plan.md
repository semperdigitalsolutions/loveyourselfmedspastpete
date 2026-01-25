# Total Transformation Med Spa - Development Plan

## Overview
Build a faith-based medical spa website using Astro.js with Tailwind CSS. 
The site includes homepage, services (listing + detail), gallery, blog (listing + post), and about pages.

## Progress Tracking

Mark tasks as:
- `[ ]` Not started
- `[~]` In progress  
- `[x]` Complete

---

## Phase 1: Foundation (Priority: P0)

**PRD:** `/docs/prd/01-foundation.md`

### Tasks

```json
{"category": "foundation", "task": "1.1", "description": "Create BaseLayout.astro with meta, fonts, favicon", "status": "not_started", "passes": false}
```
- [ ] 1.1 Create `src/layouts/BaseLayout.astro`
  - HTML shell with head (meta, fonts, favicon)
  - Google Fonts: Playfair Display + Manrope
  - Material Symbols Outlined
  - Slot for content

```json
{"category": "foundation", "task": "1.2", "description": "Create PageLayout.astro wrapper with Header/Footer", "status": "not_started", "passes": false}
```
- [ ] 1.2 Create `src/layouts/PageLayout.astro`
  - Wraps BaseLayout
  - Includes Header and Footer
  - Props: title, description, showCTA

```json
{"category": "foundation", "task": "1.3", "description": "Create Header component with nav and CTA", "status": "not_started", "passes": false}
```
- [ ] 1.3 Create `src/components/layout/Header.astro`
  - Logo (spa icon + wordmark)
  - Desktop navigation
  - "Book Consultation" CTA button
  - Sticky on scroll

```json
{"category": "foundation", "task": "1.4", "description": "Create MobileNav component", "status": "not_started", "passes": false}
```
- [ ] 1.4 Create `src/components/layout/MobileNav.astro`
  - Hamburger trigger
  - Slide-in drawer
  - Nav links + CTA

```json
{"category": "foundation", "task": "1.5", "description": "Create Footer component with all sections", "status": "not_started", "passes": false}
```
- [ ] 1.5 Create `src/components/layout/Footer.astro`
  - 4-column layout (brand, contact, links, legal)
  - Social links
  - Copyright
  - "Powered by Mangomint" badge

```json
{"category": "foundation", "task": "1.6", "description": "Create UI primitives (Button, SectionHeading, Badge)", "status": "not_started", "passes": false}
```
- [ ] 1.6 Create UI components
  - `src/components/ui/Button.astro` (primary, secondary, ghost variants)
  - `src/components/ui/SectionHeading.astro` (label, title, divider)
  - `src/components/ui/Badge.astro`

---

## Phase 2: Homepage (Priority: P0)

**PRD:** `/docs/prd/02-homepage.md`

```json
{"category": "homepage", "task": "2.1", "description": "Create Hero section component", "status": "not_started", "passes": false}
```
- [ ] 2.1 Create `src/components/sections/Hero.astro`
  - Two-column layout
  - Badge, headline, body, CTAs
  - Featured image with overlay card

```json
{"category": "homepage", "task": "2.2", "description": "Create PhilosophyPillars section", "status": "not_started", "passes": false}
```
- [ ] 2.2 Create `src/components/sections/PhilosophyPillars.astro`
  - Three-column card grid
  - Icons, titles, body, scripture/tagline
  - Hover effects

```json
{"category": "homepage", "task": "2.3", "description": "Create CTABanner section component", "status": "not_started", "passes": false}
```
- [ ] 2.3 Create `src/components/sections/CTABanner.astro`
  - Full-width dark/primary variants
  - Headline, body, CTAs
  - Background image support

```json
{"category": "homepage", "task": "2.4", "description": "Assemble homepage", "status": "not_started", "passes": false}
```
- [ ] 2.4 Create `src/pages/index.astro`
  - Compose Hero + PhilosophyPillars + CTABanner
  - Verify responsive layout

---

## Phase 3: Services (Priority: P0)

**PRD:** `/docs/prd/03-services.md`

```json
{"category": "services", "task": "3.1", "description": "Create ServiceCard component", "status": "not_started", "passes": false}
```
- [ ] 3.1 Create `src/components/cards/ServiceCard.astro`
  - Image, title, description, "Learn More" link
  - Hover effects

```json
{"category": "services", "task": "3.2", "description": "Create services listing page", "status": "not_started", "passes": false}
```
- [ ] 3.2 Create `src/pages/services/index.astro`
  - Page header
  - Grid of ServiceCards
  - Query content collection

```json
{"category": "services", "task": "3.3", "description": "Create service detail page template", "status": "not_started", "passes": false}
```
- [ ] 3.3 Create `src/pages/services/[...slug].astro`
  - Breadcrumb
  - Service content (markdown rendered)
  - Sidebar with booking CTA

```json
{"category": "services", "task": "3.4", "description": "Add placeholder service content", "status": "not_started", "passes": false}
```
- [ ] 3.4 Create placeholder services in `/src/content/services/`
  - instasculpting.md
  - advanced-facials.md
  - iv-therapy.md
  - med-head-spa.md
  - injectables.md

---

## Phase 4: Gallery (Priority: P0)

**PRD:** `/docs/prd/04-gallery.md`

```json
{"category": "gallery", "task": "4.1", "description": "Create ResultCard component for before/after", "status": "not_started", "passes": false}
```
- [ ] 4.1 Create `src/components/cards/ResultCard.astro`
  - Side-by-side before/after images
  - Before/After badges
  - Sessions badge, description, testimonial

```json
{"category": "gallery", "task": "4.2", "description": "Create CategoryFilter component", "status": "not_started", "passes": false}
```
- [ ] 4.2 Create `src/components/gallery/CategoryFilter.astro`
  - Pill buttons for filtering
  - Client-side JavaScript filtering

```json
{"category": "gallery", "task": "4.3", "description": "Create gallery page", "status": "not_started", "passes": false}
```
- [ ] 4.3 Create `src/pages/gallery.astro`
  - Page header with "Real Results" styling
  - Category filter
  - Grid of ResultCards
  - CTA Banner

```json
{"category": "gallery", "task": "4.4", "description": "Add placeholder gallery content", "status": "not_started", "passes": false}
```
- [ ] 4.4 Create placeholder gallery items in `/src/content/gallery/`

---

## Phase 5: Blog (Priority: P1)

**PRD:** `/docs/prd/05-blog.md`

```json
{"category": "blog", "task": "5.1", "description": "Create BlogCard component", "status": "not_started", "passes": false}
```
- [ ] 5.1 Create `src/components/cards/BlogCard.astro`
  - Image, category badge, title, excerpt, date

```json
{"category": "blog", "task": "5.2", "description": "Create FeaturedPost component", "status": "not_started", "passes": false}
```
- [ ] 5.2 Create `src/components/blog/FeaturedPost.astro`
  - Hero-style display for featured article

```json
{"category": "blog", "task": "5.3", "description": "Create ShareButtons component", "status": "not_started", "passes": false}
```
- [ ] 5.3 Create `src/components/blog/ShareButtons.astro`
  - Facebook, Twitter/X, Copy Link buttons

```json
{"category": "blog", "task": "5.4", "description": "Create blog listing page", "status": "not_started", "passes": false}
```
- [ ] 5.4 Create `src/pages/blog/index.astro`
  - Featured post
  - Category filter
  - Grid of BlogCards

```json
{"category": "blog", "task": "5.5", "description": "Create blog post page template", "status": "not_started", "passes": false}
```
- [ ] 5.5 Create `src/pages/blog/[...slug].astro`
  - Article header + featured image
  - Markdown content with prose styling
  - Share buttons
  - Sidebar with CTA + related posts

```json
{"category": "blog", "task": "5.6", "description": "Create BlogPostLayout", "status": "not_started", "passes": false}
```
- [ ] 5.6 Create `src/layouts/BlogPostLayout.astro` (if needed)

```json
{"category": "blog", "task": "5.7", "description": "Add placeholder blog posts", "status": "not_started", "passes": false}
```
- [ ] 5.7 Create placeholder posts in `/src/content/blog/`

---

## Phase 6: About Page (Priority: P1)

**PRD:** `/docs/prd/06-about.md`

```json
{"category": "about", "task": "6.1", "description": "Create ValuePropositions section", "status": "not_started", "passes": false}
```
- [ ] 6.1 Create `src/components/sections/ValuePropositions.astro`
  - Three-column cards with icons
  - Revolutionary Technology, Holistic & Faith-Based, Empowered Results

```json
{"category": "about", "task": "6.2", "description": "Create about page", "status": "not_started", "passes": false}
```
- [ ] 6.2 Create `src/pages/about.astro`
  - Hero section
  - ValuePropositions
  - CTA Banner

---

## Phase 7: Polish & Launch (Priority: P2)

```json
{"category": "polish", "task": "7.1", "description": "Responsive testing all pages", "status": "not_started", "passes": false}
```
- [ ] 7.1 Test responsive design on all pages

```json
{"category": "polish", "task": "7.2", "description": "Add placeholder images", "status": "not_started", "passes": false}
```
- [ ] 7.2 Add placeholder images where needed

```json
{"category": "polish", "task": "7.3", "description": "Verify all internal links work", "status": "not_started", "passes": false}
```
- [ ] 7.3 Verify all links work

```json
{"category": "polish", "task": "7.4", "description": "Build production and verify no errors", "status": "not_started", "passes": false}
```
- [ ] 7.4 Run `npm run build` with no errors

---

## Notes

- Read the PRD for each phase before starting implementation
- Check acceptance criteria in PRDs before marking tasks complete
- Use placeholder content where real content is not available
- All booking links use `href="#"` until Mangomint is integrated
