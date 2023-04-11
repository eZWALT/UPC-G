#version 330 core

uniform sampler2D colorMap;
uniform sampler2D colorMap1;
uniform float time;
uniform float speed = 0.1;

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;




void main()
{
    fragColor = frontColor * texture(colorMap, speed*time*vec2(1,1) + vec2(1,1)*vtexCoord);
}
