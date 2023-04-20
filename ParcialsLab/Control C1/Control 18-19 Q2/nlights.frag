#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;

uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

in vec3 vN;
in vec3 vP;
in vec3 vV;

uniform int n = 4;
const float pi = 3.141592;

vec4 light(vec3 N, vec3 V, vec3 L) {
	L = normalize(L);
	vec3 R = normalize( 2.0*dot(N,L)*N-L );
	float NdotL = max( 0.0, dot( N,L ) );
	float RdotV = max( 0.0, dot( R,V ) );
	float Idiff = NdotL;
	float Ispec = 0;
	if (NdotL>0) Ispec=pow( RdotV, matShininess );
	return matDiffuse * lightDiffuse * Idiff / sqrt(n) + matSpecular * lightSpecular * Ispec;
}

void main() {
	vec3 N = normalize(vN); vec3 V = normalize(vV); 
    fragColor = vec4(0);
    for (int i = 0; i < n; ++i) {
    	// Sigui r el radi del cercle i centrat al (0, 0)
    	// x = r*cos(angle), y = r*sin(angle)
    	// on angle = 2*pi*i/n
    	vec3 lightPos = vec3(10*cos(2*pi*i/n), 10*sin(2*pi*i/n), 0);
    	vec3 L = lightPos - vP;
    	fragColor += light(N, V, L);
	}
}
