#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;


const vec4 YELLOW = vec4(1,1,0,1);
const vec4 RED = vec4(1,0,0,1);

uniform float nstripes = 16;
uniform vec2 origin = vec2(0,0);

void main()
{
  int x=int(length(vtexCoord-origin)*nstripes);
  if (mod(x, 2)==1) fragColor=YELLOW;
  else fragColor=RED;
    
}
