import { LitElement, html, css, property } from "lit-element";
import "../constants";

/**
 * CameraDebug
 * 
 * displays some cartesian coordinates to help us figure out what teh camer is doing
 * 
 */
class CameraDebug extends LitElement {
  @property({ type: Number }) x: Number = 0;
  @property({ type: Number }) y: Number = 0;
  @property({ type: Number }) z: Number = 0;
  @property({ type: Number }) rx: Number = 0;
  @property({ type: Number }) ry: Number = 0;
  @property({ type: Number }) rz: Number = 0;

  static get styles() {
    return css`
      #camera_debug {
        position: absolute;
        left: 35em;
        top: 1em;
        padding: 1em;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-family: monospace;
      }
    `;
  }

  render() {
    if (!CAMERA_DEBUG) return null;

    return html`
      <div id="camera_debug">
        <div>x:${this.x}</div>
        <div>y:${this.y}</div>
        <div>z:${this.z}</div>
        <div>rx:${this.rx}</div>
        <div>ry:${this.ry}</div>
        <div>rz:${this.rz}</div>
      </div>
    `;
  }
}

customElements.define("camera-debug", CameraDebug);
