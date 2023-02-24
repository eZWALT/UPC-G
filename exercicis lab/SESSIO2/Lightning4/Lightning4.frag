#version 330 core

in vec4 frontColor;
in vec3 N;
in vec3 P;

out vec4 fragColor;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightPosition;
uniform vec4 lightSpecular;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

void main()
{
    vec3 L = normalize(lightPosition.xyz - P);
    vec3 V = normalize(vec3(0,0,0) - P);
    vec3 R = normalize(2 * dot(N,L)*N - L);

    float NdotL = max(0, dot(N,L));
    float RdotV = max(0, dot(R,V));
    RdotV = pow(RdotV, matShininess);
    //Si el producte escalar entre la N i la L es 0 o negatiu no cal tenir en compte el terme especular
    //No estic massa segur perque pero el meu jo del futur (30 mins) ho sabrà

    if(NdotL > 0) fragColor = lightAmbient*matAmbient + lightDiffuse*matDiffuse*NdotL + lightSpecular*matSpecular*RdotV;
    else fragColor = lightAmbient*matAmbient + lightDiffuse*matDiffuse*NdotL;
}
