import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://turbosms.ua/');
  await expect(page.getByRole('link', { name: 'Вход' })).toBeVisible();
  await page.getByRole('link', { name: 'Вход' }).click();
  await expect(page.getByRole('button', { name: 'Вход' })).toBeVisible();
  await page.getByPlaceholder('логин или номер телефона').click();
  await page.getByPlaceholder('логин или номер телефона').fill('sssss');
  await page.getByPlaceholder('пароль', { exact: true }).click();
  await page.getByPlaceholder('пароль', { exact: true }).fill('1111111');
  await page.getByRole('button', { name: 'Вход' }).click();
});