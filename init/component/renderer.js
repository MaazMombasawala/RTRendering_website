import { Renderer, renderers } from "../../component/renderer.js";
import * as mat4 from "../../ext/toji-gl-matrix-v3.1.0-7-g120fe10/toji-gl-matrix-120fe10/src/mat4.js";

export function initRenderers(gl) {
    renderers.lighting = new Renderer(gl,
        vertexShaderLighting,
        fragmentShaderLighting,
        function(gl, shaderProgram) {
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
            gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

            shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
            shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
            shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
            shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
            shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
            shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
            shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
            shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
            shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
            shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
            shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        },
        function(gl, drawInput) {
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
            gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

            var mvMatrix = mat4.create();
            mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

            var mvpMatrix = mat4.create();
            mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

            var normalMatrix = mat4.create();
            mat4.invert(normalMatrix, mvMatrix);
            mat4.transpose(normalMatrix, normalMatrix);

            gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
            gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

            gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
            gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
            gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
            gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

            gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
            gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
            gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
            gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

            gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
        }
    );

    // renderers.textureLighting = new Renderer(gl,
    //     "../shader/vertex-shader-texture-lighting.glsl",
    //     "../shader/fragment-shader-texture-lighting.glsl",
    //     function(gl, shaderProgram) {
    //         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //         shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    //         gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //         shaderProgram.vertexTexelAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexel");
    //         gl.enableVertexAttribArray(shaderProgram.vertexTexelAttribute);

    //         shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
    //         shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    //         shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
    //         shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
    //         shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
    //         shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
    //         shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
    //         shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
    //         shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    //         shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    //         shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    //         shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");

    //         shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
    //     },
    //     function(gl, drawInput) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexTexelBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexTexels), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexTexelAttribute, 2, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
    //         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

    //         var mvMatrix = mat4.create();
    //         mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

    //         var mvpMatrix = mat4.create();
    //         mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

    //         var normalMatrix = mat4.create();
    //         mat4.invert(normalMatrix, mvMatrix);
    //         mat4.transpose(normalMatrix, normalMatrix);

    //         gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

    //         gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
    //         gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
    //         gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
    //         gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

    //         gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
    //         gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
    //         gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
    //         gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

    //         gl.activeTexture(drawInput.texture.textureLocation);
    //         gl.bindTexture(gl.TEXTURE_2D, drawInput.texture.texture);
    //         gl.uniform1i(this.shaderProgram.textureUniform, drawInput.texture.textureUnit);

    //         gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
    //     }
    // );

    // renderers.texture = new Renderer(gl,
    //     "../shader/vertex-shader-texture.glsl",
    //     "../shader/fragment-shader-texture.glsl",
    //     function(gl, shaderProgram) {
    //         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //         shaderProgram.vertexTexelAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexel");
    //         gl.enableVertexAttribArray(shaderProgram.vertexTexelAttribute);

    //         shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
                
    //         shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "myTexture");
    //     },
    //     function(gl, drawInput) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexTexelBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexTexels), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexTexelAttribute, 2, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
    //         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

    //         var mvMatrix = mat4.create();
    //         mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

    //         var mvpMatrix = mat4.create();
    //         mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

    //         gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);

    //         gl.activeTexture(drawInput.texture.textureLocation);
    //         gl.bindTexture(gl.TEXTURE_2D, drawInput.texture.texture);
    //         gl.uniform1i(this.shaderProgram.textureUniform, drawInput.texture.textureUnit);

    //         gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
    //     }
    // );

    // renderers.lines = new Renderer(gl,
    //     "../shader/vertex-shader-lighting.glsl",
    //     "../shader/fragment-shader-lighting.glsl",
    //     function(gl, shaderProgram) {
    //         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //         shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    //         gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //         shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
    //         shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    //         shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
    //         shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
                
    //         shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
    //         shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
    //         shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
    //         shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
    //         shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    //         shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    //         shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    //         shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    //     },
    //     function(gl, drawInput) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
    //         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

    //         var mvMatrix = mat4.create();
    //         mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

    //         var mvpMatrix = mat4.create();
    //         mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

    //         var normalMatrix = mat4.create();
    //         mat4.invert(normalMatrix, mvMatrix);
    //         mat4.transpose(normalMatrix, normalMatrix);

    //         gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, drawInput.vMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);

    //         gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
    //         gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
    //         gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
    //         gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

    //         gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
    //         gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
    //         gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
    //         gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

    //         gl.drawArrays(gl.LINE_LOOP, drawInput.primitive.initialVertexPositionOffset, drawInput.primitive.numVertices);
    //     }
    // );

    // renderers.textureMap = new Renderer(gl,
    //     "../shader/vertex-shader-texture-map.glsl",
    //     "../shader/fragment-shader-texture-map.glsl",
    //     function(gl, shaderProgram) {
    //         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //         shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    //         gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //         shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
    //         shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    //         shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    //         shaderProgram.e2wMatrixUniform = gl.getUniformLocation(shaderProgram, "uE2WMatrix");

    //         shaderProgram.textureMapUniform = gl.getUniformLocation(shaderProgram, "cubeMap");
    //     },
    //     function(gl, drawInput) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
    //         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

    //         var mvMatrix = mat4.create();
    //         mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

    //         var mvpMatrix = mat4.create();
    //         mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

    //         var normalMatrix = mat4.create();
    //         mat4.invert(normalMatrix, mvMatrix);
    //         mat4.transpose(normalMatrix, normalMatrix);

    //         var e2wMatrix = mat4.create();
    //         mat4.invert(e2wMatrix, drawInput.vMatrix);

    //         gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.e2wMatrixUniform, false, e2wMatrix);

    //         gl.activeTexture(drawInput.texture.textureLocation);
    //         gl.bindTexture(gl.TEXTURE_CUBE_MAP, drawInput.texture.texture);
    //         gl.uniform1i(this.shaderProgram.textureMapUniform, drawInput.texture.textureUnit);

    //         gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
    //     }
    // );

    // renderers.bump = new Renderer(gl,
    //     "../shader/vertex-shader-bump.glsl",
    //     "../shader/fragment-shader-bump.glsl",
    //     function(gl, shaderProgram) {
    //         shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //         gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    //         shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    //         gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //         shaderProgram.vertexTangentAttribute = gl.getAttribLocation(shaderProgram, "aVertexTangent");
    //         gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);

    //         shaderProgram.vertexTexelAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexel");
    //         gl.enableVertexAttribArray(shaderProgram.vertexTexelAttribute);

    //         shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
    //         shaderProgram.w2lMatrixUniform = gl.getUniformLocation(shaderProgram, "uW2LMatrix");

    //         shaderProgram.cameraPosition = gl.getUniformLocation(shaderProgram, "uCameraPosition");
            
    //         shaderProgram.ambientCoeff = gl.getUniformLocation(shaderProgram, "uAmbientCoeff");
    //         shaderProgram.diffuseCoeff = gl.getUniformLocation(shaderProgram, "uDiffuseCoeff");
    //         shaderProgram.specularCoeff = gl.getUniformLocation(shaderProgram, "uSpecularCoeff");
    //         shaderProgram.shininessCoeff = gl.getUniformLocation(shaderProgram, "uShininess");
                
    //         shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    //         shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    //         shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    //         shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");

    //         shaderProgram.textureColorUniform = gl.getUniformLocation(shaderProgram, "uTextureColor");
    //         shaderProgram.textureNormalUniform = gl.getUniformLocation(shaderProgram, "uTextureNormal");
    //     },
    //     function(gl, drawInput) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexPositionBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexPositions), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexNormalBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexNormals), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexTangentBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexTangents), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);

    //         gl.bindBuffer(gl.ARRAY_BUFFER, drawInput.buffers.vertexTexelBuffer);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(drawInput.vertexArrays.vertexTexels), gl.STATIC_DRAW);
    //         gl.vertexAttribPointer(this.shaderProgram.vertexTexelAttribute, 2, gl.FLOAT, false, 0, 0);
            
    //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInput.buffers.vertexIndexBuffer);
    //         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(drawInput.vertexArrays.vertexIndices), gl.STATIC_DRAW);

    //         var mvMatrix = mat4.create();
    //         mat4.multiply(mvMatrix, drawInput.vMatrix, drawInput.mMatrix);

    //         var mvpMatrix = mat4.create();
    //         mat4.multiply(mvpMatrix, drawInput.pMatrix, mvMatrix);

    //         var w2lMatrix = mat4.create();
    //         mat4.invert(w2lMatrix, drawInput.mMatrix);

    //         gl.uniformMatrix4fv(this.shaderProgram.mvpMatrixUniform, false, mvpMatrix);
    //         gl.uniformMatrix4fv(this.shaderProgram.w2lMatrixUniform, false, w2lMatrix);

    //         gl.uniform3fv(this.shaderProgram.cameraPosition, drawInput.cameraPosition);

    //         gl.uniform3fv(this.shaderProgram.ambientCoeff, drawInput.material.ambientCoeff);
    //         gl.uniform3fv(this.shaderProgram.diffuseCoeff, drawInput.material.diffuseCoeff);
    //         gl.uniform3fv(this.shaderProgram.specularCoeff, drawInput.material.specularCoeff);
    //         gl.uniform1f(this.shaderProgram.shininessCoeff, drawInput.material.shininess);

    //         gl.uniform3fv(this.shaderProgram.lightAmbient, drawInput.lightProperties.ambient);
    //         gl.uniform3fv(this.shaderProgram.lightDiffuse, drawInput.lightProperties.diffuse);
    //         gl.uniform3fv(this.shaderProgram.lightSpecular, drawInput.lightProperties.specular);
    //         gl.uniform3fv(this.shaderProgram.lightPosition, drawInput.lightProperties.lightPosition);

    //         gl.activeTexture(drawInput.texture.textureColor.textureLocation);
    //         gl.bindTexture(gl.TEXTURE_2D, drawInput.texture.textureColor.texture);
    //         gl.uniform1i(this.shaderProgram.textureColorUniform, drawInput.texture.textureColor.textureUnit);

    //         gl.activeTexture(drawInput.texture.textureNormal.textureLocation);
    //         gl.bindTexture(gl.TEXTURE_2D, drawInput.texture.textureNormal.texture);
    //         gl.uniform1i(this.shaderProgram.textureNormalUniform, drawInput.texture.textureNormal.textureUnit);

    //         gl.drawElements(gl.TRIANGLES, drawInput.primitive.numIndices, gl.UNSIGNED_SHORT, drawInput.primitive.indexBufferOffset * 2);
    //     }
    // );
}


const vertexShaderLighting = "attribute vec3 aVertexPosition;\
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

const fragmentShaderLighting = "precision mediump float;\
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