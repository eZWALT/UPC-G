#include "isafloor.h"
#include "glwidget.h"
#include "vector.h"

void Isafloor::onPluginLoad() {
	float area = 0, total = 0;
	Object obj = scene()->objects()[0];
	
	for (Face f : obj.faces()) {
		int v0 = f.vertexIndex(0);
		int v1 = f.vertexIndex(1);
		int v2 = f.vertexIndex(2);
		Point p0 = obj.vertices()[v0].coord();
		Point p1 = obj.vertices()[v1].coord();
		Point p2 = obj.vertices()[v2].coord();
		QVector3D po0 = QVector3D(p0.x(), p0.y(), p0.z());
		QVector3D po1 = QVector3D(p1.x(), p1.y(), p1.z());
		QVector3D po2 = QVector3D(p2.x(), p2.y(), p2.z());
		QVector3D vec0 = po1 - po0;  
		QVector3D vec1 = po2 - po0; 
		QVector3D v = QVector3D::crossProduct(vec0, vec1);
		float valor = v.length()/2.0;
		Vector normal = f.normal();
		//normal.normalize();
		float dot = QVector3D::dotProduct(normal, Vector(0., 0., 1.));
		if (dot > 0.7) area += valor;
		total += valor;
	}
	lambda = area/total;
	cout << "TERRA: " << lambda << endl;
}

void Isafloor::preFrame() {
	GLWidget & g = *glwidget();
    g.makeCurrent();
    // Carregar VS
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    QString vsrc = \
    	"#version 330 core\n"
    	"uniform mat4 modelViewProjectionMatrix;"
    	"layout (location = 0) in vec3 vertex;"
    	"layout (location = 1) in vec3 normal;"
    	"out vec4 frontColor;"
    	"uniform float lambda;"
    	"uniform mat3 normalMatrix;"
    	"void main() {"
    	"	vec3 N = normalMatrix * normal;"
    	"	frontColor = mix(vec4(1, 0, 0, 1), vec4(0, 1, 0, 1), lambda);"
    	"	frontColor *= N.z;"
    	"	gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);"
    	"}";
    vs->compileSourceCode(vsrc);
  
  	// Carregar FS
    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    QString fsrc = \
    	"#version 330 core\n"
    	"in vec4 frontColor;"
    	"out vec4 fragColor;"
    	"void main() {"
    	"	fragColor = frontColor;"
    	" }";
    fs->compileSourceCode(fsrc);

	// Program
    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    
	program -> bind();
	QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
	program->setUniformValue("modelViewProjectionMatrix", MVP);
	program->setUniformValue("lambda", lambda);
	program->setUniformValue("normalMatrix", camera()->viewMatrix().normalMatrix());
}

void Isafloor::postFrame()
{
	
}

void Isafloor::onObjectAdd() {
	Isafloor::onPluginLoad();
}

bool Isafloor::drawScene()
{
	return false; // return true only if implemented
}

bool Isafloor::drawObject(int)
{
	return false; // return true only if implemented
}

bool Isafloor::paintGL()
{
	return false; // return true only if implemented
}

void Isafloor::keyPressEvent(QKeyEvent *)
{
	
}

void Isafloor::mouseMoveEvent(QMouseEvent *)
{
	
}

