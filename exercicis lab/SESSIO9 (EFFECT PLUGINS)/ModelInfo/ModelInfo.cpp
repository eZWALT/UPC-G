
#include "ModelInfo.h"
#include "glwidget.h"

void ModelInfo1::sceneInfo() 
{
    nPolig = nVerts = percTri = 0;
    for (unsigned int i = 0; i < nObjs; ++i) { 
        const Object& obj = scene()->objects()[i];
        nPolig += obj.faces().size();
        for (unsigned int j = 0; j < obj.faces().size(); ++j) {
            int verts = obj.faces()[j].numVertices();
            nVerts += verts;
            if (verts == 3) ++percTri;
        }
    }
    percTri = percTri/nPolig * 100;
}

void ModelInfo1::onPluginLoad()
{
    nObjs = scene() -> objects().size();
    sceneInfo();
}

void ModelInfo1::postFrame()
{
	cout << "Number of objects: " << nObjs << endl;
	cout << "Number of polygons: " << nPolig << endl;
	cout << "Number of vertexs: " << nVerts << endl;
	cout << "Percentage of triangles: " << percTri << "%" << endl;
}

void ModelInfo1::onObjectAdd()
{
	nObjs += 1;
	sceneInfo();
}

void ModelInfo1::onSceneClear()
{
    nObjs = 0;
    nPolig = 0;
    nVerts = 0;
    percTri = 0; 
}

