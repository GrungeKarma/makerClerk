import html from "html-literal";

export default () => html`
  <div class="grid-container" style="min-height: 100vh">
    <div id="meat">
      <div class="grid-item body" id="body">
        <form>
          <input
            id="userInput"
            type="text"
            id="formValueId"
            autocomplete="off"
            name="valueId"
          />
          <button id="inputButton" type="button">
            submit
          </button>
        </form>
        <div id="bigBangPayload"></div>
      </div>
    </div>
  </div>
`;
