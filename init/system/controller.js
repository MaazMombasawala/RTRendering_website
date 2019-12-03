import * as controller from "../../system/controller.js";

export function bindControllers() {

    document.getElementById("geometry-texture").onclick = controller.textureSwitch;
    document.getElementById("geometry-lighting").onclick = controller.lightingSwitch;
    document.getElementById("geometry-lines").onclick = controller.lineSwitch;

    document.getElementById("global-rotate").onclick = controller.rotateEntityFunction("activeObjects");
    document.getElementById("local-rotate-l1").onclick = controller.rotateEntityFunction("cube");
    document.getElementById("local-rotate-l2").onclick = controller.rotateEntityFunction("envCube");
    document.getElementById("local-rotate-l3").onclick = controller.rotateEntityFunction("helicoid");

    document.addEventListener("keydown", onKeyDown)
}

function onKeyDown(event) {
    const keyHandlerFunction = controller.keyHandlerFunctions[event.key];
    if(keyHandlerFunction) {
        keyHandlerFunction();
    }
}