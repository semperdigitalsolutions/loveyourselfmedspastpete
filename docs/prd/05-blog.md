# PRD: Blog

## Overview

The Blog section provides educational content that supports the brand's holistic wellness positioning. It establishes authority, supports SEO, and gives clients valuable information about treatments, faith-based wellness, and self-care.

**Page URLs:**  
- Listing: `/blog`
- Post: `/blog/[slug]`

**Priority:** P1  
**Estimated Effort:** 1-2 days

---

## Design Reference

Based on Page 4 (Blog Listing) and Page 6 (Blog Post) mockups from Google Stitch.

---

## Content Collection

### Schema: `src/content/config.ts`

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(300),
    author: z.string().default('Total Transformation'),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['Faith', 'Skincare', 'Nutrition', 'Treatments', 'Wellness']),
    featuredImage: z.string(),
    featuredImageAlt: z.string().optional(),
    readTime: z.number().optional(), // minutes
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
```

### Example Blog Post: `src/content/blog/restoring-the-soul.md`

```markdown
---
title: "Restoring the Soul: The Spiritual Science of Anti-Aging"
excerpt: "Explore the sacred art of aging gracefully through scientific skincare and ancient spiritual practices that nourish both body and soul."
author: "Dr. Sarah Jenkins"
publishDate: 2024-10-15
category: "Faith"
featuredImage: "/images/blog/restoring-soul.jpg"
featuredImageAlt: "Woman in peaceful meditation during spa treatment"
readTime: 5
featured: true
---

The journey toward radiant skin is not merely a physical pursuit—it is a sacred pilgrimage that honors the temple we've been given.

## The Connection Between Spirit and Skin

Our skin tells the story of our lives. Every laugh line, every worry mark, every moment of joy and sorrow leaves its imprint. But what if we could approach aging not as a battle to be fought, but as a journey to be embraced?

> "I praise you because I am fearfully and wonderfully made." — Psalm 139:14

This verse reminds us that our bodies are masterpieces of divine creation. When we care for our skin, we are honoring that creation.

## Three Rituals for Radiant Aging

### 1. Morning Gratitude

Begin each day with a moment of thankfulness before your skincare routine. As you cleanse your face, release the worries of yesterday.

### 2. Breath Prayer

While applying serums and moisturizers, practice breath prayer—inhaling peace, exhaling stress.

### 3. Evening Anointing

Transform your nighttime routine into a sacred ritual of self-care and reflection.

## The Science Supports the Spirit

Modern research confirms what ancient wisdom has long known: stress accelerates aging. When we incorporate spiritual practices into our skincare routine, we're not just caring for our skin—we're reducing cortisol, improving sleep, and promoting cellular renewal.

---

*Ready to begin your own journey of sacred self-care? Book a consultation to learn how we can support your transformation.*
```

### Categories

| Category | Description | Example Topics |
|----------|-------------|----------------|
| Faith | Spiritual wellness, scripture-based self-care | Prayer + skincare, biblical body care |
| Skincare | Product education, routines, tips | Morning routines, ingredient spotlights |
| Nutrition | Diet and wellness | Anti-aging foods, hydration |
| Treatments | Service deep-dives | What to expect, aftercare |
| Wellness | Holistic health | Stress management, sleep |

---

## Blog Listing Page

### File: `src/pages/blog/index.astro`

### Sections

#### 1. Page Header
- Label: "Journal of Transformation"
- Title: "Wellness Insights"
- Subtitle: "Stories of faith, beauty, and holistic renewal."

#### 2. Featured Post (Optional)
- Hero-style display of most recent featured post
- Large image, title, excerpt, read more link
- "Editor's Pick" or "Featured" badge

#### 3. Category Filter
- Horizontal pill buttons
- "All Posts" (default)
- Individual category filters
- Client-side filtering

#### 4. Posts Grid
- 3-column grid on desktop
- 2-column on tablet
- 1-column on mobile
- BlogCard component for each post

### Component Structure

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import SectionHeading from '../../components/ui/SectionHeading.astro';
import BlogCard from '../../components/cards/BlogCard.astro';
import CategoryFilter from '../../components/blog/CategoryFilter.astro';
import FeaturedPost from '../../components/blog/FeaturedPost.astro';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const sortedPosts = allPosts.sort((a, b) => 
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);

const featuredPost = sortedPosts.find(post => post.data.featured);
const regularPosts = sortedPosts.filter(post => post !== featuredPost);

const categories = ['All Posts', 'Faith', 'Skincare', 'Nutrition', 'Treatments', 'Wellness'];
---

<PageLayout title="Blog" description="Wellness insights, faith-based self-care, and holistic beauty tips.">
  <!-- Header -->
  <section class="py-16 md:py-24 px-6 max-w-7xl mx-auto text-center">
    <span class="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">
      Journal of Transformation
    </span>
    <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-text-main font-display mb-6">
      Wellness Insights
    </h1>
    <p class="max-w-2xl mx-auto text-lg text-text-body">
      Stories of faith, beauty, and holistic renewal.
    </p>
  </section>
  
  <!-- Featured Post -->
  {featuredPost && <FeaturedPost post={featuredPost} />}
  
  <!-- Category Filter -->
  <CategoryFilter categories={categories} />
  
  <!-- Posts Grid -->
  <section class="max-w-7xl mx-auto px-6 pb-24">
    <div 
      id="posts-grid"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {regularPosts.map((post) => (
        <BlogCard post={post} />
      ))}
    </div>
  </section>
</PageLayout>
```

