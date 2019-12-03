import { Primitive } from "../component/primitive.js";
import * as vec3 from "../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/vec3.js";

export function createEmpty() {
    return new Primitive([], [], [], [], []);
}

export function createSquare() {
    return new Primitive(
        [
            1.0, 0.0, 1.0,
            -1.0, 0.0, 1.0,
            -1.0, 0.0, -1.0,
            1.0, 0.0, -1.0
        ],
        [0, 2, 1, 0, 2, 3],
        [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ],
        [
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
        ],
        [
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
        ]
    );
}


export function createCube(size) {
    const cubeVertices = [
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
    ];
    
    const cubeIndices = [
        3, 2, 1, 3, 1, 0,
        5, 0, 1, 5, 1, 6,
        7, 4, 5, 7, 5, 6,
        7, 2, 3, 7, 3, 4,
        4, 3, 0, 4, 0, 5,
        2, 7, 6, 2, 6, 1
    ];

    const cubeTexels = [
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 1.0
    ];

    const cubeNormals = calculateCubeNormals(cubeVertices);

    const cubeTangents = [
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
    ];

    return new Primitive(cubeVertices.map(x => x * size), cubeIndices, cubeNormals, cubeTangents, cubeTexels);
}

function calculateCubeNormals(vertices) {
    var normals = [];
    for(var v = 0; v < vertices.length; v += 3) {
        var normal = vec3.create();
        vec3.normalize(normal, vertices.slice(v, v + 3));
        const unTypedNormal = [normal[0], normal[1], normal[2]];
        normals = normals.concat(unTypedNormal);
    }
    return normals;
}