#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform mat3 normalMatrix;
uniform mat4 modelViewProjectionMatrix;
uniform float step = 0.20;
vec4 GREY = vec4(0.8, 0.8, 0.8, 1);

void CubeVertex(bool x, bool y, bool z,vec3 bar){
	
	vec3 R = vec3(0,0,0);
	if(x) R.x = 0.5;
	if(y) R.y = 0.5;
	if(z) R.z = 0.5;

	gl_Position = modelViewProjectionMatrix * vec4(bar + R, 1.0);
	EmitVertex();
}



void main( void )
{
	vec3 BarC = (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz)/3;
	BarC.x = int(BarC.x/step)*step;
	BarC.y = int(BarC.y/step)*step;
	BarC.z = int(BarC.z/step)*step;
	//PREGUNTAR AL CARLOS!!!!!!!!!!!

	//front 
	gfrontColor = GREY * (normalMatrix * vec3(0,0,1)).z;
	CubeVertex(false,false,true,BarC); 
	CubeVertex(true,false,true,BarC);
	CubeVertex(false,true,true,BarC); 
	CubeVertex(true,true,true,BarC); 
	EndPrimitive();

	//back 
	gfrontColor = GREY * (normalMatrix * vec3(0,0,-1)).z;
	CubeVertex(false,true,false,BarC); 
	CubeVertex(true,true,false,BarC); 
	CubeVertex(false,false,false,BarC); 
	CubeVertex(true,false,false,BarC);
	EndPrimitive();

	//left
	gfrontColor = GREY * (normalMatrix * vec3(-1,0,0)).z;
	CubeVertex(false,false,false,BarC); 
	CubeVertex(false,false,true,BarC); 
	CubeVertex(false,true,false,BarC); 
	CubeVertex(false,true,true,BarC);
	EndPrimitive();

	//rigth
	gfrontColor = GREY * (normalMatrix * vec3(1,0,0)).z;
	CubeVertex(true,true,false,BarC); 
	CubeVertex(true,true,true,BarC); 
	CubeVertex(true,false,false,BarC); 
	CubeVertex(true,false,true,BarC);
	EndPrimitive();

	//top
	gfrontColor = GREY * (normalMatrix * vec3(0,1,0)).z;
	CubeVertex(false,true,true,BarC); 
	CubeVertex(true,true,true,BarC); 
	CubeVertex(false,true,false,BarC); 
	CubeVertex(true,true,false,BarC);
	EndPrimitive();

	//bottom
	gfrontColor = GREY * (normalMatrix * vec3(0,-1,0)).z;
	CubeVertex(true,false,false,BarC); 
	CubeVertex(true,false,true,BarC); 
	CubeVertex(false,false,false,BarC); 
	CubeVertex(false,false,true,BarC);
	EndPrimitive();



}
