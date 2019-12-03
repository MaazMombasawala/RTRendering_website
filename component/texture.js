export var textures = {};

export class Texture {
    constructor(gl, pathToTexture, textureUnit, textureLocation, resolution) {
        var texture = gl.createTexture();
        texture.image = new Image();
        texture.image.onload = function() {
            handleImageLoaded(gl, texture, resolution);
        };

        texture.image.src = pathToTexture;

        this.texture = texture;
        this.textureUnit = textureUnit;
        this.textureLocation = textureLocation;
    }
}

function handleImageLoaded(gl, texture, resolution) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);

            gl.generateMipmap(gl.TEXTURE_2D);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null);
}