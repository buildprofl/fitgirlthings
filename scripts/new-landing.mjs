#!/usr/bin/env node
/**
 * FGT Landing Page Scaffolder
 * ---------------------------
 * Usage: npm run new:landing "campaign-slug" [--template=high-ticket|newsletter|event]
 *
 * Creates src/content/landing/<slug>.json pre-populated with high-conversion
 * blocks. Edit the copy, commit, deploy — the page ships at /for/<slug>.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'src/content/landing')

const args = process.argv.slice(2)
const rawSlug = args.find((a) => !a.startsWith('--'))
const templateFlag = (args.find((a) => a.startsWith('--template=')) ?? '').split('=')[1] ?? 'high-ticket'

if (!rawSlug) {
  console.error('\n  Usage: npm run new:landing "campaign-slug" [--template=high-ticket|newsletter|event]\n')
  process.exit(1)
}

const slug = rawSlug
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const dest = path.join(DIR, `${slug}.json`)

try {
  await fs.access(dest)
  console.error(`\n  ✗ ${slug}.json already exists. Pick a different slug or edit the existing file.\n`)
  process.exit(1)
} catch {
  // good — file does not exist
}

const title = slug
  .split('-')
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(' ')

const templates = {
  'high-ticket': {
    campaign: slug,
    title,
    description: `TODO: one-line pitch. Shows in search + social share cards.`,
    blocks: [
      {
        type: 'Hero',
        eyebrow: 'TODO: eyebrow',
        title: 'TODO: hero title — punchy, promise-forward, under 8 words if possible',
        subtitle: 'TODO: 2-3 sentence subtitle. Speak directly to the reader. Name the outcome, not the feature.',
        primaryCta: { label: 'Get started', href: '/contact' },
        secondaryCta: { label: 'Learn more', href: '#pas' },
      },
      {
        type: 'PAS',
        eyebrow: 'The reality',
        problem: 'TODO: the pain the reader feels today.',
        agitation: 'TODO: name the second-order consequence — what actually rots when the pain is left alone.',
        solution: 'TODO: your solution in one sentence. Concrete. Outcome-first.',
      },
      {
        type: 'SocialProof',
        eyebrow: 'The numbers',
        stats: [
          { value: 'TODO', label: 'proof stat' },
          { value: 'TODO', label: 'proof stat' },
          { value: 'TODO', label: 'proof stat' },
        ],
      },
      {
        type: 'FeatureTriad',
        eyebrow: 'What you actually get',
        title: 'TODO: subhead',
        items: [
          { kicker: 'One', title: 'TODO', text: 'TODO' },
          { kicker: 'Two', title: 'TODO', text: 'TODO' },
          { kicker: 'Three', title: 'TODO', text: 'TODO' },
        ],
      },
      {
        type: 'PriceAnchor',
        eyebrow: 'Options',
        title: 'TODO: pricing headline',
        tiers: [
          { name: 'Basic', price: '$X', cadence: 'one-time', features: ['TODO', 'TODO'], cta: { label: 'Get Basic', href: '/contact' } },
          { name: 'Recommended', price: '$Y', cadence: 'one-time', highlight: true, features: ['TODO', 'TODO', 'TODO'], cta: { label: 'Get Recommended', href: '/contact' } },
          { name: 'Premium', price: '$Z', cadence: 'one-time', features: ['TODO', 'TODO', 'TODO', 'TODO'], cta: { label: 'Talk Premium', href: '/contact' } },
        ],
      },
      {
        type: 'Testimonials',
        eyebrow: 'From clients',
        items: [
          { quote: 'TODO: quote', author: 'TODO', role: 'TODO' },
          { quote: 'TODO: quote', author: 'TODO', role: 'TODO' },
        ],
      },
      {
        type: 'Guarantee',
        eyebrow: 'Our promise',
        title: 'TODO: risk-reversal headline',
        body: 'TODO: the guarantee body. Explicit terms. Reads like a promise, not a legalism.',
      },
      {
        type: 'FAQ',
        eyebrow: 'Questions we get',
        title: 'The honest answers.',
        items: [
          { q: 'TODO: real objection?', a: 'TODO: honest answer.' },
          { q: 'TODO: pricing / duration question?', a: 'TODO: honest answer.' },
          { q: 'TODO: comparison to alternative?', a: 'TODO: honest answer.' },
        ],
      },
      {
        type: 'Urgency',
        eyebrow: 'Now, not later',
        headline: 'TODO: urgency claim tied to a real deadline or capacity',
        scarcity: 'Capacity: TODO',
        deadline: 'Closes TODO',
      },
      {
        type: 'CloseCTA',
        eyebrow: 'Ready?',
        title: 'TODO: close headline',
        subtitle: 'TODO: one final line that removes friction.',
        cta: { label: 'Get started', href: '/contact' },
        reassurance: 'Response within 2 business days.',
      },
    ],
  },

  newsletter: {
    campaign: slug,
    title,
    description: 'Join the newsletter — weekly editorial drops.',
    blocks: [
      {
        type: 'Hero',
        eyebrow: 'Newsletter',
        title: 'TODO: newsletter hook',
        subtitle: 'TODO: what makes this worth reading.',
        primaryCta: { label: 'Join the list', href: '/#newsletter' },
      },
      {
        type: 'FeatureTriad',
        eyebrow: 'What you get',
        items: [
          { kicker: 'Weekly', title: 'TODO', text: 'TODO' },
          { kicker: 'Curated', title: 'TODO', text: 'TODO' },
          { kicker: 'First-access', title: 'TODO', text: 'TODO' },
        ],
      },
      {
        type: 'Guarantee',
        title: 'Unsubscribe in one click.',
        body: 'No spam, no dark patterns, no friction to leave.',
      },
      {
        type: 'CloseCTA',
        title: 'Get the next issue.',
        cta: { label: 'Join the newsletter', href: '/#newsletter' },
      },
    ],
  },

  event: {
    campaign: slug,
    title,
    description: 'TODO: event one-liner.',
    blocks: [
      {
        type: 'Hero',
        eyebrow: 'Upcoming event',
        title: 'TODO: event name',
        subtitle: 'TODO: date, place, vibe in 2 sentences.',
        primaryCta: { label: 'RSVP', href: '/events' },
      },
      {
        type: 'FeatureTriad',
        eyebrow: 'What to expect',
        items: [
          { kicker: 'Format', title: 'TODO', text: 'TODO' },
          { kicker: 'Vibe', title: 'TODO', text: 'TODO' },
          { kicker: 'Who\'s there', title: 'TODO', text: 'TODO' },
        ],
      },
      {
        type: 'Urgency',
        eyebrow: 'Save your spot',
        headline: 'Capacity capped intentionally. First-come.',
        scarcity: 'Capacity: TODO',
        deadline: 'RSVP by TODO',
      },
      {
        type: 'CloseCTA',
        title: 'See you there.',
        cta: { label: 'RSVP now', href: '/events' },
        reassurance: 'You\'ll get a confirmation email with details.',
      },
    ],
  },
}

const template = templates[templateFlag] ?? templates['high-ticket']

await fs.mkdir(DIR, { recursive: true })
await fs.writeFile(dest, JSON.stringify(template, null, 2) + '\n', 'utf8')

console.log(`
  ✓ Landing page scaffolded
     File:  src/content/landing/${slug}.json
     URL:   /for/${slug}
     Template: ${templateFlag}

  Next:
    1. Edit ${slug}.json — search for "TODO"
    2. Preview: npm run dev, then http://localhost:4321/for/${slug}
    3. Commit + push + Netlify auto-deploys
`)
