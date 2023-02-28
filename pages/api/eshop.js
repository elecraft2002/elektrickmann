// let chrome = {};
// let puppeteer;

// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   // running on the Vercel platform.
//   chrome = require("chrome-aws-lambda");
//   puppeteer = require("puppeteer-core");
// } else {
//   // running locally.
//   puppeteer = require("puppeteer");
// }
// export default async function handler(req, res) {
//   res.status(200).json({ text: "Api is working somehow..." });
//   try {
//     const browser = await puppeteer.launch({
//       args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
//       defaultViewport: chrome.defaultViewport,
//       executablePath: await chrome.executablePath,
//       headless: true,
//       ignoreHTTPSErrors: true,
//     });

//     const page = await browser.newPage();
//     page.on("request", (req) => {
//       if (
//         req.resourceType() == "stylesheet" ||
//         req.resourceType() == "font" ||
//         req.resourceType() == "image"
//       ) {
//         req.abort();
//       } else {
//         req.continue();
//       }
//     });
//     await page.goto("https://developer.chrome.com/");

//     // Set screen size
//     await page.type(".search-box__input", "automate beyond recorder");

//     // Wait and click on first result
//     const searchResultSelector = ".search-box__link";
//     await page.waitForSelector(searchResultSelector);
//     await page.click(searchResultSelector);

//     // Locate the full title with a unique string
//     const textSelector = await page.waitForSelector(
//       "text/Customize and automate"
//     );
//     const fullTitle = await textSelector.evaluate((el) => el.textContent);

//     // Print the full title
//     

//     await browser.close();
//     res
//       .status(200)
//       .json({ text: "The title of this blog post is " + fullTitle });
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }
