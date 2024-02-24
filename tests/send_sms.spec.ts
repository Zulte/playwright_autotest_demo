import { test, expect, Page, Locator } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import {LoginToAccount, SendSms} from './POM/pages.spec.ts';
import exp from 'constants';

const config = require("./config.json");

const username = config.turbo_name;
const password = config.turbo_pass;



test('send sms with right data @positive', async ({ page }) => {
  const loginpage = new LoginToAccount(page)
  //login
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, password)
  await loginpage.LoginToAccount()


  const sendpage = new SendSms(page)
  await sendpage.goto()
  await sendpage.fullfill_fields('testtesttesttesttesttest', '380666118336')
  await sendpage.check_result_of_sending('testtesttesttesttesttest', '380666118336')
  await sendpage.send_sms()
});

test('user decide to edit message @positive', async ({ page }) => {
  const loginpage = new LoginToAccount(page)
  //login
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, password)
  await loginpage.LoginToAccount()


  const sendpage = new SendSms(page)
  await sendpage.goto()
  await sendpage.fullfill_fields('testtesttesttesttesttest', '380666118336')
  await sendpage.check_result_of_sending('testtesttesttesttesttest', '380666118336')
  await sendpage.edit_sms()
});

test('send sms without number or with wrong number @negative', async ({ page }) => {
  const loginpage = new LoginToAccount(page)
  //login
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, password)
  await loginpage.LoginToAccount()


  const sendpage = new SendSms(page)
  await sendpage.goto()
  await sendpage.fullfill_fields('testtesttesttesttesttest', '3806')
  await sendpage.wrong_number()
});


test('send sms without text @negative', async ({ page }) => {
  const loginpage = new LoginToAccount(page)
  //login
  await loginpage.goto()
  await loginpage.GetToForm()
  await loginpage.FillForm(username, password)
  await loginpage.LoginToAccount()


  const sendpage = new SendSms(page)
  await sendpage.goto()
  await sendpage.fullfill_fields('', '380666118336')
  await sendpage.without_text()
});