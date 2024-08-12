#include "MyEffect.h"
#include "glwidget.h"

void MyEffect::onPluginLoad()
{
	
}

void MyEffect::preFrame()
{
	//cal POSAR RETURN SI VOLEM EVITAR QUE ELS MISSATGES DE LOG() OCUPIN TOTA LA TERMINAL
	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
	glDisable(GL_DEPTH_TEST);
	glEnable(GL_CULL_FACE);
}

void MyEffect::postFrame()
{
	
}

void MyEffect::onObjectAdd()
{
	
}

bool MyEffect::drawScene()
{
	return false; // return true only if implemented
}

bool MyEffect::drawObject(int)
{
	return false; // return true only if implemented
}

bool MyEffect::paintGL()
{
	return false; // return true only if implemented
}

void MyEffect::keyPressEvent(QKeyEvent *)
{
	
}

void MyEffect::mouseMoveEvent(QMouseEvent *)
{
	
}

