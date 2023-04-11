#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D noise0; 
uniform sampler2D rock1;
uniform sampler2D grass2;

void main()
{
    float f = texture(noise0, vtexCoord).x; //f ens servira per indicar si el color és negre o blanc (x==1 es negre)
    frontColor = texture(rock1,vtexCoord);
    if(f < 1) frontColor = mix(,texture())
    fragColor = frontColor;
}
