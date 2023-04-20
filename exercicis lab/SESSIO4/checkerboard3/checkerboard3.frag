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
    float x = fract(n * vtexCoord.x);
    float y = fract(n * vtexCoord.y);

    if(x > 0.1 && y > 0.1) fragColor = GREY;
    else fragColor = BLACK;


}
