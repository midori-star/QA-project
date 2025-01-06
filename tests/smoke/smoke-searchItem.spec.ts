import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('Search Item', () =>{
let homePage: HomePage
let productListingPage: ProductListingPage
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        productListingPage = new ProductListingPage(page)
        await homePage.navigateToHomePage()
    })

    test('Positive Scenario', async ({page})=>{
       await homePage.searchItem('the best is yet')
       await productListingPage.checkNumberOfItems('There are 4 products.')
    })

   
})