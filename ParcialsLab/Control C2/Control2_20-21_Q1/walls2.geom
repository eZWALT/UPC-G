#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform vec3 boundingBoxMin, boundingBoxMax;
uniform mat4 modelViewProjectionMatrix;

// Colors
const vec4 verd = vec4(0, 1, 0, 0);
const vec4 vermell = vec4(1, 0, 0, 0);
const vec4 blau = vec4(0, 0, 1, 0);

void paint(vec3 vertex, vec4 color) {
	gfrontColor = color;
	gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
	EmitVertex();
}

bool inside(vec4 v) {
	bool insidex = v.x <= boundingBoxMax.x && v.x >= boundingBoxMin.x;
	bool insidey = v.y <= boundingBoxMax.x && v.y >= boundingBoxMin.y;
	bool insidez = v.z <= boundingBoxMax.x && v.z >= boundingBoxMin.z;
	return insidex && insidey && insidez;
}

void main( void ) {
	for (int i = 0; i < 3; i++)	{
		gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		if (inside(gl_Position)) gfrontColor = 2*gfrontColor;
		EmitVertex();
	}
	EndPrimitive();
	if (gl_PrimitiveIDIn == 0) {
		float xmin = boundingBoxMin.x, xmax = boundingBoxMax.x;
		float ymin = boundingBoxMin.y, ymax = boundingBoxMax.y;
		float zmin = boundingBoxMin.z, zmax = boundingBoxMax.z;
		
		// Cara verda inferior
		paint(vec3(xmin, ymin, zmin), verd);
		paint(vec3(xmin, ymin, zmax), verd);
		paint(vec3(xmax, ymin, zmin), verd);
		paint(vec3(xmax, ymin, zmax), verd);
		EndPrimitive();
		
		// Cara vermella dreta
		paint(vec3(xmax, ymax, zmin), vermell);
		paint(vec3(xmax, ymin, zmin), vermell);
		paint(vec3(xmax, ymax, zmax), vermell);
		paint(vec3(xmax, ymin, zmax), vermell);
		EndPrimitive();
		
		// Cara vermella esquerra
		paint(vec3(xmin, ymin, zmin), vermell);
		paint(vec3(xmin, ymax, zmin), vermell);
		paint(vec3(xmin, ymin, zmax), vermell);
		paint(vec3(xmin, ymax, zmax), vermell);
		EndPrimitive();
		
		// Cara blava darrera
		paint(vec3(xmin, ymin, zmin), blau);
		paint(vec3(xmin, ymax, zmin), blau);
		paint(vec3(xmax, ymin, zmin), blau);
		paint(vec3(xmax, ymax, zmin), blau);
		EndPrimitive();
	}
}
