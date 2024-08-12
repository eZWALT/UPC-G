#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float t = 0.4;
uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform float scale = 4.0;


void main()
{
    vec3 P = vertex;
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;

    float c  = mix(boundingBoxMin.y, boundingBoxMax.y,t);
    if(P.y < c){
        P.y = P.y * scale;
    }
    else{
        float delta = c * scale - c;
        P.y = P.y + delta;
    }
    gl_Position = modelViewProjectionMatrix * vec4(P, 1.0);
}
