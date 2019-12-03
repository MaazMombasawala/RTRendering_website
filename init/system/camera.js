import { cameraProperties } from "../../system/camera.js";
import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export function initCamera() {
    cameraProperties.cameraPosition = [7, 2, 7];
    cameraProperties.center = [0, 4, 0];
    cameraProperties.upVector = [0, 1, 0];
    cameraProperties.fovy = 60;
    cameraProperties.aspect = 1.0;
    cameraProperties.near = 0.1;
    cameraProperties.far = 100;
    cameraProperties.cameraRotationMatrix = mat4.create();
}