---

## BlogCard Component

### File: `src/components/cards/BlogCard.astro`

### Props

| Prop | Type | Description |
|------|------|-------------|
| post | CollectionEntry | Blog post from content collection |

### Visual Specs

| Property | Value |
|----------|-------|
| Card Background | white |
| Card Border | border border-gray-100 |
| Card Border Radius | rounded-xl |
| Image Aspect Ratio | aspect-[16/10] |
| Category Badge | text-xs, uppercase, primary color |
| Title | text-xl, font-display, line-clamp-2 |
| Excerpt | text-sm, line-clamp-3 |

### Structure

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { title, excerpt, category, featuredImage, publishDate, readTime } = post.data;

const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
---

<article 
  class="group flex flex-col bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100"
  data-category-item={category}
>
  <!-- Image -->
  <a href={`/blog/${post.slug}`} class="block overflow-hidden">
    <div 
      class="aspect-[16/10] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={`background-image: url('${featuredImage}')`}
    ></div>
  </a>
  
  <!-- Content -->
  <div class="p-6 flex flex-col flex-grow">
    <!-- Category Badge -->
    <span class="text-primary text-xs font-bold uppercase tracking-wider mb-3">
      {category}
    </span>
    
    <!-- Title -->
    <a href={`/blog/${post.slug}`}>
      <h3 class="text-xl font-bold text-text-main font-display mb-3 line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
    </a>
    
    <!-- Excerpt -->
    <p class="text-sm text-text-body leading-relaxed line-clamp-3 mb-6">
      {excerpt}
    </p>
    
    <!-- Meta -->
    <div class="mt-auto flex items-center justify-between text-xs text-text-body/70">
      <span>{formattedDate}</span>
      {readTime && <span>{readTime} min read</span>}
    </div>
  </div>
</article>
```

### Acceptance Criteria

- [ ] Card displays image, category, title, excerpt
- [ ] Title links to post page
- [ ] Image has hover zoom effect
- [ ] Date formatted correctly
- [ ] Read time displays (when available)
- [ ] Line clamping works for long content

---

## FeaturedPost Component

### File: `src/components/blog/FeaturedPost.astro`

### Purpose
Hero-style display for the most prominent blog post.

### Visual Specs
- Full-width container with max-width
- Large featured image (aspect-video or similar)
- "Editor's Pick" badge
- Large title, excerpt, author, read more link

### Structure

```astro
---
import type { CollectionEntry } from 'astro:content';
import Button from '../ui/Button.astro';

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { title, excerpt, featuredImage, author, publishDate, readTime, category } = post.data;

const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});
---

<section class="max-w-7xl mx-auto px-6 mb-16">
  <div class="relative rounded-3xl overflow-hidden bg-background-dark">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center opacity-40"
      style={`background-image: url('${featuredImage}')`}
    ></div>
    
    <!-- Content -->
    <div class="relative z-10 p-8 md:p-16 text-white">
      <div class="max-w-2xl">
        <!-- Badge -->
        <span class="inline-flex items-center gap-2 bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
          <span class="material-symbols-outlined text-sm">auto_awesome</span>
          Editor's Pick
        </span>
        
        <!-- Category -->
        <span class="block text-primary text-sm font-bold uppercase tracking-wider mb-4">
          {category}
        </span>
        
        <!-- Title -->
        <h2 class="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">
          {title}
        </h2>
        
        <!-- Excerpt -->
        <p class="text-lg text-white/80 mb-8 leading-relaxed">
          {excerpt}
        </p>
        
        <!-- Meta -->
        <div class="flex items-center gap-4 text-sm text-white/60 mb-8">
          <span>{author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime} min read</span>
            </>
          )}
        </div>
        
        <!-- CTA -->
        <Button href={`/blog/${post.slug}`} variant="primary">
          Read Article
        </Button>
      </div>
    </div>
  </div>
