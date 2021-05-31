import html from "html-literal";

export default () => html`
  <div class="grid-container">
    <div id="meat">
      <div class="grid-item body" id="body">
        <form>
          Link: <input type="text" />
          <div id="submitApp">
            <button id="submit" type="submit" form="form" value="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;
