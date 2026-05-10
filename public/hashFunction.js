export async function hashFingerprint(data) {
    try {
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    } catch (error) {
        console.error("An error occurred while generating the hash:", error);
        return null;
    }
}