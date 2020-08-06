import { LitElement, html, css } from "lit-element";

class CookieSize extends LitElement {
  constructor(){
    super();
    this.addEventListener('change', this.handleSliderChange);
  }

  static get styles() {
    return css`
    `;
  }
  
  values = [51, 64, 76, 89, 101];
  labels = [2, 2.5, 3, 3.5, 4];

  currentIndex = 2;
  currentValue = this.values[this.currentIndex];

  handleSliderChange(e) {
    this.currentIndex = e.target.value;
    this.currentValue = this.values[e.target.value];

    console.log(this.currentIndex, this.currentValue);
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

    <output id="rangevalue">${this.labels[this.currentIndex]}in</output>
    `;
  }
}

customElements.define("cookie-size", CookieSize);
