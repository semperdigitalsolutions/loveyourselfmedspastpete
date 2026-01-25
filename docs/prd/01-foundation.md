# PRD: Foundation

## Overview

This PRD covers the foundational elements that will be used across the entire site: design tokens, base layouts, header, and footer components.

**Priority:** P0 — Must complete before other pages  
**Estimated Effort:** 1-2 days

---

## 1. Design Tokens (Tailwind Configuration)

### File: `tailwind.config.mjs`

#### Colors

```javascript
colors: {
  primary: {
    DEFAULT: '#00c2a2',  // Main turquoise
    dark: '#00a68a',      // Hover states
    light: '#e6f9f6',     // Light backgrounds
  },
  gold: {
    DEFAULT: '#C9A961',   // Premium accents
    light: '#E5C889',     // Subtle gold
  },
  rose: {
    soft: '#FFF0F2',      // Section backgrounds
    DEFAULT: '#E8B4C0',   // Secondary accents
  },
  background: {
    light: '#ffffff',
    offwhite: '#f5f8f8',
    dark: '#0f2320',
  },
  text: {
    main: '#1A1A1A',      // Headings
    body: '#4A4A4A',      // Body text
  },
}
```

#### Typography

```javascript
fontFamily: {
  display: ['Playfair Display', 'serif'],
  body: ['Manrope', 'sans-serif'],
},
fontSize: {
  // Custom scale if needed
}
```

#### Border Radius

```javascript
borderRadius: {
  DEFAULT: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
}
```

#### Box Shadow

```javascript
boxShadow: {
  soft: '0 10px 40px -10px rgba(0,0,0,0.05)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  hover: '0 20px 50px -12px rgba(0, 194, 162, 0.25)',
}
```

### Acceptance Criteria

- [ ] All colors defined and consistent across site
- [ ] Fonts loaded via Google Fonts or self-hosted
- [ ] Custom utilities available in all components

---

## 2. Base Layout

### File: `src/layouts/BaseLayout.astro`

#### Purpose
HTML shell that wraps all pages. Includes:
- Document head (meta, fonts, favicon)
- Body wrapper
- Slot for page content

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | Page title |
| description | string | No | Site default | Meta description |
| ogImage | string | No | Default OG image | Social share image |

#### Structure

```astro
---
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Total Transformation</title>
  <meta name="description" content={description}>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Material Symbols -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  
  <!-- OG Tags -->
  <meta property="og:title" content={title}>
  <meta property="og:image" content={ogImage}>
</head>
<body class="bg-background-light font-body text-text-body antialiased">
  <slot />
</body>
</html>
```

### Acceptance Criteria

- [ ] All pages use BaseLayout
- [ ] Meta tags render correctly
- [ ] Fonts load without FOUT/FOIT
- [ ] Favicon displays

---

## 3. Page Layout

### File: `src/layouts/PageLayout.astro`

#### Purpose
Standard page wrapper that includes Header and Footer.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| title | string | Yes | - | Page title |
| description | string | No | - | Meta description |
| showCTA | boolean | No | true | Show CTA banner before footer |

#### Structure

```astro
---
import BaseLayout from './BaseLayout.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import CTABanner from '../components/sections/CTABanner.astro';

interface Props {
  title: string;
  description?: string;
  showCTA?: boolean;
}

const { title, description, showCTA = true } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <Header />
  <main class="flex-1">
    <slot />
  </main>
  {showCTA && <CTABanner />}
  <Footer />
</BaseLayout>
```

### Acceptance Criteria

- [ ] Header appears on all pages
- [ ] Footer appears on all pages
- [ ] CTA banner optional per page
- [ ] Main content area fills available space

---

## 4. Header Component

### File: `src/components/layout/Header.astro`

#### Design Reference
- Sticky header with blur backdrop
- Logo (spa icon + wordmark) on left
- Navigation links center (desktop)
- "Book Consultation" CTA button right
- Mobile hamburger menu

#### Navigation Items

```typescript
const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];
```

#### Visual Specs

| Property | Value |
|----------|-------|
| Height | 80px (h-20) |
| Background | white/90 with backdrop-blur |
| Border | 1px bottom, gray-100 |
| Max Width | 1280px (max-w-7xl) |
| Padding | 24px horizontal (px-6) |

#### Logo Specs

| Element | Style |
|---------|-------|
| Icon | Material Symbols "spa", primary color, 32px |
| Text | "Total Transformation", Playfair Display, bold |
| Tagline (optional) | "Holistic Luxury", gold, 10px uppercase |

#### CTA Button

| Property | Value |
|----------|-------|
| Text | "Book Consultation" |
| Style | Primary button (turquoise bg, white text) |
| Link | Mangomint booking URL (placeholder for now) |

#### Mobile Behavior

- Nav links hidden below `md` breakpoint
- Hamburger icon shown
- Mobile nav (MobileNav component) — slide-in or dropdown
- CTA button hidden below `sm` breakpoint

#### Active State
- Current page link highlighted with primary color
- Underline decoration

### Acceptance Criteria

- [ ] Sticky on scroll
- [ ] Logo links to homepage
- [ ] Nav links work and show active state
- [ ] CTA button present (link can be placeholder)
- [ ] Mobile hamburger triggers mobile nav
- [ ] Accessible (keyboard nav, aria labels)

---

## 5. Mobile Navigation

### File: `src/components/layout/MobileNav.astro`

#### Purpose
Mobile navigation overlay/drawer triggered by hamburger button.

#### Behavior Options

