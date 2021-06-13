import html from "html-literal";

export default () => html`
  <div class="grid-container">
    <div id="meat">
      <div class="grid-item body" id="body">
        <form>
          <input id="userInput" type="text" id="formValueId" name="valueId" />
          <button id="inputButton" type="button">
            submit
          </button>
        </form>
      </div>
    </div>
  </div>
`;
