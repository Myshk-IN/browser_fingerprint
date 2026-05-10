function isFontInstalled(fontName) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const baselineFont = 'sans-serif';
    const testFont = `"${fontName}", ${baselineFont}`;

    context.font = `20px ${baselineFont}`;
    const baselineWidth = context.measureText(testString).width;

    context.font = `20px ${testFont}`;
    const testWidth = context.measureText(testString).width;

    return testWidth !== baselineWidth;
}

export function collectFontFingerprint() {
    const fontsToCheck = ['Arial', 'Times New Roman', 'Algerian', 'Arial Baltic ',
        'Courier New', 'Comic Sans MS', 'Helvetica Neue', 'Lucida Grande', 'NonExistentFont'];
    return fontsToCheck.filter(font => isFontInstalled(font));
}