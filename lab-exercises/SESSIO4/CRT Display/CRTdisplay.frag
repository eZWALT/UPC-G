#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform int n = 7;

void main()
{

    if( int(mod(gl_FragCoord.y,n)) == 0) fragColor = frontColor;
    else discard;
}
