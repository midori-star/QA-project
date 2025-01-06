import { HomePage } from "../../page-objects/HomePage";
import {test, expect} from "@playwright/test";
import { CartPage } from "../../page-objects/CartPage";
import { CreateAccountPage } from "../../page-objects/CreateAccountPage";

test.describe('Checkout Path', () =>{
    let homePage: HomePage
    let cartPage: CartPage
    let createAccountPage: CreateAccountPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            cartPage = new CartPage(page)
            createAccountPage = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
            await createAccountPage.createAccount('Ajla','Hadzovic','nesto@hotmail.com', 'nesto_123_nesto','11/02/2000', true )

        })
    
        test('checkout', async ({page})=>{
            await cartPage.checkOutCart()
        })    

       
    }
)