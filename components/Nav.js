import html from "html-literal";

export default () => html`
  <div class="nav-container">
    <nav>
      <ul class="hidden--mobile">
        <li class="nav" id="home">
          <a href="index.html" class="button">Home</a>
        </li>
        <li class="nav" id="aboutUs">
          <a href="aboutUs.html" class="button">About Us</a>
        </li>
        <i class="fas fa-bars" id="bars"></i>
      </ul>
    </nav>
  </div>
`;
