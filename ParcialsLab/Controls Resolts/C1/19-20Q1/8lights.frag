#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 P;
in vec3 N;
in vec3 V;

uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform float matShininess;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
 
vec4 phong(vec3 llum, vec3 N, vec3 V) {
    vec3 L = normalize(llum - P);
    vec3 R = normalize(2.0 * dot(N,L)*N-L);
    float NdotL = max(0.0, dot(N,L));
    float RdotV = max(0.0,dot(R,V));
    float specular = max(0.0,pow(RdotV, matShininess));

    if(NdotL > 0) return lightDiffuse * matDiffuse * NdotL/2.0 + lightSpecular * matSpecular * specular;
    else return  lightDiffuse * matDiffuse * NdotL/2.0;
}

void main()
{
    vec3 l1 = vec3(boundingBoxMin.x, boundingBoxMin.y, boundingBoxMin.z);
    vec3 l2 = vec3(boundingBoxMin.x, boundingBoxMin.y, boundingBoxMax.z);
    vec3 l3 = vec3(boundingBoxMin.x, boundingBoxMax.y, boundingBoxMin.z);
    vec3 l4 = vec3(boundingBoxMax.x, boundingBoxMin.y, boundingBoxMin.z);
    vec3 l5 = vec3(boundingBoxMax.x, boundingBoxMax.y, boundingBoxMin.z);
    vec3 l6 = vec3(boundingBoxMin.x, boundingBoxMax.y, boundingBoxMax.z);
    vec3 l7 = vec3(boundingBoxMax.x, boundingBoxMin.y, boundingBoxMax.z);
    vec3 l8 = vec3(boundingBoxMax.x, boundingBoxMax.y, boundingBoxMax.z);

    fragColor = phong(l1,N,V) + phong(l2,N,V) + phong(l3,N,V) + phong(l4,N,V) + phong(l5,N,V) + phong(l6,N,V) + phong(l7,N,V) + phong(l8,N,V);
}
