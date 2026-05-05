import { hashFingerprint } from "../hashFunction.js";

export async function collectWebGLFingerprint() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
        console.log('WebGL is not available.');
        return null;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : gl.getParameter(gl.VENDOR);
    const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER);

    gl.clearColor(0.2, 0.8, 0.1, 0.8);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertices = new Float32Array([
        0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
        1.0, -1.0,  0.0
    ])

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const vertexShaderCode = `
        attribute vec3 coordinates;
        void main(void) {
            gl_Position = vec4(coordinates, 1.0);
        }
    `;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    const fragmentShaderCode = `
        void main(void) {
            gl_FragColor = vec4(0.2, 0.6, 1.0, 0.6); 
        }
    `;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const dataURL = canvas.toDataURL();

    return  {
        vendor,
        renderer,
        imageHash: await hashFingerprint(new TextEncoder().encode(dataURL))
    };
}