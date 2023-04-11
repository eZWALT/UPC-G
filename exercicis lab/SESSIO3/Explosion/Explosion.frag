#version 330 core

uniform sampler2D colorMap;
uniform float fps = 30.0;
uniform float time;

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

void main()
{
    float xproportion = 1./8.;
    float yproportion = 1./6.;
    
    //en quin dels 0-47 frames estem ara mateix , fotograma en funcio del temps modul 48 
    //fps es frequencia de imatges per segon, unitats: fotograma / segon 
    int frameNumber = int( mod(time * fps, 48) );

    //Calcul de la posicio on es troba ubicat el frame actual, cal invertir la altura ja que les coordenades de texutra van al reves que la imatge en quant a altura
    vec2 Position = vec2( mod(frameNumber, 8) * xproportion , (5 - frameNumber/8) * yproportion);

    fragColor = texture(colorMap,(vtexCoord * vec2(xproportion,yproportion)) + Position );
    fragColor = fragColor * fragColor.a;

    
}
