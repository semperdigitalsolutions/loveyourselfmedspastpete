# PRD: Gallery (Before & After Results)

## Overview

The Gallery page showcases client transformation results through before/after image comparisons. This is critical social proof for a med spa and helps potential clients visualize outcomes.

**Page URL:** `/gallery`  
**Priority:** P0  
**Estimated Effort:** 1 day

---

## Design Reference

Based on Page 5 mockup (Real Results Gallery) from Google Stitch.

---

## Content Collection

### Schema: `src/content/config.ts`

```typescript
const gallery = defineCollection({
  type: 'data', // Using data since no markdown body needed
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Body Contouring',
      'Facials',
      'Injectables',
      'Holistic Wellness'
    ]),
    beforeImage: z.string(),
    afterImage: z.string(),
    sessions: z.number(),
    description: z.string(),
    testimonial: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});
```

### Example Gallery Item: `src/content/gallery/radiance-restoration.json`

```json
{
  "title": "Radiance Restoration",
  "category": "Facials",
  "beforeImage": "/images/gallery/radiance-before.jpg",
  "afterImage": "/images/gallery/radiance-after.jpg",
  "sessions": 4,
  "description": "Targeted therapy for acne scarring and uneven pigmentation using our signature holistic serums.",
  "testimonial": "I feel like I have my glow back. Thank you for the gentle care.",
  "order": 1,
  "featured": true
}
```

### Initial Gallery Items

| Title | Category | Sessions |
|-------|----------|----------|
| Radiance Restoration | Facials | 4 |
| Holistic Sculpting | Body Contouring | 6 |
| Age-Defying Lift | Injectables | 1 |
| Detox Body Wrap | Holistic Wellness | 3 |
| Sun Damage Repair | Facials | 5 |
| Scalp Revitalization | Holistic Wellness | 8 |

*Note: These are placeholders. Real content requires actual client photos with consent.*

---

## Gallery Page

### File: `src/pages/gallery.astro`

### Sections

#### 1. Page Header
- Label: "Before & After Gallery"
- Title: "Real Results."
- Subtitle: "Faith in every step, beauty in every reveal. Witness the transformations that go beyond skin deep."

#### 2. Category Filter
- Pill buttons for filtering
- "All Results" (default active)
- Category options from schema enum
- Client-side filtering (JavaScript)

#### 3. Results Grid
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- ResultCard component for each item

#### 4. CTA Banner
- "Ready to Start Your Journey?"
- Book consultation button

### Component Structure

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import SectionHeading from '../components/ui/SectionHeading.astro';
import ResultCard from '../components/cards/ResultCard.astro';
import CTABanner from '../components/sections/CTABanner.astro';
import CategoryFilter from '../components/gallery/CategoryFilter.astro';
import { getCollection } from 'astro:content';

const galleryItems = await getCollection('gallery');
const sortedItems = galleryItems.sort((a, b) => a.data.order - b.data.order);

const categories = ['All Results', 'Body Contouring', 'Facials', 'Injectables', 'Holistic Wellness'];
---

<PageLayout title="Gallery" description="View real transformation results from our clients.">
  <!-- Header -->
  <section class="py-16 md:py-24 px-6 max-w-7xl mx-auto text-center">
    <span class="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
      Before & After Gallery
    </span>
    <h1 class="text-5xl md:text-7xl font-medium italic tracking-tight text-primary font-display mb-6">
      Real Results.
    </h1>
    <p class="max-w-2xl mx-auto text-lg text-text-body leading-relaxed">
      Faith in every step, beauty in every reveal. Witness the transformations that go beyond skin deep.
    </p>
  </section>
  
  <!-- Filter -->
  <CategoryFilter categories={categories} />
  
  <!-- Grid -->
  <section class="max-w-7xl mx-auto px-6 mb-24">
    <div 
      id="gallery-grid"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
    >
      {sortedItems.map((item) => (
        <ResultCard item={item} />
      ))}
    </div>
  </section>
  
  <!-- CTA -->
  <CTABanner
    headline="Ready to Start Your Journey?"
    body="Every transformation begins with a single step of faith. Schedule your personalized consultation today."
    primaryCTA={{ text: "Book Your Transformation", href: "#" }}
    secondaryCTA={{ text: "View Treatment Menu", href: "/services" }}
    variant="primary"
  />
</PageLayout>
```

---

## CategoryFilter Component

### File: `src/components/gallery/CategoryFilter.astro`

### Props

| Prop | Type | Description |
|------|------|-------------|
| categories | string[] | List of category options |

### Behavior
- Client-side JavaScript filtering
- "All Results" shows everything
- Category button filters grid to matching items
- Active state styling on selected button

### Structure

```astro
---
interface Props {
  categories: string[];
}

const { categories } = Astro.props;
---

<div class="max-w-7xl mx-auto px-6 mb-12">
  <div class="flex flex-wrap justify-center gap-3">
    {categories.map((category, index) => (
      <button
        class:list={[
          'filter-btn px-6 py-2.5 rounded-full text-sm font-bold transition-all',
          index === 0 
            ? 'bg-primary text-white shadow-md shadow-primary/20' 
            : 'bg-white border border-gray-200 text-text-body hover:border-primary hover:text-primary'
        ]}
        data-category={category === 'All Results' ? 'all' : category}
      >
        {category}
      </button>
    ))}
  </div>
</div>

