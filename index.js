import { Header, Nav, Main, Footer } from "./components";

function render() {
  document.querySelector("#root").innerHTML = `
  ${Header()}
  ${Nav()}
  ${Main()}
  ${Footer()}
`;
  //addEventListeners();
}
render();

//function addEventListeners() {
//  document.querySelector(".fa-bars").addEventListener("click", () => {
//    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
//  });
