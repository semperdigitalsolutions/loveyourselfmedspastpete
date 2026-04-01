# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Luxury physician-guided med spa website built with Astro 5.x and Tailwind CSS 4.x. Uses Astro Content Collections for blog, services, and gallery content. Hosted on Netlify.

## Development Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at localhost:4321
pnpm build         # TypeScript check + production build
pnpm preview       # Preview production build
```

## Design & Documentation

**Before implementing any page:**

1. Open the mockup image in `/docs/mockups/` (e.g., `mockup-01-homepage.webp`)
2. Read the corresponding PRD in `/docs/prd/` for specs and acceptance criteria
3. Match the mockup's layout, spacing, and visual hierarchy

| Mockup                        | PRD              |
| ----------------------------- | ---------------- |
| `mockup-01-homepage.webp`     | `02-homepage.md` |
| `mockup-02-services.webp`     | `03-services.md` |
| `mockup-03-philosophy.webp`   | `06-about.md`    |
| `mockup-04-blog-listing.webp` | `05-blog.md`     |
| `mockup-05-gallery.webp`      | `04-gallery.md`  |
| `mockup-06-blog-post.webp`    | `05-blog.md`     |

## Brand Guidelines

### Brand Voice & Tone

- **Luxurious, reassuring, empowering** — never clinical-heavy
- Language pillars: Enhance, restore, renew, align, refine; Holistic, medically-guided, personalized; Natural results, inside-out transformation
- Lead with: Med spa services, transformation, wellness, anti-aging, results
- Subtle hints: "Holistic approach," "nurturing environment," "whole-person wellness"
- Tagline: "Love Yourself Enough to Transform"

### Core Values

1. Self-Love First
2. Holistic Integrity
3. Medical Excellence
4. Natural Enhancement
5. Empowerment Through Education

### Colors (defined in @theme block in src/styles/global.css)

- `text-primary` / `bg-primary` - Turquoise (#00c2a2) for CTAs, links
- `text-gold` / `bg-gold` - Gold (#C9A961) for premium accents
- `bg-rose-soft` - Soft pink (#FFF0F2) for section backgrounds
- `bg-background-dark` - Dark (#0f2320) for CTA banners

### Typography

- `font-display` - Playfair Display (headings)
- `font-body` - Manrope (body text, default)

## Key Conventions

### Components

- Use `.astro` files with typed Props interface at top of frontmatter
- Custom component classes in `/src/styles/global.css`
- Shared `CategoryFilter` component in `/src/components/ui/CategoryFilter.astro` — used by both blog and gallery pages

### Icons (Material Symbols Outlined)

```astro
<span class="material-symbols-outlined">spa</span>
```

Common: `spa`, `favorite`, `science`, `auto_awesome`, `arrow_right_alt`

### Links

- Booking buttons: use `href="#"` until Mangomint is configured
- External links: include `target="_blank" rel="noopener"`

## Content Collections

Content lives in `/src/content/`. See existing files for frontmatter schema.

| Collection | Location                      | Format                                  |
| ---------- | ----------------------------- | --------------------------------------- |
| Blog       | `/src/content/blog/*.md`      | Markdown with frontmatter               |
| Services   | `/src/content/services/*.md`  | Markdown with frontmatter (16 services) |
| Gallery    | `/src/content/gallery/*.json` | JSON                                    |

Blog categories: Skincare, Nutrition, Treatments, Wellness

### Service Content Guidelines

When writing service descriptions, follow the brand voice:

- Instead of "Injectable wrinkle reduction" → use "injectable treatments designed to softly restore balance, smooth expression lines, and support a naturally refreshed appearance"
- Instead of "Skin tightening procedure" → use "Advanced non-invasive skin renewal that supports collagen, firmness, and long-term skin elasticity"
- Always include "Results may vary" disclaimer for medical services
- Include "Consultations are required prior to all medical aesthetic procedures" where applicable

## Medical Compliance

The footer includes required medical disclaimer language:

- Physician-guided medical spa disclosure
- Licensed medical professional supervision statement
- Results may vary disclaimer
- Consultation requirement notice

## Placeholders

- Use descriptive placeholder text (not lorem ipsum)
- Images: solid color div with aspect ratio until real photos available
- Contact info: values in `/src/data/siteConfig.ts`

## Git & Deployment

- Deploys are automated: push to `main` triggers a Netlify build (`pnpm build` → `dist/`)
- Repository: `semperdigitalsolutions/loveyourselfmedspastpete` (public)

## Common Patterns

```astro
<!-- Section wrapper -->
<section class="py-16 md:py-24 px-6">
  <div class="max-w-7xl mx-auto">...</div>
</section>

<!-- Card hover -->
<article
  class="hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
>
  <!-- Tagline accent -->
  <span class="text-gold italic font-display text-sm">Inside-Out Beauty</span>

  <!-- CTA button (uses class from global.css) -->
  <a href="#" class="btn-primary">Book a Consultation</a>
</article>
```
