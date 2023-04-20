#version 330 core

in vec2 vtexCoord;
out vec4 fragColor;

uniform sampler2D window;		// interior
uniform sampler2D palm1;		// palm-tree
uniform sampler2D background2;	// dunes

in vec3 vN;

uniform float time;

void main() {
	vec4 C = texture(window, vtexCoord);
	if (C.a == 1.0) fragColor = C;
	else if (C.a < 1.0) {
		vec3 N = normalize(vN);
		vec4 D = texture(palm1, vtexCoord + 0.25*N.xy + vec2(0.1*sin(time)*vtexCoord.t, 0));
		if (D.a >= 0.5) fragColor = D;
		else fragColor = texture(background2, vtexCoord + 0.5*N.xy);
	}
}