</section>
```

---

## Blog Post Page

### File: `src/pages/blog/[...slug].astro`

### Layout
- Two-column on desktop (main content 8 cols, sidebar 4 cols)
- Single column on mobile (sidebar below content)

### Sections

#### 1. Article Header
- Breadcrumb: Blog > [Category] > [Title]
- Category badge
- Title (H1)
- Meta: Author, Date, Read Time
- Featured image (full-width within content column)

#### 2. Article Body
- Rendered markdown with Tailwind Typography
- Styled blockquotes (gold left border)
- Styled lists, headers, etc.

#### 3. Share Buttons
- Facebook, Twitter/X, Copy Link
- Positioned after article or floating

#### 4. Sidebar (Desktop)
- "Book a Consultation" CTA card (sticky)
- Related articles (same category)

#### 5. Related Posts
- "Continue Reading" section
- 3 related posts from same category

### Component Structure

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Button from '../../components/ui/Button.astro';
import BlogCard from '../../components/cards/BlogCard.astro';
import ShareButtons from '../../components/blog/ShareButtons.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
const { title, excerpt, author, publishDate, category, featuredImage, readTime } = post.data;

const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

// Get related posts
const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const relatedPosts = allPosts
  .filter(p => p.data.category === category && p.slug !== post.slug)
  .slice(0, 3);
---

<PageLayout title={title} description={excerpt} showCTA={false}>
  <article class="max-w-7xl mx-auto px-6 py-16">
    <!-- Breadcrumb -->
    <nav class="mb-8 text-sm">
      <a href="/blog" class="text-primary hover:underline">Blog</a>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-primary">{category}</span>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-text-body line-clamp-1">{title}</span>
    </nav>
    
    <div class="grid lg:grid-cols-12 gap-12">
      <!-- Main Content -->
      <div class="lg:col-span-8">
        <!-- Header -->
        <header class="mb-12">
          <span class="text-primary text-sm font-bold uppercase tracking-wider mb-4 block">
            {category}
          </span>
          
          <h1 class="text-4xl md:text-5xl font-bold font-display text-text-main mb-6 leading-tight">
            {title}
          </h1>
          
          <div class="flex flex-wrap items-center gap-4 text-sm text-text-body mb-8">
            <span class="font-medium">{author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime} min read</span>
              </>
            )}
          </div>
          
          <div class="aspect-video rounded-2xl overflow-hidden">
            <img 
              src={featuredImage} 
              alt={title}
              class="w-full h-full object-cover"
            />
          </div>
        </header>
        
        <!-- Content -->
        <div class="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-text-main prose-a:text-primary prose-blockquote:border-l-gold prose-blockquote:border-l-4 prose-blockquote:bg-rose-soft prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic">
          <Content />
        </div>
        
        <!-- Share -->
        <div class="mt-12 pt-8 border-t border-gray-100">
          <ShareButtons title={title} />
        </div>
      </div>
      
      <!-- Sidebar -->
      <aside class="lg:col-span-4">
        <div class="sticky top-32 space-y-8">
          <!-- CTA Card -->
          <div class="bg-background-offwhite rounded-2xl p-8 border border-gray-100">
            <h3 class="font-display text-xl font-bold text-text-main mb-4">
              Book a Consultation
            </h3>
            <p class="text-text-body text-sm mb-6">
              Ready to begin your transformation journey? Schedule your personalized consultation today.
            </p>
            <Button href="#" variant="primary" class="w-full">
              Book Now
            </Button>
          </div>
          
          <!-- Related Articles -->
          {relatedPosts.length > 0 && (
            <div>
              <h4 class="font-display font-bold text-text-main mb-4">
                Related Articles
              </h4>
              <div class="space-y-4">
                {relatedPosts.map(related => (
                  <a 
                    href={`/blog/${related.slug}`}
                    class="flex gap-4 group"
                  >
                    <div 
                      class="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={`background-image: url('${related.data.featuredImage}')`}
                    ></div>
                    <div>
                      <h5 class="font-bold text-sm text-text-main group-hover:text-primary transition-colors line-clamp-2">
                        {related.data.title}
                      </h5>
                      <span class="text-xs text-text-body/70">
                        {related.data.readTime} min read
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  </article>
  
  <!-- More Posts -->
  {relatedPosts.length > 0 && (
    <section class="bg-background-offwhite py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold font-display text-text-main mb-8">
          Continue Reading
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          {relatedPosts.map(related => (
            <BlogCard post={related} />
          ))}
        </div>
      </div>
    </section>
  )}
</PageLayout>
```

