#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;

out vec4 frontColor;


uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;


uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 Position = (modelViewMatrix * vec4(vertex.xyz,1)).xyz;
    vec3 V = normalize(vec3(0,0,0) -Position); //posicio del observador es 0,0,0
    vec3 L = normalize(vec3(lightPosition.xyz - Position));
    vec3 R = normalize(2 * dot(N,L) * N - L);
    float NdotL = max(0,dot(N,L));
    float RdotV = max(0,dot(R,V));
    RdotV = pow(RdotV,matShininess);

    if(NdotL > 0) frontColor = matAmbient*lightAmbient + matDiffuse*lightDiffuse*NdotL + matSpecular*lightSpecular*RdotV;
    else frontColor = matAmbient*lightAmbient + matDiffuse*lightDiffuse*NdotL;
    

    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
