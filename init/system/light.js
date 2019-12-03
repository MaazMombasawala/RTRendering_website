import { lightProperties } from "../../system/light.js";

export function initLight() {
    lightProperties.lightPosition = [0.0, 1.0, 3.0];
    lightProperties.ambient = [1.0, 1.0, 1.0];
    lightProperties.diffuse = [1.0, 1.0, 1.0];
    lightProperties.specular = [1.0, 1.0, 1.0];
}