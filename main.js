import { initializeScene } from "./init/init.js";
import { drawScene } from "./system/renderer.js";
import { doAnimation } from "./system/animator.js";

document.getElementById("canvasBody").onload = () => {webGLStart()};

var gl, viewportContext = {};

function webGLStart() {
    const canvas = document.getElementById("lab5-canvas");
    initGL(canvas);

    gl.enable(gl.DEPTH_TEST);

    initializeScene(gl);

    initViewPort(canvas);

    beginAnimationLoop();
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl2");
        gl.canvasWidth = canvas.width;
        gl.canvasHeight = canvas.height;
    } catch (e) {
        alert("Exception initializing gl");
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function initViewPort(canvas) {
    const rect = canvas.getBoundingClientRect();
    viewportContext.minX = rect.left;
    viewportContext.minY = rect.top;
    viewportContext.maxX = rect.right;
    viewportContext.maxY = rect.bottom;
    viewportContext.xWindowRatio = (viewportContext.maxX - viewportContext.minX) / window.innerWidth;
    viewportContext.yWindowRatio = (viewportContext.maxY - viewportContext.minY) / window.innerHeight;
    const size = canvas.width < canvas.height ? canvas.height : canvas.width;
    gl.viewport(0, 0, size, size); 
}

function beginAnimationLoop(gl) {
    requestAnimationFrame(timeStep);
}

function timeStep(timestamp) {
    doAnimation();
    drawScene(gl);
    
    requestAnimationFrame(timeStep);
}