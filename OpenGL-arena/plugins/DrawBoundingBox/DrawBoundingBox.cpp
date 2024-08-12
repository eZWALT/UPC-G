#include "DrawBoundingBox.h"
#include "glwidget.h"

DrawBoundingBox::~DrawBoundingBox() {
	cleanUp();
}

void DrawBoundingBox::onSceneClear(){
	cleanUp();
}

void DrawBoundingBox::cleanUp(){
  GLWidget &g = *glwidget();
  g.glDeleteBuffers(coordBuffers.size(),  &coordBuffers[0]);
  g.glDeleteBuffers(normalBuffers.size(), &normalBuffers[0]);
  g.glDeleteBuffers(stBuffers.size(),  &stBuffers[0]);
  g.glDeleteBuffers(colorBuffers.size(),  &colorBuffers[0]);
  g.glDeleteVertexArrays(VAOs.size(), &VAOs[0]);
  coordBuffers.clear();
  normalBuffers.clear();
  stBuffers.clear();
  colorBuffers.clear();
  VAOs.clear();
  numIndices.clear();
}


void DrawBoundingBox::onPluginLoad()
{
  for(unsigned int i=0; i<scene()->objects().size(); i++)
    addVBO(i);

  vector<float> vertices = {0,0,0, 1,0,0, 1,0,1, 0,0,1, 0,1,0, 0,1,1, 1,1,0, 1,1,1};
  
}

void DrawBoundingBox::onObjectAdd()
{
  addVBO(scene()->objects().size()-1);
}

bool DrawBoundingBox::drawScene()
{
	GLWidget &g = *glwidget();
  g.makeCurrent();
  GLint program;
  g.glGetIntegerv(GL_CURRENT_PROGRAM, &program);
  GLint loc = g.glGetUniformLocation(program,"objectID");

  for(unsigned int i=0; i<VAOs.size(); i++) {
    // for each buffer (that is, for each object)
    if (loc>=0) g.glUniform1i(loc, i);
	  drawObject(i);
  }
  return true;
}

bool DrawBoundingBox::drawObject(int)
{
	GLWidget &g = *glwidget();
  g.makeCurrent();
  g.glBindVertexArray(VAOs[i]);
  g.glDrawArrays(GL_TRIANGLES, 0, numIndices[i]);
  g.glBindVertexArray(0);
  return true;
}


void DrawVBOng::addVBO(unsigned int currentObject)
{
  //
  // For simplicity, we construct VBOs with replicated vertices (a copy
  // for each triangle to which they belong:
  //
  const Object& obj = scene()->objects()[currentObject];
  unsigned int numvertices = obj.faces().size()*3;  // it's all triangles...
  vector<float> vertices; // (x,y,z)    Final size: 9*number of triangles
  vector<float> normals;  // (nx,ny,nz) Final size: 9*number of triangles
  vector<float> colors;   // (r, g, b)  Final size: 9*number of triangles
  vector<float> texCoords;// (s, t)     Final size: 6*number of triangles
  auto verts = obj.vertices();
  auto Ns = obj.vertNormals();
  auto texcords = obj.vertTexCoords();

  for (auto&& f: obj.faces()) {
    Point P = verts[f.vertexIndex(0)].coord();
    vertices.push_back(P.x()); vertices.push_back(P.y()); vertices.push_back(P.z());
    Vector V=Ns[f.normalIndex(0)];
    normals.push_back(V.x()); normals.push_back(V.y()); normals.push_back(V.z());
    colors.push_back(fabs(V.x())); colors.push_back(fabs(V.y())); colors.push_back(fabs(V.z()));
    auto TC=texcords[f.texcoordsIndex(0)];
    texCoords.push_back(TC.first);  texCoords.push_back(TC.second);

    P = verts[f.vertexIndex(1)].coord();
    vertices.push_back(P.x()); vertices.push_back(P.y()); vertices.push_back(P.z());
    V=Ns[f.normalIndex(1)];
    normals.push_back(V.x()); normals.push_back(V.y()); normals.push_back(V.z());
    colors.push_back(fabs(V.x())); colors.push_back(fabs(V.y())); colors.push_back(fabs(V.z()));
    TC=texcords[f.texcoordsIndex(1)];
    texCoords.push_back(TC.first);  texCoords.push_back(TC.second);

    P = verts[f.vertexIndex(2)].coord();
    vertices.push_back(P.x()); vertices.push_back(P.y()); vertices.push_back(P.z());
    V=Ns[f.normalIndex(2)];
    normals.push_back(V.x()); normals.push_back(V.y()); normals.push_back(V.z());
    colors.push_back(fabs(V.x())); colors.push_back(fabs(V.y())); colors.push_back(fabs(V.z()));
    TC=texcords[f.texcoordsIndex(2)];
    texCoords.push_back(TC.first);  texCoords.push_back(TC.second);
}

  assert(vertices.size() == 3*numvertices);
  assert(normals.size() == 3*numvertices);
  assert(colors.size() == 3*numvertices);
  assert(texCoords.size() == 2*numvertices);

  // Step 2: Create VAO and empty buffers (coords, normals, ...)
  GLWidget& g = *glwidget();
  GLuint VAO;
  g.glGenVertexArrays(1, &VAO);
  VAOs.push_back(VAO);
  g.glBindVertexArray(VAO);
  
  GLuint coordBufferID;
  g.glGenBuffers(1, &coordBufferID);
  coordBuffers.push_back(coordBufferID);
  
  GLuint normalBufferID;
  g.glGenBuffers(1, &normalBufferID);
  normalBuffers.push_back(normalBufferID);
  
  GLuint stBufferID;
  g.glGenBuffers(1, &stBufferID);
  stBuffers.push_back(stBufferID);
  
  GLuint colorBufferID;
  g.glGenBuffers(1, &colorBufferID);
  colorBuffers.push_back(colorBufferID);
  
  numIndices.push_back(numvertices);
  // Step 3: Define VBO data (coords, normals, ...)
  g.glBindBuffer(GL_ARRAY_BUFFER, coordBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*vertices.size(), &vertices[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0); 
  g.glEnableVertexAttribArray(0);

  g.glBindBuffer(GL_ARRAY_BUFFER, normalBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*normals.size(), &normals[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(1);

  g.glBindBuffer(GL_ARRAY_BUFFER, colorBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*colors.size(), &colors[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(2);

  g.glBindBuffer(GL_ARRAY_BUFFER, stBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*texCoords.size(), &texCoords[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(3, 2, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(3);
  
  g.glBindBuffer(GL_ARRAY_BUFFER,0);
  g.glBindVertexArray(0);
}


