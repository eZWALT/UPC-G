#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;


const vec4 ORANGE = vec4(1.0,0.7,0,1);
const vec4 BLACK  = vec4(0,0,0,1);

bool inside(vec2 center , float radius){
    if(distance(vtexCoord, center) <= radius) return true;
    else return false;
}   

vec4 DegradatBackground(){
    vec2 outerpoint = vec2(1,1);
    vec2 innerpoint = vec2(0.5,0.5);
    float m = (smoothstep(0.0, distance(innerpoint,outerpoint), distance(innerpoint,vtexCoord)));
    return mix(ORANGE,BLACK,m);
}

void main()
{

    fragColor = DegradatBackground();


    vec2 centreCarbassa = vec2(0.5,0.5);
    vec2 centreUllDre = vec2(0.62,0.62);
    vec2 centreUllEsq = vec2(0.38,0.62);
    vec2 centreBoca = vec2(0.5,0.5);
    vec2 centreLlavis = vec2(0.5,0.56);
    if(inside(centreUllDre,0.1) || inside(centreUllEsq,0.1)) return; 
    else if(inside(centreBoca,0.25) && !inside(centreLlavis,0.25)) return;
    else if(inside(centreCarbassa, 0.35)) fragColor = BLACK;
    else if((vtexCoord.t > 0.80 && vtexCoord.t < 0.95) && (vtexCoord.s < 0.54 && vtexCoord.s > 0.46)) fragColor = BLACK;



}
