const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Big Guy',
        username: 'athletic',
        password: 'obamium'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Small Guy',
        username: 'frail',
        password: 'obamium'
      }
    })

    await page.goto('/')
  })

  test('successful login', async ({ page }) => {
    await loginWith(page, 'athletic', 'obamium')
    await expect(page.getByRole( 'button', { name: 'logout' })).toBeVisible()
  })

  test('unsuccessful login with incorrect credentials', async ({ page }) => {
    await loginWith(page, 'athletic', 'wrong')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByRole( 'button', { name: 'logout' })).not.toBeVisible()
  })

  describe('when user is logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'athletic', 'obamium')
    })

    test('logged-in user can create a blog', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'https://youtu.be/dQw4w9WgXcQ?si=h9jLuWT7a6hCpApO')
      await expect(page.getByRole( 'link', { name: 'title by author' })).toBeVisible()
    })

    test('logged-in user can like blogs', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'https://youtu.be/dQw4w9WgXcQ?si=h9jLuWT7a6hCpApO')
      await page.getByRole( 'link', { name: 'title by author' }).click()
      await page.getByRole( 'button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('logged-in user can delete blogs', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'https://youtu.be/dQw4w9WgXcQ?si=h9jLuWT7a6hCpApO')
      await page.getByRole( 'link', { name: 'title by author' }).click()
      await page.getByRole( 'button', { name: 'remove' }).click()
      await expect(page.getByRole( 'link', { name: 'title by author' })).not.toBeVisible() // here
    })
  })
})