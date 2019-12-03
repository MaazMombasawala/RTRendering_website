attribute vec3 aVertexPosition;
attribute vec2 aVertexTexel;

uniform mat4 uMVPMatrix;

varying highp vec2 texCoord;

void main(void) {
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);

    texCoord = aVertexTexel;
}