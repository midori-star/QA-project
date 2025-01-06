import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{
    readonly menu: Locator
    readonly url: string
    readonly searchInput: Locator
    readonly panelHeader: Locator
    readonly carouselitem: Locator
    readonly navBar: Locator
    readonly promo: Locator
    readonly mainContent: Locator
    readonly product: Locator
    readonly footer: Locator
    readonly footerDelivery: Locator
    readonly footerLegalNotice: Locator
    readonly footerTerms: Locator
    readonly footerAboutUs: Locator
    readonly footerSecurePayment: Locator
    readonly footerSitemap: Locator
    readonly footerStores: Locator
    readonly costumBox: Locator
    readonly percentOffBanner: Locator
    readonly popularProducts: Locator
    readonly newsSubscription: Locator
    readonly navBarContactUs: Locator
    readonly navLang: Locator


    constructor(page: Page) {
        super(page)
        this.menu = page.frameLocator('iframe[name="framelive"]').locator('div').filter({ hasText: '  Clothes Men Women  ' }).first()
        this.url = 'https://demo.prestashop.com/#/en/front'
        this.searchInput = page.frameLocator('iframe[name="framelive"]').getByPlaceholder('Search our catalog')
        this.panelHeader = page.frameLocator('iframe[name="framelive"]').getByText('computertabletsmartphonephone_iphone Start now arrow_rightExplore back')
        this.navBar = page.frameLocator('iframe[name="framelive"]').getByRole('navigation')
        this.carouselitem = page.frameLocator('iframe[name="framelive"]').getByRole("option")
        this.mainContent = page.frameLocator('iframe[name="framelive"]').locator('#content')
        this.product = page.frameLocator('iframe[name="framelive"]').locator('.js-product').first()
        this.footer = page.frameLocator('iframe[name="framelive"]').locator('#footer')
        this.promo = page.frameLocator('iframe[name="framelive"]').getByText('On sale  Quick view')
        this.footerDelivery = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Delivery' })
        this.footerLegalNotice = page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Legal Notice' })
        this.footerTerms=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Terms and conditions of use' })
        this.footerAboutUs=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'About us' })
        this.footerSecurePayment=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Secure payment' })
        this.footerSitemap=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Sitemap' })
        this.footerStores=page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: 'Stores' })
        this.costumBox = page.frameLocator('iframe[name="framelive"]').getByText('Custom Text Block Lorem ipsum')
        this.percentOffBanner = page.frameLocator('iframe[name="framelive"]').locator('.banner')
        this.popularProducts = page.frameLocator('iframe[name="framelive"]').getByText('Popular Products  Quick view')
        this.newsSubscription = page.frameLocator('iframe[name="framelive"]').getByText('Get our latest news and special sales Subscribe OK You may unsubscribe at any')
        this.navBarContactUs = page.frameLocator('iframe[name="framelive"]').locator('#contact-link').getByRole('link', { name: 'Contact us' })
        this.navLang = page.frameLocator('iframe[name="framelive"]').getByLabel('Language dropdown')


    }

    public async selectCategory (item: string) {
        const element = `a.dropdown-item[href*="${item}"]`;
            await this.page.locator (element).click ()
            console.log (`Clicked ${element}`)
    }




    public async navigateToHomePage() {
        await this.page.goto(this.url)
    }

    async searchItem(search: string){
        await this.searchInput.type(search)
        await this.page.keyboard.press('Enter')
    }

    async checkHomePage(){
        await this.navBar.waitFor({ state: 'visible' });
        await expect(this.navBar).toBeVisible()
        await expect(this.mainContent).toBeVisible()
        await expect(this.promo).toBeVisible()
        await expect(this.product).toBeVisible()
        await expect(this.footer).toBeVisible()
    }


    public async selectMenuCategory(category: string) {
        const element = this.page.frameLocator('iframe[name="framelive"]').getByRole('link', { name: category })
        await element.click();
    }


}