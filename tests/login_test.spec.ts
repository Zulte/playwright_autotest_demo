import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;

export default defineConfig({
  use: {
    testIdAttribute: 'id'
  }
});

test('test login with @positive result', async ({ page }) => {  
  await page.goto('https://turbosms.ua/');
  await expect(page.getByAltText('TurboSMS')).toHaveClass('header__logo')
  await page.getByRole('link', { name: 'Вход' }).click();
  await expect(page.locator('id=submit_auth')).toBeVisible();
  await page.locator('id=auth_login').click();
  await page.locator('id=auth_login').fill(username);
  await page.locator('id=auth_password').click();
  await  page.locator('id=auth_password').fill(password);
  await page.locator('id=submit_auth').click();
  await expect(page.getByText('Вы вошли в систему как «')).toBeVisible();
});

test('test login with wrong password @negative result', async ({ page }) => {
  await page.goto('https://turbosms.ua/');
  await expect(page.getByAltText('TurboSMS')).toHaveClass('header__logo')
  await page.getByRole('link', { name: 'Вход' }).click();
  await expect(page.locator('id=submit_auth')).toBeVisible();
  await page.locator('id=auth_login').click();
  await page.locator('id=auth_login').fill(username);
  await page.locator('id=auth_password').click();
  await page.locator('id=auth_password').fill('1111111');
  await page.locator('id=submit_auth').click();
});
