#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec3 N;

uniform sampler2D colormap;
const vec4 BLACK = vec4(0,0,0,1);

void main()
{
    fragColor = texture(colormap, vtexCoord);
    //fragColor = vec4(1,0,0,1);
    vec2 centreUllESQ = vec2(0.34,0.65) - 0.1 * N.xy;
    vec2 centreUllDRE = vec2(0.66,0.65) - 0.1 * N.xy;

    if(distance(vtexCoord, centreUllDRE) <= 0.05) fragColor = BLACK;
    else if(distance(vtexCoord,centreUllESQ) <= 0.05) fragColor = BLACK;


}
