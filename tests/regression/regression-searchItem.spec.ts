import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe.only('Search Item Tests', () =>{
let homePage: HomePage
let productListingPage: ProductListingPage

    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        productListingPage = new ProductListingPage(page)
        await homePage.navigateToHomePage()
    })

    test('Negative Scenario', async ({page})=>{
        await homePage.searchItem('Ha')
        await productListingPage.assertNoItems()
     })

      test('Check Scenario', async ({page})=>{
         await homePage.searchItem('Mountain fox cussion')
         await productListingPage.asserrtCheckSearch('Mountain fox cushion')
      })

      test('Check items in search', async ({page})=>{
         await homePage.searchItem('the best is yet')
         await productListingPage.checkNumberOfItems('There are 4 products.')
      })




   
})