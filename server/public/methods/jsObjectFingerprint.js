// JavaScript objects: navigator, screen, window, Intl
export function collectJsObjectFingerprint() {
    return {
        userAgent: navigator.userAgent,

        language: navigator.language,
        languages: navigator.languages,
        platform: navigator.platform, // deprecated but shows
        hardwareConcurrency: navigator.hardwareConcurrency,

        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio
        },

        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack, // deprecated but does not show
    };
}