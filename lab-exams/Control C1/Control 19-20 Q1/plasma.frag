#version 330 core

out vec4 fragColor;
in vec2 st;

uniform sampler2D fbm;

uniform float time;
const float pi = 3.14159;

const vec4 vermell = vec4(1, 0, 0, 1);
const vec4 groc = vec4(1, 1, 0, 1);
const vec4 verd = vec4(0, 1, 0, 1);
const vec4 cian = vec4(0, 1, 1, 1);
const vec4 blau = vec4(0, 0, 1, 1);
const vec4 magenta = vec4(1, 0, 1, 1);

void main() {
	float r = texture(fbm, st).r;
	float v = sin(2*pi*0.1*time + 2*pi*r);
	v = 3*(v + 1); 
	
	if (r < 0) fragColor = vermell;
	else if (r < 1) fragColor = mix(vermell, groc, r);
	else if (r < 2) fragColor = mix(groc, verd, r);
	else if (r < 3) fragColor = mix(verd, cian, r);
	else if (r < 4) fragColor = mix(cian, blau, r);
	else if (r < 5) fragColor = mix(blau, magenta, r);
	else fragColor = mix(magenta, vermell, r);
}
