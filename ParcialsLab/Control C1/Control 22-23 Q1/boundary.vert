#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

out vec3 vP;
out vec3 vN;

void main() {
	// Normalitzo perquè ho diu l'enunciat, però ja que en el VS no utilitzo la normal
	// i al FS la tornaré a normalitzar, seria més eficient normalizar-la només al FS
    vN = normalize(normalMatrix * normal);
    vtexCoord = texCoord;
    vP = (modelViewMatrix*vec4(vertex, 1.0)).xyz;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
