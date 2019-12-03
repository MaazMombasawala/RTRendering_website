import { initMaterials } from "./component/material.js";
import { initPrimitives } from "./component/primitive.js";
import { initRenderers } from "./component/renderer.js";
import { initCamera } from "./system/camera.js";
import { initLight } from "./system/light.js";
import { initEntities } from "./entity/entity.js";
import { initTextures } from "./component/texture.js";
import { bindControllers } from "./system/controller.js";

export function initializeScene(gl) {
    // init components
    initTextures(gl);
    initMaterials();
    initRenderers(gl);
    initPrimitives(gl);

    // init systems
    initCamera();
    initLight();

    // init entities
    initEntities();

    bindControllers(gl);
}