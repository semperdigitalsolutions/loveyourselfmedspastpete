# PRD: Services

## Overview

The Services section showcases all treatment offerings at Total Transformation Med Spa. It includes a listing page with service cards and individual detail pages for each service.

**Page URLs:**  
- Listing: `/services`
- Detail: `/services/[slug]`

**Priority:** P0  
**Estimated Effort:** 1-2 days

---

## Design Reference

Based on Page 2 mockup (Services Listing) from Google Stitch.

---

## Content Collection

### Schema: `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string().max(200),
    image: z.string(),
    icon: z.string().optional(), // Material Symbols icon name
    order: z.number().default(0),
    featured: z.boolean().default(false),
    duration: z.string().optional(), // e.g., "60-90 minutes"
    priceRange: z.string().optional(), // e.g., "Starting at $200"
  }),
});

export const collections = { services };
```

### Example Service File: `src/content/services/instasculpting.md`

```markdown
---
title: "InstaSculpting Body Contouring"
shortDescription: "Precision-focused technology that targets stubborn areas while honoring the natural temple of your body."
image: "/images/services/instasculpting.jpg"
icon: "fitness_center"
order: 1
featured: true
duration: "45-60 minutes"
priceRange: "Starting at $250"
---

## What is InstaSculpting?

InstaSculpting is our signature non-invasive body contouring treatment that uses advanced technology to target and reduce stubborn fat cells while toning and tightening the skin.

## Benefits

- Non-invasive with no downtime
- Targets stubborn areas resistant to diet and exercise
- Visible results in as few as 3 sessions
- Comfortable treatment experience
- FDA-cleared technology

## What to Expect

Your session begins with a consultation to identify your target areas and create a personalized treatment plan. During the treatment, you'll relax comfortably while our technology works to contour your body naturally.

## Ideal Candidates

InstaSculpting is ideal for individuals who are close to their ideal weight but have stubborn pockets of fat that don't respond to diet and exercise. It's not a weight loss solution but a body sculpting enhancement.

## Book Your Consultation

Ready to transform your body while honoring your temple? Book a consultation to learn if InstaSculpting is right for you.
```

### Services List (Initial)

| Service | Order | Featured |
|---------|-------|----------|
| InstaSculpting Body Contouring | 1 | Yes |
| Advanced Facials | 2 | Yes |
| IV Therapy | 3 | Yes |
| Med Head Spa | 4 | No |
| Injectables | 5 | No |

*Note: Service list to be finalized with Shari*

---

## Services Listing Page

### File: `src/pages/services/index.astro`

### Sections

#### 1. Page Header
- Label: "Holistic Excellence"
- Title: "Signature Services"
- Body: "Curated treatments designed to restore balance to your body, mind, and spirit."

#### 2. Services Grid
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- ServiceCard for each service

#### 3. Testimonials Carousel (Optional)
- Horizontal scroll of testimonial cards
- Can be deferred or simplified

### Component Structure

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import SectionHeading from '../../components/ui/SectionHeading.astro';
import ServiceCard from '../../components/cards/ServiceCard.astro';
import { getCollection } from 'astro:content';

const services = await getCollection('services');
const sortedServices = services.sort((a, b) => a.data.order - b.data.order);
---

<PageLayout title="Services" description="Explore our signature holistic wellness treatments.">
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <SectionHeading
      label="Holistic Excellence"
      title="Signature Services"
    />
    <p class="text-center text-text-body max-w-lg mx-auto mb-16 -mt-8">
      Curated treatments designed to restore balance to your body, mind, and spirit.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedServices.map((service) => (
        <ServiceCard service={service} />
      ))}
    </div>
  </section>
</PageLayout>
```

---

## ServiceCard Component

### File: `src/components/cards/ServiceCard.astro`

### Props

| Prop | Type | Description |
|------|------|-------------|
| service | CollectionEntry | Service from content collection |

### Visual Specs

| Property | Value |
|----------|-------|
| Card Background | white |
| Card Padding | p-4 |
| Card Border | border border-gray-100 |
| Card Border Radius | rounded-xl |
| Image Aspect Ratio | aspect-[4/5] |
| Image Border Radius | rounded-lg |
| Hover Effect | shadow-xl, -translate-y-2 |

### Structure

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  service: CollectionEntry<'services'>;
}

const { service } = Astro.props;
const { title, shortDescription, image } = service.data;
---

<article class="group flex flex-col bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 p-4">
  <div 
    class="aspect-[4/5] w-full rounded-lg overflow-hidden bg-cover bg-center mb-6 relative"
    style={`background-image: url('${image}')`}
  >
    <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
  
  <div class="px-2 pb-2">
    <h3 class="text-xl font-bold mb-2 text-text-main font-display">{title}</h3>
    <p class="text-text-body text-sm leading-relaxed mb-6">{shortDescription}</p>
    <a 
      href={`/services/${service.slug}`}
      class="inline-flex items-center text-primary hover:text-primary-dark font-bold text-sm tracking-wide gap-2"
    >
      LEARN MORE 
      <span class="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_right_alt</span>
    </a>
  </div>
