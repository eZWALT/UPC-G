#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D gio;
uniform float time;

vec2 eyePostion = vec2(0.393, 0.652);
vec2 mouthOffset = vec2(0.057, 1 - 0.172);

void main()
{

    if(fract(time) <= 0.5) fragColor = texture(gio, vtexCoord);
    else{
        float distance = length(vtexCoord - eyePostion);
        if(distance <= 0.025) fragColor = texture(gio, vtexCoord + mouthOffset );
        else fragColor = texture(gio, vtexCoord);
    }
}
