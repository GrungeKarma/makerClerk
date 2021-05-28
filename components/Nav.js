import html from "html-literal";

export default (links) => html`
  <div class="nav-container">
    <nav>
      <ul class="hidden--mobile">
      ${links.map(
        (el) =>
          `<li><a href="/${el.title}" title="${el.title}" data-navigo>${el.text}</a></li>`
      )}
      </ul>
    </nav>
  </div>
`;
