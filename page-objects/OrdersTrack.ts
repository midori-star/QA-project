import test, { expect, Locator, Page } from "@playwright/test"
import { AbstractPage } from "./AbstractPage"


export class OrdersTrack extends AbstractPage {

    readonly orderRefLink: Locator;
    readonly orderReference: Locator;
    readonly email: Locator;
    readonly sendButton: Locator;
    readonly errorMessage: Locator; 
    readonly successMessage: Locator; 

    
        constructor(page: Page) {
            super(page);
            this.orderRefLink=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Order tracking' })
            this.orderReference = page.frameLocator('iframe[name="framelive"]').locator('input[name="order_reference"]')
            this.email = page.frameLocator('iframe[name="framelive"]').locator('#guestOrderTrackingForm input[name="email"]')
            this.sendButton = page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: 'Send' })
            this.errorMessage = page.frameLocator('iframe[name="framelive"]').getByRole('alert')
           
          }

          async trackOrder(orderReference: string, email: string) {
            await this.orderRefLink.click();
            await this.orderReference.fill(orderReference);
            await this.email.fill(email);
            await this.sendButton.click();
          }
        
          async assertErrorDisplayed() {
            await expect(this.errorMessage).toBeVisible();
          }

        
        }
