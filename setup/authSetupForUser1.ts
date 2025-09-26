import { expect, test as setup } from '@playwright/test';
import HomePage from '../pages/homePage';

const storageStatePath = 'storageState/user1.json';
setup('Authenticate user1', async ({ page })=>{
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.openLoginPage();
    await homePage.userLogin(`${process.env.email1}`, `${process.env.password1}`);
    await expect(homePage.loginValidator).toBeVisible();
    await page.context().storageState({ path: storageStatePath });
});