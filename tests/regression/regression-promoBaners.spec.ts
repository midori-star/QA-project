import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'

test.describe('Featured product tests', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })


        test('20% off banner test', async ({page})=>{
            await productListingPage.category2.click()
            await productListingPage.assertCheckCategory2('On sale')
          })  

    })