import { test, expect } from '@playwright/test'

// Nav QA: every link in the nav and footer resolves to a real page.
// Catches the pre-rebuild bug where "Read more" links pointed to #newsletter
// instead of real article URLs.

test('desktop nav links resolve to real pages', async ({ page }) => {
  await page.goto('/')
  const navLinks = await page.locator('header .nav a[href]').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!).filter((h) => h && !h.startsWith('#'))
  )
  expect(navLinks.length).toBeGreaterThan(2)

  for (const href of navLinks) {
    if (href.startsWith('mailto:') || href.startsWith('http')) continue
    const bare = href.split('#')[0]
    if (!bare) continue
    const res = await page.request.get(bare)
    expect(res.status(), `nav link ${href} broken`).toBe(200)
  }
})

test('footer links resolve to real pages', async ({ page }) => {
  await page.goto('/')
  const footerLinks = await page.locator('footer a[href]').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!)
  )
  expect(footerLinks.length).toBeGreaterThan(6)

  for (const href of footerLinks) {
    if (href.startsWith('mailto:') || href.startsWith('http')) continue
    const bare = href.split('#')[0]
    if (!bare) continue
    const res = await page.request.get(bare)
    expect(res.status(), `footer link ${href} broken`).toBe(200)
  }
})

test('featured article cards on home link to real category article pages', async ({ page }) => {
  await page.goto('/')
  const cardLinks = await page.locator('#featured .feed-card, #featured .lead-story').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!).filter(Boolean)
  )
  expect(cardLinks.length).toBeGreaterThan(3)

  for (const href of cardLinks) {
    const res = await page.request.get(href)
    expect(res.status(), `featured card link ${href} broken`).toBe(200)
  }
})

test('category row cards on home link to real article pages', async ({ page }) => {
  await page.goto('/')
  const rowLinks = await page.locator('.row-card').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!).filter(Boolean)
  )
  expect(rowLinks.length).toBeGreaterThan(5)

  for (const href of rowLinks) {
    const res = await page.request.get(href)
    expect(res.status(), `category row link ${href} broken`).toBe(200)
  }
})

test('hero category pills link to real category pages', async ({ page }) => {
  await page.goto('/')
  const pillLinks = await page.locator('.hero-cat-pill').evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!)
  )
  expect(pillLinks.length).toBe(5)

  for (const href of pillLinks) {
    const res = await page.request.get(href)
    expect(res.status(), `hero category pill ${href} broken`).toBe(200)
  }
})

test('CTA buttons in hero go to real destinations', async ({ page }) => {
  await page.goto('/')
  const heroButtons = page.locator('.hero .hero-actions a')
  await expect(heroButtons).toHaveCount(2)

  const spottedBtn = heroButtons.filter({ hasText: /spotted/i })
  await spottedBtn.click()
  await expect(page).toHaveURL(/\/spotted/)
})

test('mobile menu opens, closes on link click', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } })
  const page = await context.newPage()
  await page.goto('/')
  const toggle = page.locator('[data-menu-toggle]')
  const menu = page.locator('[data-menu]')

  await expect(toggle).toBeVisible()
  await toggle.click()
  await expect(menu).toHaveClass(/open/)

  const link = menu.locator('a[href="/spotted"]')
  await link.click()
  await expect(page).toHaveURL(/\/spotted/)
  await context.close()
})
