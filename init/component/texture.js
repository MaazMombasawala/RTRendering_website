import { Texture, textures } from "../../component/texture.js";
import { TextureMap } from "../../component/textureMap.js";

export function initTextures(gl) {
    const mapPaths = {
        front : "texture/cubeMap/morning_ft.png",
        back : "texture/cubeMap/morning_bk.png",
        up : "texture/cubeMap/morning_up.png",
        down : "texture/cubeMap/morning_dn.png",
        left : "texture/cubeMap/morning_lf.png",
        right : "texture/cubeMap/morning_rt.png"
    };
    textures.cubeMap = new TextureMap(gl, mapPaths, 2, gl.TEXTURE2);
    textures.faceTextures = createCubeFaceTextures(gl);
    textures.colors = new Texture(gl, "texture/colors.png", 0, gl.TEXTURE0, 512);
    textures.abstractColors = new Texture(gl, "texture/abstract-colors.png", 1, gl.TEXTURE1, 512);
    textures.bricks = {
        textureColor : new Texture(gl, "texture/bricksColor.gif", 9, gl.TEXTURE9, 256),
        textureNormal : new Texture(gl, "texture/bricksNormal.gif", 10, gl.TEXTURE10, 256)
    };
}

function createCubeFaceTextures(gl) {
    return {
        front : new Texture(gl, "texture/cubeMap/morning_ft.png", 3, gl.TEXTURE3, 512),
        back : new Texture(gl, "texture/cubeMap/morning_bk.png", 4, gl.TEXTURE4, 512),
        up : new Texture(gl, "texture/cubeMap/morning_up.png", 5, gl.TEXTURE5, 512),
        down : new Texture(gl, "texture/cubeMap/morning_dn.png", 6, gl.TEXTURE6, 512),
        left : new Texture(gl,"texture/cubeMap/morning_lf.png", 7, gl.TEXTURE7, 512),
        right : new Texture(gl, "texture/cubeMap/morning_rt.png", 8, gl.TEXTURE8,512)
    }
}