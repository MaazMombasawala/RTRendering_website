export const vertexShaderLighting = "attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
\
uniform mat4 uMVPMatrix;\
uniform mat4 uNormalMatrix;\
uniform mat4 uVMatrix;\
uniform mat4 uMVMatrix;\
\
uniform vec3 uLightPosition;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
\
void main(void) {\
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);\
\
    normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));\
\
    vec4 vertexEyePosition = uMVMatrix * vec4(aVertexPosition, 1.0);\
\
    vec4 lightEyePosition = uVMatrix * vec4(uLightPosition, 1.0);\
\
    lightDir = normalize(vec3(lightEyePosition - vertexEyePosition));\
\
    viewDir = normalize(-vec3(vertexEyePosition));\
}";

export const fragmentShaderLighting = "precision mediump float;\
uniform vec3 uAmbientCoeff;\
uniform vec3 uDiffuseCoeff;\
uniform vec3 uSpecularCoeff;\
uniform float uShininess;\
\
uniform vec3 uLightAmbient;\
uniform vec3 uLightDiffuse;\
uniform vec3 uLightSpecular;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
\
void main(void) {\
    vec3 ambient = uAmbientCoeff * uLightAmbient;\
\
    float diffuseAngle = max(dot(normal, lightDir), 0.0);\
\
    vec3 diffuse = diffuseAngle * (uDiffuseCoeff * uLightDiffuse);\
\
    vec3 reflected = normalize(reflect(-lightDir, normal));\
\
    float specularAngle = max(dot(reflected, viewDir), 0.0);\
\
    vec3 specular = pow(specularAngle, uShininess) * (uSpecularCoeff * uLightSpecular);\
\
    vec3 color = ambient + diffuse + specular;\
\
    gl_FragColor = vec4(color, 1.0);\
}";

export const vertexShaderBump = "attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
attribute vec3 aVertexTangent;\
attribute vec2 aVertexTexel;\
\
uniform mat4 uMVPMatrix;\
uniform mat4 uW2LMatrix;\
\
uniform vec3 uLightPosition;\
uniform vec3 uCameraPosition;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
varying vec3 tangent;\
varying highp vec2 texCoord;\
\
void main(void) {\
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);\
\
    normal = normalize(aVertexNormal);\
\
    vec3 lightLocalPosition = vec3(uW2LMatrix * vec4(uLightPosition, 1.0));\
\
    vec3 cameraLocalPosition = vec3(uW2LMatrix * vec4(uCameraPosition, 1.0));\
\
    lightDir = normalize(lightLocalPosition - aVertexPosition);\
\
    viewDir = normalize(cameraLocalPosition - aVertexPosition);\
\
    tangent = normalize(aVertexTangent);\
\
    texCoord = aVertexTexel;\
}";

export const fragmentShaderBump = "precision mediump float;\
uniform vec3 uAmbientCoeff;\
uniform vec3 uDiffuseCoeff;\
uniform vec3 uSpecularCoeff;\
uniform float uShininess;\
\
uniform vec3 uLightAmbient;\
uniform vec3 uLightDiffuse;\
uniform vec3 uLightSpecular;\
uniform sampler2D uTextureColor;\
uniform sampler2D uTextureNormal;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
varying vec3 tangent;\
varying highp vec2 texCoord;\
\
void main(void) {\
    vec4 texColor = texture2D(uTextureColor, texCoord);\
\
    vec3 texNormal = vec3(texture2D(uTextureNormal, texCoord));\
\
    vec3 btangent = cross(normal, tangent);\
\
    mat4 l2tMatrix = mat4(\
        vec4(tangent, 0.0),\
        vec4(btangent, 0.0),\
        vec4(normal, 0.0),\
        vec4(0.0, 0.0, 0.0, 1.0)\
    );\
\
    vec3 lightDirTS = vec3(l2tMatrix * vec4(lightDir, 1.0));\
    vec3 viewDirTS = vec3(l2tMatrix * vec4(viewDir, 1.0));\
\
    vec3 ambient = uAmbientCoeff * uLightAmbient;\
\
    float diffuseAngle = max(dot(texNormal, lightDirTS), 0.0);\
\
    vec3 diffuse = diffuseAngle * (uDiffuseCoeff * uLightDiffuse);\
\
    vec3 reflected = normalize(reflect(-lightDirTS, texNormal));\
\
    float specularAngle = max(dot(reflected, viewDirTS), 0.0);\
\
    vec3 specular = pow(specularAngle, uShininess) * (uSpecularCoeff * uLightSpecular);\
\
    vec3 color = (ambient + diffuse) * vec3(texColor) + specular;\
\
    gl_FragColor = vec4(color, 1.0);\
}";

