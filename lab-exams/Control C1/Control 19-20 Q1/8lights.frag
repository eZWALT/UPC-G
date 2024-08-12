#version 330 core

out vec4 fragColor;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

uniform mat4 projectionMatrixInverse;

in vec3 vN;
in vec3 vV;
in vec3 vP;

vec4 phong(vec3 llum, vec3 N, vec3 V) {
	vec3 L = normalize(llum - vP);
	vec3 R = normalize(2.0*dot(N,L)*N-L);
        float specular = dot(N, L) < 0 ? 0.0f : 1.0f;
	return lightDiffuse*matDiffuse*max(0.0f, dot(N, L))/2.0 + lightSpecular*matSpecular*max(0.0f, pow(dot(R, V), matShininess))*specular;
}

void main() {
	vec3 N = normalize(vN);
	vec3 V = normalize(vV);
	vec3 l1 = vec3(boundingBoxMin); vec3 l8 = vec3(boundingBoxMax);
	vec3 l2 = vec3(l1.x, l1.y, l8.z); vec3 l3 = vec3(l1.x, l8.y, l1.z);
	vec3 l4 = vec3(l1.x, l8.y, l8.z); vec3 l5 = vec3(l8.x, l1.y, l1.z);
	vec3 l6 = vec3(l8.x, l1.y, l8.z); vec3 l7 = vec3(l8.x, l8.y, l1.z);
        fragColor = phong(l1, N, V) + phong(l2, N, V) + phong(l3, N, V) + phong(l4, N, V) + phong(l5, N, V) + phong(l6, N, V) + phong(l7, N, V) + phong(l8, N, V); 
}
