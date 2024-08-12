#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void main()
{
    float diferencia = boundingBoxMax.y - boundingBoxMin.y;
    float coordenadaYObjecte = vertex.y - boundingBoxMin.y;
    float distanciarelativa = coordenadaYObjecte/diferencia;

    if(distanciarelativa == 0) frontColor = vec4(1,0,0,1);
    else if(distanciarelativa < 0.25) frontColor = mix(vec4(1,0,0,1), vec4(1,1,0,1), fract(4*distanciarelativa));
    else if(distanciarelativa < 0.5) frontColor = mix(vec4(1,1,0,1),vec4(0,1,0,1),fract(4*distanciarelativa));
    else if(distanciarelativa < 0.75) frontColor = mix(vec4(0,1,0,1), vec4(0,1,1,1),fract(4*distanciarelativa));
    else if(distanciarelativa < 1) frontColor = mix(vec4(0,1,1,1), vec4(0,0,1,1),fract(4*distanciarelativa));
    else frontColor = vec4(0,0,1,1);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
