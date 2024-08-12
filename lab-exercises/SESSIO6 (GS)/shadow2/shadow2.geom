#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 12) out;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
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

	if(gl_PrimitiveIDIn == 0){

		vec3 C = (boundingBoxMax + boundingBoxMin)/2;
		float R = distance(boundingBoxMax,boundingBoxMin)/2;
		float y = boundingBoxMin.y - 0.01;
		
		gfrontColor = vec4(0,1,1,1);		
		gl_Position = modelViewProjectionMatrix * vec4(C.x+R, y ,C.z-R,1.0);
		EmitVertex();
		gl_Position = modelViewProjectionMatrix * vec4(C.x-R, y ,C.z-R,1.0);
		EmitVertex();
		gl_Position = modelViewProjectionMatrix * vec4(C.x+R,y,C.z+R,1.0);
		EmitVertex();
		gl_Position = modelViewProjectionMatrix * vec4(C.x-R,y,C.z+R,1.0);
		EmitVertex();
		EndPrimitive();

	}
}
