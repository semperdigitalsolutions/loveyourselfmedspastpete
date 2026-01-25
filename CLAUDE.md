# Total Transformation Med Spa - Project Instructions

## Project Overview

This is a faith-based medical spa website built with Astro.js and Tailwind CSS. The brand combines clinical anti-aging excellence with spiritual wellness.

## Tech Stack

- **Framework:** Astro 4.x
- **Styling:** Tailwind CSS 3.x with custom design tokens
- **Content:** Astro Content Collections (Markdown)
- **Hosting:** Netlify
- **Booking:** Mangomint (external, placeholder buttons for now)

## Brand Guidelines

### Colors (defined in tailwind.config.mjs)
- Primary (Turquoise): `#00c2a2`
- Gold: `#C9A961`
- Rose Soft: `#FFF0F2`
- Background Dark: `#0f2320`

### Typography
- Display/Headings: Playfair Display (serif)
- Body: Manrope (sans-serif)

### Voice
- Warm, nurturing, professional
- Faith-forward but not preachy
- Clinical expertise with spiritual wellness

## Project Structure

```
/src
├── /components
│   ├── /ui          # Button, Badge, SectionHeading, Card
│   ├── /layout      # Header, Footer, MobileNav
│   ├── /sections    # Hero, CTABanner, PhilosophyPillars, etc.
│   ├── /cards       # ServiceCard, BlogCard, ResultCard, TestimonialCard
│   ├── /blog        # BlogSidebar, ShareButtons
│   └── /gallery     # CategoryFilter
├── /layouts         # BaseLayout, PageLayout, BlogPostLayout
├── /pages           # index, services/, blog/, gallery, about
├── /content         # blog/, services/, gallery/ (markdown/data)
├── /data            # siteConfig.ts, navigation
└── /styles          # global.css
```

## Documentation

All PRDs are in `/docs/prd/`:
- `00-project-overview.md` - Project goals, architecture, timeline
- `01-foundation.md` - Design tokens, layouts, header, footer
- `02-homepage.md` - Hero, Philosophy Pillars, CTA
- `03-services.md` - Services listing and detail pages
- `04-gallery.md` - Before/After gallery with filtering
- `05-blog.md` - Blog listing and post pages
- `06-about.md` - About/Philosophy page

**IMPORTANT:** Read the relevant PRD before implementing each section. PRDs contain:
- Component specs and props
- Visual specifications
- Acceptance criteria
- Content requirements

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Key Conventions

1. **Components:** Use `.astro` files, typed props with interfaces
2. **Styling:** Tailwind utility classes, custom classes in global.css
3. **Images:** Use Astro's Image component for optimization
4. **Icons:** Material Symbols Outlined via Google Fonts
5. **Links:** Use Astro's `<a>` or custom Button component

## Content Collections

### Blog Posts (`/src/content/blog/*.md`)
Required frontmatter: title, excerpt, publishDate, category, featuredImage

### Services (`/src/content/services/*.md`)
Required frontmatter: title, shortDescription, image, order

### Gallery (`/src/content/gallery/*.json`)
Required fields: title, category, beforeImage, afterImage, sessions, description

## Placeholder Content

- Use `/images/placeholder.jpg` for missing images
- Booking links use `href="#"` until Mangomint is configured
- Contact info in `siteConfig.ts` needs real values

## Testing Checklist (per component)

- [ ] Renders without errors
- [ ] Props are typed correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover states work
- [ ] Links are functional
- [ ] Accessible (alt text, aria labels)
