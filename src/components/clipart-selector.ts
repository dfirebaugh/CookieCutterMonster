import { LitElement, html } from 'lit-element';
import { HTMLInputEvent } from "../types"

class ClipartSelector extends LitElement {
  handleImageChange(e?: HTMLInputEvent) {
    if (!e || !e.target || !e.target.files) {
      throw Error("image change target is null")
      return null;
    }

    const withExt = e.target.files[0].name
    const event = new CustomEvent("image-changed", {
      detail: {
        imageSrc: URL.createObjectURL(e.target.files[0]),
        saveFileName: withExt.replace(/\.[^/.]+$/, "")
      }
    })

    this.dispatchEvent(event);
  }

  render() {
    return html`
    <input @change="${this.handleImageChange}" type="file" id="fileInput" name="file" />

    <img slot="image" id="imageSrc" crossOrigin="" alt="No Image" hidden=true></img>
    `;
  }
}

customElements.define('clipart-selector', ClipartSelector);
