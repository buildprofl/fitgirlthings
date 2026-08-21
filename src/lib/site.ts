export const site = {
  name: 'Fit Girl Things',
  tagline: 'Editorial Wellness Collective',
  url: 'https://fitgirlthings.com',
  defaultTitle: 'Fit Girl Things | Editorial Wellness Collective',
  defaultDescription:
    'Fit Girl Things is the editorial home for women who live fitness, wellness, beauty, and culture. Join the newsletter, discover events, and partner with us.',
  defaultOgImage: '/og/default.png',
  handle: '@fit.girl.things',
  instagram: 'https://instagram.com/fit.girl.things',
  email: 'hello@fitgirlthings.com',
  founded: 2024,
} as const

export const nav = [
  { label: 'The Feed', href: '/feed' },
  { label: 'Events', href: '/events' },
  { label: 'Partner', href: '/#partners' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
] as const

export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Contact', href: '/contact' },
] as const

export type NavItem = (typeof nav)[number]
