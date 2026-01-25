# PRD: Homepage

## Overview

The homepage is the primary landing page and brand introduction for Total Transformation Med Spa. It communicates the faith-based holistic wellness positioning while showcasing the core value proposition.

**Page URL:** `/`  
**Priority:** P0  
**Estimated Effort:** 1-2 days

---

## Design Reference

Based on Page 1 mockup from Google Stitch.

---

## Page Sections

### 1. Hero Section

#### Purpose
Immediately communicate brand identity, value proposition, and primary CTA.

#### Content

| Element | Content |
|---------|---------|
| Badge | "Faith-Forward Wellness" with verified icon |
| Headline | "Love Yourself Enough to *Transform*" |
| Subheadline | "Mind. Body. Wellness. Anti-Aging." |
| Body | "Reclaim your radiance with our bespoke approach to holistic beauty that honors your physical temple." |
| Primary CTA | "Start Your Journey" → Booking link |
| Secondary CTA | "View Treatments" → /services |
| Social Proof | "Joined by 2,000+ glowing clients" (or remove if not accurate) |

#### Visual Elements
- Featured image: Serene spa treatment room
- "Featured Ritual" card overlay: "The Sacred Renewal Facial"
- Decorative gold flare icon (top right)

#### Layout
- Two columns on desktop (text left, image right)
- Stacked on mobile (image first, then text)

#### Component: `src/components/sections/Hero.astro`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| badge | string | No | Badge text above headline |
| headline | string | Yes | Main headline (supports HTML for italic) |
| subheadline | string | No | Bold text above body |
| body | string | Yes | Body paragraph |
| primaryCTA | { text: string, href: string } | Yes | Primary button |
| secondaryCTA | { text: string, href: string } | No | Secondary button |
| image | { src: string, alt: string } | Yes | Hero image |
| featuredCard | { label: string, title: string } | No | Overlay card |

#### Visual Specs

| Property | Value |
|----------|-------|
| Section Padding | py-16 md:py-24 |
| Max Width | max-w-7xl |
| Headline Size | text-5xl md:text-7xl |
| Image Border Radius | rounded-2xl |

### Acceptance Criteria

- [ ] Headline renders with "Transform" in italics and primary color
- [ ] Both CTAs functional
- [ ] Image displays with overlay gradient
- [ ] Featured card positioned correctly
- [ ] Responsive layout works
- [ ] Social proof section displays (or hidden if not using)

---

### 2. Philosophy Pillars Section

#### Purpose
Communicate the three-part holistic approach: Mind, Body, Spirit.

#### Content

**Section Header:**
- Label: "Our Philosophy"
- Title: "The Total Transformation Promise"
- Body: "A biblical and holistic approach designed to renew your temple through the intersection of ancient wisdom and modern clinical science."

**Pillar 1: Renewed Mind**
- Icon: psychology
- Title: "Renewed Mind"
- Body: "Experience spiritual peace and mental clarity. We integrate prayerful meditation and mindfulness to release stress and restore focus."
- Scripture: "Renew the spirit of your mind."

**Pillar 2: Honored Body**
- Icon: health_and_safety
- Title: "Honored Body"
- Body: "Advanced clinical treatments and non-invasive anti-aging rituals that rejuvenate your physical form with precision and luxury."
- Tagline: "Clinical Excellence & Care"

**Pillar 3: Holistic Spirit**
- Icon: local_florist
- Title: "Holistic Spirit"
- Body: "Our integrated approach ensures your external glow is a true reflection of your internal spiritual well-being and health."
- Tagline: "Pure & Organic Essentials"

#### Layout
- Three-column grid on desktop
- Single column on mobile
- Cards with hover effects (lift + shadow)

#### Component: `src/components/sections/PhilosophyPillars.astro`

#### Visual Specs

| Property | Value |
|----------|-------|
| Section Background | gradient from white via rose-soft/30 to white |
| Section Padding | py-24 |
| Card Background | white |
| Card Padding | p-10 |
| Card Border Radius | rounded-2xl |
| Icon Container | size-16, rounded-2xl, gold/10 bg |
| Hover Effect | -translate-y-2, shadow-xl |

