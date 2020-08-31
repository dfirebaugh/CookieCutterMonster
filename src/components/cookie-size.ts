import { LitElement, html } from "lit-element";
import { HTMLInputEvent, CookieState_t } from "../types"
import CookieState from "../services/cookieState";


class CookieSize extends LitElement {

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

    CookieState.update(<CookieState_t>{
      size: Number(this.currentValue)
    })

    this.requestUpdate();
  }

  render() {
    return html`
    <label for="cookieCutterSize">
      Size
    </label>

    <input @change="${this.handleSliderChange}" 
      id="yearslider" 
      class="range blue" 
      type="range" 
      min="${0}" 
      value="${this.currentIndex}" 
      max="${this.values.length - 1}" 
      step="1" 
      list="ticks">

    <datalist id="ticks">
        <option>2</option>
        <option>2.5</option>
        <option>3</option>
        <option>3.5</option>
        <option>4</option>
    </datalist>

    <output id="rangevalue">${this.currentValue}in</output>
    `;
  }
}

customElements.define("cookie-size", CookieSize);
