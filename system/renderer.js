import { entities } from "../entity/entity.js";
import * as mat4 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export function drawScene(gl) {
    gl.clearColor(1.0, 0.9, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    entities.root.draw(gl, mat4.create());
}