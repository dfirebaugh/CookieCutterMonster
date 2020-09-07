import { CookieState_t, HTMLInputEvent } from "../types";
import { LitElement, html, css } from "lit-element";

enum ChangeType {
  THICKNESS,
  DEPTH,
  FILE_SIZE,
  IS_BEVELED,
  HAS_ROUND_EDGES
}

class CookieInputs extends LitElement {
  static styles = css`
    checkbox-container {
      display: grid;
      align-items: center;
      grid-template-columns: auto auto;
      justify-content: left;
      margin-bottom: 1vh;
    }

    container {
      display: grid;
    }

    select-container {
      margin-bottom: 1vh;
    }

    mwc-select {
      width: 100%;
    }
  `;
  eventToParent(eventDetail: CookieState_t) {
    const event = new CustomEvent("cookie-input-changed", {
      detail: eventDetail
    })

    this.dispatchEvent(event)
  }

  handleChange(e: HTMLInputEvent, changeType: ChangeType) {
    if (!e || !e.target) {
      throw Error("error with thickness input")
    }
    const stateUpdate: CookieState_t = <CookieState_t>{};

    switch (changeType) {
      case ChangeType.THICKNESS:
        stateUpdate.thickness = Number(e.target.value);
        break;
      case ChangeType.DEPTH:
        stateUpdate.depth = Number(e.target.value);
        break;
      case ChangeType.FILE_SIZE:
        stateUpdate.tolerance = Number(e.target.value);
        break;
      case ChangeType.IS_BEVELED:
        stateUpdate.cutterBevel = Boolean(e.target.checked);
        break;
      case ChangeType.HAS_ROUND_EDGES:
        stateUpdate.handleRound = Boolean(e.target.checked);
        break;
    }

    this.eventToParent(stateUpdate);
  }

  render() {
    return html`
    <container>
      <select-container>
        <mwc-select 
          outlined 
          id="dfsSelect" 
          label="Thickness"
          @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.THICKNESS)}">
            <mwc-list-item value=".7">Extra Thin (.7mm)</mwc-list-item>
            <mwc-list-item value="1" selected="selected">Thin (1mm)</mwc-list-item>
            <mwc-list-item value="1.3">Medium Thin (1.3mm)</mwc-list-item>
            <mwc-list-item value="1.6">Thick (1.6mm)</mwc-list-item>
            <mwc-list-item value="2">Very Thick (2mm) </mwc-list-item>
        </mwc-select>
      </select-container>

      <select-container>
        <mwc-select 
          outlined 
          id="dfsSelect" 
          label="Depth"
          @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.DEPTH)}">
            <mwc-list-item value="12">Shallow (12mm)</mwc-list-item>
            <mwc-list-item value="16" selected="selected">Standard (16mm)</mwc-list-item>
            <mwc-list-item value="20">Deep (20mm)</mwc-list-item>
        </mwc-select>
      </select-container>

      <select-container>
        <mwc-select 
          outlined 
          id="dfsSelect" 
          label="File Size"
          @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.FILE_SIZE)}">
            <mwc-list-item value=".01">Very High</mwc-list-item>
            <mwc-list-item value=".15" selected="selected">High</mwc-list-item>
            <mwc-list-item value=".3">Medium</mwc-list-item>
            <mwc-list-item value=".7">Low</mwc-list-item>
            <mwc-list-item value="2">Very Low</mwc-list-item>
        </mwc-select>
      </select-container>

      <checkbox-container>
        <mwc-checkbox id="cutterBevel" @change=${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.IS_BEVELED)}></mwc-checkbox>
        <label for="cutterBevel">
          Beveled Cutter
        </label>
      </checkbox-container>

      <checkbox-container>
        <mwc-checkbox @change="${(e: HTMLInputEvent) => this.handleChange(e, ChangeType.HAS_ROUND_EDGES)}" id="handleRound"></mwc-checkbox>
        <label for="handleRound">
          Round Handle Edges
        </label>
      </checkbox-container>
    </container>

    `;
  }
}

customElements.define("cookie-inputs", CookieInputs);
