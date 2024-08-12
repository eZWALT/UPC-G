#version 330 core

in vec2 vs;
out vec4 fragColor;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition; // Eye Space

uniform float time;
//uniform int mode = 2;

bool insideC(vec2 C, float r) {
	return distance(vs, C) < r;
}

void print1() {
	if (insideC(vec2(0, 0), 1.0))
		fragColor = vec4(0);
	else discard;
}

void print2() {
	if (insideC(vec2(0, 0), 1.0)) {
		vec3 P = vec3(vs.x, vs.y, sqrt(1 - vs.x*vs.x - vs.y*vs.y));
		fragColor = vec4(P.z);
	}
	else discard;
}

void print3() {
	if (insideC(vec2(0, 0), 1.0)) {
		vec3 P = vec3(vs.x, vs.y, sqrt(1 - vs.x*vs.x - vs.y*vs.y));
		vec3 N = normalize(normalMatrix*P);
		P = (modelViewMatrix*vec4(P, 1.0)).xyz;
		
		vec3 L = normalize(lightPosition.xyz - P);
		vec3 R = normalize(2.0*dot(N, L)*N - L);
		float specular = dot(N, L) < 0 ? 0.0f : 1.0f;
		vec3 V = normalize(-P);
		fragColor = lightAmbient*matAmbient + lightDiffuse*matDiffuse*max(0.0f, dot(N, L)) + lightSpecular*matSpecular*max(0.0f, pow(dot(R, V), matShininess))*specular;
	}
	else discard;
}

void main() {
    int mode = int(time)%3;
	
    if (mode == 0) print1();
    else if (mode == 1) print2();
    else print3();
}
