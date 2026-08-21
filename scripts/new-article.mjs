#!/usr/bin/env node
/**
 * FGT Article Scaffolder
 * ----------------------
 * Usage: npm run new:article "article-slug" [--category=Wellness]
 *
 * Creates src/content/articles/<slug>.mdx pre-populated with frontmatter
 * and MDX starter. Ships at /feed/<slug>.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'src/content/articles')

const args = process.argv.slice(2)
const rawSlug = args.find((a) => !a.startsWith('--'))
const category = (args.find((a) => a.startsWith('--category=')) ?? '').split('=')[1] ?? 'Wellness'
const allowed = ['Wellness', 'Culture', 'Fitness', 'Events', 'Beauty', 'Found']

if (!rawSlug) {
  console.error('\n  Usage: npm run new:article "article-slug" [--category=Wellness|Culture|Fitness|Events|Beauty|Found]\n')
  process.exit(1)
}

if (!allowed.includes(category)) {
  console.error(`\n  Category must be one of: ${allowed.join(', ')}\n`)
  process.exit(1)
}

const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const title = slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
const dest = path.join(DIR, `${slug}.mdx`)

try {
  await fs.access(dest)
  console.error(`\n  ✗ ${slug}.mdx already exists.\n`)
  process.exit(1)
} catch {}

const today = new Date().toISOString().slice(0, 10)

const template = `---
title: "${title}"
excerpt: "TODO: 1-2 sentence excerpt (appears in cards and social share)."
category: "${category}"
image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
imageAlt: "TODO: describe the image"
publishedAt: ${today}
author: "FGT Editors"
readingMinutes: 5
tags: ["${category.toLowerCase()}"]
draft: true
---

TODO: opening hook — one paragraph, punchy, sets the frame.

## First section

TODO: body copy. Editorial voice. Short paragraphs. Real point of view.

## Second section

- TODO: bulleted list
- TODO: bulleted list
- TODO: bulleted list

## What comes next

TODO: close with a call to action or reader takeaway.

*Get the next one in your inbox.* [Join the newsletter](/#newsletter).
`

await fs.mkdir(DIR, { recursive: true })
await fs.writeFile(dest, template, 'utf8')

console.log(`
  ✓ Article scaffolded
     File:  src/content/articles/${slug}.mdx
     URL:   /feed/${slug}
     Draft: true (won't publish until you flip \`draft: false\`)

  Next:
    1. Edit the article — swap TODO, set image
    2. Preview: npm run dev, then http://localhost:4321/feed/${slug}
    3. Flip \`draft: false\` when ready
    4. Commit + push
`)
