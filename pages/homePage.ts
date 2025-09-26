import { expect, Locator, Page } from "@playwright/test";

export default class HomePage {
    page: Page;
    myAccount: Locator;
    loginMenu: Locator;
    Email: Locator;
    password: Locator;
    logInButton: Locator;
    loginValidator: Locator;
    editAccount: Locator;
    emailInEditAccount: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for different elements on the page
        this.myAccount = page.locator(''); // Placeholder locator for My Account
        this.loginMenu = page.locator('//a[text()=" Login"]'); // Login menu link
        this.Email = page.locator('#input-email'); // Email input field
        this.password = page.locator('#input-password'); // Password input field
        this.logInButton = page.locator("//input[@value='Login']"); // Login button
        this.loginValidator = page.locator('//a[text()=" My Account"]'); // Used to validate login success
        this.editAccount = page.locator('//a[text()=" Edit Account"]'); // Edit account link
        this.emailInEditAccount = page.locator('#input-email'); // Email field inside Edit Account page
    }

    /**
     * Navigate to the base URL.
     * @returns {Promise<void>}
     */
    async gotoHome(): Promise<void> {
        await this.page.goto(process.env.base_URL!);
    }

    /**
     * Perform user login.
     * @param {string} email - Email of the user to login.
     * @param {string} password - Password of the user.
     * @returns {Promise<void>}
     */
    async userLogin(email: string, password: string): Promise<void> {
        await this.Email.fill(email);
        await this.password.fill(password);
        await this.logInButton.click();
    }

    /**
     * Click on the "Edit Account" link.
     * @returns {Promise<void>}
     */
    async clickEditAccount(): Promise<void> {
        await this.editAccount.click();
    }

/**
 * Verifies that the current page is logged in correctly using storage state.
 * Checks that the email in Edit Account matches the expected email.
 * @param expectedEmail - The expected email for the logged-in user
 */
async verifyStorageStateEmail(expectedEmail: string): Promise<void> {
    // Navigate to the account page
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');

    // Click on Edit Account
    await this.clickEditAccount();

    // Assert that the email matches the expected value
    await expect(this.emailInEditAccount).toHaveValue(expectedEmail);
}

}
