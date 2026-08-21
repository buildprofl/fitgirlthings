#!/usr/bin/env node
/**
 * FGT Event Scaffolder
 * --------------------
 * Usage: npm run new:event "event-slug" -- "2026-11-16"
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'src/content/events')

const args = process.argv.slice(2)
const positional = args.filter((a) => !a.startsWith('--'))
const rawSlug = positional[0]
const dateArg = positional[1]

if (!rawSlug) {
  console.error('\n  Usage: npm run new:event "event-slug" -- "YYYY-MM-DD"\n')
  process.exit(1)
}

const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const date = dateArg && !isNaN(Date.parse(dateArg)) ? new Date(dateArg) : new Date()

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const dateLabelMonth = monthNames[date.getMonth()]
const dateLabelDay = String(date.getDate())
const title = slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')

const dest = path.join(DIR, `${slug}.md`)

try {
  await fs.access(dest)
  console.error(`\n  ✗ ${slug}.md already exists.\n`)
  process.exit(1)
} catch {}

const template = `---
title: "${title}"
place: "TODO: venue, city"
summary: "TODO: 1-2 sentence teaser (appears in cards + social)."
date: ${date.toISOString().slice(0, 10)}
dateLabelMonth: "${dateLabelMonth}"
dateLabelDay: "${dateLabelDay}"
image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80"
imageAlt: "TODO: describe the image"
capacity: 50
price: "TODO: 'Free', '$45', or 'Invitation-only'"
hostedBy: "Fit Girl Things"
highlights:
  - "TODO: what attendees experience #1"
  - "TODO: what attendees experience #2"
  - "TODO: what attendees experience #3"
draft: true
---

TODO: event body — one or two paragraphs. What the day feels like, what to bring, why it's worth showing up.
`

await fs.mkdir(DIR, { recursive: true })
await fs.writeFile(dest, template, 'utf8')

console.log(`
  ✓ Event scaffolded
     File:  src/content/events/${slug}.md
     URL:   /events/${slug}
     Draft: true

  Next:
    1. Edit the event — swap TODO
    2. Preview: npm run dev, then http://localhost:4321/events/${slug}
    3. Flip \`draft: false\` when ready
    4. Commit + push
`)
