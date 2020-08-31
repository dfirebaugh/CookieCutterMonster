/**
 * Load our lit elements and other ESmodules
 * 
 */

import './components/camera-debug';
import './components/clipart-selector';
import './components/cookie-size';
import './components/title-card';
import './components/cookie-inputs';

import { LitElement, html, css } from "lit-element";
import { commonStyles } from "./index.style";

import CookieState from "./services/cookieState";
import { CookieState_t } from "./types";

interface ImageChangedEvent extends Event {
    detail: CookieState_t
}

class CookieCutterApp extends LitElement {
    static get styles() {
        return [
            commonStyles,
            css``
        ];
    }

    imageChanged(e: ImageChangedEvent) {
        CookieState.update(e.detail)
    }

    render() {
        return html`
    <camera-debug id="cameraDebug"></camera-debug>

    <title-card></title-card>

    <grid-container>
        <!--  <user-tip>
            <h5> Select an image to get started! </h5>
            <p> Try using a cartoon or clipart with a uniform background </p>
        </user-tip> -->

        <clipart-selector @image-changed="${this.imageChanged}">
            <img name="image" id="imageSrc" />
        </clipart-selector>
        <canvas id="canvasOutput"></canvas>
        <input-container>				
            <cookie-size></cookie-size>
            <cookie-inputs id="cookie-inputs"></cookie-inputs>
        </input-container>

        <div id="threeoutput" border-width="thick" border-color="coral">
            <!-- placeholder for threejs output -->
        </div>

        <download-btn-container>
            <button type="submit" id="exportASCII" class="btn btn-primary">
                Download STL
            </button>
        </download-btn-container>
    </grid-container>
    `;
    }
}

customElements.define("cookie-cutter-app", CookieCutterApp);

/**
 * Mount the app into the DOM
 */
const mountPoint = document.getElementById("cookie-cutter-app")

if (!mountPoint) {
    throw Error("whoa, there's no html element with the cookie-cutter-app id. App not able to mount")
} else {
    mountPoint.appendChild(document.createElement("cookie-cutter-app"));
}