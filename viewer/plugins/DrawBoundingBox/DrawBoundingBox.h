#ifndef _DRAWBOUNDINGBOX_H
#define _DRAWBOUNDINGBOX_H

#include <vector>
#include "plugin.h" 

class DrawBoundingBox: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void cleanUp();
	 void onPluginLoad();


	 void onObjectAdd();
	 bool drawScene();
	 bool drawObject(int);
  private:
	  void addVBO(unsigned int currentObject);

  // We will create a VBO for each object in the scene
  vector<GLuint> VAOs;          // ID of VAOs
  vector<GLuint> coordBuffers;  // ID of vertex coordinates buffer 
  vector<GLuint> normalBuffers; // ID of normal components buffer 
  vector<GLuint> stBuffers;     // ID of (s,t) buffer 
  vector<GLuint> colorBuffers;  // ID of color buffer  
  vector<GLuint> numIndices;    // Size (number of indices) in each index buffer
};

#endif
