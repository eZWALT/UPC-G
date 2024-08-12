#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform int mode = 2;



void main()
{
    vec4 ColorPell = vec4(1.0,0.8,0.6,0.0);
    vec4 ColorGris = vec4(0.8,0.8,0.8,0.0);
    vec4 ColorNegg = vec4(0.0,0.0,0.0,0.0);
	vec4 ColorWhit = vec4(1.0,1.0,1.0,1.0);
   
    
   	fragColor = ColorGris;
   	
   	vec2 centre = vec2(0.5,0.4);
   	if(length(vtexCoord - centre) <= 0.35) fragColor = ColorNegg;   	
   	
   	vec2 centreOrellaEsq = vec2(0.2,0.8);
   	if(length(vtexCoord - centreOrellaEsq) <= 0.2) fragColor = ColorNegg;
   	
   	vec2 centreOrellaDre = vec2(0.8,0.8);
   	if(length(vtexCoord - centreOrellaDre) <= 0.2) fragColor = ColorNegg;
   	
    if(mode == 1 || mode == 2){
    	
    	vec2 centreBoca = vec2(0.5,0.3);
    	float radiBoca = length(vec2(vtexCoord.x - centreBoca.x , vtexCoord.y*2 - centreBoca.y*2));
    	if(radiBoca <= 0.3) fragColor = ColorPell;  
    	
    	vec2 centreUllEsq = vec2(0.425,0.5);
    	float radiUllEsq = length(vec2(vtexCoord.x*2 - centreUllEsq.x*2 , vtexCoord.y - centreUllEsq.y));
    	if(radiUllEsq <= 0.2) fragColor = ColorPell;
    	
    	
    	vec2 centreUllDre = vec2(0.575,0.5);
    	float radiUllDre = length(vec2(vtexCoord.x*2 - centreUllDre.x*2 , vtexCoord.y - centreUllDre.y));
    	if(radiUllDre <= 0.2) fragColor = ColorPell;   
    	
    }
    
    if(mode == 2){
		vec2 centreUllESQ = vec2(0.55,0.5);
    	float radiUllESQ = length(vec2(vtexCoord.x*2 - centreUllESQ.x*2 , vtexCoord.y - centreUllESQ.y));
    	if(radiUllESQ <= 0.15) fragColor = ColorWhit;  

		vec2 centreUllDRE = vec2(0.45,0.5);
    	float radiUllDRE = length(vec2(vtexCoord.x*2 - centreUllDRE.x*2 , vtexCoord.y - centreUllDRE.y));
    	if(radiUllDRE <= 0.15) fragColor = ColorWhit;

		vec2 centrePupilaESQ = vec2(0.55,0.45);
    	float radiPupilaESQ = length(vec2(vtexCoord.x*2 - centrePupilaESQ.x*2 , vtexCoord.y - centrePupilaESQ.y));
    	if(radiPupilaESQ <= 0.075) fragColor = ColorNegg;  

		vec2 centrePupilaDRE = vec2(0.45,0.45);
    	float radiPupilaDRE = length(vec2(vtexCoord.x*2 - centrePupilaDRE.x*2 , vtexCoord.y - centrePupilaDRE.y));
    	if(radiPupilaDRE <= 0.075) fragColor = ColorNegg;

		vec2 NAS = vec2(0.5,0.3);
   	    if(length(vtexCoord - NAS) <= 0.05) fragColor = ColorNegg;

		vec2 BOCA = vec2(0.5,0.225);
    	float radiBB = length(vec2(vtexCoord.x - BOCA.x , vtexCoord.y*8 - BOCA.y*8));
    	if(radiBB <= 0.1) fragColor = ColorNegg;
    }
    
}
