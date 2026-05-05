import {hashFingerprint} from "../hashFunction.js";

export async function collectCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 250;
    canvas.height = 50;

    ctx.fillStyle = "#b57043";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#2a6b8d";
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("Cwm fjordbank glyphs vext quiz,", 10, 30);

    ctx.strokeStyle = "rgba(75,124,49,0.7)";
    ctx.arc(100, 25, 20, 0, Math.PI * 2);
    ctx.stroke();

    const dataURL = canvas.toDataURL();

    return await hashFingerprint(new TextEncoder().encode(dataURL));
}