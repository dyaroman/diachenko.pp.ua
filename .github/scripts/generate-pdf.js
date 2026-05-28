const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve("index.html")}`);
  await page.pdf({
    path: "CV_Roman_Diachenko.pdf",
    format: "A4",
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await browser.close();
})();
