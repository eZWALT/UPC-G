#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;

in vec2 st;

bool inside() {
	return st.s >= 0.05 && st.s <= 0.95 && st.t >= 0.05 && st.t <= 0.95;
}

void main() {
	if (inside()) fragColor = gfrontColor;
	else fragColor = vec4(0, 0, 0, 1.0);
}
