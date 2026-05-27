import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

// Step 1: Load dashboard
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/dash_01_main.png', fullPage: false });

const title = await page.title();
const headerText = await page.locator('header').innerText().catch(() => 'N/A');
console.log('TITLE:', title);
console.log('HEADER:', headerText.replace(/\n/g, ' | '));

// Step 2: Check sidebar nav items
const navLabels = await page.locator('aside button').allInnerTexts();
console.log('NAV ITEMS:', navLabels.join(', '));

// Step 3: Check stat cards
const statCards = await page.locator('.bg-white.rounded-xl').count();
console.log('WHITE CARDS COUNT:', statCards);

// Step 4: Check critical alert banner
const criticalBanner = await page.locator('.bg-red-50').first().isVisible().catch(() => false);
console.log('CRITICAL BANNER VISIBLE:', criticalBanner);
if (criticalBanner) {
  const bannerText = await page.locator('.bg-red-50').first().innerText();
  console.log('BANNER TEXT:', bannerText.replace(/\n/g, ' | '));
}

// Step 5: Click "알림/고장 현황"
await page.getByRole('button', { name: '알림/고장 현황' }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/dash_02_alerts.png', fullPage: false });
const alertsTable = await page.locator('table').isVisible().catch(() => false);
console.log('ALERTS TABLE VISIBLE:', alertsTable);
const alertRows = await page.locator('tbody tr').count();
console.log('ALERT ROWS:', alertRows);

// Step 6: Click "설비 목록"
await page.getByRole('button', { name: '설비 목록' }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/dash_03_equipment.png', fullPage: false });
const eqRows = await page.locator('tbody tr').count();
console.log('EQUIPMENT ROWS:', eqRows);

// Step 7: Click "통계 분석"
await page.getByRole('button', { name: '통계 분석' }).click();
await page.waitForTimeout(1000);
await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/dash_04_analytics.png', fullPage: false });
const chartContainer = await page.locator('.recharts-wrapper').count();
console.log('RECHARTS CHARTS:', chartContainer);

// Step 8: Back to dashboard
await page.getByRole('button', { name: '대시보드' }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/dash_05_dashboard_final.png', fullPage: false });

await browser.close();
console.log('DONE');
