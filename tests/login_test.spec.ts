import { test, expect } from '@playwright/test';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;


test('test login with @positive result', async ({ page }) => {
  await page.goto('https://turbosms.ua/');
  await expect(page.getByRole('link', { name: 'Вход' })).toBeVisible();
  await page.getByRole('link', { name: 'Вход' }).click();
  await expect(page.getByRole('button', { name: 'Вход'})).toBeVisible();
  await page.getByPlaceholder('логин или номер телефона').click();
  await page.getByPlaceholder('логин или номер телефона').fill(username);
  await page.getByPlaceholder('пароль', { exact: true }).click();
  await page.getByPlaceholder('пароль', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Вход' }).click();
  await expect(page.getByText('Вы вошли в систему как «')).toBeVisible();
});
