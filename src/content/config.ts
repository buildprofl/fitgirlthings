import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(['Wellness', 'Culture', 'Fitness', 'Events', 'Beauty', 'Found']),
    kicker: z.string().optional(),
    image: z.string(),
    imageMobile: z.string().optional(),
    imageAlt: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('FGT Editors'),
    readingMinutes: z.number().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
})

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    place: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    dateLabelMonth: z.string(),
    dateLabelDay: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    capacity: z.number().optional(),
    price: z.string().optional(),
    hostedBy: z.string().default('Fit Girl Things'),
    draft: z.boolean().default(false),
    highlights: z.array(z.string()).default([]),
  }),
})

// Landing pages are block-composed via JSON.
const landingBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('Hero'),
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    primaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal('PAS'),
    eyebrow: z.string().optional(),
    problem: z.string(),
    agitation: z.string(),
    solution: z.string(),
  }),
  z.object({
    type: z.literal('SocialProof'),
    eyebrow: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    quotes: z.array(z.object({ quote: z.string(), author: z.string(), role: z.string().optional() })).optional(),
  }),
  z.object({
    type: z.literal('LogoStrip'),
    eyebrow: z.string().optional(),
    logos: z.array(z.object({ name: z.string(), src: z.string().optional() })),
  }),
  z.object({
    type: z.literal('FeatureTriad'),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    items: z.array(z.object({ kicker: z.string(), title: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal('PriceAnchor'),
    eyebrow: z.string().optional(),
    title: z.string(),
    tiers: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        cadence: z.string().optional(),
        highlight: z.boolean().default(false),
        features: z.array(z.string()),
        cta: z.object({ label: z.string(), href: z.string() }),
      })
    ),
  }),
  z.object({
    type: z.literal('FAQ'),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
  z.object({
    type: z.literal('Guarantee'),
    eyebrow: z.string().optional(),
    title: z.string(),
    body: z.string(),
  }),
  z.object({
    type: z.literal('Urgency'),
    eyebrow: z.string().optional(),
    headline: z.string(),
    scarcity: z.string().optional(),
    deadline: z.string().optional(),
  }),
  z.object({
    type: z.literal('CloseCTA'),
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    cta: z.object({ label: z.string(), href: z.string() }),
    reassurance: z.string().optional(),
  }),
  z.object({
    type: z.literal('Testimonials'),
    eyebrow: z.string().optional(),
    items: z.array(z.object({ quote: z.string(), author: z.string(), role: z.string().optional() })),
  }),
  z.object({
    type: z.literal('VideoEmbed'),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    provider: z.enum(['youtube', 'vimeo']),
    videoId: z.string(),
  }),
])

const landing = defineCollection({
  type: 'data',
  schema: z.object({
    campaign: z.string(),
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().default(false),
    blocks: z.array(landingBlockSchema),
  }),
})

export const collections = { articles, events, landing }
export type LandingBlock = z.infer<typeof landingBlockSchema>
