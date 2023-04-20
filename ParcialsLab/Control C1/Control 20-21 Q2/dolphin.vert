#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMin; // cantonada mínima de la capsa englobant
uniform vec3 boundingBoxMax; // cantonada màxima de la capsa englobant

uniform float time;
const float pi = 3.1416;

float punt(float x) {
	return (boundingBoxMax.y - boundingBoxMin.y)*x + boundingBoxMin.y;
}

void main() {
    vec3 N = normalize(normalMatrix * normal), V = vertex;
    frontColor = vec4(0.8) * N.z;
    vtexCoord = texCoord;
    
    float RT = punt(0.35), RD = punt(0.65);
    
    if (vertex.y <= RT) {
    	float TT2 = punt(0.05), TT1 = punt(0.5);
    	float factor = smoothstep(TT2, TT1, vertex.y);
    	float angle = min(0.0, -pi/4.0*sin(time));
    	mat4 glRotate = mat4(vec4(1, 0, 0, 0), vec4(0, cos(angle), sin(angle), 0), vec4(0, -sin(angle), cos(angle), 0), vec4(0, 0, 0, 1));
    	vec3 vertex2 = (glRotate * vec4(vertex, 1.0)).xyz;
    	V = mix(vertex2, vertex, factor);
	}
	else if (vertex.y >= RD) {
		float TD1 = punt(0.55), TD2 = punt(0.75);
		float factor = smoothstep(TD1, TD2, vertex.y);
		float angle = pi/32.0*sin(time + 0.25);
		mat4 glRotate = mat4(vec4(1, 0, 0, 0), vec4(0, cos(angle), sin(angle), 0), vec4(0, -sin(angle), cos(angle), 0), vec4(0, 0, 0, 1));
		vec3 vertex2 = (glRotate * vec4(vertex, 1.0)).xyz;
		V = mix(vertex, vertex2, factor);
	}
    
    gl_Position = modelViewProjectionMatrix * vec4(V, 1.0);
}
