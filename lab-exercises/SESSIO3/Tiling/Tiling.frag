#version 330 core

uniform sampler2D colorMap;

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

void main()
{
    fragColor = texture(colorMap, vtexCoord);
}
