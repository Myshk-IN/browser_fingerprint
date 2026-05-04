function collectFingerprint() {
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
    const fp = collectFingerprint();

    const hash = await hashFingerprint(fp);

    localStorage.setItem("fingerprint", JSON.stringify(fp));

    document.getElementById("hash").innerText = hash;
    document.getElementById("fingerprint").innerText = JSON.stringify(fp, null, 2);
});