### Acceptance Criteria

- [ ] All three pillars display
- [ ] Icons render correctly
- [ ] Hover animations work
- [ ] Scripture/taglines in gold italic
- [ ] Responsive grid collapses to single column

---

### 3. CTA Banner Section

#### Purpose
Strong call-to-action to drive bookings.

#### Content
- Headline: "Ready to Begin Your Sacred Transformation?"
- Body: "Join us for a luxury experience that honors your mind, body, and spirit."
- Primary CTA: "Book My Ritual"
- Secondary CTA: "Explore Services"

#### Layout
- Full-width dark background (background-dark)
- Background image with overlay
- Centered text

#### Component: `src/components/sections/CTABanner.astro`

#### Props

| Prop | Type | Required | Default |
|------|------|----------|---------|
| headline | string | Yes | - |
| body | string | No | - |
| primaryCTA | { text, href } | Yes | - |
| secondaryCTA | { text, href } | No | - |
| variant | 'dark' \| 'primary' | No | 'dark' |
| backgroundImage | string | No | - |

#### Visual Specs

| Property | Value |
|----------|-------|
| Background | background-dark with image overlay |
| Section Padding | p-12 md:p-24 |
| Border Radius | rounded-3xl |
| Headline Size | text-4xl md:text-6xl |
| Headline Color | white |
| Body Color | primary (turquoise) |

### Acceptance Criteria

- [ ] Banner renders with dark background
- [ ] Background image has overlay
- [ ] CTAs functional
- [ ] Text is readable against background
- [ ] Responsive padding

---

## Page Component

### File: `src/pages/index.astro`

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import Hero from '../components/sections/Hero.astro';
import PhilosophyPillars from '../components/sections/PhilosophyPillars.astro';
import CTABanner from '../components/sections/CTABanner.astro';
---

<PageLayout 
  title="Faith-Based Holistic Wellness"
  description="Total Transformation Med Spa - A sanctuary for faith-led wellness and clinical anti-aging excellence."
  showCTA={false}
>
  <Hero
    badge="Faith-Forward Wellness"
    headline="Love Yourself Enough to <em class='text-primary'>Transform</em>"
    subheadline="Mind. Body. Wellness. Anti-Aging."
    body="Reclaim your radiance with our bespoke approach to holistic beauty that honors your physical temple."
    primaryCTA={{ text: "Start Your Journey", href: "#" }}
    secondaryCTA={{ text: "View Treatments", href: "/services" }}
    image={{ src: "/images/hero-spa.jpg", alt: "Serene luxury spa treatment room" }}
  />
  
  <PhilosophyPillars />
  
  <CTABanner
    headline="Ready to Begin Your Sacred Transformation?"
    body="Join us for a luxury experience that honors your mind, body, and spirit."
    primaryCTA={{ text: "Book My Ritual", href: "#" }}
    secondaryCTA={{ text: "Explore Services", href: "/services" }}
  />
</PageLayout>
```

---

## Content Requirements

| Content Item | Status | Owner |
|--------------|--------|-------|
| Hero headline | Draft from mockup | Shari to approve |
| Hero body copy | Draft from mockup | Shari to approve |
| Philosophy pillars text | Draft from mockup | Shari to approve |
| Hero image | Placeholder needed | Shari to provide |
| Social proof stats | TBD | Shari to confirm or remove |

---

## SEO Considerations

- **Title:** "Total Transformation | Faith-Based Holistic Wellness"
- **Meta Description:** "A sanctuary for faith-led wellness and clinical anti-aging excellence. Reclaim your radiance with holistic beauty treatments in [City], NC."
- **H1:** "Love Yourself Enough to Transform"
- **Schema:** LocalBusiness markup (future)

---

## Testing Checklist

- [ ] Page loads without errors
- [ ] Hero displays correctly on desktop/mobile
- [ ] All CTAs link to correct destinations
- [ ] Philosophy cards animate on hover
- [ ] Images have proper alt text
- [ ] Page title and meta description set
- [ ] Responsive at all breakpoints
- [ ] Performance: images optimized
