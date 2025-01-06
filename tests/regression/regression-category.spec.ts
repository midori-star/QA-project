import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'


test.describe('Categories Field Test', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })
    

        
         test('sub category filter test', async ({page})=>{
            await productListingPage.selectMenuCategory('Accessories')
            await productListingPage.selectMenuSubCategory('Home Accessories')
            await productListingPage.asaertFilter(' Available (8)')
            await productListingPage.asaertFilter('Studio Design (7)')
            await productListingPage.asaertFilter(' Ceramic (4)')
            await productListingPage.checkNumberOfItems('There are 4 products.')
            
         })

    })