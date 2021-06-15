import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo(window.location.origin);

axios.get("https://api.quotable.io/random").then(response => {
  let quote = response.data.content;
  let author = response.data.author;
  console.log(quote, author);
  document.querySelector("#quoteText").innerHTML = quote;
  document.querySelector("#quoteAuthor").innerHTML = `- ${author}`;
});

router
  .on({
    ":page": params => render(state[capitalize(params.page)]),
    "/": () => render(state.Home)
  })
  .resolve();

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
  router.updatePageLinks();
  addEventListeners(st);
  urlAddEventListeners();
}

function addEventListeners() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

function urlAddEventListeners() {
  document
    .getElementById("inputButton")
    .addEventListener("click", () => getURL());
}

function getURL() {
  let target = document.getElementById("userInput").value;
  let superTarget = JSON.stringify({ link: target }, null);
  console.log(superTarget);

  fetch(`${process.env.MAKER_API_URL}/gen_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ link: target }, null, 1)
  })
    .then(res => res.json())
    .then(res => {
      let image = res.image;
      let name = res.name[0];
      let price = res.price;
      let link = res.link;
      console.log(name, price, link);
      let listHtml = `
      <div class="bigBang">
        <div class="cardContainer" style="  grid-area: body5;
        background-color: whitesmoke;
        color: black;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        display: flex;
        flex-direction: row;
        ">
          <div class="itemImage" style="
          padding 10px;
          ">
            <img src="data:image/png;base64,${image}"id="bigBangImage"/>
          </div>
          <div id="namePrice style="
          padding: 10px;
          display: flex;
          flex-direction: column;">
            <a id="nameLink" target="_blank" href="${link}" style="
            font-size: 1em;
            margin: 10px;
            ">
              ${name}
            </a>
            <p style="
            font-size: 2em;
            margin-top: 30px;
            ">
            ${price}</p>
          </div>
        </div>
      </div>
      `;
      document.querySelector("#bigBangPayload").innerHTML = listHtml;
    });
}
