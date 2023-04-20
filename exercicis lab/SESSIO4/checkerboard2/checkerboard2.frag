#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform float n = 8;

const vec4 BLACK = vec4(0,0,0,1);
const vec4 GREY = vec4(0.8,0.8,0.8,1);

void main()
{

    //locating in which position is the coord 
    int x = int(mod(n*vtexCoord.x, 2));
    int y = int(mod(n*vtexCoord.y, 2));

    if(x == y) fragColor = GREY;
    else fragColor = BLACK;
}
