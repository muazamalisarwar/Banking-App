const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Starting React development server...');
  const reactServer = spawn('"C:\\Program Files\\nodejs\\npm.cmd"', ['start'], {
    env: { ...process.env, BROWSER: 'none' },
    detached: true,
    shell: true
  });

  reactServer.stdout.on('data', (data) => {
    console.log(`[React]: ${data}`);
  });
  reactServer.stderr.on('data', (data) => {
    console.error(`[React Error]: ${data}`);
  });

  console.log('Waiting 30 seconds for React server to compile and boot...');
  await new Promise(r => setTimeout(r, 30000));

  try {
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      defaultViewport: { width: 1280, height: 800 } 
    });
    const page = await browser.newPage();

    console.log('Taking login page screenshot...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: '../loginPage.png' });

    console.log('Taking register page screenshot...');
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: '../ProjectPage5.png' });

    console.log('Taking dashboard page screenshot...');
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: '../ProjecPage1.png' });

    // Click Transact button to go to transact page
    console.log('Navigating to Transact page...');
    await page.evaluate(() => {
       const buttons = Array.from(document.querySelectorAll('div'));
       const transactBtn = buttons.find(b => b.textContent && b.textContent.includes('Transact'));
       if(transactBtn) transactBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: '../ProjectPage3.png' });

    // Click Transaction History to go to history page
    console.log('Navigating to Transaction History page...');
    await page.evaluate(() => {
       const buttons = Array.from(document.querySelectorAll('div'));
       const historyBtn = buttons.find(b => b.textContent && b.textContent.includes('Transaction History'));
       if(historyBtn) historyBtn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: '../ProjectPage2.png' });

    await browser.close();
    console.log('Screenshots taken successfully!');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  }

  console.log('Killing React server...');
  process.kill(-reactServer.pid);
  process.exit(0);
})();
