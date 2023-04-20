#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D digits;

void main()
{
    vec2 tex = vec2(vtexCoord.x*6, vtexCoord.y);
    if(tex.s < 1){
        tex.s = fract(tex.s)/10+ 0.4;
    }
    else if(tex.s < 2){
        tex.s = fract(tex.s)/10 + 0.1;
    }
    else if(tex.s < 3){
        tex.s = fract(tex.s)/10 + 0.5; 
    }
    else if(tex.s < 4){
        tex.s = fract(tex.s)/10 + 0.7;
    }
    else if(tex.s < 5){
        tex.s = fract(tex.s)/10 + 0.5;
    }
    else if(tex.s < 6){
        tex.s = fract(tex.s)/10 + 0.6;
    }

    fragColor = texture(digits,tex);
    
}
