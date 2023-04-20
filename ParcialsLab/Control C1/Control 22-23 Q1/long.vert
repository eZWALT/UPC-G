#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMin; // cantonada mínima de la capsa englobant
uniform vec3 boundingBoxMax; // cantonada màxima de la capsa englobant

uniform float t = 0.4;
uniform float scale = 4.0;

void main() {
    vec3 N = normalize(normalMatrix * normal);
    float c = mix(boundingBoxMin.y, boundingBoxMax.y, t);
    vec3 vertex2 = vertex;
    if (vertex.y < c) {
    	mat4 glScale = mat4(vec4(1, 0, 0, 0), vec4(0, scale, 0, 0), vec4(0, 0, 1, 0), vec4(0, 0, 0, 1));
    	vertex2 = (glScale*vec4(vertex2, 1.0)).xyz;
	}
	else {
		float delta = c*scale - c;
		mat4 glTranslate = mat4(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0), vec4(0, 0, 1, 0), vec4(0, delta, 0, 1));
		vertex2 = (glTranslate*vec4(vertex2, 1.0)).xyz;
	}
    frontColor = vec4(color,1.0) * N.z;
    gl_Position = modelViewProjectionMatrix * vec4(vertex2, 1.0);
}
