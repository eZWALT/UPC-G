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
uniform float amp = 0.5;
uniform float freq = 0.25;
const float pi = 3.141592;

//velocitat angular: w = 2pi * f

void main()
{   
    vec3 N = normalMatrix * normal;
    //vertex.y es el desfase del angle
    float y = amp * sin(time * (2 * pi * freq) + vertex.y);
    mat3 WaveMatrix = mat3(
        vec3(1, 0 ,0),
        vec3(0, cos(y),sin(y)),
        vec3(0,-sin(y),cos(y))
    );
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(WaveMatrix * vertex, 1.0);
}
