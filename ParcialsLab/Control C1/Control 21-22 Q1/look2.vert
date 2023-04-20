#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelMatrix;

//uniform float angle = 0.5;
uniform float time;

void main() {
    float angle = cos(time);
    vec3 N = normalize(normalMatrix * normal);
    vtexCoord = texCoord;
    frontColor = vec4(N.z);
    if (vertex.y > 1.45) {
	mat4 glRotate = mat4(vec4(cos(angle), 0, -sin(angle), 0), vec4(0, 1, 0, 0), vec4(sin(angle), 0, cos(angle), 0), vec4(0, 0, 0, 1));
    	vec3 P = (glRotate * vec4(vertex, 1.0)).xyz;
     	float t = smoothstep(1.45, 1.55, vertex.y);
    	vec3 vertex2 = mix(vertex, P, t);
    	vec3 normal2 = (glRotate * vec4(normal, 0.0)).xyz;
    	vec3 N2 = mix(normal, normal2, t);
    	N = normalize(normalMatrix * N2);
    	gl_Position = modelViewProjectionMatrix * vec4(vertex2, 1.0);
	}
	else {
		gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
		
	}
	frontColor = vec4(N.z);
}
