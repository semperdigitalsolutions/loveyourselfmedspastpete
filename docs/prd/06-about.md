# PRD: About / Philosophy Page

## Overview

The About page (also referred to as "Philosophy" or "Why Us") communicates the brand's unique value proposition, faith-based approach, and reasons to choose Total Transformation over competitors.

**Page URL:** `/about`  
**Priority:** P1  
**Estimated Effort:** 0.5-1 day

---

## Design Reference

Based on Page 3 mockup (Philosophy/Why Us) from Google Stitch.

---

## Page Purpose

1. **Differentiate** — Highlight what makes Total Transformation unique (faith-based, holistic)
2. **Build Trust** — Share the story, values, and expertise
3. **Connect** — Create emotional connection through shared values
4. **Convert** — Drive bookings through compelling positioning

---

## Page Sections

### 1. Hero Section

#### Content

| Element | Content |
|---------|---------|
| Label | "About Total Transformation" |
| Headline | "Where Faith Meets Transformation" |
| Body | "We believe true beauty radiates from within. Our approach combines clinical excellence with spiritual wellness, honoring your body as the sacred temple it is." |

#### Visual Elements
- Optional: Hero image or brand imagery
- Soft background gradient

#### Visual Specs

| Property | Value |
|----------|-------|
| Section Padding | py-16 md:py-24 |
| Headline Size | text-4xl md:text-6xl |
| Max Width | max-w-3xl for text content |
| Text Alignment | center |

---

### 2. Value Proposition Cards

#### Purpose
Highlight the three key differentiators that set Total Transformation apart.

#### Content

**Card 1: Revolutionary Technology**
- Icon: science
- Title: "Revolutionary Technology"
- Body: "We stay at the forefront of clinical innovation, offering the most advanced, FDA-cleared, non-invasive treatments available today."
- Supporting Detail: "Cutting-Edge Equipment"

**Card 2: Holistic & Faith-Based**
- Icon: favorite
- Title: "Holistic & Faith-Based"
- Body: "Your wellness journey is more than skin deep. We integrate spiritual wellness practices with clinical care, honoring the belief that you are 'fearfully and wonderfully made.'"
- Scripture: "— Psalm 139:14"

**Card 3: Empowered Results**
- Icon: auto_awesome
- Title: "Empowered Results"
- Body: "Our personalized treatment plans are designed to deliver visible, lasting results while nurturing your overall well-being and self-confidence."
- Supporting Detail: "Tailored Care Plans"

#### Layout
- Three-column grid on desktop
- Single column on mobile
- Cards with subtle hover effects

#### Component: `src/components/sections/ValuePropositions.astro`

#### Visual Specs

| Property | Value |
|----------|-------|
| Section Background | background-offwhite or rose-soft/20 |
| Section Padding | py-24 |
| Card Background | white |
| Card Padding | p-8 md:p-10 |
| Card Border | border border-gray-100 |
| Card Border Radius | rounded-2xl |
| Icon Container | size-14, rounded-xl, primary/10 bg |
| Icon Color | primary |
| Scripture/Detail | text-sm, italic, gold color |

---

### 3. Our Story Section (Optional)

#### Purpose
Personal connection through the founder's story and mission.

#### Content (Draft)
- Heading: "Our Story"
- Body: Shari's journey, why she founded Total Transformation, her vision for faith-based wellness

#### Visual Elements
- Two-column layout: image + text
- Founder photo (if available)
- Quote or mission statement

#### Notes
- Content TBD from Shari
- Can be added later if not ready at launch

---

### 4. CTA Banner

#### Content
- Headline: "Start Your Sacred Journey"
- Body: "Experience the transformation that honors your whole self—mind, body, and spirit."
- Primary CTA: "Book Your Consultation"
- Secondary CTA: "View Our Services"

#### Component
Reuse `CTABanner.astro` with primary variant (turquoise background)

---

## Page Component

### File: `src/pages/about.astro`

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import SectionHeading from '../components/ui/SectionHeading.astro';
import ValuePropositions from '../components/sections/ValuePropositions.astro';
import CTABanner from '../components/sections/CTABanner.astro';
---

<PageLayout 
  title="About Us" 
  description="Discover Total Transformation's faith-based approach to holistic wellness and clinical anti-aging excellence."
  showCTA={false}
>
  <!-- Hero -->
  <section class="py-16 md:py-24 px-6 text-center bg-gradient-to-b from-rose-soft/30 to-transparent">
    <div class="max-w-3xl mx-auto">
      <span class="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
        About Total Transformation
      </span>
      <h1 class="text-4xl md:text-6xl font-bold font-display text-text-main mb-8 leading-tight">
        Where Faith Meets <span class="text-primary italic">Transformation</span>
      </h1>
      <p class="text-lg md:text-xl text-text-body leading-relaxed">
        We believe true beauty radiates from within. Our approach combines clinical excellence 
        with spiritual wellness, honoring your body as the sacred temple it is.
      </p>
    </div>
  </section>
  
  <!-- Value Propositions -->
  <ValuePropositions />
  
  <!-- Our Story (Optional - can be added when content is ready) -->
  <!-- <OurStory /> -->
  
  <!-- CTA -->
  <CTABanner
    headline="Start Your Sacred Journey"
    body="Experience the transformation that honors your whole self—mind, body, and spirit."
    primaryCTA={{ text: "Book Your Consultation", href: "#" }}
    secondaryCTA={{ text: "View Our Services", href: "/services" }}
    variant="primary"
  />
