import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Regression', () =>{
let homePage: HomePage
let loginPage: LoginPage
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.navigateToHomePage()
    })

    test('negative scenario', async ({page})=>{
        await loginPage.signIn('nekoneki@hameil.com','123pass455')
        await loginPage.assertErrorMessage()
     })
 
     test('forgot password', async ({ page }) => {
         await loginPage.resetPassword('nekonesto@example.com');
         await loginPage.assertResetConfirmationMessage();
     });

})