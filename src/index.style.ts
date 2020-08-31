import { css } from 'lit-element';

export const commonStyles = css`
:root {
    --border-size: 0.125rem;
    --duration: 250ms;
    --ease: cubic-bezier(0.215, 0.61, 0.355, 1);
    --font-family: monospace;
    --color-primary: white;
    --color-secondary: black;
    --shadow: rgba(0, 0, 0, 0.1);
    --space: 1rem;
  }

  body {
    background-color: aliceblue;
    margin: 0;
}

grid-container {
    margin-left: 15vw;
    margin-right: 15vw;
    display: grid;
    grid-template-columns: .5fr auto .5fr;
    text-align: center;
    align-content: center;
    justify-items: center;
    height: 65vh;
    grid-gap: 6rem;
}

title-card {
    display:grid;
    align-content: center;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 4;
    width: 100vw;
    background-color: lightslategray;
}

user-tip {
    grid-column-start: 1;
    grid-column-end: 4;
}

input-container {
    grid-column-start: 1;
    display: grid;
    align-content: center;
}

clipart-selector {
    display: grid;
    grid-column-start: 1;
}
.canvasContainer {
    align-items: center;
}

download-btn-container {
    display: grid;
    align-content: center;
}

canvas {
    box-shadow: 2px 2px 39px -14px;
}

#threeoutput {
    min-width: 400px;
}`;
