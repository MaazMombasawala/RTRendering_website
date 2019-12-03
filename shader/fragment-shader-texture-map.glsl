precision mediump float;
uniform mat4 uE2WMatrix;
uniform samplerCube cubeMap;

varying vec3 normal;
varying vec3 viewDir;

void main(void) {
    vec3 rfEye = normalize(reflect(-viewDir, normal));
    vec3 rfWorld = vec3(uE2WMatrix * vec4(rfEye, 0.0));
    vec4 color = textureCube(cubeMap, rfWorld);

    gl_FragColor = color;
}