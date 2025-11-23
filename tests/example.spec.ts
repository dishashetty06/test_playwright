import { test, expect } from '@playwright/test';

test.describe('Todo App Basic Functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should add a task', async ({ page }) => {
    await page.getByPlaceholder('Enter a task..').fill('Buy milk');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.locator('ol > li')).toContainText(['Buy milk']);
  });

  test('should delete a task', async ({ page }) => {
    await page.getByPlaceholder('Enter a task..').fill('Temp task');
    await page.getByRole('button', { name: 'Add' }).click();

    // Delete the newly added task (last item)
    const lastDeleteButton = page.getByRole('button', { name: 'Delete task' }).last();
    await lastDeleteButton.click();

    await expect(page.locator('ol > li')).not.toContainText(['Temp task']);
  });

  test('should move a task up and down', async ({ page }) => {
    // Add two tasks
    await page.getByPlaceholder('Enter a task..').fill('Task A');
    await page.getByRole('button', { name: 'Add' }).click();

    await page.getByPlaceholder('Enter a task..').fill('Task B');
    await page.getByRole('button', { name: 'Add' }).click();

    const firstItem = page.locator('ol > li').nth(0);
    const secondItem = page.locator('ol > li').nth(1);

    // Move second item UP
    await secondItem.getByRole('button', { name: 'Up' }).click();
    await expect(firstItem).toContainText('Task B');

    // Move it DOWN again
    await firstItem.getByRole('button', { name: 'Down'}).click();
    await expect(secondItem).toContainText('Task B');
  });

});
