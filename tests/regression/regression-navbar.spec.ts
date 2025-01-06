import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'
import { LoginPage } from '../../page-objects/LoginPage'


test.describe('NavBar', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
    let loginPage: LoginPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            loginPage = new LoginPage(page)
            await homePage.navigateToHomePage()
         
        })
    
         test('navigation Contact us test ', async ({page})=>{
             await homePage.navBarContactUs.click()
             await productListingPage.assertCheckCategory1('Store information')
          })

          test('navigation Sign in test', async ({page})=>{
             await loginPage.signInLink.click()
             await productListingPage.assertCheckCategory('Log in to your account')
          })

          test('category Language test', async ({page})=>{
            await homePage.navLang.waitFor({ state: 'visible' });
             await homePage.navLang.click()
             await homePage.navLang.getAttribute('aria-expanded')

          })
        
    })