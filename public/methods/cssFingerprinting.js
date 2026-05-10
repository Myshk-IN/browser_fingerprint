export function detectEngineByProperty() {
    const isWebkit = CSS.supports("-webkit-appearance", "none");
    const isMoz = CSS.supports("-moz-appearance", "none");

    return {
        webkit: isWebkit,
        moz: isMoz
    };
}

function isFontInstalledCss(font) {
    const ref = document.getElementById("ref");
    const test = document.getElementById("test");

    test.style.fontFamily = `"${font}", sans-serif`;

    const refWidth = ref.getBoundingClientRect().width;
    const testWidth = test.getBoundingClientRect().width;

    return refWidth !== testWidth;
}

export function collectFontFingerprintCss() {
    const fontsToCheck = ['Arial', 'Times New Roman', 'Algerian', 'Arial Baltic ',
        'Courier New', 'Comic Sans MS', 'Helvetica Neue', 'Lucida Grande', 'NonExistentFont'];
    return fontsToCheck.filter(font => isFontInstalledCss(font));
}