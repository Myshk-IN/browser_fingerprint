import { collectHtmlHeaderFingerprint } from "/methods/httpHeaderFingerprint.js";
import { collectJsObjectFingerprint } from "/methods/jsObjectFingerprint.js";
import { collectFontFingerprint } from "/methods/fontFingerprint.js";
import { collectCanvasFingerprint } from "/methods/canvasFingerprint.js";
import { collectWebGLFingerprint } from "/methods/webglFingerprint.js";
import { collectAudioFingerprint } from "/methods/webAudioFingerprint.js";
import { hashFingerprint } from "/hashFunction.js";

document.getElementById("collectBtn").addEventListener("click", async () => {
    const htmlHeadersFingerprint = await collectHtmlHeaderFingerprint();

    const jsFingerprint = collectJsObjectFingerprint();

    const fontFingerprint = collectFontFingerprint();

    const canvasFingerprint = await collectCanvasFingerprint();

    const webGLFingerprint = await collectWebGLFingerprint();

    const audioFingerprint = await collectAudioFingerprint();

    const combinedFingerprint = {
        htmlHeadersFingerprint,
        jsFingerprint,
        fontFingerprint,
        webGLFingerprint,
        audioFingerprint,
    };

    const data = new TextEncoder().encode(JSON.stringify(combinedFingerprint, Object.keys(combinedFingerprint).sort()));
    const hash = await hashFingerprint(data);

    localStorage.setItem("fingerprint", JSON.stringify(combinedFingerprint));

    document.getElementById("hash").innerText = hash;
    document.getElementById("htmlHeaderFingerprint").innerText = JSON.stringify(htmlHeadersFingerprint, null, 2);
    document.getElementById("jsFingerprint").innerText = JSON.stringify(jsFingerprint, null, 2);
    document.getElementById('fontFingerprint').innerText = JSON.stringify(fontFingerprint, null, 2);
    document.getElementById('canvasFingerprint').innerText = canvasFingerprint;
    document.getElementById('webglFingerprint').innerText = JSON.stringify(webGLFingerprint, null, 2);
    document.getElementById('audioFingerprint').innerText = audioFingerprint;
});