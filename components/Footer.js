import html from "html-literal";

export default () => html`
  <footer id="contact">
    <p id="email">contact me: grungekarma@gmail.com</p>
    <div id="payPal">
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="8C8WL8QJ7LW4N" />
        <input
          type="image"
          src="./lib/payPalButton.png"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  </footer>
`;
