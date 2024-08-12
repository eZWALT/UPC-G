#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D map;
uniform float time;
uniform float a = 0.5;

const float PI = acos(-1.0);

void main()
{
    vec4 color = texture(map,vtexCoord);
    float c = color[0];
    c = max(c, color[1]);
    c = max(c, color[2]);
    //we got the max value of rgb

    vec2 u = vec2(c,c);

    float theta = 2 * PI * time; 
    mat2 rotation = mat2(vec2(cos(theta) , sin(theta)),vec2(-sin(theta), cos(theta)));
    
    u = u * rotation;


    fragColor = texture(map, vtexCoord + (a/100.0) * u);
}
