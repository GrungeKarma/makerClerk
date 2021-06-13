require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const puppeteer = require("puppeteer");

mongoose.connect(process.env.DB_CONNECT);
const app = express();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(express.json({ limit: "5MB" }));
app.use(cors);

const listSchema = new mongoose.Schema({
  image: String,
  name: [String],
  price: String
});
//contract of the data

const linkSchema = new mongoose.Schema({
  link: String
});

//convert schema a Model with CRUD operators
const List = mongoose.model("List", listSchema);
const Link = mongoose.model("Link", linkSchema);

app.post("/gen_data", (request, response) => {
  //const newLink = new Link(request.body);

  //newLink.save((err, item) => {
  //return err ? response.sendStatus(500).json(err) : response.json(item);
  //});
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
      //let encodedPng = base64encode(save);
      let scraperPayload = {
        image: convertImageBase64(save),
        name: nameGen,
        price: pricer
      };
      let finalPayload = JSON.stringify(scraperPayload, null, 4);



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
  amazonItemScraper(request.body.link);
});

app.post("/item", (request, response) => {
  const newItem = new List(request.body);
  newItem.save((err, item) => {
    return err ? response.sendStatus(500).json(err) : response.json(item);
  });
});

app.route("/test").post((request, response) => {
  response.send(`${request.id} ${request.body}`);
});

app.route("/**").get((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
