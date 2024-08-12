#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 2) in vec3 color;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;

void main()
{
    frontColor = vec4(color,1.0);
    float denominador = abs(max(max(abs(vertex.x), abs(vertex.y)), abs(vertex.z)));
    gl_Position = modelViewProjectionMatrix * vec4(vertex/denominador, 1.0);
}
