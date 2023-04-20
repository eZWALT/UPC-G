#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform int mode = 2;
uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;

uniform float matShininess;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;


void main()
{

    //mode 0
    vec2 SphereCenter = vec2(0,0);
    if(length(vtexCoord-SphereCenter) <= 1) fragColor = vec4(0,0,0,0);
    else discard;

    vec3 P,N;

    if(mode == 1 ||  mode == 2){
        float s = vtexCoord.s;
        float t = vtexCoord.t;
        P = N = vec3(vtexCoord.s, vtexCoord.t, sqrt(1-s*s-t*t));

        if(length(vtexCoord-SphereCenter) <= 1) fragColor = vec4(N.z,N.z,N.z,N.z);

        //we calculate the phong model wtf man 
        if(mode == 2){
            
            N = normalize(normalMatrix * N);
            P = (modelViewMatrix * vec4(P,1)).xyz;
            vec3 L = normalize(lightPosition.xyz - P);
            vec3 V = normalize(vec3(0,0,0) - P);
            vec3 R = normalize(2 * dot(N,L) * N - L);
            float NdotL = max(0, dot(N,L));
            float RdotV = max(0, dot(R,V));
            RdotV = pow(RdotV,matShininess);

            if(length(vtexCoord-SphereCenter) <= 1){

                if(NdotL > 0) fragColor = lightAmbient*matAmbient + lightDiffuse*matDiffuse*NdotL + lightSpecular*matSpecular*RdotV;
                else fragColor = lightAmbient*matAmbient + lightDiffuse*matDiffuse*NdotL;

            }



        }
    }

}
