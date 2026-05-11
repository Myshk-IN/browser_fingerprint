import { collectHttpHeaderFingerprint } from "/methods/httpHeaderFingerprint.js";
import { collectJsObjectFingerprint } from "/methods/jsObjectFingerprint.js";
import { collectFontFingerprint } from "/methods/fontFingerprint.js";
import { collectCanvasFingerprint } from "/methods/canvasFingerprint.js";
import { collectWebGLFingerprint } from "/methods/webglFingerprint.js";
import { collectAudioFingerprint } from "/methods/webAudioFingerprint.js";
import { detectAdblockerByCSS, detectByDuration, detectExtension } from "/methods/extensionFingerprint.js";
import { detectEngineByProperty, collectFontFingerprintCss } from "/methods/cssFingerprinting.js";
import { hashFingerprint } from "/hashFunction.js";

document.getElementById("collectBtn").addEventListener("click", async () => {
    const startTime = performance.now();

    // HTTP header fingerprint
    const httpHeaderStart = performance.now();
    const httpHeadersFingerprint = await collectHttpHeaderFingerprint();
    const httpHeaderEnd = performance.now();

    // JavaScript object fingerprint
    const jsStart = performance.now();
    const jsFingerprint = collectJsObjectFingerprint();
    const jsEnd = performance.now();

    // Font fingerprint
    const fontStart = performance.now();
    const fontFingerprint = collectFontFingerprint();
    const fontEnd = performance.now();

    // Canvas API fingerprint
    const canvasStart = performance.now();
    const canvasFingerprint = await collectCanvasFingerprint();
    const canvasEnd = performance.now();

    // WebGL API fingerprint
    const webGLStart = performance.now();
    const webGLFingerprint = await collectWebGLFingerprint();
    const webGLEnd = performance.now();

    // Web Audio API fingerprint
    const audioStart = performance.now();
    const audioFingerprint = await collectAudioFingerprint();
    const audioEnd = performance.now();

    // Extension fingerprint
    const extensionStart = performance.now();
    const isAdBlockDetectedByUrl = await detectExtension('ohahllgiabjaoigichmmfljhkcfikeof'); // Chrome AdBlock extension
    const isAdBlockDetectedByCss = detectAdblockerByCSS();
    const adUrlDuration = await detectByDuration("https://addstracking.com/ads/banner.png"); // ad-like url
    const normalUrlDuration = await detectByDuration("https://some-example-website.com/image.png"); // "normal" url
    const extensionFingerprintEnd = performance.now();

    // CSS fingerprint
    const cssStart = performance.now();
    const cssProperty = detectEngineByProperty();
    const cssFontFingerprint = collectFontFingerprintCss();
    const cssEnd = performance.now();

    const combinedFingerprint = {
        httpHeadersFingerprint,
        jsFingerprint,
        fontFingerprint,
        canvasFingerprint,
        webGLFingerprint,
        audioFingerprint,
        cssProperty,
        cssFontFingerprint,
    };

    const data = new TextEncoder().encode(JSON.stringify(combinedFingerprint, Object.keys(combinedFingerprint).sort()));
    const hash = await hashFingerprint(data);

    const endTime = performance.now();
    // Duration of collecting a fingerprint and its attributes
    const duration = endTime - startTime;
    const httpHeaderDuration = httpHeaderEnd - httpHeaderStart;
    const jsDuration = jsEnd - jsStart;
    const fontDuration = fontEnd - fontStart;
    const canvasDuration = canvasEnd - canvasStart;
    const webGLDuration = webGLEnd - webGLStart;
    const audioDuration = audioEnd - audioStart;
    const extensionDuration = extensionFingerprintEnd - extensionStart;
    const cssDuration = cssEnd - cssStart;

    const combinedDuration = {
        duration,
        httpHeaderDuration,
        jsDuration,
        fontDuration,
        canvasDuration,
        webGLDuration,
        audioDuration,
        extensionDuration,
        cssDuration,
    }

    // save data to local storage
    localStorage.setItem("hash", hash);
    localStorage.setItem("fingerprint", JSON.stringify(combinedFingerprint));
    localStorage.setItem("duration", JSON.stringify(combinedDuration));

    document.getElementById("duration").innerText = duration.toString();
    document.getElementById("httpHeaderDuration").innerText = httpHeaderDuration.toString();
    document.getElementById("jsDuration").innerText = jsDuration.toString();
    document.getElementById("fontDuration").innerText = fontDuration.toString();
    document.getElementById("canvasDuration").innerText = canvasDuration.toString();
    document.getElementById("webGLDuration").innerText = webGLDuration.toString();
    document.getElementById("audioDuration").innerText = audioDuration.toString();
    document.getElementById("extensionDuration").innerText = extensionDuration.toString();
    document.getElementById("cssDuration").innerText = cssDuration.toString();

    document.getElementById("hash").innerText = hash;

    document.getElementById("httpHeaderFingerprint").innerText = JSON.stringify(httpHeadersFingerprint, null, 2);

    document.getElementById("jsFingerprint").innerText = JSON.stringify(jsFingerprint, null, 2);
    document.getElementById('fontFingerprint').innerText = fontFingerprint;
    document.getElementById('canvasFingerprint').innerText = canvasFingerprint;
    document.getElementById('webglFingerprint').innerText = JSON.stringify(webGLFingerprint, null, 2);
    document.getElementById('audioFingerprint').innerText = audioFingerprint;

    document.getElementById('isAdBlockDetectedByUrl').innerText = isAdBlockDetectedByUrl.toString();
    document.getElementById('isAdBlockDetectedByCss').innerText = isAdBlockDetectedByCss.toString();
    document.getElementById('adUrlDuration').innerText = adUrlDuration.toString();
    document.getElementById('normalUrlDuration').innerText = normalUrlDuration.toString();

    document.getElementById("cssProperty").innerText = JSON.stringify(cssProperty, null, 2);
    document.getElementById('cssFontFingerprint').innerText = cssFontFingerprint;
});