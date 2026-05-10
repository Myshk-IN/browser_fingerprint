import {hashFingerprint} from "../hashFunction.js";

export async function collectAudioFingerprint() {
    const AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const context = new AudioContext(1, 44100, 44100);

    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = 1000;

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    oscillator.connect(compressor);
    compressor.connect(context.destination);
    oscillator.start(0);

    const buffer = await context.startRendering();

    const data = buffer.getChannelData(0);

    let sum = 0;
    for (let i = 0; i < data.length; ++i) {
        sum += Math.abs(data[i]);
    }

    const fingerprint = sum.toString();

    try {
        return await hashFingerprint(new TextEncoder().encode(fingerprint));
    } catch (error) {
        console.error("Failed to calculate hash:", error.message);
        return null;
    }
}