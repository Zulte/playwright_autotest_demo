import { expect, Page, Locator } from '@playwright/test';

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
  
    async FillForm(login: string, pass: string){
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

  export class SendSms{
    //This class finds in main menu button "Send sms" and sends SMS
  
        readonly page: Page;
        readonly textfield: Locator;
        readonly sign: Locator;
        readonly beforenumber: Locator;
        readonly afternumber: Locator;
        readonly sendbutton: Locator;
        readonly editbutton: Locator;
  
    constructor (page:Page) {
        this.page = page;
        this.textfield = page.locator('id=single_text')
        this.sign = page.locator('id=select2-chosen-1')
        this.beforenumber = page.locator('xpath=//*[@id="tab1"]/form/div[2]/div[2]/div[2]/label')
        this.afternumber = page.locator('xpath=/html/body/section/div[2]/div[4]/div[1]/form/div[2]/div[2]/div[2]/textarea')
        this.sendbutton = page.locator('id=submitter_single')
        this.editbutton = page.locator('id=cancel')
    }
  
    async goto(){
        await this.page.getByRole('link', { name: 'Отправить SMS' }).click();
    }
  
    async fullfill_fields(text: string, number: string){
        let textlenght = text.length
        if (text == '') {
            textlenght = 0
        }
        await this.textfield.click()
        await this.textfield.pressSequentially(text)
        await expect(this.page.getByText(textlenght.toString(), { exact: true })).toBeVisible();
        await this.sign.click()
        await this.page.locator('#select2-result-label-9').click();
        await expect(this.page.getByRole('link', { name: 'MAGAZIN' })).toBeVisible();
        await this.beforenumber.click()
        await this.afternumber.fill(number)
        await this.sendbutton.click()
    }

    async check_result_of_sending(text: string, number: string) {
        await expect(this.page.getByText('Время отправки: Немедленно')).toBeVisible();
        await expect(this.page.getByText('Отправитель: MAGAZIN')).toBeVisible();
        await expect(this.page.getByText('Номер получателя: ' + number)).toBeVisible();
        await expect(this.page.getByText('Количество номеров: 1')).toBeVisible();
        await expect(this.page.getByText('Текст сообщения: ' + text)).toBeVisible();
        await expect(this.page.getByText('Размер SMS: 1 сегм')).toBeVisible();
        await expect(this.page.getByText('Стоимость 1 SMS: 0.66грн')).toBeVisible();
        await expect(this.page.getByText('Суммарная стоимость: 0.66грн')).toBeVisible();
    }

    async send_sms() {
        await this.sendbutton.click();
        await expect(this.page.getByText('Сообщение успешно поставлено в очередь отправки')).toBeVisible();
    }

    async edit_sms() {
        await this.editbutton.click();
        await expect(this.page.getByRole('heading', { name: 'Отправка SMS' })).toBeVisible();
      }

    async wrong_number() {
        await expect(this.page.getByText('Введите правильный номер получателя в международном формате (только цифры)')).toBeVisible();
      }

    async without_text() {
        await expect(this.page.getByText('Введите правильный номер получателя в международном формате (только цифры)')).toBeVisible();
    }
  }
