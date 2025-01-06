import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage{
    readonly signInLink: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly errorMessage: Locator
    readonly logOutDrop: Locator
    readonly forgotPasswordLink: Locator;
    readonly resetEmailInput: Locator;
    readonly sendResetButton: Locator;
    readonly resetConfirmationMessage: Locator;

    constructor(page: Page){
        super(page)
        this.signInLink = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: ' Sign in' })
        this.emailInput = page.frameLocator('iframe[name="framelive"]').getByLabel('Email')
        this.passwordInput = page.frameLocator('iframe[name="framelive"]').getByLabel('Password input')
        this.signInButton = page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: 'Sign in' })
        this.errorMessage = page.locator('#content > section > div > ul > li.alert.alert-danger')
        this.logOutDrop = page.frameLocator('iframe[name="framelive"]').locator('#logout hidden-sm-down')
        this.forgotPasswordLink = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Forgot your password?' })
        this.resetEmailInput = page.frameLocator('iframe[name="framelive"]').locator('#email')
        this.sendResetButton = page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: 'Send reset link' })
        this.resetConfirmationMessage = page.frameLocator('iframe[name="framelive"]').getByText('If this email address has')
    }

    async signIn(email: string, password: string){
        await this.signInLink.click()
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
        await this.signInButton.click()  
    }

     async logOut(){
          await this.logOutDrop.click()
      }

    async assertErrorMessage(){
        await expect(this.errorMessage).toBeHidden()
    }

    async assertSuccesMessage(){
         await expect(this.page).toHaveURL('https://demo.prestashop.com/#/en/front');
     }


     async resetPassword(email: string) {
        await this.signInLink.click()
        await this.forgotPasswordLink.click();
        await this.resetEmailInput.fill(email);
        await this.sendResetButton.click();
    }

    async assertResetConfirmationMessage() {
        await expect(this.resetConfirmationMessage).toBeVisible();
    }
    

}