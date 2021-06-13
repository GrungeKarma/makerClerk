require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

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

//app.post("/gen_data", (request, response) => {
//  const newLink = new Link(request.body);
//
//  newLink.save((err, item) => {
//    return err ? response.sendStatus(500).json(err) : response.json(item);
//  });
//});

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