**Option A: Slide-in Drawer**
- Slides in from right
- Dark overlay behind
- Close button (X)
- Full-height nav links
- CTA button at bottom

**Option B: Dropdown**
- Drops down below header
- Full-width
- Pushes content or overlays

#### Recommendation
Slide-in drawer for luxury feel.

### Acceptance Criteria

- [ ] Opens when hamburger clicked
- [ ] Closes when X clicked or link clicked
- [ ] Nav links functional
- [ ] CTA button included
- [ ] Traps focus when open (accessibility)

---

## 6. Footer Component

### File: `src/components/layout/Footer.astro`

#### Design Reference (Based on Page 3 mockup)

#### Sections

**Column 1: Brand (md:col-span-4)**
- Logo + wordmark
- Tagline paragraph
- Social links (Instagram, Facebook)

**Column 2: Contact (md:col-span-3)**
- "Contact Us" heading (gold)
- Address with icon
- Phone with icon
- Email with icon

**Column 3: Quick Links (md:col-span-2)**
- "Explore" heading (gold)
- Our Story
- Services
- Gallery
- Blog

**Column 4: Legal (md:col-span-3)**
- "Legal" heading (gold)
- Privacy Policy
- Terms of Service

**Bottom Bar**
- Copyright: "© 2026 Total Transformation. All Rights Reserved."
- "Powered by Mangomint" badge (links to Mangomint)

#### Visual Specs

| Property | Value |
|----------|-------|
| Background | white |
| Border | 1px top, gray-100 |
| Padding | 64px top, 32px bottom |
| Max Width | 1280px (max-w-7xl) |

#### Data Source

```typescript
// src/data/siteConfig.ts
export const siteConfig = {
  name: 'Total Transformation',
  tagline: 'A sanctuary for faith-led wellness and clinical anti-aging excellence.',
  address: {
    street: '123 Wellness Way',
    city: 'City',
    state: 'NC',
    zip: '12345',
  },
  phone: '(555) 012-3456',
  email: 'hello@totaltransformation.com',
  social: {
    instagram: 'https://instagram.com/totaltransformation',
    facebook: 'https://facebook.com/totaltransformation',
  },
  booking: {
    url: '#', // Mangomint URL placeholder
  },
};
```

### Acceptance Criteria

- [ ] All columns render correctly
- [ ] Contact info pulled from siteConfig
- [ ] Social links open in new tab
- [ ] Responsive (stacks on mobile)
- [ ] Copyright year dynamic or correct

---

## 7. Global Styles

### File: `src/styles/global.css`

#### Contents

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-background-light text-text-body;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-text-main;
  }
}

/* Custom components */
@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl 
           shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30;
  }
  
  .btn-secondary {
    @apply border-2 border-gray-200 hover:border-primary text-text-main 
           font-bold px-6 py-3 rounded-xl transition-all hover:text-primary;
  }
  
  .btn-ghost {
    @apply text-primary hover:bg-primary/10 font-bold px-6 py-3 rounded-xl transition-all;
  }
  
  .section-heading {
    @apply text-center mb-16;
  }
  
  .section-heading__label {
    @apply text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4 block;
  }
  
  .section-heading__title {
    @apply text-4xl md:text-5xl font-bold tracking-tight text-text-main font-display;
  }
  
  .section-heading__divider {
    @apply h-1 w-24 bg-gold rounded-full mx-auto mt-6;
  }
}

/* Utility classes */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Acceptance Criteria

- [ ] Tailwind directives included
- [ ] Button utility classes work
- [ ] Section heading styles consistent
- [ ] No style conflicts

---

## 8. UI Primitives

### Files
- `src/components/ui/Button.astro`
- `src/components/ui/SectionHeading.astro`
- `src/components/ui/Badge.astro`
- `src/components/ui/Card.astro`

### Button.astro

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
}

const { variant = 'primary', size = 'md', href, class: className } = Astro.props;

const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all';

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-primary/30',
  secondary: 'border-2 border-gray-200 hover:border-primary text-text-main hover:text-primary',
  ghost: 'text-primary hover:bg-primary/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`;
---

{href ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button class={classes}>
    <slot />
  </button>
)}
```

### SectionHeading.astro

```astro
---
interface Props {
  label?: string;
  title: string;
  showDivider?: boolean;
  align?: 'left' | 'center';
}

const { label, title, showDivider = true, align = 'center' } = Astro.props;

const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
---

<div class={`flex flex-col mb-16 ${alignClass}`}>
  {label && (
    <span class="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-4">
      {label}
    </span>
  )}
  <h2 class="text-4xl md:text-5xl font-bold tracking-tight text-text-main font-display">
    {title}
  </h2>
  {showDivider && (
    <div class={`h-1 w-24 bg-gold rounded-full mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  )}
</div>
```

### Acceptance Criteria

- [ ] Button renders as link or button based on href
- [ ] All variants work correctly
- [ ] SectionHeading used consistently across pages
- [ ] Components are accessible

---

## Dependencies

```json
{
  "dependencies": {
    "astro": "^4.x",
    "@astrojs/tailwind": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x"
  }
}
```

---

## Testing Checklist

- [ ] Header renders on all pages
- [ ] Footer renders on all pages
- [ ] Mobile nav opens/closes
- [ ] All links navigate correctly
- [ ] Responsive at all breakpoints (320px, 768px, 1024px, 1280px)
- [ ] Fonts load correctly
- [ ] Colors match brand guidelines
- [ ] No console errors
