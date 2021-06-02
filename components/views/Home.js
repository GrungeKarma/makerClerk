import html from "html-literal";

export default () => html`
  <div class="grid-container">
    <div id="meat">
      <p id="main">
        Here at makerClerk,<br />
        we make parts lists from Amazon links
      </p>
      <div id="quote">
        <p class="quote" id="quoteText"></p>
        <div id="author">
          <p class="quote" id="quoteAuthor"></p>
        </div>
      </div>
    </div>
  </div>
`;
