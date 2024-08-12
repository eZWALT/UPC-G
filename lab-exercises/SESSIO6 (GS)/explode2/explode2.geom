#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 3) out;

in vec4 vfrontColor[];
in vec3 vnormal[];
out vec4 gfrontColor;

uniform float time;
uniform mat4 modelViewProjectionMatrix;
const float speed = 0.5;
const float angSpeed = 4;

mat4 rotateZ(float a) {
	    return mat4 (   vec4(cos(a), -sin(a), 0.0,0.0),
	                    vec4(sin(a), cos(a), 0.0,0.0),
	                    vec4(0.0, 0.0, 1.0,0.0),
	                    vec4(0.0,0.0,0.0,1.0));
}
	
mat4 translate(vec3 t) {
	    return mat4 (   vec4(1.0, 0.0, 0.0, 0.0),
	                    vec4(0.0, 1.0, 0.0, 0.0),
	                    vec4(0.0, 0.0, 1.0, 0.0),
	                    vec4(t.x, t.y, t.z, 1.0));
}
   

void main( void )
{
	vec3 baricenter = (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz)/3;
	baricenter = baricenter - vec3(baricenter.x, baricenter.y, baricenter.z -1);
	vec3 Navg = (vnormal[0] + vnormal[1] + vnormal[2])/3;

	//first we need to translate the object into the baricenter, then apply the rotation, return it back to the origin and translate it finally
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix * (gl_in[i].gl_Position * translate(speed * time * Navg) * translate(baricenter) * rotateZ(angSpeed * time) * translate(-baricenter));
		EmitVertex();
	}
    EndPrimitive();
}
