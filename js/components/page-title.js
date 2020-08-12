
import {LitElement, html, css} from 'lit-element';

class PageTitle extends LitElement {

  static get styles() {
    return css``;
  }

  render() {
    return html`
        <h3> Cookie Cutter Monster </h3>
        <p> Generate cookie cutters from images to 3d print! </p>
    `;
  }
}

customElements.define('page-title', PageTitle);
