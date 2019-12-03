precision mediump float;
uniform vec3 uAmbientCoeff;
uniform vec3 uDiffuseCoeff;
uniform vec3 uSpecularCoeff;
uniform float uShininess;

uniform vec3 uLightAmbient;
uniform vec3 uLightDiffuse;
uniform vec3 uLightSpecular;
uniform sampler2D uTextureColor;
uniform sampler2D uTextureNormal;

// In local space
varying vec3 normal;
varying vec3 lightDir;
varying vec3 viewDir;
varying vec3 tangent;
varying highp vec2 texCoord;

void main(void) {
    vec4 texColor = texture2D(uTextureColor, texCoord);

    vec3 texNormal = vec3(texture2D(uTextureNormal, texCoord));

    vec3 btangent = cross(normal, tangent);

    // Constructing column major
    mat4 l2tMatrix = mat4(
        vec4(tangent, 0.0),
        vec4(btangent, 0.0),
        vec4(normal, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );

    vec3 lightDirTS = vec3(l2tMatrix * vec4(lightDir, 1.0));
    vec3 viewDirTS = vec3(l2tMatrix * vec4(viewDir, 1.0));

    vec3 ambient = uAmbientCoeff * uLightAmbient;

    float diffuseAngle = max(dot(texNormal, lightDirTS), 0.0);

    vec3 diffuse = diffuseAngle * (uDiffuseCoeff * uLightDiffuse);

    vec3 reflected = normalize(reflect(-lightDirTS, texNormal));

    float specularAngle = max(dot(reflected, viewDirTS), 0.0);

    vec3 specular = pow(specularAngle, uShininess) * (uSpecularCoeff * uLightSpecular);

    vec3 color = (ambient + diffuse) * vec3(texColor) + specular;

    gl_FragColor = vec4(color, 1.0);
}