const puppeteer = require("puppeteer");
const fs = require("fs");

const rand1 = Math.random()
  .toString(16)
  .substr(2, 8);

async function amazonItemScraper(url) {
  const act = (async () => {
    fs.mkdir("./image", err => {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    });

    let imageUrl = url;
    let imagePath = `./image`;
    //assign a name to url and the path for saving images

    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    //launch puppeteer

    await page.goto(imageUrl), { waitUntil: "networkidle2" };

    //sends puppeteer to the url and waits until everything is rendered

    await page.waitForSelector("#landingImage");
    let element1 = await page.$("#landingImage");
    let save = `${imagePath}/${rand1}.png`;
    await element1.screenshot({ path: save });
    //screenshot the image

    await page.waitForSelector("#productTitle");
    //send browser to url and waits for rendering and the selector

    let nameGen = await page.evaluate(() => {
      const nameRegex = /[^\s*].*[^\s*]/;
      //regex to remove the spaces in the html content

      let name = document.getElementById("productTitle").textContent;
      let cleanName = name.match(nameRegex);
      return cleanName;
      // grabs name of the item
    });

    const priceSelectors = [
      "#priceblock_ourprice",
      "#priceblock_dealprice" /* more here if you find more selectors */
    ];
    //define price selectors

    await page.waitForFunction(
      priceSelectors => document.querySelectorAll(priceSelectors).length,
      {},
      priceSelectors // pass priceSelectors to wairForFunction
    );

    const pricer = await page.evaluate(priceSelectors => {
      const priceRegex = /^\D\d+(\.\d+)?$/;
      //define regex for testing

      const asSingleSelector = priceSelectors.join(",");
      const priceElements = document.querySelectorAll(asSingleSelector);
      let price;
      // combines the price selectors and selects them

      priceElements.forEach(item => {
        if (
          item && // item is not null
          item.innerHTML && // innerHTML exists
          priceRegex.test(item.innerHTML)
        ) {
          // make sure string is a price
          price = item.innerHTML;
        }
      });
      return price;
    }, priceSelectors);
    // pass priceSelectors to evaluate

    await browser.close();
    //closes puppeteer

    //let imageGen = imageToBase64(save) // Path to the image
    //  .then(response => {
    //    let base64 = response;
    //    return base64;
    //    // "cGF0aC90by9maWxlLmpwZw=="
    //  })
    //  .catch(error => {
    //    console.log(error); // Logs an error if there was one
    //  });

    const convertImageBase64 = image => {
      let bitmap = fs.readFileSync(image);
      let base64 = new Buffer.from(bitmap).toString("base64");
      return base64;
    };
    ////convert image to base64 for database storage
    let encodedPng = base64encode(save);
    let scraperPayload = {
      image: encodedPng,
      name: nameGen,
      price: pricer
    };

    //console.log(JSON.stringify(scraperPayload, null, 4));

    fs.rmdir("./image", { recursive: true, force: true }, err => {
      if (err) {
        return console.log("error occurred in deleting directory", err);
      }
      console.log("Directory deleted successfully");
    });
    await scraperPayload;
    return scraperPayload;
  })();

  await act;
  console.log(act);
  return act;
}
