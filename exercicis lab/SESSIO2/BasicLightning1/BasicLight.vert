#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 matDiffuse;
uniform vec4 lightDiffuse;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 L = vec3(0,0,1); //Volem que L estigui en direccio eix Z
    frontColor = vec4(max(vec3(0,0,0), color*dot(N,L)),0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
