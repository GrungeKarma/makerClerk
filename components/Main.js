import * as views from "./views";

export default () => `
  ${views["Home"]()}
  ${views["Form"]()}
  ${views["AboutUs"]()}
  `;
