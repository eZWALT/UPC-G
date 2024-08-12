#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;

uniform sampler2D sampler0;
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform sampler2D sampler3;
uniform float fps = 10;

uniform float time;



void main()
{

    int frame = int(mod(time*fps, 4));
    vec4 text;

    if(frame == 0) text = texture(sampler0,vtexCoord);
    else if(frame == 1) text  = texture(sampler1,vtexCoord);
    else if(frame == 2) text  = texture(sampler2,vtexCoord);
    else if(frame == 3) text  = texture(sampler3,vtexCoord);
    fragColor = text ;
}
