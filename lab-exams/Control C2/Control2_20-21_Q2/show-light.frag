#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;

in vec2 gtexCoord;
uniform sampler2D colorMap;

void main() {
	if (gtexCoord.s < 0) fragColor = gfrontColor;
	else {
		vec4 color = texture(colorMap, gtexCoord);
		fragColor = color*color.w;
		if (fragColor.w < 0.1) discard;
	}
}