<script>
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category-item]');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update button styles
      buttons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');
        btn.classList.add('bg-white', 'border', 'border-gray-200', 'text-text-body');
      });
      button.classList.remove('bg-white', 'border', 'border-gray-200', 'text-text-body');
      button.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');
      
      // Filter cards
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category-item');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
</script>
```

### Acceptance Criteria

- [ ] All category buttons render
- [ ] "All Results" active by default
- [ ] Clicking filters the grid
- [ ] Active state updates correctly
- [ ] Smooth transitions (no jarring layout shifts)

---

## ResultCard Component

### File: `src/components/cards/ResultCard.astro`

### Props

| Prop | Type | Description |
|------|------|-------------|
| item | CollectionEntry | Gallery item from content collection |

### Visual Specs

| Property | Value |
|----------|-------|
| Card Background | white |
| Card Border | border border-gold/20, hover:border-gold |
| Card Border Radius | rounded-2xl |
| Image Container | h-64, flex (side-by-side) |
| Before/After Split | 50% / 50% width |
| Badge Position | absolute top-3 left-3 / right-3 |

### Structure

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  item: CollectionEntry<'gallery'>;
}

const { item } = Astro.props;
const { title, category, beforeImage, afterImage, sessions, description, testimonial } = item.data;
---

<article 
  class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gold/20 hover:border-gold transition-all duration-500 shadow-soft hover:shadow-card"
  data-category-item={category}
>
  <!-- Before/After Images -->
  <div class="relative flex h-64 w-full">
    <!-- Before -->
    <div class="relative w-1/2 h-full border-r border-white/20">
      <div 
        class="absolute inset-0 bg-cover bg-center"
        style={`background-image: url('${beforeImage}')`}
      ></div>
      <div class="absolute inset-0 bg-black/10"></div>
      <span class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
        Before
      </span>
    </div>
    
    <!-- After -->
    <div class="relative w-1/2 h-full">
      <div 
        class="absolute inset-0 bg-cover bg-center"
        style={`background-image: url('${afterImage}')`}
      ></div>
      <span class="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
        After
      </span>
    </div>
    
    <!-- Gold divider line -->
    <div class="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80"></div>
  </div>
  
  <!-- Content -->
  <div class="p-6 flex flex-col flex-grow">
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-xl font-bold text-text-main font-display">{title}</h3>
      <span class="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded-md whitespace-nowrap uppercase tracking-wide">
        {sessions} {sessions === 1 ? 'Session' : 'Sessions'}
      </span>
    </div>
    
    <p class="text-sm text-text-body mb-6 leading-relaxed">
      {description}
    </p>
    
    {testimonial && (
      <div class="mt-auto bg-rose-soft p-5 rounded-xl relative border border-rose/20">
        <span class="material-symbols-outlined absolute -top-3 -left-1 text-primary/30 text-4xl">
          format_quote
        </span>
        <p class="text-primary-dark italic relative z-10 pl-2 font-display text-lg">
          "{testimonial}"
        </p>
      </div>
    )}
  </div>
</article>
```

### Acceptance Criteria

- [ ] Before/After images display side by side
- [ ] "Before" and "After" badges positioned correctly
- [ ] Session count badge shows
- [ ] Testimonial quote styled correctly
- [ ] Hover effects work
- [ ] data-category-item attribute present for filtering

---

## Compliance Considerations

### Medical Spa Regulations (North Carolina)

Before/after photos for medical procedures may have regulatory requirements:

1. **Disclaimers:** May need "Results may vary" or similar disclaimer
2. **Consent:** Must have written client consent to use photos
3. **Accuracy:** Photos must be unaltered and represent actual results
4. **Labeling:** May need to indicate treatment type and timeframe

### Recommended Disclaimer

Add to the page header or footer:

> "Individual results may vary. Images shown represent actual client outcomes following treatment protocols. All photos used with client consent."

### Implementation

```astro
<p class="text-xs text-text-body/60 text-center max-w-2xl mx-auto mt-8">
  Individual results may vary. Images shown represent actual client outcomes following treatment protocols. All photos used with client consent.
</p>
```

---

## Content Requirements

### For Each Gallery Item, Shari Needs:

| Item | Required | Notes |
|------|----------|-------|
| Before photo | Yes | High-quality, consistent lighting |
| After photo | Yes | Same angle/lighting as before |
| Treatment name | Yes | What was performed |
| Category | Yes | Must match defined categories |
| Sessions | Yes | Number of sessions to achieve result |
| Description | Yes | 1-2 sentences about the treatment |
| Testimonial | Optional | Client quote (with consent) |
| Written consent | Yes | Legal requirement |

### Photo Guidelines

- Consistent lighting between before/after
- Same angle/position
- Professional quality
- No identifying features if client prefers anonymity
- Appropriate resolution for web (min 800px width)

---

## SEO Considerations

- **Title:** "Before & After Gallery | Total Transformation"
- **Description:** "View real transformation results from our holistic wellness treatments including facials, body contouring, and more."
- **Alt Text:** Descriptive alt text for all images

---

## Testing Checklist

- [ ] All gallery items load
- [ ] Category filter works correctly
- [ ] "All Results" is default active
- [ ] Before/After images display correctly
- [ ] Session badges accurate
- [ ] Testimonials render (when present)
- [ ] Responsive grid layout
- [ ] Hover effects work
- [ ] Disclaimer text present
- [ ] Images have proper alt text
