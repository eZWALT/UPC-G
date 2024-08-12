#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float time;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    float angle = (vertex.y - 0.5) * sin(time);
    mat3 contortionMatrix = mat3(
        vec3(1,0,0),
        vec3(0,cos(angle),sin(angle)),
        vec3(0,-sin(angle),cos(angle))
    );

    vec3 vertecs = vec3(vertex);
    if(vertex.y >= 0.5){
        vertecs = vertecs - vec3(0,1,0);
        vertecs = contortionMatrix * vertecs;
        vertecs = vertecs + vec3(0,1,0);
    }
    gl_Position = modelViewProjectionMatrix * vec4(vertecs, 1.0);
}
