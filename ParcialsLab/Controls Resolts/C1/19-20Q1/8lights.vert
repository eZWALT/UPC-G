#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 P;
out vec3 N;
out vec3 V;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrixInverse;

void main()
{
    N = normalize(normal);
    P = vertex;
    //el calcul aqui es mes eficient que no pas al fragment
    V = normalize((modelViewMatrixInverse * vec4(0,0,0,1)).xyz - vertex);
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);

}
