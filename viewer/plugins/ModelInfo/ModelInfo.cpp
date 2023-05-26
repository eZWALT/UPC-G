#include "ModelInfo.h"
#include "glwidget.h"

bool StopFlag = false; 



void ModelInfo::postFrame()
{
	//I know it's lame but then this will be loaded only once
	if(StopFlag) return;

	Scene * sc = scene();	
	const vector<Object> & objs = sc->objects();

	uint numPoligons = 0;
	uint numVertexs = 0;
	uint polyTriang = 0;

	for(uint i = 0; i < objs.size(); ++i){
		Object objecte = objs[i];
		numPoligons += objecte.faces().size();
		numVertexs += objecte.vertices().size();

		for(auto face: objecte.faces()){
			if(face.numVertices() == int(3)) polyTriang++;
		}

	}
	cout << "Numero d'Objectes carregats: " << objs.size() << endl;
	cout << "Numero de Poligons carregats: " << numPoligons << endl;
	cout << "Numero de Vertexs carregats: " << numVertexs << endl;
	cout << "Percentatje de Poligons triangulars: " << (float(polyTriang) / float(numPoligons))*100.0 << endl;  

	StopFlag = true;
}

