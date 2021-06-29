import html from "html-literal";

export default () => html`
  <div class="grid-container" style="min-height: 100vh">
    <div id="meat">
      <div class="grid-item body" id="body">
        <textarea id="userInput" required placeholder="https://www.amazon.com/..." ></textarea>
        <button id="inputButton" type="button">
          submit
        </button>
        <div id="load"></div>
        <button id="printButton" type="button">
          Print List
        </button>
        <div id="bigBangPayload"></div>
      </div>
    </div>
  </div>
`;
