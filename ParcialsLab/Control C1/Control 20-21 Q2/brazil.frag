#version 330 core

in vec2 st;
out vec4 fragColor;

bool inside(vec2 C, float r) {
	vec2 v = st - C;
	v = vec2(v.s, v.t/2);
	return length(v) <= r;
}

bool inside2() {
	vec2 C = vec2(0.5, 0.6);
	vec2 v = st - C;
	v = vec2(v.s, v.t);
	float x = 0.02, r = 0.25;  
	return length(v) > r - x && length(v) < r + x && inside(vec2(0.5, 0.5), 0.13);
}

bool insideSquare(float min, float max) {
	return st.s >= min && st.s <= max && st.t >= min && st.t <= max;
}

void main() {
	if (inside(vec2(0.5, 0.5), 0.13)) fragColor = vec4(0, 0.4, 0.8, 1); // Blue
	else if (insideSquare(0.15, 0.85)) fragColor = vec4(1, 1, 0, 1);	// Yellow
    else fragColor = vec4(0, 0.7, 0.3, 1);	// Green
    if (inside2()) fragColor = vec4(1, 1, 0, 1);	// Yellow
}
