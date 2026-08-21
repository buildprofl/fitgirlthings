import { test, expect } from '@playwright/test'

test('theme toggle switches dark mode and persists in localStorage', async ({ page }) => {
  await page.goto('/')

  // Initial state (respects prefers-color-scheme, but no data-theme set)
  const initialTheme = await page.locator('html').getAttribute('data-theme')
  expect(initialTheme === null || initialTheme === 'light' || initialTheme === 'dark').toBeTruthy()

  const toggle = page.locator('[data-theme-toggle]')
  await toggle.first().click()

  const afterClick = await page.locator('html').getAttribute('data-theme')
  expect(['dark', 'light']).toContain(afterClick)

  const stored = await page.evaluate(() => localStorage.getItem('fgt-theme'))
  expect(['dark', 'light']).toContain(stored)

  await page.reload()
  const persisted = await page.locator('html').getAttribute('data-theme')
  expect(persisted).toBe(afterClick)
})
