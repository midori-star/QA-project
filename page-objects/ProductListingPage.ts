import { expect } from "@playwright/test"
import { Locator, Page } from "playwright-core"
import { AbstractPage } from "./AbstractPage"

export class ProductListingPage extends AbstractPage{
    private list: string
    private items: string
    readonly itemsNum: Locator
    readonly noItems: Locator
    readonly checkSearch: Locator
    readonly itemList: Locator
    readonly category: Locator
    readonly category1: Locator
    readonly category2: Locator



    constructor (page: Page) {
        super(page)
        this.list = '//ol[contains(@class,"product-items")]'
        this.items = '//ol[contains(@class,"product-items")]/child::li/descendant::a[@class="product-item-link"]'
        this.itemsNum = page.frameLocator('iframe[name="framelive"]').locator('.col-lg-5.hidden-sm-down.total-products p')
        this.noItems = page.frameLocator('iframe[name="framelive"]').getByText('No matches were found for your search Please try other keywords to describe')
        this.checkSearch = page.frameLocator('iframe[name="framelive"]').locator('h2.product-title a');
        this.itemList = page.frameLocator('iframe[name="framelive"]').locator('.product-image-wrapper').first()
        this.category = page.frameLocator('iframe[name="framelive"]').locator('.page-header h1')
        this.category1 = page.frameLocator('iframe[name="framelive"]').getByRole('heading', { name: 'Store information' })
        this.category2 = page.frameLocator('iframe[name="framelive"]').getByRole('heading', { name: 'On sale' })
    }
    

     async checkNumberOfItems(itemsNum: string){
        await this.itemsNum.waitFor({ state: 'visible', timeout: 10000 });
     }

     async assertNoItems(){
        await expect(this.noItems).toContainText('No matches were found for your search Please try other keywords to describe')
     }

     async asserrtCheckSearch(check: string){
        await expect(this.checkSearch).toContainText(check)
     }

    async assertCheckCategory(category: string){
        await expect(this.category).toContainText(category)
    }

    async assertCheckCategory1(category: string){
        await expect(this.category1).toContainText(category)
    }

    async assertCheckCategory2(category: string){
        await expect(this.category2).toContainText(category)
    }



    public async selectMenuCategory(category: string) {
        const element = this.page.frameLocator('iframe[name="framelive"]')
        .getByRole('link', { name: category })
        await element.hover()
    }

    public async selectMenuSubCategory(category: string) {
        const element = this.page.frameLocator('iframe[name="framelive"]')
        .getByRole('link', { name: category })
        await element.click()
    }

     async asaertFilter(filter: string){
         const filterLoc = this.page.frameLocator('iframe[name="framelive"]')
         .locator('label')
         .filter({ hasText: filter })
         .locator('span')
         .first()
         await filterLoc.click()
     }

}