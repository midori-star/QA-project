import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'

test.describe('register account fail', () =>{
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
    
         test('already exists scenario', async ({page})=>{
            await createAccountPage.createAccount('Ajla','Hadzovic','nesto@hotmail.com', 'nesto_123_nesto','11/02/2000', true )
            await createAccountPage.signOutButton.click()
            await createAccountPage.createAccount('Ajla','Hadzovic','nesto@hotmail.com', 'nesto_123_nesto','11/02/2000', true )
            await expect(createAccountPage.alreadyExistsMessage).toBeVisible()
         })

          test('invalid email input', async ({page})=>{
             await createAccountPage.createAccount('Ajla','Hadzovic','nesto@neko', 'nesto_123_nesto','11/02/2000', true )
             await expect(createAccountPage.invalidFormat).toBeVisible()
          })

        
    })