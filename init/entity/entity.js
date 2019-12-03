import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";
import { Entity, entities } from "../../entity/entity.js";
import { primitives } from "../../component/primitive.js";
import { materials } from "../../component/material.js";
import { renderers } from "../../component/renderer.js";
import { textures } from "../../component/texture.js";
import { switchableEntities } from "../../system/controller.js";


export function initEntities() {
    var helicoidMatrix = mat4.create();
    mat4.translate(helicoidMatrix, helicoidMatrix, [2.0, 0.0, 0.0]);
    mat4.scale(helicoidMatrix, helicoidMatrix, [0.3, 0.3, 0.3]);
    createSwitchableParametricSurface("helicoid", helicoidMatrix, primitives.helicoid, renderers.textureLighting, textures.colors, materials.cyan);

    var sphereMatrix = mat4.create();
    mat4.translate(sphereMatrix, sphereMatrix, [0.0, 1.0, 3.0]);
    mat4.scale(sphereMatrix, sphereMatrix, [0.3, 0.3, 0.3]);
    createSwitchableParametricSurface("sphere", sphereMatrix, primitives.sphere, renderers.textureMap, textures.cubeMap, materials.yellow);

    var envCubeMatrix = mat4.create();
    mat4.translate(envCubeMatrix, envCubeMatrix, [2.0, 0.0, 0.0]);
    entities.envCube = new Entity(envCubeMatrix, primitives.cube, materials.light, renderers.textureMap, textures.cubeMap, [entities.helicoid]);

    var cubeMatrix = mat4.create();
    mat4.translate(cubeMatrix, cubeMatrix, [-1.0, 2.0, 0.0]);
    entities.cube = new Entity(cubeMatrix, primitives.cube, materials.pinkish, renderers.lighting, null, [entities.envCube]);

    var klienBottleMatrix = mat4.create();
    mat4.translate(klienBottleMatrix, klienBottleMatrix, [0.0, 1.0, 2.0]);
    mat4.scale(klienBottleMatrix, klienBottleMatrix, [0.1, 0.1, 0.1]);
    createSwitchableParametricSurface("klienBottle", klienBottleMatrix, primitives.klienBottle, renderers.textureMap, textures.cubeMap, materials.red);

    entities.walls = createWalls();

    var groundMatrix = mat4.create();
    mat4.scale(groundMatrix, groundMatrix, [3.0, 3.0, 3.0]);
    entities.ground = new Entity(groundMatrix, primitives.square, materials.light, renderers.texture, textures.abstractColors, []);

    entities.base = createHierarchicalModel();

    var bumpSurfaceMatrix = mat4.create();
    mat4.translate(bumpSurfaceMatrix, bumpSurfaceMatrix, [-2.0, 1.0, 3.0]);
    mat4.scale(bumpSurfaceMatrix, bumpSurfaceMatrix, [0.5, 0.5, 0.5]);
    entities.bumpSurface = new Entity(bumpSurfaceMatrix, primitives.sphere, materials.light, renderers.bump, textures.bricks, []);

    entities.activeObjects = new Entity(mat4.create(), primitives.empty, materials.empty, renderers.lighting, null, [entities.sphere, entities.klienBottle, entities.cube, entities.ground, entities.bumpSurface]);

    var lightbulbMatrix = mat4.create();
    mat4.translate(lightbulbMatrix, lightbulbMatrix, [0.0, 1.0, 3.0]);
    mat4.scale(lightbulbMatrix, lightbulbMatrix, [0.1, 0.1, 0.1]);
    entities.lightbulb = new Entity(lightbulbMatrix, primitives.sphere, materials.empty, renderers.lines, null, []);

    entities.root = new Entity(mat4.create(), primitives.empty, materials.empty, renderers.lighting, null, [entities.walls, entities.activeObjects, entities.lightbulb]);
}

function createSwitchableParametricSurface(name, matrix, primitive, renderer, texture, material) {
    entities[name] = new Entity(matrix, primitives.empty, materials.empty, renderers.lighting, null, []);
    entities[name].texture = new Entity(mat4.create(), primitive, materials.light, renderer, texture, []);
    entities[name].lighting = new Entity(mat4.create(), primitive, material, renderers.lighting, null, []);
    entities[name].lines = new Entity(mat4.create(), primitive, materials.light, renderers.lines, null, []);
    entities[name].children = [entities[name].texture];
    switchableEntities.push(name);
}

function createWalls() {
    var frontMatrix = mat4.create();
    mat4.translate(frontMatrix, frontMatrix, [1.0, 0.0, 0.0]);
    mat4.rotate(frontMatrix, frontMatrix, Math.PI / 2, [0, 0, -1]);
    mat4.rotate(frontMatrix, frontMatrix, Math.PI / 2, [0, 1, 0]);
    entities.front = new Entity(frontMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.front, []);

    var backMatrix = mat4.create();
    mat4.translate(backMatrix, backMatrix, [-1.0, 0.0, 0.0]);
    mat4.rotate(backMatrix, backMatrix, Math.PI / 2, [1, 0, 0]);
    mat4.rotate(backMatrix, backMatrix, Math.PI / 2, [0, 0, 1]);
    entities.back = new Entity(backMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.back, []);
    
    var upMatrix = mat4.create();
    mat4.translate(upMatrix, upMatrix, [0.0, 1.0, 0.0]);
    entities.up = new Entity(upMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.up, []);
    
    var downMatrix = mat4.create();
    mat4.translate(downMatrix, downMatrix, [0.0, -1.0, 0.0]);
    mat4.rotate(downMatrix, downMatrix, Math.PI, [1, 0, 0]);
    entities.down = new Entity(downMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.down, []);
    
    var leftMatrix = mat4.create();
    mat4.translate(leftMatrix, leftMatrix, [0.0, 0.0, -1.0]);
    mat4.rotate(leftMatrix, leftMatrix, Math.PI, [0, 0, 1]);
    mat4.rotate(leftMatrix, leftMatrix, Math.PI / 2, [-1, 0, 0]);
    entities.left = new Entity(leftMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.left, []);
    
    var rightMatrix = mat4.create();
    mat4.translate(rightMatrix, rightMatrix, [0.0, 0.0, 1.0]);
    mat4.rotate(rightMatrix, rightMatrix, Math.PI / 2, [1, 0, 0]);
    entities.right = new Entity(rightMatrix, primitives.square, materials.light, renderers.texture, textures.faceTextures.right, []);
    
    var wallMatrix = mat4.create();
    mat4.scale(wallMatrix, wallMatrix, [50, 50, 50]);
    return new Entity(wallMatrix, primitives.empty, materials.empty, renderers.lighting, null, [entities.front, entities.back, entities.up, entities.down, entities.right, entities.left]);
}

function createHierarchicalModel() {

}