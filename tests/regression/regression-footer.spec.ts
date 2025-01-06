
import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { ProductListingPage } from '../../page-objects/ProductListingPage'

test.describe('Footer tests', () =>{
    let homePage: HomePage
    let productListingPage: ProductListingPage
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            productListingPage = new ProductListingPage(page)
            await homePage.navigateToHomePage()
        })

         test('Delivery test', async ({page})=>{
             await homePage.footerDelivery.click()
             await productListingPage.assertCheckCategory('Delivery')

          })
          test('Legal Notice test', async ({page})=>{
            await homePage.footerLegalNotice.click()
            await productListingPage.assertCheckCategory('Legal Notice')

         })
         
         test('Terms and conditions of use test', async ({page})=>{
            await homePage.footerTerms.click()
            await productListingPage.assertCheckCategory('Terms and conditions of use')

         })

         test('About us test', async ({page})=>{
            await homePage.footerAboutUs.click()
            await productListingPage.assertCheckCategory('About us')

         })

         test('Secure payment test', async ({page})=>{
            await homePage.footerSecurePayment.click()
            await productListingPage.assertCheckCategory('Secure payment')

         })

         test('Sitemap test', async ({page})=>{
            await homePage.footerSitemap.click()
            await productListingPage.assertCheckCategory('Sitemap')

         })
         
         test('Stores test', async ({page})=>{
            await homePage.footerStores.click()
            await productListingPage.assertCheckCategory('Our stores')

         })

         
    })