#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 GREY = vec4(vec3(0.8),1);
const vec4 BLACK = vec4(vec3(0),1);

void main()
{
    float fraction = 1./8.;
    int x = int(mod(vtexCoord.x/fraction,2));
    int y = int(mod(vtexCoord.y/fraction,2));
    if(x == y) fragColor = GREY;
    else fragColor = BLACK;
}
