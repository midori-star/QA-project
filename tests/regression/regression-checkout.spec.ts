import { HomePage } from "../../page-objects/HomePage";
import {test, expect} from "@playwright/test";
import { CartPage } from "../../page-objects/CartPage";

test.describe('Checkout Failed', () =>{
    let homePage: HomePage
    let cartPage: CartPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            cartPage = new CartPage(page)
            await homePage.navigateToHomePage()

        })
    
        test('checkout', async ({page})=>{
            await cartPage.checkOutCart()
        }) 

        test('delete element', async ({page})=>{
            await cartPage.deleteItem()
         })

         test('continue shopping', async ({page})=>{
            await cartPage.continueS()
            await expect(homePage.costumBox).toBeVisible()
         })
       
    })