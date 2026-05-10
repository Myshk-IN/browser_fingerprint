// JavaScript objects: navigator, screen, window, Intl
export function collectJsObjectFingerprint() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        hardwareConcurrency: navigator.hardwareConcurrency,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack, // deprecated but does not show
        platform: navigator.platform, // deprecated but shows

        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio
        },

        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
}