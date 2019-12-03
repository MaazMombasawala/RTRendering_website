precision mediump float;
uniform sampler2D myTexture;

varying highp vec2 texCoord;

void main(void) {
    gl_FragColor = texture2D(myTexture, texCoord);
}