</article>
```

### Acceptance Criteria

- [ ] Card displays image, title, description
- [ ] "Learn More" links to detail page
- [ ] Hover effects work
- [ ] Responsive sizing

---

## Service Detail Page

### File: `src/pages/services/[...slug].astro`

### Layout
- Two-column on desktop (content left, sidebar right)
- Single column on mobile

### Sections

#### 1. Page Header
- Breadcrumb: Services > [Service Name]
- Title (from frontmatter)
- Duration and price range (if available)

#### 2. Featured Image
- Full-width image at top
- Rounded corners

#### 3. Content Body
- Rendered markdown content
- Styled with Tailwind Typography

#### 4. Sidebar
- "Book This Service" CTA card
- Related services (optional)

#### 5. CTA Section
- "Ready to book?" call to action
- Book consultation button

### Component Structure

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Button from '../../components/ui/Button.astro';

export async function getStaticPaths() {
  const services = await getCollection('services');
  return services.map((service) => ({
    params: { slug: service.slug },
    props: { service },
  }));
}

const { service } = Astro.props;
const { Content } = await service.render();
const { title, image, duration, priceRange } = service.data;
---

<PageLayout title={title} description={service.data.shortDescription}>
  <article class="max-w-7xl mx-auto px-6 py-16">
    <!-- Breadcrumb -->
    <nav class="mb-8 text-sm">
      <a href="/services" class="text-primary hover:underline">Services</a>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-text-body">{title}</span>
    </nav>
    
    <div class="grid lg:grid-cols-12 gap-12">
      <!-- Main Content -->
      <div class="lg:col-span-8">
        <h1 class="text-4xl md:text-5xl font-bold font-display text-text-main mb-6">
          {title}
        </h1>
        
        {(duration || priceRange) && (
          <div class="flex gap-6 mb-8 text-sm text-text-body">
            {duration && (
              <span class="flex items-center gap-2">
                <span class="material-symbols-outlined text-gold">schedule</span>
                {duration}
              </span>
            )}
            {priceRange && (
              <span class="flex items-center gap-2">
                <span class="material-symbols-outlined text-gold">payments</span>
                {priceRange}
              </span>
            )}
          </div>
        )}
        
        <div class="aspect-video rounded-2xl overflow-hidden mb-12">
          <img src={image} alt={title} class="w-full h-full object-cover" />
        </div>
        
        <div class="prose prose-lg max-w-none">
          <Content />
        </div>
      </div>
      
      <!-- Sidebar -->
      <aside class="lg:col-span-4">
        <div class="sticky top-32 bg-background-offwhite rounded-2xl p-8 border border-gray-100">
          <h3 class="font-display text-xl font-bold text-text-main mb-4">
            Book This Service
          </h3>
          <p class="text-text-body text-sm mb-6">
            Ready to experience {title}? Schedule your consultation today.
          </p>
          <Button href="#" variant="primary" class="w-full">
            Book Consultation
          </Button>
        </div>
      </aside>
    </div>
  </article>
</PageLayout>
```

### Acceptance Criteria

- [ ] Dynamic routing works for all services
- [ ] Breadcrumb navigation functional
- [ ] Markdown content renders with proper styling
- [ ] Sidebar CTA sticky on scroll
- [ ] Responsive layout collapses correctly

---

## Data Requirements

### Service Content Needed

For each service, Shari needs to provide:

| Field | Required | Notes |
|-------|----------|-------|
| Title | Yes | Service name |
| Short description | Yes | 1-2 sentences for card |
| Full description | Yes | Markdown content for detail page |
| Image | Yes | High-quality photo |
| Duration | Optional | Treatment time |
| Price range | Optional | Starting price or range |

### Placeholder Services

If content isn't ready, create placeholder files with lorem ipsum that can be easily updated.

---

## SEO Considerations

### Listing Page
- **Title:** "Services | Total Transformation"
- **Description:** "Explore our signature holistic wellness treatments including body contouring, facials, IV therapy, and more."

### Detail Pages
- **Title:** "[Service Name] | Total Transformation"
- **Description:** [Short description from frontmatter]
- **Schema:** Service schema markup (future)

---

## Testing Checklist

- [ ] Services listing loads all services
- [ ] Services sorted by order field
- [ ] All service cards link to correct detail pages
- [ ] Detail pages render markdown correctly
- [ ] Breadcrumb navigation works
- [ ] Sidebar CTA is sticky
- [ ] Responsive on all breakpoints
- [ ] Images have alt text
- [ ] 404 handling for invalid slugs
