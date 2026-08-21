export const site = {
  name: 'Fit Girl Things',
  tagline: 'Miami’s Fit-Girl World, Curated Daily',
  url: 'https://fitgirlthings.com',
  defaultTitle: 'Fit Girl Things | Explore Now — Get Inspired Today',
  defaultDescription:
    'Fit Girl Things covers the studios, brands, trends, and trainers shaping Miami’s fitness and wellness scene — spotted openings, industry news, wellness finds, and the women behind it all.',
  defaultOgImage: '/uploads/migrated/og-image.webp',
  handle: '@fit.girl.things',
  instagram: 'https://instagram.com/fit.girl.things',
  email: 'hello@fitgirlthings.com',
  founded: 2024,
} as const

export const categories = [
  { label: 'Spotted', slug: 'spotted', description: 'New studios, stores, and brand openings around Miami — first.', color: '#d95d81' },
  { label: 'Fit Girl News', slug: 'fit-girl-news', description: 'The fitness and wellness industry stories worth knowing.', color: '#bf6a3c' },
  { label: 'Wellness', slug: 'wellness', description: 'Trends, treatments, and rituals actually worth your time.', color: '#1f7a5c' },
  { label: 'Fit Girl Find', slug: 'fitgirlfind', description: 'Product picks and gym-bag essentials, tested and approved.', color: '#8b5cb8' },
  { label: 'Fit Girls', slug: 'fit-girls', description: 'The trainers and women shaping Miami’s fitness culture.', color: '#c44b6c' },
] as const

export function categoryColor(label: string): string {
  return categories.find((c) => c.label === label)?.color ?? 'var(--accent-deep)'
}

export type CategoryLabel = (typeof categories)[number]['label']

export function categorySlug(label: string): string {
  return categories.find((c) => c.label === label)?.slug ?? label.toLowerCase().replace(/\s+/g, '-')
}

export function categoryFromSlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export const nav = [
  { label: 'Spotted', href: '/spotted' },
  { label: 'Fit Girl News', href: '/fit-girl-news' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Fit Girl Find', href: '/fitgirlfind' },
  { label: 'Fit Girls', href: '/fit-girls' },
  { label: 'FAQs', href: '/faqs' },
] as const

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Contact', href: '/contact' },
] as const

export type NavItem = (typeof nav)[number]
