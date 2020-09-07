//@ts-nocheck

function loadOpenCV(cb) {
    const scriptElement = document.createElement('script');
    scriptElement.src = "lib/opencv.js";
    scriptElement.defer = true;
    scriptElement.onload = function () {
        cb(cv)
    }
    const firstScriptTag = document.getElementsByTagName('script')[0];


    if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(scriptElement, firstScriptTag);
    }
};

export default loadOpenCV;
