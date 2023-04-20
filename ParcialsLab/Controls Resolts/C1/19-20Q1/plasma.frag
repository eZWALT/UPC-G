#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D fbm;
uniform float time;
const float pi = 3.14159;

const vec4 vermell = vec4(1, 0, 0, 1);
const vec4 groc = vec4(1, 1, 0, 1);
const vec4 verd = vec4(0, 1, 0, 1);
const vec4 cian = vec4(0, 1, 1, 1);
const vec4 blau = vec4(0, 0, 1, 1);
const vec4 magenta = vec4(1, 0, 1, 1);

void main()
{
    fragColor = texture(fbm,vtexCoord);

    float r = fragColor.x;
    float frequency = 0.1;
    float phase = 2 * pi * r;
    float v = 1 * sin(2 * pi * frequency * time + phase);
 

    if (v < -2./3) fragColor = mix(vermell, groc, 3.*(v+1.));
    else if (v < -1./3) fragColor = mix(groc, verd, 3.*(v + 2./3));
    else if (v < 0) fragColor = mix(verd, cian, 3.*(v + 1./3));
    else if (v < 1./3) fragColor = mix(cian, blau, 3.*v);
    else if (v < 2./3) fragColor = mix(blau, magenta, 3.*(v - 1./3));
    else fragColor = mix(magenta, vermell, 3.*(v - 2./3));
}
