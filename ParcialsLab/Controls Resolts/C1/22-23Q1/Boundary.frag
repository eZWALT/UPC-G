#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform float edge0 = 0.35;
uniform float edge1 = 0.4;

in vec3 P;
in vec3 N;

void main()
{
    vec3 V = normalize(P - vec3(0,0,0));
    float c = dot(N,-V);

    fragColor = vec4(smoothstep(edge0,edge1,c));
}
