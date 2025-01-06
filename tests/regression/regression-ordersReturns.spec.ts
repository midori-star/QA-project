import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { OrdersTrack } from '../../page-objects/OrdersTrack';


test.describe("Guest Order Tracking", () => {
    let homePage: HomePage
    let ordersTrack: OrdersTrack
        test.beforeEach(async ({page}) =>{
            homePage = new HomePage(page)
            ordersTrack = new OrdersTrack(page)
            await homePage.navigateToHomePage()
        })
  
    test("should fail tracking with order reference or email", async ({ page }) => {
      await ordersTrack.trackOrder("INVALID123", "invalid@example.com");
      await ordersTrack.assertErrorDisplayed();
    });

  
  });