#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

in vec4 vfrontColor[];
in vec3 vnormal[];
out vec4 gfrontColor;

uniform float time;
uniform mat4 modelViewProjectionMatrix;
const float speed = 0.5;

void main( void )
{
	vec3 displace = speed * time * (vnormal[0] + vnormal[1] + vnormal[2])/3;
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix *( gl_in[i].gl_Position + vec4(displace,0));
		EmitVertex();
	}
    EndPrimitive();
}
