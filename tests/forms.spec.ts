import { test, expect } from '@playwright/test'

// Forms QA: newsletter form validates + posts to Netlify Forms name endpoint.
// Netlify's dev server intercepts form POSTs during `netlify dev`; in `astro
// preview` (used by our webServer), POSTs to `/` 404, so we intercept them
// and assert the payload shape.

test('newsletter form: empty submit shows error', async ({ page }) => {
  await page.goto('/')
  await page.locator('#newsletter').scrollIntoViewIfNeeded()

  // Wait for React island to hydrate
  const email = page.locator('#hero-email')
  await expect(email).toBeVisible()

  const submit = page.locator('form.newsletter-form button[type="submit"]').first()
  await submit.click()

  await expect(page.locator('.form-error').first()).toContainText(/valid email|enter your email/i)
})

test('newsletter form: invalid email shows error', async ({ page }) => {
  await page.goto('/')
  const email = page.locator('#hero-email')
  await email.waitFor({ state: 'visible' })
  await email.fill('nope-not-an-email')
  await page.locator('form.newsletter-form button[type="submit"]').first().click()
  await expect(page.locator('.form-error').first()).toContainText(/valid email/i)
})

test('newsletter form: valid email POSTs with correct payload', async ({ page }) => {
  await page.goto('/')

  // Intercept the POST — preview server has no forms backend
  let submittedBody: string | null = null
  await page.route('**/', async (route, req) => {
    if (req.method() === 'POST') {
      submittedBody = req.postData()
      await route.fulfill({ status: 200, body: 'ok' })
      return
    }
    await route.continue()
  })

  const email = page.locator('#hero-email')
  await email.waitFor({ state: 'visible' })
  await email.fill('reader@example.com')
  await page.locator('form.newsletter-form button[type="submit"]').first().click()

  await expect(page.locator('.form-success').first()).toContainText(/Welcome/i, { timeout: 10_000 })
  expect(submittedBody).toBeTruthy()
  expect(submittedBody!).toContain('form-name=newsletter')
  expect(submittedBody!).toContain('email=reader%40example.com')
})

test('event RSVP form: validates required fields', async ({ page }) => {
  await page.goto('/events/fit-girl-walk-club-north-miami')

  const nameInput = page.locator('input[name="name"]').first()
  await nameInput.waitFor({ state: 'visible' })

  await page.locator('button[type="submit"]', { hasText: /reserve/i }).click()
  await expect(page.locator('.form-error').first()).toContainText(/name/i)
})

test('event RSVP form: happy path submits with event name', async ({ page }) => {
  await page.goto('/events/fit-girl-walk-club-north-miami')

  let submittedBody: string | null = null
  await page.route('**/', async (route, req) => {
    if (req.method() === 'POST') {
      submittedBody = req.postData()
      await route.fulfill({ status: 200, body: 'ok' })
      return
    }
    await route.continue()
  })

  await page.locator('input[name="name"]').first().waitFor({ state: 'visible' })
  await page.locator('input[name="name"]').first().fill('Test Attendee')
  await page.locator('input[name="email"]').first().fill('attendee@example.com')
  await page.locator('button[type="submit"]', { hasText: /reserve/i }).click()

  await expect(page.locator('.rsvp-success')).toBeVisible({ timeout: 10_000 })
  expect(submittedBody).toBeTruthy()
  expect(submittedBody!).toContain('form-name=rsvp')
  expect(submittedBody!).toContain('event=Fit')
})

test('Netlify Forms hidden static forms are present in HTML for detection', async ({ page }) => {
  await page.goto('/')
  const forms = await page.locator('form[data-netlify="true"][hidden]').count()
  // BaseLayout ships 3 hidden static forms (newsletter, rsvp, partner-inquiry)
  expect(forms).toBeGreaterThanOrEqual(3)
})
