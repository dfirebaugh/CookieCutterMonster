import { LitElement, html, css } from "lit-element";

class CookieInputs extends LitElement {
  constructor() {
    super();
    this.addEventListener("change", this.handleThicknessChange);
    this.addEventListener("change", this.handleDepthChange);
    this.addEventListener("change", this.handleToleranceChange);
    this.addEventListener("change", this.handleBevelChange);
    this.addEventListener("change", this.handleRoundHandleChange);
  }

  static get styles() {
    return css``;
  }

  thickness = DEFAULT_THICKNESS;
  depth = DEFAULT_DEPTH;
  tolerance = DEFAULT_TOLERANCE;
  cutterBevel = DEFAULT_BEVEL;
  handleRound = DEFAULT_ROUND_HANDLE;

  handleThicknessChange(e) {
    this.thickness = e.target.value;

    this.requestUpdate();
  }

  handleDepthChange(e) {
    this.depth = e.target.value;

    this.requestUpdate();
  }

  handleToleranceChange(e) {
    this.tolerance = e.target.value;

    this.requestUpdate();
  }

  handleBevelChange(e) {
    this.cutterBevel = e.target.value;

    this.requestUpdate();
  }

  handleRoundHandleChange(e) {
    this.handleRound = e.target.value;

    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        <label for="cookieCutterThickness">
          Thickness
        </label>
      </div>
      <select
        @change="${this.handleThicknessChange}"
        id="cookieCutterThickness"
      >
        <option value=".7">Extra Thin (.7mm)</option>
        <option value="1" selected="selected">Thin (1mm)</option>
        <option value="1.3">Medium Thin (1.3mm)</option>
        <option value="1.6">Thick (1.6mm)</option>
        <option value="2">Very Thick (2mm) </option>
      </select>

      <div>
        <label for="cookieCutterDepth">
          Depth
        </label>
      </div>
      <select @change="${this.handleDepthChange}" id="cookieCutterDepth">
        <option value="12">Shallow (12mm)</option>
        <option value="16" selected="selected">Standard (16mm)</option>
        <option value="20">Deep (20mm)</option>
      </select>

      <div>
        <label for="cookieTolerance">
          File Size
        </label>
      </div>
      <select @change="${this.handleToleranceChange}" id="cookieTolerance">
        <option value=".01">Very High</option>
        <option value=".15" selected="selected">High</option>
        <option value=".3">Medium</option>
        <option value=".7">Low</option>
        <option value="2">Very Low</option>
      </select>


      <div>
        <label for="cutterBevel">
          Beveled Cutter
        </label>
      </div>
      <input type="checkbox" @change="${this.handleBevelChange}" id="cutterBevel"></input>

      <div>
        <label for="handleRound">
          Round Handle Edges
        </label>
      </div>
      <input type="checkbox" @change="${this.handleRoundHandleChange}" id="handleRound"></input>
            
    `;
  }
}

customElements.define("cookie-inputs", CookieInputs);
