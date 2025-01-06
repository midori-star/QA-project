import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'

test.describe('Login/Logout Flow', () =>{
    let homePage: HomePage
    let createAccountPage: CreateAccountPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            createAccountPage = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
        })
        
        test('positive scenario', async ({page})=>{
           await createAccountPage.createAccount('Ajla','Hadzovic','nesto@hotmail.com', 'nesto_123_nesto','11/02/2000', true )
           await createAccountPage.assertSuccessMessage()
        })

        
    })