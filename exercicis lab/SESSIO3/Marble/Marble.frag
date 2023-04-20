#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec4 P;
in vec3 N;

uniform sampler2D sampler;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

vec4 shading(vec3 N, vec3 Pos, vec4 diffuse) {
 vec3 lightPos = vec3(0.0,0.0,2.0);
 vec3 L = normalize( lightPos - Pos );
 vec3 V = normalize( -Pos);
 vec3 R = reflect(-L,N);
 float NdotL = max( 0.0, dot( N,L ) );
 float RdotV = max( 0.0, dot( R,V ) );
 float Ispec = pow( RdotV, 20.0 );
 return diffuse * NdotL + Ispec;
}

vec4 WHITE = vec4(1,1,1,1);
vec4 REDDISH = vec4(0.5,0.2,0.2,1);

void main()
{

    vec4 Scoefficients = vec4(0,1,-1,0);
    Scoefficients *= 0.3;
    vec4 Tcoefficients = vec4(-2,-1,1,0);
    Tcoefficients *= 0.3; 
    
    float s = dot(P,Scoefficients);
    float t = dot(P,Tcoefficients);

    //we get the red component of the rgba of the texture in the point (s,t)
    float v = texture(sampler,vec2(s,t)).x;
    vec4 diffuse = WHITE;

    if(v < 0.5) diffuse = mix(WHITE, REDDISH,fract(v));
    if(v < 1) diffuse = mix(REDDISH,WHITE,fract(v));  



    vec3 NewN = normalize(normalMatrix * N);
    vec3 NewP = (modelViewMatrix * P).xyz; 

    fragColor = shading(NewN,NewP,diffuse);
}
