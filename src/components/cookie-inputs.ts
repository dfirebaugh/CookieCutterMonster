import { CookieState_t, HTMLInputEvent } from "../types";
import { LitElement, html } from "lit-element";
import CookieState from "../services/cookieState";

class CookieInputs extends LitElement {
  handleThicknessChange(e: HTMLInputEvent) {
    if (!e || !e.target) {
      throw Error("error with thickness input")
    }

    CookieState.update(<CookieState_t>{
      thickness: Number(e.target.value)
    })
  }

  handleDepthChange(e: HTMLInputEvent) {
    if (!e || !e.target) {
      throw Error("error with depth input")
    }

    CookieState.update(<CookieState_t>{
      depth: Number(e.target.value)
    })
  }

  handleToleranceChange(e: HTMLInputEvent) {
    if (!e || !e.target) {
      throw Error("error with tolerance input")
    }

    CookieState.update(<CookieState_t>{
      tolerance: Number(e.target.value)
    })
  }

  handleBevelChange(e: HTMLInputEvent) {
    if (!e || !e.target) {
      throw Error("error with cutterBevel input")
    }

    CookieState.update(<CookieState_t>{
      cutterBevel: Boolean(e.target.checked)
    })
  }

  handleRoundHandleChange(e: HTMLInputEvent) {
    if (!e || !e.target) {
      throw Error("error with handleRound input")
    }

    CookieState.update(<CookieState_t>{
      handleRound: Boolean(e.target.checked)
    })
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
