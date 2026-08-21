import { test, expect } from '@playwright/test'

test('home page has proper SEO meta', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Fit Girl Things/)

  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description).toBeTruthy()
  expect(description!.length).toBeGreaterThan(50)

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical).toMatch(/^https:\/\/fitgirlthings\.com/)

  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
  expect(ogTitle).toBeTruthy()

  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
  expect(ogImage).toMatch(/^https?:\/\//)

  const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content')
  expect(twitterCard).toBe('summary_large_image')
})

test('article page emits Article JSON-LD + BreadcrumbList', async ({ page }) => {
  await page.goto('/feed/the-new-rules-of-fit-girl-culture')
  const jsonLds = await page.locator('script[type="application/ld+json"]').allTextContents()
  const combined = jsonLds.join(' | ')

  expect(combined).toMatch(/"@type"\s*:\s*"Organization"/)
  expect(combined).toMatch(/"@type"\s*:\s*"Article"/)
  expect(combined).toMatch(/"@type"\s*:\s*"BreadcrumbList"/)
})

test('event page emits Event JSON-LD', async ({ page }) => {
  await page.goto('/events/the-white-lotus-social')
  const jsonLds = await page.locator('script[type="application/ld+json"]').allTextContents()
  const combined = jsonLds.join(' | ')

  expect(combined).toMatch(/"@type"\s*:\s*"Event"/)
})

test('every page has one h1 and no more', async ({ page }) => {
  for (const path of ['/', '/feed', '/events', '/contact', '/privacy', '/for/sponsor']) {
    await page.goto(path)
    const count = await page.locator('h1').count()
    expect(count, `${path} should have exactly one h1`).toBe(1)
  }
})

test('skip link is present and focusable', async ({ page }) => {
  await page.goto('/')
  const skip = page.locator('.skip-link')
  await expect(skip).toHaveAttribute('href', '#main')
})
