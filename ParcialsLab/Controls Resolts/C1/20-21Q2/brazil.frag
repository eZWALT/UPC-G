#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 GREEN = vec4(0,0.65,0.3,1);
const vec4 YELLOW = vec4(1,1,0,1);
const vec4 ASUL = vec4(0,0.4,0.7,1);

bool inside(vec2 center, float radius){
    if(length(vec2(center.x - vtexCoord.x, center.y/2 - vtexCoord.y/2 )) <= radius) return true;
    else return false;
}

//farem una corona circular , pero nomes un segment que 
bool yellowStripe(){
    vec2 C = vec2(0.5,0.62);
    float radio = 0.27;
    float x = 0.02;
    
    return inside(vec2(0.5,0.5),0.15) && distance(vtexCoord,C) < radio + x && distance(vtexCoord,C) > radio-x;
}

void main()
{
    fragColor = GREEN; //background color 
    
    vec2 centreFlag = vec2(0.5,0.5);
    if(inside(centreFlag,0.15))  fragColor = ASUL;
    else if((vtexCoord.x > 0.1 && vtexCoord.x < 0.9) && (vtexCoord.y > 0.15 && vtexCoord.y < 0.85)) fragColor = YELLOW;
    if(yellowStripe()) fragColor = YELLOW;
}