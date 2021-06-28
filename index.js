import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo(window.location.origin);

axios.get("https://api.quotable.io/random?tags=technology||famous-quotes").then(response => {
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
  saveListEventListener();
}

function addEventListeners() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

function saveListEventListener() {
  document
  .getElementById('printButton')
  .addEventListener("click", () => exportList());
}

function exportList (){
  let target = document.getElementById('final').innerHTML;
  console.log(target);
  fetch(`${process.env.MAKER_API_URL}/complete_list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ list: target }, null, 1)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
}





function urlAddEventListeners() {
  document
    .getElementById("inputButton")
    .addEventListener("click", () => getURL());
}

function getURL() {
  const loading = `<div class="loader">Loading...</div>`;
  let target = document.getElementById("userInput").value;

  document.querySelector("#load").innerHTML = loading;

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
          background-color: #f5f5f5;
          color: black;
          border-radius: 10px;
          padding: 10px;
          min-height: 300px;
          max-width: 50vw;
          margin: 10px;
          display: flex;
          flex-direction: column;
          border: solid 5px #21B6A8;
          min-width: 300px;
          justify-content: center;
          align-items: center;
        ">
        <div>
          <a id="nameLink" target="_blank" href="${link}" style="
            padding: 10px;
            text-align: center;
            display: flex;
            font-size: 25px;
            text-decoration: none;
            color: black;
          ">
            ${name}
          </a>
        </div>
          <div class="itemImage" style="
            padding: 10px;
            display: inline-flex;
            justify-content: center;
          ">
            <img src="data:image/png;base64,${image}"id="bigBangImage"/>
          </div>
          <div id="namePrice" style="
            padding: 5px;
            display: flex;
            flex-direction: column;">

          <div>
            <p id="price" style="
              margin: 10px;
              width: min-content;
              height: 65px;
              border: solid 5px #0b3d1d;
              background-color: #116530;
              border-radius: 10px;
              color:#f5f5f5;
              font-size: 45px;
              display: inline-block;

              ">
                ${price}
            </p>
          </div>
        </div>
      </div>
      `;

      console.log(listHtml);
      document.querySelector("#userInput").value = null;



      document.querySelector("#load").innerHTML = null;
      document.querySelector("#bigBangPayload").innerHTML = listHtml;
      state.Gallery.pictures.push(listHtml);



    });
}
