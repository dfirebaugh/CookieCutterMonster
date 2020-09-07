import "./registerComponents";
import loadCV from "./scriptLoader";

import { LitElement, html } from "lit-element";

import CookieState from "./services/cookieState";
import { CookieState_t } from "./types";
import processImage from "./services/imageProcessing";

interface InputChangedEvent extends Event {
    detail: CookieState_t
}

class CookieCutterApp extends LitElement {
    /**
     * createRenderRoot removes the shadow dom for this 
     * element.  Which allows you to querySelect by 
     * using `document.querySelctor(<someQuery>)`
     * 
     * We are doing this because the opencv lib is using 
     * document query selectors
     */
    createRenderRoot() {
        return this;
    }

    /* let's load in opencv so we can access it in this module */
    cv = null;
    getCV(cv: any) {
        if (!cv) {
            throw Error("couldn't load the opencv library")
        }

        this.cv = cv;
        this.requestUpdate();
    }

    firstUpdated() {
        loadCV(this.getCV.bind(this))
    }

    handleInputChange(event: InputChangedEvent) {
        CookieState.update(event.detail);

        const canvasElement = document.getElementById('canvasOutput');
        const imageSrcElement = document.querySelector("#imageSrc");
        if (!event.detail.imageSrc || !canvasElement || !imageSrcElement) return;

        processImage(
            this.cv,
            imageSrcElement,
            canvasElement);
    }

    render() {
        /* don't load unless we pulled opencv in */
        if (!this.cv) return null;

        return html`
        <camera-debug id="cameraDebug"></camera-debug>
        <mwc-top-app-bar>
            <h2 slot="title">Easy Cookie Cutters</h2>
            </mwc-top-app-bar>
            
        <grid-container>
            <input-container>				
                <p> Try uploading a cartoon or clipart with a uniform background to easy create your own 3d modeled cookie cutter </p>
                <clipart-selector @image-changed="${this.handleInputChange}">
                    <img name="image" id="imageSrc" />
                </clipart-selector>
                <cookie-size @cookie-input-changed=${this.handleInputChange}></cookie-size>
                <cookie-inputs @cookie-input-changed=${this.handleInputChange} id="cookie-inputs"></cookie-inputs>
                <download-btn-container>
                    <mwc-button outlined type="submit" id="exportASCII" class="btn btn-primary">
                        Download STL
                    </mwc-button>
                </download-btn-container>
            </input-container>

            <canvas-container>
                <canvas id="canvasOutput"></canvas>

                <div id="threeoutput" border-width="thick" border-color="coral">
                    <!-- placeholder for threejs output -->
                </div>
            </canvas-container>

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