export const vertexShaderTextureLighting = "attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
attribute vec2 aVertexTexel;\
\
uniform mat4 uMVPMatrix;\
uniform mat4 uNormalMatrix;\
uniform mat4 uVMatrix;\
uniform mat4 uMVMatrix;\
\
uniform vec3 uLightPosition;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
varying highp vec2 texCoord;\
\
void main(void) {\
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);\
\
    normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));\
\
    vec4 vertexEyePosition = uMVMatrix * vec4(aVertexPosition, 1.0);\
\
    vec4 lightEyePosition = uVMatrix * vec4(uLightPosition, 1.0);\
\
    lightDir = normalize(vec3(lightEyePosition - vertexEyePosition));\
\
    viewDir = normalize(-vec3(vertexEyePosition));\
\
    texCoord = aVertexTexel;\
}";

export const fragmentShaderTextureLighting = "precision mediump float;\
uniform vec3 uAmbientCoeff;\
uniform vec3 uDiffuseCoeff;\
uniform vec3 uSpecularCoeff;\
uniform float uShininess;\
\
uniform vec3 uLightAmbient;\
uniform vec3 uLightDiffuse;\
uniform vec3 uLightSpecular;\
uniform sampler2D myTexture;\
\
varying vec3 normal;\
varying vec3 lightDir;\
varying vec3 viewDir;\
varying highp vec2 texCoord;\
\
void main(void) {\
    vec4 texColor = texture2D(myTexture, texCoord);\
\
    vec3 ambient = uAmbientCoeff * uLightAmbient;\
\
    float diffuseAngle = max(dot(normal, lightDir), 0.0);\
\
    vec3 diffuse = diffuseAngle * (uDiffuseCoeff * uLightDiffuse);\
\
    vec3 reflected = normalize(reflect(-lightDir, normal));\
\
    float specularAngle = max(dot(reflected, viewDir), 0.0);\
\
    vec3 specular = pow(specularAngle, uShininess) * (uSpecularCoeff * uLightSpecular);\
\
    vec3 color = (ambient + diffuse) * vec3(texColor) + specular;\
\
    gl_FragColor = vec4(color, 1.0);\
}";

export const vertexShaderTextureMap = "attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
\
uniform mat4 uMVPMatrix;\
uniform mat4 uNormalMatrix;\
uniform mat4 uMVMatrix;\
\
varying vec3 normal;\
varying vec3 viewDir;\
\
void main(void) {\
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);\
\
    normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 0.0)));\
\
    vec4 vertexEyePosition = uMVMatrix * vec4(aVertexPosition, 1.0);\
\
    viewDir = normalize(-vec3(vertexEyePosition));\
}";

export const fragmentShaderTextureMap = "precision mediump float;\
uniform mat4 uE2WMatrix;\
uniform samplerCube cubeMap;\
\
varying vec3 normal;\
varying vec3 viewDir;\
\
void main(void) {\
    vec3 rfEye = normalize(reflect(-viewDir, normal));\
    vec3 rfWorld = vec3(uE2WMatrix * vec4(rfEye, 0.0));\
    vec4 color = textureCube(cubeMap, rfWorld);\
\
    gl_FragColor = color;\
}";

export const vertexShaderTexture = "attribute vec3 aVertexPosition;\
attribute vec2 aVertexTexel;\
\
uniform mat4 uMVPMatrix;\
\
varying highp vec2 texCoord;\
\
void main(void) {\
    gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0);\
\
    texCoord = aVertexTexel;\
}";

export const fragmentShaderTexture = "precision mediump float;\
uniform sampler2D myTexture;\
\
varying highp vec2 texCoord;\
\
void main(void) {\
    gl_FragColor = texture2D(myTexture, texCoord);\
}";