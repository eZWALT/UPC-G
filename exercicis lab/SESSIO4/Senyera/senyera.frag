#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const float a = 1./9.;
const vec4 YELLOW = vec4(1,1,0,1);
const vec4 RED = vec4(1,0,0,1);

bool esGroc(float x){
    if((x >= 0 && x < a) || 
       (x >= 2*a && x < 3*a) ||
       (x >= 4*a && x < 5*a) || 
       (x >= 6*a && x < 7*a) || 
       (x >= 8*a && x < 9*a))
    return true;
    else return false;
}

void main()
{
    float f = fract(vtexCoord.s);
    if(esGroc(f)) fragColor = YELLOW;
    else fragColor = RED;
}
