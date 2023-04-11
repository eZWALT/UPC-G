#version 330 core

in vec4 frontColor;
in vec3 P;
in vec2 vtexCoord;
out vec4 fragColor;

//s es X 
//t es Y

void paint(int x, int y){
    float radi = 0.5; 
    if(distance(vtexCoord, vec2(x,y)) <= radi) fragColor = vec4(1,0,0,0);
}

void main()
{
    fragColor = vec4(0.0);


    bool points[48];    
    points[5*8 + 1] = true;
    points[2*8 + 4] = true;
    points[3*8 + 5] = true;
    for(int i = 0; i < 48; i = i + 8){
        points[i] = true;
        points[i+4] = true;
    }

    for(int i = 0; i < 6; ++i){
        for(int j = 0; i < 4; ++j){
            if(points[i*8+j]) paint(i,j);
        }
    }






    
}
