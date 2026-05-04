async function collectHtmlHeaderFingerprint() {
    try {
        const response = await fetch("http://localhost:3000/headers");
        const data = await response.json();
        return data.headers;
    } catch (error) {
        console.error("Error fetching server headers:", error);
        return undefined;
    }
}

function collectJsFingerprint() {
    return {
        userAgent: navigator.userAgent,

        language: navigator.language,
        languages: navigator.languages,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio
        },

        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
    };
}

async function hashFingerprint(fp) {
    const data = new TextEncoder().encode(JSON.stringify(fp, Object.keys(fp).sort()));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

document.getElementById("collectBtn").addEventListener("click", async () => {
    const htmlHeadersFingerprint = await collectHtmlHeaderFingerprint();
    const jsFingerprint = collectJsFingerprint();

    const combinedFingerprint = {
        htmlHeadersFingerprint,
        jsFingerprint,
    };

    const hash = await hashFingerprint(combinedFingerprint);

    localStorage.setItem("fingerprint", JSON.stringify(combinedFingerprint));

    document.getElementById("hash").innerText = hash;
    document.getElementById("htmlHeaderFingerprint").innerText = JSON.stringify(htmlHeadersFingerprint, null, 2);
    document.getElementById("jsFingerprint").innerText = JSON.stringify(jsFingerprint, null, 2);
});