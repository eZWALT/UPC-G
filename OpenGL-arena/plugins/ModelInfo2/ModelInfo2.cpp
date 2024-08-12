#include "ModelInfo2.h"
#include "glwidget.h"

void ModelInfo2::infoScene()
{
    nPolig = nVert = percTriangle = 0;
    for (unsigned int i = 0; i < nObj; ++i) {
        nVert += scene()->objects()[i].vertices().size();
        const vector<Face> & faces = scene()->objects()[i].faces();
        nPolig += faces.size();
        for (unsigned int j = 0; j < faces.size(); ++j) {
            if(faces[j].numVertices() == 3) ++percTriangle; 
        }
    }
    percTriangle = (double) percTriangle/nPolig * 100;  
}

void ModelInfo2::onPluginLoad()
{
	nObj = scene()->objects().size();
	infoScene();
}

void ModelInfo2::postFrame()
{
    QFont font;
    font.setPixelSize(15);
    painter.begin(glwidget());
    painter.setFont(font);
    painter.drawText(10, 20, QString("Objectes: " + QString::number(nObj))); 
    painter.drawText(10, 40, QString("Poligons: " + QString::number(nPolig))); 
    painter.drawText(10, 60, QString("Vertexs: " + QString::number(nVert)));
    painter.drawText(10, 80, QString("Percentatge de triangles: " + QString::number(percTriangle) + "%"));              
    painter.end();
}

void ModelInfo2::onObjectAdd()
{
	nObj += 1;
	infoScene();
}

void ModelInfo2::onSceneClear()
{
    nObj = nPolig = nVert = 0;
    percTriangle = 0;
}