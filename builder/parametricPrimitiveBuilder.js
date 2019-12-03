import { buildParametricPrimitive } from "../common/parametric.js";

export function buildHelicoid() {
    return buildParametricPrimitive(-1.0, 1.0, 40.0, -1.0, 1.0, 40.0,
        function(u, v) {
            return [v * Math.cos(Math.PI * u), v * Math.sin(Math.PI * u), Math.PI * u];
        },
        function (u, v) {
            return [-1 * v * Math.PI * Math.sin(Math.PI * u), v * Math.PI * Math.cos(Math.PI * u), Math.PI];
        },
        function (u, v) {
            return [Math.cos(Math.PI * u), Math.sin(Math.PI * u), 0];
        }
    );
}

export function buildSphere() {
    return buildParametricPrimitive(-1.0, 1.2, 40.0, -0.5, 0.525, 40.0,
        function(u, v) {
            return [Math.cos(Math.PI * v) * Math.cos(Math.PI * u), Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.sin(Math.PI * v)];
        },
        function(u, v) {
            return [-1 * Math.PI * Math.cos(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v) * Math.cos(Math.PI * u), 0];
        },
        function(u , v) {
            return [-1 * Math.PI * Math.sin(Math.PI * v) * Math.cos(Math.PI * u), -1 * Math.PI * Math.sin(Math.PI * v) * Math.sin(Math.PI * u), Math.PI * Math.cos(Math.PI * v)];
        }
    );
}

export function buildKlienBottle() {
    return buildParametricPrimitive(-1.0, 1.0, 40.0, 0.0, 1.025, 40.0,
        function(u, v) {
            return [
                (4 + Math.sin(Math.PI * u) * Math.cos(Math.PI * v) - Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v)) * Math.cos(2 * Math.PI * v),
                (4 + Math.sin(Math.PI * u) * Math.cos(Math.PI * v) - Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v)) * Math.sin(2 * Math.PI * v),
                Math.sin(Math.PI * u) * Math.sin(Math.PI * v) + Math.sin(2 * Math.PI * u) * Math.cos(Math.PI * v)
            ]
        },
        function(u, v) {
            return [
                (Math.PI * Math.cos(Math.PI * u) * Math.cos(Math.PI * v) - 2 * Math.PI * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v)) * Math.cos(2 * Math.PI * v),
                (Math.PI * Math.cos(Math.PI * u) * Math.cos(Math.PI * v) - 2 * Math.PI * Math.cos(2 * Math.PI * u) * Math.sin(Math.PI * v)) * Math.sin(2 * Math.PI * v),
                Math.PI * Math.cos(Math.PI * u) * Math.sin(Math.PI * v) + 2 * Math.PI * Math.sin(2 * Math.PI * u) * Math.cos(Math.PI * v)
            ]
        },
        function(u, v) {
            return [
                (-1 * Math.PI * Math.sin(Math.PI * u) * Math.sin(Math.PI * u) - Math.PI * Math.sin(2 * Math.PI * u) * Math.cos(Math.PI * u)) * Math.cos(2 * Math.PI * v) - 2 * Math.PI * Math.sin(2 * Math.PI * v) * (4 + Math.sin(Math.PI * u) * Math.cos(Math.PI * v) - Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v)),
                (-1 * Math.PI * Math.sin(Math.PI * u) * Math.sin(Math.PI * u) - Math.PI * Math.sin(2 * Math.PI * u) * Math.cos(Math.PI * u)) * Math.sin(2 * Math.PI * v) + 2 * Math.PI * Math.cos(2 * Math.PI * v) * (4 + Math.sin(Math.PI * u) * Math.cos(Math.PI * v) - Math.sin(2 * Math.PI * u) * Math.sin(Math.PI * v)),
                Math.PI * Math.sin(Math.PI * u) * Math.cos(Math.PI * v) - Math.PI * Math.sin(2 * Math.PI * u) * Math.sin(2 * Math.PI * v)
            ]
        }
    );
}