import { test, expect, Page, Locator } from '@playwright/test';
import { defineConfig } from '@playwright/test';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;

export class LoginToAccount{
  readonly page: Page;
  readonly loginfield: Locator;
  readonly passfield: Locator;
  readonly loginbutton: Locator;
  readonly succsesfullogin: Locator;
  readonly unsuccsesfullogin: Locator;

  constructor(page:Page) {
    this.page = page;
    this.loginfield = page.locator('id=auth_login');
    this.passfield = page.locator('id=auth_password');
    this.loginbutton  = page.locator('id=submit_auth');
    this.succsesfullogin = page.locator('.alert-success');
    this.unsuccsesfullogin = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto('https://turbosms.ua/');
    await expect(this.page.getByAltText('TurboSMS')).toHaveClass('header__logo');
  }

  async GetToForm(){
    await this.page.getByRole('link', { name: 'Вход' }).click();
    await expect(this.loginbutton).toBeVisible();
  }

  async FillForm(login, pass){
    await this.loginfield.click();
    await this.loginfield.fill(login);
    await this.passfield.click();
    await this.passfield.fill(pass);
  }

  async LoginToAccount(){
    await this.loginbutton.click();
    await expect(this.succsesfullogin).toBeVisible({ timeout: 30000 });
  }

  async NotLoginToAccount(){
    await this.loginbutton.click();
    await expect(this.unsuccsesfullogin).toBeVisible({ timeout: 30000 });
  }
}


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
