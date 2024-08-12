#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform float angle = 2.5;

void main()
{
    mat3 rotation = mat3( vec3(cos(angle),0,-sin(angle)) , vec3(0,1,0), vec3(sin(angle),0,cos(angle))); 
    vec3 P = (rotation * vertex);
    vec3 N = normalize(normalMatrix * normal);
    vec3 NN = normalize(normalMatrix * (rotation * normal));

   
    
    //Parametre de interpolació
    float t = smoothstep(1.45,1.55,vertex.y);
	
    vec3 NewNormal = mix(N,NN,t);
    vec3 NewVertex = mix(vertex,P,t);

    //
    frontColor = vec4(NewNormal.z,NewNormal.z,NewNormal.z,0);

    gl_Position = modelViewProjectionMatrix * vec4(NewVertex, 1.0);
}
