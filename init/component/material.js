import { Material, materials } from "../../component/material.js";

export function initMaterials() {
    materials.cyan = new Material([0.05, 0.05, 0.05], [0.0, 1.0, 1.0], [0.9, 0.9, 0.9], 20.0);
    materials.gray = new Material([0.05, 0.05, 0.05], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], 20.0);
    materials.light = new Material([0.05, 0.05, 0.05], [1.0, 1.0, 1.0], [1.0, 1.0, 1.0], 20.0);
    materials.almostBlack = new Material([0.05, 0.05, 0.05], [0.1, 0.1, 0.1], [1.0, 1.0, 1.0], 20.0);
    materials.pinkish = new Material([0.05, 0.05, 0.05], [1.0, 0.0, 0.5], [1.0, 1.0, 1.0], 20.0);
    materials.red = new Material([0.05, 0.05, 0.05], [1.0, 0.0, 0.0], [1.0, 1.0, 1.0], 20.0);
    materials.yellow = new Material([0.05, 0.05, 0.05], [1.0, 1.0, 0.0], [1.0, 1.0, 1.0], 20.0);
    materials.empty = new Material([0, 0, 0], [0, 0, 0], [0, 0, 0], 0);
}