#version 330 core

out vec4 fragColor;

in vec3 vP;
in vec3 vN;

uniform float edge0 = 0.35;
uniform float edge1 = 0.4;

void main() {
	vec3 V = normalize(-vP); vec3 N = normalize(vN);
	float c = dot(N, V);
	
	// if (c < edge0) -> 0.0, if (c > edge1) -> 1.0 ja ho fa la funció smoothstep
	fragColor = vec4(smoothstep(edge0, edge1, c));
}
