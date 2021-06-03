require("dotenv").config();
const express = require("express");

const app = express();

const myMiddleware = (request, response, next) => {
  // do something with request and/or response
  console.log(request.method, request.path);
  next(); // tell express to move to the next middleware function
};

app.use(myMiddleware); // use the myMiddleware for every request to the app
app.use(express.json());

app.route("/**").get((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

app
  .route("/test")
  .get((request, response) => {
    response.send("HELLO WORLD");
  })
  .post((request, response) => {
    response.json(request.body);
  });

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