</PageLayout>
```

---

## ValuePropositions Component

### File: `src/components/sections/ValuePropositions.astro`

```astro
---
const values = [
  {
    icon: 'science',
    title: 'Revolutionary Technology',
    body: 'We stay at the forefront of clinical innovation, offering the most advanced, FDA-cleared, non-invasive treatments available today.',
    detail: 'Cutting-Edge Equipment',
  },
  {
    icon: 'favorite',
    title: 'Holistic & Faith-Based',
    body: 'Your wellness journey is more than skin deep. We integrate spiritual wellness practices with clinical care, honoring the belief that you are "fearfully and wonderfully made."',
    detail: '— Psalm 139:14',
    isScripture: true,
  },
  {
    icon: 'auto_awesome',
    title: 'Empowered Results',
    body: 'Our personalized treatment plans are designed to deliver visible, lasting results while nurturing your overall well-being and self-confidence.',
    detail: 'Tailored Care Plans',
  },
];
---

<section class="py-24 px-6 bg-background-offwhite">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <span class="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
        Why Choose Us
      </span>
      <h2 class="text-4xl md:text-5xl font-bold font-display text-text-main">
        The Total Transformation Difference
      </h2>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      {values.map((value) => (
        <article class="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-soft hover:shadow-card transition-all duration-500 group">
          <!-- Icon -->
          <div class="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary">
              {value.icon}
            </span>
          </div>
          
          <!-- Title -->
          <h3 class="text-xl font-bold font-display text-text-main mb-4">
            {value.title}
          </h3>
          
          <!-- Body -->
          <p class="text-text-body leading-relaxed mb-6">
            {value.body}
          </p>
          
          <!-- Detail/Scripture -->
          <span class:list={[
            'text-sm font-medium',
            value.isScripture ? 'text-gold italic font-display' : 'text-primary'
          ]}>
            {value.detail}
          </span>
        </article>
      ))}
    </div>
  </div>
</section>
```

---

## Optional: OurStory Component

### File: `src/components/sections/OurStory.astro`

To be developed when content is available from Shari.

### Proposed Structure

```astro
---
interface Props {
  image?: string;
  heading?: string;
  body: string;
  quote?: string;
}
---

<section class="py-24 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Image -->
      <div class="aspect-[4/5] rounded-2xl overflow-hidden">
        <img 
          src={image || '/images/founder.jpg'} 
          alt="Shari Irwin, Founder"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Content -->
      <div>
        <span class="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
          Our Story
        </span>
        <h2 class="text-3xl md:text-4xl font-bold font-display text-text-main mb-6">
          {heading || 'A Vision for Holistic Wellness'}
        </h2>
        <div class="prose prose-lg text-text-body">
          {body}
        </div>
        {quote && (
          <blockquote class="mt-8 pl-6 border-l-4 border-gold bg-rose-soft/50 p-6 rounded-r-xl">
            <p class="text-lg font-display italic text-text-main">
              "{quote}"
            </p>
            <cite class="block mt-2 text-sm text-gold not-italic">
              — Shari Irwin, Founder
            </cite>
          </blockquote>
        )}
      </div>
    </div>
  </div>
</section>
```

---

## Content Requirements

### Required Content

| Item | Status | Owner |
|------|--------|-------|
| Hero headline/body | Draft from mockup | Shari to approve |
| Value proposition cards | Draft from mockup | Shari to approve |

### Optional Content (Can Add Later)

| Item | Status | Owner |
|------|--------|-------|
| Founder story | Not written | Shari to provide |
| Founder photo | Not available | Shari to provide |
| Mission statement | Not written | Shari to provide |
| Team photos | Not available | Future addition |

---

## Data Structure (Optional)

If you want to make the value propositions editable:

### File: `src/data/aboutContent.ts`

```typescript
export const aboutContent = {
  hero: {
    label: 'About Total Transformation',
    headline: 'Where Faith Meets Transformation',
    body: 'We believe true beauty radiates from within...',
  },
  values: [
    {
      icon: 'science',
      title: 'Revolutionary Technology',
      body: '...',
      detail: 'Cutting-Edge Equipment',
    },
    // ... more values
  ],
  story: {
    heading: 'Our Story',
    body: '...',
    quote: '...',
    image: '/images/founder.jpg',
  },
};
```

---

## SEO Considerations

- **Title:** "About Us | Total Transformation"
- **Description:** "Discover Total Transformation's faith-based approach to holistic wellness and clinical anti-aging excellence in [City], NC."
- **H1:** "Where Faith Meets Transformation"
- **Schema:** AboutPage schema, LocalBusiness (future)

---

## Testing Checklist

- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] Value proposition cards render
- [ ] Hover effects work on cards
- [ ] Icons display correctly
- [ ] CTA banner functional
- [ ] Responsive on all breakpoints
- [ ] Meta tags correct
- [ ] Scripture text styled correctly (gold, italic)
