import { test, expect, Page, Locator } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import {LoginToAccount} from './POM/pages.spec.ts';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;




test('test login with @positive result', async ({ page }) => {  
  const loginpage = new LoginToAccount(page)
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, password)
  await loginpage.LoginToAccount()
});

test('test login with wrong password @negative result', async ({ page }) => {
  const loginpage = new LoginToAccount(page)
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, '111111')
  await loginpage.NotLoginToAccount()
});
