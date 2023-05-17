const puppeteer = require('puppeteer');

test('should input a long URL and return a short URL', async() => {
  const browser = await puppeteer.launch({
    headless: false, 
    slowMo: 100, 
    devtools: true

  }); // launch the browser 
  const page = await browser.newPage(); // create a new page
  await page.goto("http://localhost:3000/");
  await page.click("input#fullUrl"); // selecting the input field and clicking on it. 
  await page.type('input#fullUrl', "https://github.com/AL-ASHMALI");
  await page.click('button');


// await browser.close(); 
})