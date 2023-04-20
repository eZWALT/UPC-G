#version 330 core

in vec2 st;
out vec4 fragColor;

uniform sampler2D colorMap;

uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform vec4 matSpecular;
uniform float matShininess;

in vec3 vN;
in vec3 vP;
in vec3 vV;

uniform float time;

vec4 light() {
	vec3 N = normalize(vN); vec3 V = normalize(vV);
	vec3 L = normalize(lightPosition.xyz - vP);
	vec3 R = normalize(2.0*dot(N, L)*N - L);
	float NdotL = max(0.0, dot(N, L));
	float RdotV = max(0.0, dot(R, V));
	float Idiff = NdotL;
	float Ispec = 0;
	if (NdotL > 0) Ispec = pow(RdotV, matShininess);
	
	vec4 lightDiffuse;
	if (mod(floor(time), 2) == 0)
        lightDiffuse = mix(vec4(0), vec4(0.8), fract(time));
    else
        lightDiffuse = mix(vec4(0.8), vec4(0), fract(time));
	
	int pos = int(time/2)%48; // 48 == total de frames
	// Modificat perquè sigui el de frames 8x6
	vec2 vtexCoord = vec2(st.s/8.0, st.t/6.0) + vec2(pos/8.0, -1/6.0 - (pos/8)/6.0);
	vec4 matDiffuse = texture(colorMap, vtexCoord);
	
	return matDiffuse * lightDiffuse * Idiff + matSpecular * lightSpecular * Ispec;
}

void main() {
    fragColor = light();
}
