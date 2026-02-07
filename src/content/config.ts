import { defineCollection, z } from 'astro:content';

// Blog collection
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(300),
    author: z.string().default('Love Yourself Enough To Transform'),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['Skincare', 'Nutrition', 'Treatments', 'Wellness']),
    featuredImage: z.string(),
    featuredImageAlt: z.string().optional(),
    readTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Services collection
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string().max(200),
    image: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    duration: z.string().optional(),
    priceRange: z.string().optional(),
  }),
});

// Gallery collection (before/after results)
const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Body Contouring', 'Facials', 'Injectables', 'Holistic Wellness']),
    beforeImage: z.string(),
    afterImage: z.string(),
    sessions: z.number(),
    description: z.string(),
    testimonial: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, services, gallery };