---

## ShareButtons Component

### File: `src/components/blog/ShareButtons.astro`

### Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | Article title for share text |

### Buttons
- Facebook
- Twitter/X
- Copy Link (with clipboard API)

### Structure

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="flex items-center gap-4">
  <span class="text-sm font-bold text-text-main">Share:</span>
  
  <button 
    data-share="facebook"
    class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
    aria-label="Share on Facebook"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
    </svg>
  </button>
  
  <button 
    data-share="twitter"
    class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
    aria-label="Share on X"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </button>
  
  <button 
    data-share="copy"
    class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
    aria-label="Copy link"
  >
    <span class="material-symbols-outlined text-xl">link</span>
  </button>
</div>

<script define:vars={{ title }}>
  const url = window.location.href;
  
  document.querySelector('[data-share="facebook"]')?.addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  });
  
  document.querySelector('[data-share="twitter"]')?.addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  });
  
  document.querySelector('[data-share="copy"]')?.addEventListener('click', async () => {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  });
</script>
```

---

## Content Requirements

### For Each Blog Post, Shari Needs:

| Field | Required | Notes |
|-------|----------|-------|
| Title | Yes | Compelling, SEO-friendly |
| Excerpt | Yes | 1-2 sentences for cards/meta |
| Category | Yes | Must match defined categories |
| Featured Image | Yes | High-quality, relevant image |
| Author | Optional | Defaults to "Total Transformation" |
| Body Content | Yes | Markdown content |

### Initial Posts (Placeholders)

| Title | Category | Featured |
|-------|----------|----------|
| Restoring the Soul: The Spiritual Science of Anti-Aging | Faith | Yes |
| Hydration Rituals for Radiant Skin | Skincare | No |
| Morning Prayers & Mindfulness in Self-Care | Faith | No |
| Healing from Within: Nutrition for Glowing Skin | Nutrition | No |
| The Art of Stillness: Meditation for Beauty | Wellness | No |
| The Gold Facial Experience | Treatments | No |

---

## Decap CMS Integration (Future)

### File: `/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/blog"
public_folder: "/images/blog"

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Author", name: "author", widget: "string", default: "Total Transformation" }
      - { label: "Publish Date", name: "publishDate", widget: "datetime" }
      - { label: "Category", name: "category", widget: "select", options: ["Faith", "Skincare", "Nutrition", "Treatments", "Wellness"] }
      - { label: "Featured Image", name: "featuredImage", widget: "image" }
      - { label: "Read Time (minutes)", name: "readTime", widget: "number" }
      - { label: "Featured", name: "featured", widget: "boolean", default: false }
      - { label: "Draft", name: "draft", widget: "boolean", default: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

---

## SEO Considerations

### Listing Page
- **Title:** "Blog | Total Transformation"
- **Description:** "Wellness insights, faith-based self-care tips, and holistic beauty guidance from Total Transformation."

### Post Pages
- **Title:** "[Post Title] | Total Transformation Blog"
- **Description:** [Post excerpt]
- **Schema:** Article schema markup
- **OG Image:** Featured image

---

## Testing Checklist

- [ ] Blog listing loads all non-draft posts
- [ ] Posts sorted by date (newest first)
- [ ] Featured post displays prominently
- [ ] Category filter works
- [ ] All cards link to correct posts
- [ ] Post pages render markdown correctly
- [ ] Blockquotes styled correctly
- [ ] Share buttons work
- [ ] Related posts display
- [ ] Sidebar CTA is sticky
- [ ] Responsive on all breakpoints
- [ ] Draft posts hidden from listing
- [ ] 404 handling for invalid slugs
