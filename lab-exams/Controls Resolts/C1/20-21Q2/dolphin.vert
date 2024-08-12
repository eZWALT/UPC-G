#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform float time;
const float PI = 3.1416;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

float dolphinpoint(float x){
    return (boundingBoxMax.y - boundingBoxMin.y) * x + boundingBoxMin.y;
    //el punt x queda en y's coordenada de dofi (model)
}

const float Offset = 0.25;

    float RT = dolphinpoint(0.35);
    float RD = dolphinpoint(0.65);
    float TD1 = dolphinpoint(0.55);
    float TD2 = dolphinpoint(0.75);
    float TT1 = dolphinpoint(0.5);
    float TT2 = dolphinpoint(0.05);

const vec4 GREY = vec4(vec3(0.8),1.0);

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 FinalVertex = vertex;
    frontColor = GREY * N.z;




    if(vertex.y <= RT){
        float factor = smoothstep(TT1,TT2,vertex.y);
        //l'angle esta en un cert rang
        float angle = min(0.0, -PI/8.0 * sin(time));
        mat4 rotateMatrix = mat4(vec4(1,0,0,0), vec4(0,cos(angle),sin(angle),0), vec4(0,-sin(angle),cos(angle),0), vec4(0,0,0,1));
        vec3 vertex2 = (rotateMatrix * vec4(vertex,1.0)).xyz;
        FinalVertex = mix(vertex,vertex2,factor);


    }
    else if(vertex.y >= RD){
        float factor = smoothstep(TD1,TD2,vertex.y);
        float angle = PI/32.0 * sin(time + Offset);
        mat4 rotateMatrix = mat4(vec4(1,0,0,0), vec4(0,cos(angle),sin(angle),0), vec4(0,-sin(angle),cos(angle),0), vec4(0,0,0,1));
        vec3 vertex2 = (rotateMatrix * vec4(vertex,1.0)).xyz;
        FinalVertex = mix(vertex,vertex2,factor);

    }

    gl_Position = modelViewProjectionMatrix * vec4(FinalVertex, 1.0);
}
