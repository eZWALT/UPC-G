#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

out vec3 vN;
out vec3 vP;
out vec3 vV;

void main() {
    vN = normalize(normalMatrix * normal);
    vP = (modelViewMatrix*vec4(vertex, 1.0)).xyz;
    vV = -vP;
    frontColor = vec4(color,1.0) * vN.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
