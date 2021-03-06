import {LitElement, html, css} from 'lit-element';

class ClipartSelector extends LitElement {

  constructor() {
    super();
    this.addEventListener('change', this.handleImageChange);
  }

  static get styles() {
    return css``;
  }

  handleImageChange(e) {
    this.imageSrc = URL.createObjectURL(e.target.files[0]);

    const withExt = e.target.files[0].name
    this.saveFilename = withExt.replace(/\.[^/.]+$/, "");

    this.requestUpdate();

    // TODO: clean this up so we don't have to call a function that's just hanging around
    updateImg(); // callback to update some variables in the cookie js scope
  }

  render() {
    return html`
    <input @change="${this.handleImageChange}" type="file" id="fileInput" name="file" />

    <img slot="image" id="imageSrc" src="${this.imageSrc}" crossOrigin="" alt="No Image" hidden=true></img>
    `;
  }
}

customElements.define('clipart-selector', ClipartSelector);

