import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login/Logout Flow', () =>{
let homePage: HomePage
let loginPage: LoginPage
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.navigateToHomePage()
    })

    test('succes scenario and logout', async ({page})=>{
         await loginPage.signIn('neko@nekic.com','neko_123_neko')
         await loginPage.assertSuccesMessage()  
          await loginPage.logOut()
          await expect(page).toHaveURL('https://demo.prestashop.com/#/en/front')
     })

    test('failure scenario', async ({page})=>{
        await loginPage.signIn('neko@nekic.com','neko_123_neko')
        await loginPage.assertErrorMessage()  
    })

})