import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'



test.describe('Home Page Succes', () =>{
let homePage: HomePage
    test.beforeEach(async ({page}) =>{
        homePage = new HomePage(page)
        await homePage.navigateToHomePage()
    })

    test('Checking Home Page Features', async ({page})=>{
       await homePage.checkHomePage()
    })

   
})