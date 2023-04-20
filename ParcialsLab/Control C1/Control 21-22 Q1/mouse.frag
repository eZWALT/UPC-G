#version 330 core

out vec4 fragColor;
in vec2 vtexCoord;

//uniform int mode = 2;
uniform float time;

bool insideC(vec2 C, float r) {
	return distance(vtexCoord, C) < r;
}

void print1() {
	if (insideC(vec2(0.5, 0.4), 0.35))
		fragColor = vec4(0);
	else if (insideC(vec2(0.2, 0.8), 0.2) || insideC(vec2(0.8, 0.8), 0.2))
		fragColor = vec4(0);
	else fragColor = vec4(0.8);
}

void print2() {
	vec2 C1 = vec2(0.45, 0.5), C2 = vec2(0.55, 0.5);
	vec2 v1 = vtexCoord - C1, v2 = vtexCoord - C2;
	v1 = vec2(v1.x, v1.y/2), v2 = vec2(v2.x, v2.y/2);
	
	float r1 = 0.1;
	if (length(v1) <= r1 || length(v2) <= r1)
		fragColor = vec4(1.0, 0.8, 0.6, 1.0);
		
	vec2 C3 = vec2(0.5, 0.3);
	vec2 v3 = vtexCoord - C3;
	v3 = vec2(v3.x/2, v3.y);
	float r2 = 0.15;
	if (length(v3) <= r2)
		fragColor = vec4(1.0, 0.8, 0.6, 1.0);
}

void print3() {
	vec2 C1 = vec2(0.45, 0.5), C2 = vec2(0.55, 0.5);
	vec2 v1 = vtexCoord - C1, v2 = vtexCoord - C2;
	v1 = vec2(v1.x*2, v1.y/1.2), v2 = vec2(v2.x*2, v2.y/1.2);
	
	float r1 = 0.11;
	if (length(v1) <= r1 || length(v2) <= r1)
		fragColor = vec4(1.0);
	
	vec2 C3 = vec2(0.45, 0.45), C4 = vec2(0.55, 0.45);
	vec2 v3 = vtexCoord - C3, v4 = vtexCoord - C4;
	v3 = vec2(v3.x*2, v3.y/1.2), v4 = vec2(v4.x*2, v4.y/1.2);
	
	float r2 = 0.05;
	if (length(v3) <= r2 || length(v4) <= r2)
		fragColor = vec4(0.0);
}

void main() {
	int mode = int(time)%3;
    print1();
    if (mode > 0) print2();
    if (mode > 1) print3();
}
