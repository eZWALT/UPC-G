#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 P;

void main()
{
	float radi = 0.5;
	if (distance(P.xy, vec2(0.25,0)) < radi && distance(P.xy, vec2(0.0,0)) > radi )
		fragColor = vec4(1,0,0,0);
	else if (P.x > 0 && P.y > 0)
		fragColor = vec4(0,1,0,0);
	else if (P.x < 0 && P.y > 0)
		fragColor = vec4(0,1,1,0);
	else
		fragColor = frontColor;
}
 
