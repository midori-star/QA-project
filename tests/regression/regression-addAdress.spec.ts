import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { CreateAccountPage } from '../../page-objects/CreateAccountPage'
import { AddAdress } from '../../page-objects/AddAdress'

test.describe('Advanced Search', () =>{
    let homePage: HomePage
    let addAdress: AddAdress
    let createAccount: CreateAccountPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            addAdress = new AddAdress(page)
            createAccount = new CreateAccountPage(page)
            await homePage.navigateToHomePage()
            await createAccount.createAccount('Ajla','Hadzovic','nesto@hotmail.com', 'nesto_123_nesto','11/02/2000', true )
           
        })
    

        test('check adress add succes', async ({page})=>{
            await addAdress.addAdress('a', 'a', 'a', 'a', 'a', '18888', '101010', 'Colorado' )
            await addAdress.assertSuccessMessage()
        })

        test('check test fail - invalid postal/ZIP code', async ({ page }) => {
            await createAccount.createAccount('Test', 'User', 'test_user_1@example.com', 'nesto_123_nesto', '01/01/1990', true)
            await addAdress.addAdress('a', 'a', 'a', 'a', 'a', '7722aa', '101010', 'Colorado')
            await expect(addAdress.errorMes).toContainText('Invalid postcode - should')
        })


    })