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

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'athletic', 'obamium')
      await expect(page.getByText('athletic logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'athletic', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      expect(page.getByText('athletic logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'athletic', 'obamium')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Surfs up!', 'Some_Rapper', 'https://youtu.be/dQw4w9WgXcQ?si=uViKSWKb7sOeyqo5')
      await expect(page.getByText('Surfs up! Some_Rapper'))
    })

    describe('a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Surfs up!', 'Some_Rapper', 'https://youtu.be/dQw4w9WgXcQ?si=uViKSWKb7sOeyqo5')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Surfs up! Some_Rapper')).not.toBeVisible()
      })
    })
  })
})