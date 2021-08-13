import html from "html-literal";

export default (st) => html`
  <div id="final">
  <section id="gallery">
    ${st.pictures.reduce(
      (html, card) => html + `${card}`,
      ``
    )}
  </section>

  </div>
`;
