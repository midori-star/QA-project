import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CartPage extends AbstractPage {
    readonly proceedToCheckOut : Locator
    readonly cartTotal: Locator
    readonly cart: Locator
    readonly addToCartButton: Locator
    readonly proceedToCheckout2: Locator
    readonly deleteButton: Locator
    readonly continue: Locator


    constructor (page:Page) {
        super(page)
        this.cartTotal = page.frameLocator('iframe[name="framelive"]').getByText('Total (tax incl.) €')
        this.proceedToCheckOut = page.frameLocator('iframe[name="framelive"]').getByLabel('Shopping cart link containing')
        this.cart = page.frameLocator('iframe[name="framelive"]').getByLabel('Shopping cart link containing')
        this.addToCartButton = page.frameLocator('iframe[name="framelive"]').getByRole('button', { name: ' Add to cart' })
        this.proceedToCheckout2 = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: ' Proceed to checkout' })
        this.deleteButton = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'delete' })
        this.continue = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'chevron_left Continue shopping' })
    }

    public async checkOutCart () {
        await this.addItemToCart()
        await this.cart.click()
        await expect (this.cartTotal).toBeVisible()
        await expect (this.proceedToCheckOut).toBeVisible()
        await this.proceedToCheckOut.click()
    }


    public async selectItem(product: string) {
        const element = this.page.frameLocator('iframe[name="framelive"]')
            .locator('article')
            .filter({ hasText: product })
            .first();
        await element.click();
    }

    
    public async addItemToCart() {
        await this.selectItem('Hummingbird printed t-shirt')
        await this.addToCartButton.click()
        await this.proceedToCheckout2.waitFor({ state: 'visible', timeout: 30000 });
        await this.proceedToCheckout2.click()  
    }

    public async deleteItem() {
        await this.checkOutCart()
        await this.deleteButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.deleteButton.click()


    }
    
    public async continueS() {
        await this.checkOutCart()
        await this.continue.waitFor({ state: 'visible', timeout: 30000 });
        await this.continue.click()

    }
}