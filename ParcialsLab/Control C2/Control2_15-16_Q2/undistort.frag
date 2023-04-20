#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D colorMap;
in vec2 st;

void main() {
	vec2 Q = 2*st - vec2(1, 1);
	float r = length(Q);
	float r_3 = r*r*r, r_5 = r_3*r*r;
	
	float r2 = r + 0.22*r_3 + 0.24*r_5;
	vec2 Q2 = r2*normalize(Q);
	vec2 st2 = (Q2 + vec2(1, 1))/2;
	
	if (st2.s < 0 || st2.s > 1 || st2.t < 0 || st2.t > 1) fragColor = vec4(0);
    else fragColor = texture(colorMap, st2);
}
