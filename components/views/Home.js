import html from "html-literal";

export default () => html`
  <div class="grid-container">
    <div id="meat">
      <div>
      <p id="main"></p>
        Here at makerClerk, we make parts lists from Amazon links
      </p>
      </div>
    </div>
    <div id="quote">
      <p class="quote" id="quoteText"></p>
      <div id="author">
        <p class="quote" id="quoteAuthor"></p>
      </div>
    </div>
  </div>
`;
