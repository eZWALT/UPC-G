#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrixInverse;
uniform mat3 normalMatrix;

out vec3 vN;
out vec3 vV;
out vec3 vP;

void main() {
    vN = normal;
    vP = vertex;
    vV = (modelViewMatrixInverse * vec4(0, 0, 0, 1)).xyz - vertex;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
