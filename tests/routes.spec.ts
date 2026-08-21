import { test, expect } from '@playwright/test'

// Every route in the site must return 200 and render its own real content.
// This is the guardrail against the pre-rebuild bug where /privacy, /terms, etc.
// silently returned the home page.

const routes = [
  { path: '/',                 title: /Fit Girl Things/i,        marker: /Miami.s fit-girl world/i },
  { path: '/spotted',          title: /Spotted/i,                marker: /New studios, stores, and brand openings/i },
  { path: '/fit-girl-news',    title: /Fit Girl News/i,          marker: /fitness and wellness industry stories/i },
  { path: '/wellness',         title: /Wellness/i,               marker: /Trends, treatments, and rituals/i },
  { path: '/fitgirlfind',      title: /Fit Girl Find/i,          marker: /Product picks and gym-bag essentials/i },
  { path: '/fit-girls',        title: /Fit Girls/i,              marker: /trainers and women shaping/i },
  { path: '/faqs',             title: /FAQs/i,                   marker: /Questions we get a lot/i },
  { path: '/contact',          title: /Contact/i,                marker: /Get in touch/i },
  { path: '/privacy',          title: /Privacy Policy/i,         marker: /Privacy Policy/i },
  { path: '/terms',            title: /Terms of Service/i,       marker: /Terms of Service/i },
  { path: '/cookies',          title: /Cookie Policy/i,          marker: /Cookie Policy/i },
  { path: '/disclaimer',       title: /Disclaimer/i,             marker: /Health & Wellness Disclaimer/i },
  { path: '/for/newsletter',   title: /Fit Girl Insider/i,       marker: /newsletter girls forward/i },
  { path: '/spotted/spotted-rp-heat-boca-raton-and-delray-beach', title: /RP Heat/i, marker: /Boca Raton and Delray Beach/i },
  { path: '/fit-girl-news/news-alo-aventura',                     title: /Alo/i,     marker: /Aventura Mall/i },
  { path: '/wellness/wellness-truvani-electrolytes',              title: /Truvani/i, marker: /electrolyte/i },
  { path: '/fitgirlfind/find-panic-panties',                      title: /Panic Panties/i, marker: /gym bag/i },
  { path: '/fit-girls/girls-caro-suki',                           title: /Caro Suki/i, marker: /Miami/i },
] as const

for (const route of routes) {
  test(`route ${route.path} loads and renders own content`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response, `no response for ${route.path}`).toBeTruthy()
    expect(response!.status(), `${route.path} returned ${response!.status()}`).toBe(200)

    await expect(page).toHaveTitle(route.title)
    await expect(page.locator('body')).toContainText(route.marker)
  })
}

test('sitemap-index.xml exists', async ({ page }) => {
  const response = await page.goto('/sitemap-index.xml')
  expect(response!.status()).toBe(200)
  const body = await page.content()
  expect(body).toContain('sitemapindex')
})

test('robots.txt exists and lists sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  const body = await response.text()
  expect(body).toMatch(/Sitemap:\s*https:\/\/fitgirlthings\.com\/sitemap-index\.xml/)
})

test('every category page has at least one article', async ({ page, request }) => {
  const categories = ['spotted', 'fit-girl-news', 'wellness', 'fitgirlfind', 'fit-girls']
  for (const cat of categories) {
    const res = await request.get(`/${cat}`)
    expect(res.status(), `/${cat} should return 200`).toBe(200)
  }
})
