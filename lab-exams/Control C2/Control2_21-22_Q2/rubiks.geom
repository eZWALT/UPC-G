#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform float time;
out vec2 st;

uniform mat4 modelViewProjectionMatrix;
uniform vec3 boundingBoxMax;

const vec4 red = vec4(1, 0, 0, 1);
const vec4 orange = vec4(1, 0.6, 0, 1);
const vec4 blue = vec4(0, 0, 1, 1);
const vec4 green = vec4(0, 1, 0, 1);
const vec4 white = vec4(1);
const vec4 yellow = vec4(1, 1, 0, 1);

void paint(vec3 vertex, vec2 st2, vec4 color) {
	gfrontColor = color;
	vec3 pos = vertex;
	if (gl_PrimitiveIDIn < 4) {
			float angle = time;
			mat3 rotacio = mat3(vec3(cos(angle), sin(angle), 0), vec3(-sin(angle), cos(angle), 0), vec3(0, 0, 1));
			pos = rotacio*pos;
	}
	st = st2;
	gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);
	EmitVertex();
}

void drawCube(vec3 C) {
		float xmin = C.x - 1, xmax = C.x + 1;
		float ymin = C.y -1, ymax = C.y + 1;
		float zmin = C.z -1, zmax = C.z + 1;		
		
		// Cara superior
		paint(vec3(xmin, ymax, zmin), vec2(0, 1), red);
		paint(vec3(xmin, ymax, zmax), vec2(0, 0), red);
		paint(vec3(xmax, ymax, zmin), vec2(1, 1), red);
		paint(vec3(xmax, ymax, zmax), vec2(1, 0), red);
		EndPrimitive();
		
		// Cara inferior
		paint(vec3(xmin, ymin, zmin), vec2(0, 1), orange);
		paint(vec3(xmin, ymin, zmax), vec2(0, 0), orange);
		paint(vec3(xmax, ymin, zmin), vec2(1, 1), orange);
		paint(vec3(xmax, ymin, zmax), vec2(1, 0), orange);
		EndPrimitive();
		
		// Cara dreta
		paint(vec3(xmax, ymax, zmin), vec2(0, 1), blue);
		paint(vec3(xmax, ymin, zmin), vec2(0, 0), blue);
		paint(vec3(xmax, ymax, zmax), vec2(1, 1), blue);
		paint(vec3(xmax, ymin, zmax), vec2(1, 0), blue);
		EndPrimitive();
		
		// Cara esquerra
		paint(vec3(xmin, ymin, zmin), vec2(0, 1), green);
		paint(vec3(xmin, ymax, zmin), vec2(0, 0), green);
		paint(vec3(xmin, ymin, zmax), vec2(1, 1), green);
		paint(vec3(xmin, ymax, zmax), vec2(1, 0), green);
		EndPrimitive();
		
		// Cara darrera
		paint(vec3(xmin, ymin, zmin), vec2(0, 1), white);
		paint(vec3(xmin, ymax, zmin), vec2(0, 0), white);
		paint(vec3(xmax, ymin, zmin), vec2(1, 1), white);
		paint(vec3(xmax, ymax, zmin), vec2(1, 0), white);
		EndPrimitive();
		
		// Cara davant
		paint(vec3(xmin, ymax, zmax), vec2(0, 1), yellow);
		paint(vec3(xmin, ymin, zmax), vec2(0, 0), yellow);
		paint(vec3(xmax, ymax, zmax), vec2(1, 1), yellow);
		paint(vec3(xmax, ymin, zmax), vec2(1, 0), yellow);
		EndPrimitive();
}

void main( void ) {
	if (gl_PrimitiveIDIn == 0) drawCube(vec3(-1, -1, -1));
	else if (gl_PrimitiveIDIn == 1) drawCube(vec3(1, -1, -1));
	else if (gl_PrimitiveIDIn == 2) drawCube(vec3(-1, 1, -1));
	else if (gl_PrimitiveIDIn == 3) drawCube(vec3(1, 1, -1));
	else if (gl_PrimitiveIDIn == 4) drawCube(vec3(-1, -1, 1));
	else if (gl_PrimitiveIDIn == 5) drawCube(vec3(1, -1, 1));
	else if (gl_PrimitiveIDIn == 6) drawCube(vec3(-1, 1, 1));
	else if (gl_PrimitiveIDIn == 7) drawCube(vec3(1, 1, 1));
	else return;
}
