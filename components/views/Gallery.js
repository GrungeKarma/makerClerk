import html from "html-literal";

export default (st) => html`
  <div id="final" style="padding-top 300px;">
  <section id="gallery" style="
    min-height: 100vh;
    height: max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-width: 100vw;
    ">
    ${st.pictures.reduce(
      (html, card) => html + `${card}`,
      ``
    )}
  </section>
  </div>
  <div id="buttonContainer">
  <input type="button" id="printButton" value="print list"></div>
  </div>
`;
