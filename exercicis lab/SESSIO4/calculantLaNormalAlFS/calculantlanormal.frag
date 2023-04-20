#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 P;

vec4 matAmbient;
vec4 matDiffuse;

vec4 lightAmbient;
vec4 lightDiffuse;
vec4 lightPosition;

void main()
{
    vec3 L = normalize(lightPosition.xyz - P);
    vec3 V = normalize(vec3(0,0,0) - P);
    vec3 N = normalize(cross(dFdx(P),dFdy(P)));
    float NdotL = max(0, dot(N,L));

    fragColor = frontColor * N.z;
}
