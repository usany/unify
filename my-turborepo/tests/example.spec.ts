import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://usany.github.io/')

  await expect(page).toHaveTitle(/React/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://usany.github.io/')

  await page
    .getByRole('textbox', {
      name: 'email',
    })
    .fill('ckd_qja@naver.com')
  await page
    .getByRole('textbox', {
      name: 'password',
    })
    .fill('qqqqqq')
  await page
    .getByRole('button', {
      name: 'sign in',
    })
    .click()

  await expect(page.getByText('My Status')).toBeVisible()
})
