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
uniform float speed = radians(90);

void main()
{
    float angle = time * speed;
    mat3 rotateMatrix = mat3(vec3(cos(angle),0.0,-sin(angle)), vec3(0.0,1.0,0.0),vec3(sin(angle),0.0,cos(angle))); //matriu de rotaccio
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0);
    gl_Position = modelViewProjectionMatrix * vec4(rotateMatrix * vertex, 1.0);
}
