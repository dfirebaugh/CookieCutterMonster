import { LitElement, html, css } from "lit-element";

/**
 * TitleCard
 * simply displays the page title and a helpful message
 * 
 * TODO: add some styling
 */
class TitleCard extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`
      <h2>
        Easy Cookie Cutters
      </h2>
			<p> Try uploading a cartoon or clipart with a uniform background to easy create your own 3d modeled cookie cutter </p>
    `;
  }
}

customElements.define("title-card", TitleCard);
