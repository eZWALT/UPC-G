#version 330 core

in vec2 st;
out vec4 fragColor;
uniform sampler2D colormap;
in vec3 vN;

bool inside(vec2 C, float r) {
	return distance(st, C) <= r;
} 

void print1() {
	vec2 C1 = vec2(0.34, 0.65) - vec2(0.1*vN.xy);
	vec2 C2 = vec2(0.66, 0.65) - vec2(0.1*vN.xy);
	if (inside(C1, 0.05) || inside(C2, 0.05))
		fragColor = vec4(0);
	else fragColor = texture(colormap, st);
}

void main() {
	print1();
}
