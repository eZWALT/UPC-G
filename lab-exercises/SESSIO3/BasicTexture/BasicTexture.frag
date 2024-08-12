#version 330 core

uniform sampler2D colorMap;
uniform sampler2D colorMap1;
uniform float time;

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;



void main()
{
    fragColor = frontColor * texture(colorMap, vec2(1,1)*vtexCoord);
}
