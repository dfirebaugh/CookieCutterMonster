import { LitElement, html, css } from "lit-element";
import { HTMLInputEvent, CookieState_t } from "../types"


class CookieSize extends LitElement {
  static styles = css`
    container {
      display: grid;
      grid-template-columns: auto auto auto;
      margin-bottom: 1vh;
    }

    container label {
      display: flex;
      align-items: center;
    }

    container output {
      display: flex;
      align-items: center;
    }
  `;

  values = [51, 64, 76, 89, 101];
  labels = [2, 2.5, 3, 3.5, 4];

  currentIndex: number = 2;
  currentValue = this.values[this.currentIndex];

  handleSliderChange(e: HTMLInputEvent) {

    if (!e || !e.target) {
      throw Error("error with size input")
    }

    this.currentIndex = Number(e.target.value);
    this.currentValue = this.values[Number(e.target.value)];

    const event = new CustomEvent("cookie-input-changed", {
      detail: <CookieState_t>{
        size: Number(this.currentValue)
      }
    })

    this.requestUpdate();
    this.dispatchEvent(event);
  }

  render() {
    return html`
    <container>
      <label for="cookieCutterSize">
        Size
      </label>
      <mwc-slider
        @change=${this.handleSliderChange}
        class="range blue" 
        type="range" 
        min="${0}" 
        value="${this.currentIndex}" 
        max="${this.values.length - 1}" 
        step="1" 
        list="ticks">
      </mwc-slider>

      <datalist id="ticks">
          <option>2</option>
          <option>2.5</option>
          <option>3</option>
          <option>3.5</option>
          <option>4</option>
      </datalist>

      <output id="rangevalue">${this.currentValue}in</output>
    </container>
    `;
  }
}

customElements.define("cookie-size", CookieSize);
