#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 6) out;

uniform vec3 boundingBoxMin;
uniform mat4 modelViewProjectionMatrix;

in vec4 vfrontColor[];
out vec4 gfrontColor;

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix * gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();

	gfrontColor = vec4(0);
	for( int i = 0 ; i < 3 ; i++ )
	{
		
		vec4 P = gl_in[i].gl_Position;
		P.y *= 0.01;
		P.y += boundingBoxMin.y;
		gl_Position = modelViewProjectionMatrix * P;
		EmitVertex();
	}
	EndPrimitive();
}
