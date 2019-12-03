attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexTangent;
attribute vec2 aVertexTexel;

uniform mat4 uMVPMatrix;
uniform mat4 uW2LMatrix;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;

varying vec3 normal;
varying vec3 lightDir;
varying vec3 viewDir;
varying vec3 tangent;
varying highp vec2 texCoord;

void main(void) {
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);

    normal = normalize(aVertexNormal);

    vec3 lightLocalPosition = vec3(uW2LMatrix * vec4(uLightPosition, 1.0));

    vec3 cameraLocalPosition = vec3(uW2LMatrix * vec4(uCameraPosition, 1.0));

    lightDir = normalize(lightLocalPosition - aVertexPosition);

    viewDir = normalize(cameraLocalPosition - aVertexPosition);

    tangent = normalize(aVertexTangent);

    texCoord = aVertexTexel;
}