import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CreateAccountPage extends AbstractPage {
    readonly createAccountLink: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly Birthdate: Locator
    readonly submitButton: Locator
    readonly successMessage: Locator
    readonly alreadyExistsMessage: Locator
    readonly invalidFormat: Locator
    readonly dataPrivacyCheckbox: Locator;
    readonly newsletterCheckbox: Locator;
    readonly termsAdnConditionsCheckbox: Locator;
    readonly recieveOffersCheckbox: Locator;
    readonly selectMRCheckbox: Locator;
    readonly selectMRSCheckbox: Locator;

    readonly signOutButton: Locator;


    constructor(page: Page) {
        super(page)
        this.createAccountLink = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Create account' })
        this.firstName = page.frameLocator('iframe[name="framelive"]').getByLabel('First name')
        this.lastName = page.frameLocator('iframe[name="framelive"]').getByLabel('Last name')
        this.emailInput = page.frameLocator('iframe[name="framelive"]').getByLabel('Email')
        this.passwordInput = page.frameLocator('iframe[name="framelive"]').getByLabel('Password input')
        this.Birthdate = page.frameLocator('iframe[name="framelive"]').getByPlaceholder('MM/DD/YYYY')
        this.submitButton = page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: 'Save' })
        this.successMessage = page.frameLocator('iframe[name="framelive"]').locator('.alert.alert-success')
        this.alreadyExistsMessage = page.frameLocator('iframe[name="framelive"]').getByText('The email is already used,')
        this.invalidFormat = page.frameLocator('iframe[name="framelive"]').getByText('Invalid format.')
        this.dataPrivacyCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel('\n              Customer data privacyThe personal data you provide is used to an');
        this.newsletterCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel('\n              Sign up for our newsletterYou may unsubscribe at any moment. For');
        this.termsAdnConditionsCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel(' I agree to the terms and');
        this.recieveOffersCheckbox = page.frameLocator('iframe[name="framelive"]').getByLabel('\n              Receive offers from our partners');
        this.selectMRCheckbox= page.frameLocator('iframe[name="framelive"]').getByLabel('Mr.')
        this.selectMRSCheckbox= page.frameLocator('iframe[name="framelive"]').getByLabel('Mrs.')


        this.signOutButton=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: ' Sign out' })
        
    }

    async createAccount(firstname: string, lastname: string, email: string, password: string, birthdate: string, gender: boolean) {
        await this.createAccountLink.click();
        await this.firstName.waitFor({ state: 'visible' });
        await this.firstName.type(firstname);
        await this.lastName.type(lastname)
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
        await this.Birthdate.type(birthdate)
        await this.submitButton.click()
        await this.dataPrivacyCheckbox.click()
        await this.newsletterCheckbox.click()
        await this.termsAdnConditionsCheckbox.click()
        await this.recieveOffersCheckbox.click()
        if (gender == false) {
             await this.selectMRCheckbox.click() 
         } else {
             await this.selectMRSCheckbox.click()
         }
         await this.submitButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.page).toHaveURL('https://demo.prestashop.com/#/en/front');
    }

    async assertAlreadyExistsMessage() {
        await expect(this.alreadyExistsMessage).toContainText('The email is already used,')
    }

    async assertinvalidFormat() {
        await expect(this.invalidFormat).toContainText('Invalid format.')
    }


}
