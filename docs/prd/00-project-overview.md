# PRD: Total Transformation Med Spa Website

## Project Overview

**Project Name:** Total Transformation Med Spa Website  
**Client:** Shari Irwin (Love Yourself Enough To Transform LLC)  
**Developer:** Steven / Semper Digital Solutions  
**Target Launch:** Early 2026  
**Last Updated:** January 24, 2026

---

## Executive Summary

Build a modern, faith-based medical spa website using Astro.js that reflects the brand's holistic approach to wellness and anti-aging. The site will showcase services, display before/after results, host a blog for content marketing, and integrate with Mangomint booking software.

---

## Business Goals

1. **Establish online presence** for a new medical spa in North Carolina
2. **Communicate brand identity** — luxury, faith-based, holistic wellness
3. **Generate leads** through consultation bookings via Mangomint
4. **Build authority** through educational blog content
5. **Showcase results** with before/after gallery to build trust

---

## Brand Guidelines

### Brand Voice
- Warm, nurturing, professional
- Faith-forward but not preachy
- Emphasizes self-care as honoring one's body ("temple")
- Clinical expertise with spiritual wellness

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Turquoise) | `#00c2a2` | CTAs, links, accents |
| Primary Dark | `#00a68a` | Hover states |
| Primary Light | `#e6f9f6` | Backgrounds |
| Gold | `#C9A961` | Premium accents, scripture |
| Gold Light | `#E5C889` | Subtle accents |
| Rose Soft | `#FFF0F2` | Section backgrounds |
| Rose | `#E8B4C0` | Secondary accents |
| Background Light | `#ffffff` | Main background |
| Background Offwhite | `#f5f8f8` | Alternate sections |
| Background Dark | `#0f2320` | Dark mode / CTA banners |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Display/Headings | Playfair Display | 400, 500, 600, 700 |
| Body/UI | Manrope | 300, 400, 500, 600, 700 |

### Logo
- Spa icon (Material Symbols "spa") + "Total Transformation" wordmark
- Tagline: "Holistic Luxury" (optional)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro 4.x |
| Styling | Tailwind CSS 3.x |
| Content | Astro Content Collections (Markdown/MDX) |
| CMS (Future) | Decap CMS (optional) |
| Hosting | Netlify |
| Domain | Configured on Netlify |
| Booking | Mangomint (external integration) |
| Icons | Material Symbols Outlined |

---

## Site Architecture

```
/
├── / (Homepage)
├── /services (Services Listing)
├── /services/[slug] (Service Detail)
├── /gallery (Before/After Results)
├── /blog (Blog Listing)
├── /blog/[slug] (Blog Post)
└── /about (Philosophy / Why Us)
```

---

## Pages Overview

| Page | Priority | Status | Description |
|------|----------|--------|-------------|
| Homepage | P0 | Planned | Brand intro, hero, philosophy pillars, CTA |
| Services Listing | P0 | Planned | Grid of service cards |
| Service Detail | P1 | Planned | Individual service info + booking CTA |
| Gallery | P0 | Planned | Before/after results with filtering |
| Blog Listing | P1 | Planned | Article cards with category filter |
| Blog Post | P1 | Planned | Full article with sidebar |
| About/Philosophy | P1 | Planned | Why choose us, values |
| Contact | P2 | Deferred | Not in initial launch |

---

## Content Collections

### Blog (`/src/content/blog/`)
- Markdown/MDX files
- Frontmatter: title, excerpt, author, publishDate, category, featuredImage, readTime
- Categories: Faith, Skincare, Nutrition, Treatments, Wellness

### Services (`/src/content/services/`)
- Markdown files with frontmatter + body content
- Frontmatter: title, shortDescription, image, order
- Body: Full service description for detail page

### Gallery (`/src/content/gallery/`)
- Markdown/YAML files
- Frontmatter: title, category, beforeImage, afterImage, sessions, description, testimonial

---

## Integrations

### Mangomint Booking
- **Status:** Not yet integrated
- **Approach:** Placeholder buttons linking to Mangomint booking URL
- **Future:** Script tag or widget embed when ready

### Newsletter
- **Status:** Deferred from launch
- **Future:** Can add Mailchimp/ConvertKit integration later

### Social Sharing
- Blog posts will have share buttons (Facebook, Twitter/X, Instagram, Copy Link)
- No comments system

---

## Out of Scope (Launch)

- [ ] Contact page
- [ ] Newsletter signup
- [ ] Blog comments
- [ ] Dark mode toggle (styles exist but no toggle)
- [ ] Search functionality
- [ ] User accounts / login
- [ ] E-commerce

---

## Success Metrics

1. Site launches before spa opening (early 2026)
2. All services documented with detail pages
3. Blog infrastructure ready for content creation
4. Gallery ready for real before/after photos
5. Mangomint booking links functional

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Service list not finalized | Build flexible content collection; easy to add/remove |
| No real photos yet | Use placeholder images; swap when available |
| Mangomint integration unknown | Placeholder buttons; add script when specs available |
| Content not written | Provide markdown templates; structure ready for content |

---

## Stakeholders

- **Shari Irwin** — Client, business owner
- **Stephen Weis** — Investor
- **Gary Glessner** — Coordination
- **Steven (Semper Digital)** — Developer

---

## Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| Foundation | Design tokens, layouts, header, footer | Week 1 |
| Core Pages | Homepage, Services, About | Week 2 |
| Content Pages | Blog, Gallery | Week 3 |
| Polish | Responsive, testing, content | Week 4 |
| Launch | Deploy, DNS, final review | Post Week 4 |

---

## Related PRDs

1. [Foundation PRD](./01-foundation.md) — Layouts, Header, Footer, Design Tokens
2. [Homepage PRD](./02-homepage.md)
3. [Services PRD](./03-services.md)
4. [Gallery PRD](./04-gallery.md)
5. [Blog PRD](./05-blog.md)
6. [About PRD](./06-about.md)
