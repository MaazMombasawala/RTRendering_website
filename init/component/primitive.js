import { buffers, primitives } from "../../component/primitive.js";
import * as builder from "../../builder/primitiveBuilder.js";
import * as parametricBuilder from "../../builder/parametricPrimitiveBuilder.js";

export function initPrimitives(gl) {
    buffers.vertexPositionBuffer = gl.createBuffer();
    buffers.vertexNormalBuffer = gl.createBuffer();
    buffers.vertexTexelBuffer = gl.createBuffer();
    buffers.vertexIndexBuffer = gl.createBuffer();
    buffers.vertexTangentBuffer = gl.createBuffer();

    primitives.square = builder.createSquare();
    primitives.empty = builder.createEmpty();
    primitives.cube = builder.createCube(1);
    primitives.helicoid = parametricBuilder.buildHelicoid();
    primitives.sphere = parametricBuilder.buildSphere();
    primitives.klienBottle = parametricBuilder.buildKlienBottle();
}