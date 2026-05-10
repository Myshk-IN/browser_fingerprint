// HTTP headers: User-Agent, Accept, Accept-Encoding, Accept-Language
export async function collectHttpHeaderFingerprint() {
    try {
        const response = await fetch("http://localhost:3000/headers");
        const data = await response.json();
        return data.headers;
    } catch (error) {
        console.error("Error fetching server headers:", error);
        return null;
    }
}