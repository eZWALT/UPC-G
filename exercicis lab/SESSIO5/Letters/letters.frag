#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 P;
in vec2 vtexCoord;

void main()
{
	/*
	float radi = 0.5;
	if (distance(P.xy, vec2(0.25,0)) < radi && distance(P.xy, vec2(0.0,0)) > radi )
		fragColor = vec4(1,0,0,0);
	else if (P.x > 0 && P.y > 0)
		fragColor = vec4(0,1,0,0);
	else if (P.x < 0 && P.y > 0)
		fragColor = vec4(0,1,1,0);
	else
		fragColor = frontColor;
	*/
	fragColor = vec4(0.5);
	/*if (vtexCoord.t < 1 || vtexCoord.t > 4) fragColor = vec4(0);
	if (vtexCoord.t > 2 && vtexCoord.t < 3) fragColor = vec4(0);
	if (vtexCoord.s < 1 && vtexCoord.t > 3) fragColor = vec4(0);
	if (vtexCoord.s > 4 && vtexCoord.t < 3) fragColor = vec4(0);*/
	
	
		/* CODE FOR A 'S'
	float r = 0.6;
	vec2 c = vec2(3,5);
	if (distance(vtexCoord, c) < 1 && distance(vtexCoord, c) > r) fragColor = vec4(0);
	vec2 v = vtexCoord - c;
	if (v.s > 0 && v.t < 0) fragColor = vec4(0.5);
	
	c = vec2(3,4-r);
	v = vtexCoord - c;
	if (distance(vtexCoord, c) < 1 && distance(vtexCoord, c) > r && !(v.s < 0 && v.t > 0))
		fragColor = vec4(0);
		
		*/
	//v = vtexCoord - c;
	//if (v.s > 0 && v.t < 0) fragColor = vec4(0.5);
	//fragColor = frontColor;);
	
	// CODE FOR MY 'D'
	float r = 0.45;
	vec2 c11 = vec2(0.5, 1.5);
	vec2 c21 = vec2(1.5, 1.5);
	vec2 c31 = vec2(2.5, 1.5);
	vec2 c41 = vec2(3.5, 1.5);
	vec2 c51 = vec2(4.5, 1.5);
	vec2 c61 = vec2(5.5, 2.5);
	vec2 c12 = vec2(0.5, 2.5);
	vec2 c13 = vec2(0.5, 3.5);
	vec2 c14 = vec2(0.5, 4.5);
	vec2 c15 = vec2(0.5, 5.5);
	vec2 c16 = vec2(0.5, 6.5);
	vec2 c17 = vec2(0.5, 7.5);
	vec2 c27 = vec2(1.5, 7.5);
	vec2 c37 = vec2(2.5, 7.5);
	vec2 c47 = vec2(3.5, 7.5);
	vec2 c52 = vec2(4.5, 2.5);
	vec2 c53 = vec2(4.5, 3.5);
	vec2 c54 = vec2(4.5, 4.5);
	vec2 c55 = vec2(4.5, 5.5);
	vec2 c56 = vec2(4.5, 6.5);
	vec2 c = vec2(5/2,7/2);
	if (distance(vtexCoord, c11) < r || 
		distance(vtexCoord, c12) < r || 
		distance(vtexCoord, c13) < r || 
		distance(vtexCoord, c14) < r || 
		distance(vtexCoord, c15) < r || 
		distance(vtexCoord, c16) < r || 
		distance(vtexCoord, c17) < r || 
		distance(vtexCoord, c21) < r || 
		distance(vtexCoord, c31) < r || 
		distance(vtexCoord, c41) < r || 
		distance(vtexCoord, c12) < r || 
		distance(vtexCoord, c27) < r || 
		distance(vtexCoord, c37) < r || 
		distance(vtexCoord, c47) < r || 
		//distance(vtexCoord, c51) < r ||
		distance(vtexCoord, c52) < r ||
		distance(vtexCoord, c53) < r ||
		distance(vtexCoord, c54) < r ||
		distance(vtexCoord, c55) < r ||
		distance(vtexCoord, c56) < r ||
		false
	) fragColor = vec4(0);
		
		/*&& distance(vtexCoord, c) > r*/
	//vec2 v = vtexCoord - c;
	//if (v.s > 0 && v.t < 0) fragColor = vec4(0.5);
	
		
	
}
 
