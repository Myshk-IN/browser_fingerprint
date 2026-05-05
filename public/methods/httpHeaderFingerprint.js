// HTML headers: User-Agent, Accept, Content-Encoding, Content-Language
export async function collectHtmlHeaderFingerprint() {
    try {
        const response = await fetch("http://localhost:3000/headers");
        const data = await response.json();
        return data.headers;
    } catch (error) {
        console.error("Error fetching server headers:", error);
    }
}