attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVPMatrix;
uniform mat4 uNormalMatrix;
uniform mat4 uMVMatrix;

varying vec3 normal;
varying vec3 viewDir;

void main(void) {
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);

    normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));

    vec4 vertexEyePosition = uMVMatrix * vec4(aVertexPosition, 1.0);

    viewDir = normalize(-vec3(vertexEyePosition));
}