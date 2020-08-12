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
      <h3>
        Cookie Cutter Monster
      </h3>
      <p>Generate cookie cutters from images to 3d print!</p>
    `;
  }
}

customElements.define("title-card", TitleCard);
