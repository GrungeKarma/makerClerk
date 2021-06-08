require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");

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

app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(express.json());

app.route("/test").get((request, response) => {
  response.send("Server Healthy");
});

app.route("/**").get((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
