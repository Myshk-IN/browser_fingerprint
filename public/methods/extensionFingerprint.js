// Search for an extension by inspecting extension://<extensionID>/<pathToFile>
export function detectExtension(extensionId, pathToFile = "icon.png") {
    return new Promise(resolve => {
        const img = new Image();
        img.src = `extension://${extensionId}/${pathToFile}`;

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

// Search for an extension (AdBlocker) by CSS modifications
export function detectAdblockerByCSS() {
    const el = document.createElement("div");
    el.className = "adsbox ad-banner ad-container";
    document.body.appendChild(el);

    const isBlocked = window.getComputedStyle(el).display === "none";
    el.remove();

    return isBlocked;
}

// Search for an extension by loading time
export async function detectByDuration(link) {
    const start = performance.now();
    let duration;
    try {
        await fetch(link, { mode: "no-cors" });
    } catch (error) {
        console.log("Request blocked or failed:", error.message);
    }
    finally {
        duration = performance.now() - start;
    }
    return duration
}