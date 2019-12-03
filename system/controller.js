import { entities } from "../entity/entity.js";
import { cameraProperties } from "./camera.js";
import * as vec3 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/vec3.js";
import * as mat4 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export var switchableEntities = [];
const cameraSpeed = 0.1;
const slowSpeed = 0.05;

var pos, center, uDir, vDir, nDir;

export function textureSwitch() {
    for(var name of switchableEntities) {
        entities[name].children = [entities[name].texture];
    }
}

export function lightingSwitch() {
    for(var name of switchableEntities) {
        entities[name].children = [entities[name].lighting];
    }
}

export function lineSwitch() {
    for(var name of switchableEntities) {
        entities[name].children = [entities[name].lines];
    }
}

export function rotateEntityFunction(entityName) {
    return function() {
        var matrix = entities[entityName].nodeMMatrix;
        mat4.rotate(matrix, matrix, slowSpeed, [0, 1, 0]);
        entities[entityName].nodeMMatrix = matrix;    
    }
}

export const keyHandlerFunctions = {
    w : function() {
        initializeCameraProperties();
        cameraProperties.cameraPosition = translateAlongAxis(pos, uDir, cameraSpeed);
        cameraProperties.center = translateAlongAxis(center, uDir, cameraSpeed);
    },
    s : function() {
        initializeCameraProperties();
        cameraProperties.cameraPosition = translateAlongAxis(pos, uDir, -cameraSpeed);
        cameraProperties.center = translateAlongAxis(center, uDir, -cameraSpeed);
    },
    a : function() {
        initializeCameraProperties();
        cameraProperties.cameraPosition = translateAlongAxis(pos, vDir, -cameraSpeed);
        cameraProperties.center = translateAlongAxis(center, vDir, -cameraSpeed);
    },
    d : function() {
        initializeCameraProperties();
        cameraProperties.cameraPosition = translateAlongAxis(pos, vDir, cameraSpeed);
        cameraProperties.center = translateAlongAxis(center, vDir, cameraSpeed);
    },
    ArrowUp : function() {
        initializeCameraProperties();
        var transformedPoint = rotatePointAboutAxis(center, pos, vDir, cameraSpeed);

        cameraProperties.center = transformedPoint;
        cameraProperties.upVector = [nDir[0], nDir[1], nDir[2]];
    },
    ArrowDown : function() {
        initializeCameraProperties();
        var transformedPoint = rotatePointAboutAxis(center, pos, vDir, -cameraSpeed);

        cameraProperties.center = transformedPoint;
        cameraProperties.upVector = [nDir[0], nDir[1], nDir[2]];
    },
    ArrowRight : function() {
        initializeCameraProperties();
        var transformedPoint = rotatePointAboutAxis(center, pos, nDir, -cameraSpeed);

        cameraProperties.center = transformedPoint;
        cameraProperties.upVector = [nDir[0], nDir[1], nDir[2]];
    },
    ArrowLeft : function() {
        initializeCameraProperties();
        var transformedPoint = rotatePointAboutAxis(center, pos, nDir, cameraSpeed);

        cameraProperties.center = transformedPoint;
        cameraProperties.upVector = [nDir[0], nDir[1], nDir[2]];
    }
}

function initializeCameraProperties() {
    pos = vec3.clone(cameraProperties.cameraPosition);
    center = vec3.clone(cameraProperties.center);
    uDir = vec3.create();
    vec3.normalize(uDir, uDir);
    vec3.subtract(uDir, center, pos);
    nDir = vec3.clone(cameraProperties.upVector);
    vec3.normalize(nDir, nDir);
    vDir = vec3.create();
    vec3.cross(vDir, uDir, nDir);
    vec3.cross(nDir, vDir, uDir);
    vec3.normalize(nDir, nDir);
}

function translateAlongAxis(point, dir, speed) {
    vec3.normalize(dir, dir);
    vec3.scaleAndAdd(point, point, dir, speed);
    return [point[0], point[1], point[2]];
}

function rotatePointAboutAxis(point, rotCenter, axis, speed) {
    var transformedPoint = vec3.create();
    var nCenter = vec3.create();
    vec3.scale(nCenter, rotCenter, -1);

    var transMatrix = mat4.create();
    mat4.translate(transMatrix, transMatrix, rotCenter);
    mat4.rotate(transMatrix, transMatrix, speed, axis);
    mat4.translate(transMatrix, transMatrix, nCenter);
    vec3.transformMat4(transformedPoint, point, transMatrix);

    return [transformedPoint[0], transformedPoint[1], transformedPoint[2]];
}