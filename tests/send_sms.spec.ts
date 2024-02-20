import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;


test('send sms with right data @positive', async ({ page }) => {
  await page.goto('https://turbosms.ua/');
  await expect(page.getByAltText('TurboSMS')).toHaveClass('header__logo')
  await page.getByRole('link', { name: 'Вход' }).click();
  await expect(page.locator('id=submit_auth')).toBeVisible();
  await page.locator('id=auth_login').click();
  await page.locator('id=auth_login').fill(username);
  await page.locator('id=auth_password').click();
  await page.locator('id=auth_password').fill(password);
  await page.locator('id=submit_auth').click();
  await expect(page.getByText('Вы вошли в систему как «')).toBeVisible();
  await page.getByRole('link', { name: 'Отправить SMS' }).click();
  await page.locator('id=single_text').click();
  await page.locator('id=single_text').pressSequentially('test_test_test_test_test_test_test');
  await expect(page.getByRole('heading', { name: 'Отправка SMS' })).toBeVisible();
  await expect(page.getByText('34', { exact: true })).toBeVisible();
  await expect(page.getByText('126', { exact: true })).toBeVisible();
  await expect(page.getByRole('strong')).toBeVisible();
  await expect(page.getByRole('link', { name: 'TAXI' })).toBeVisible();
  await page.getByRole('link', { name: 'TAXI' }).click();
  await page.locator('#select2-result-label-9').click();
  await expect(page.getByRole('link', { name: 'MAGAZIN' })).toBeVisible();
  await expect(page.getByText('Номера получателей в международном формате, например 380672316939(не более 3')).toBeVisible();
  await page.getByText('Номера получателей в международном формате, например 380672316939(не более 3').click();
  await page.getByLabel('Номера получателей в международном формате, например 380672316939(не более 3').fill('380666118336');
  await page.locator('id=submitter_single').click();
  await expect(page.getByText('Время отправки: Немедленно')).toBeVisible();
  await expect(page.getByText('Отправитель: MAGAZIN')).toBeVisible();
  await expect(page.getByText('Номер получателя: 380666118336')).toBeVisible();
  await expect(page.getByText('Количество номеров: 1')).toBeVisible();
  await expect(page.getByText('Текст сообщения: test_test_test_test_test_test_test')).toBeVisible();
  await expect(page.getByText('Размер SMS: 1 сегм')).toBeVisible();
  await expect(page.getByText('Стоимость 1 SMS: 0.66грн')).toBeVisible();
  await expect(page.getByText('Суммарная стоимость: 0.66грн')).toBeVisible();
  await page.locator('id=submitter_single').click();
  await expect(page.getByText('Сообщение успешно поставлено в очередь отправки')).toBeVisible();
});