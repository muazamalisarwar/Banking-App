const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'], defaultViewport: { width: 1280, height: 800 } });
    const page = await browser.newPage();

    console.log('Taking login page screenshot...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e));
    await page.screenshot({ path: '../loginPage.png' });

    console.log('Taking register page screenshot...');
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e));
    // Reusing names from README
    await page.screenshot({ path: '../ProjectPage5.png' });

    console.log('Taking dashboard page screenshot...');
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log(e));
    await page.screenshot({ path: '../ProjecPage1.png' });
    await page.screenshot({ path: '../ProjectPage2.png' });
    await page.screenshot({ path: '../ProjectPage3.png' });

    await browser.close();
    console.log('All screenshots taken!');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  }
})();
