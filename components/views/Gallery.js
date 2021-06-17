import html from "html-literal";

export default (st) => html`
  <div style="padding-top 300px;">
  <section id="gallery" style="
    min-height: 100vh;
    height: max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    ">
    ${st.pictures.reduce(
      (html, card) => html + `${card}`,
      ``
    )}
  </section>
  </div>
`;
