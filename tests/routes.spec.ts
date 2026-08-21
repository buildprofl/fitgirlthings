import { test, expect } from '@playwright/test'

// Every route in the site must return 200 and render its own real content.
// This is the guardrail against the pre-rebuild bug where /privacy, /terms, etc.
// silently returned the home page.

const routes = [
  { path: '/',                title: /Fit Girl Things/i,              marker: /editorial home for women/i },
  { path: '/feed',            title: /The Feed/i,                     marker: /Stories worth your time/i },
  { path: '/events',          title: /Events/i,                       marker: /rooms worth being in/i },
  { path: '/contact',         title: /Contact/i,                      marker: /Get in touch/i },
  { path: '/privacy',         title: /Privacy Policy/i,               marker: /Privacy Policy/i },
  { path: '/terms',           title: /Terms of Service/i,             marker: /Terms of Service/i },
  { path: '/cookies',         title: /Cookie Policy/i,                marker: /Cookie Policy/i },
  { path: '/disclaimer',      title: /Disclaimer/i,                   marker: /Health & Wellness Disclaimer/i },
  { path: '/for/sponsor',     title: /Sponsor Fit Girl Things/i,      marker: /Reach the women other wellness brands/i },
  { path: '/for/newsletter',  title: /Newsletter/i,                   marker: /newsletter girls forward/i },
  { path: '/for/walk-club',   title: /Walk Club/i,                    marker: /Coffee first/i },
  { path: '/feed/the-new-rules-of-fit-girl-culture', title: /New Rules of Fit-Girl Culture/i, marker: /What today.s fit girl actually wants/i },
  { path: '/feed/lazy-fit-girl-smoothies',           title: /Lazy Fit Girl Smoothies/i,         marker: /protein first/i },
  { path: '/events/the-white-lotus-social',          title: /White Lotus Social/i,              marker: /Rooftop, resort palette/i },
  { path: '/events/fit-girl-walk-club-north-miami',  title: /Fit Girl Walk Club/i,              marker: /Saturday morning/i },
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

// Note: /blog/* → /feed/* redirect lives in netlify.toml and only fires on
// the deployed Netlify CDN. Astro's preview server doesn't process Netlify
// redirects, so we can't exercise it locally. Verify on Deploy Preview:
//   curl -I https://<deploy-preview-url>/blog/anything
// should return 301 Location: /feed/anything.
test.skip('legacy /blog/* redirects to /feed/* — verify on Netlify Deploy Preview', () => {})
