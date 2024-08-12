#include "animateVertices.h"
#include "glwidget.h"

void AnimateVertices::onPluginLoad()
{
	//Cal primer carregar el vertex i fragment shaders i despres enllaçarlos al program
	QString vsTxT = "version 330 core\n"
	"out vec4 frontColor;"
	"uniform mat4 modelViewProjectionMatrix;"
	"uniform mat3 normalMatrix;"
	"uniform float time;"
	"uniform float amplitude;"
	"uniform float freq;"
	"float PI = acos(-1.0);"
	"void main() {"
	"vec3 V = vertex + normal*abs(amplitude * sin(PI*2*freq*time) );"
	"vec3 N = normalize(normalMatrix * normal);"
	"frontColor = vec4(color,1.0) * N.z;"
	"gl_Position = modelViewProjectionMatrix * vec4(V,1.0);"
	"}";

	QString fsTxT = "version 330 core\n"
	"in vec4 frontColor;"
	"out vec4 fragColor;"
	"void main(){"
	"fragColor = frontColor;"
	"}";

	vs = new QOpenGLShader(QOpenGLShader::Vertex,this);
	vs->compileSourceCode(vsTxT);
	cout << "VS errors: " << vs->log().toStdString() << endl;

	fs = new QOpenGLShader(QOpenGLShader::Fragment,this);
	fs->compileSourceCode(fsTxT);
	cout << "FS errors: " << fs->log().toStdString() << endl;

	program = new QOpenGLShaderProgram(this);
	program->addShader(vs);
	program->addShader(fs);
	program->link();
	cout << "Link errors: " << program->log().toStdString() << endl;
	elapsedTimer.start();
}

void AnimateVertices::preFrame()
{
	program->bind();

	QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
	program->setUniformValue("modelViewProjectionMatrix", MVP);
	program->setUniformValue("normalMatrix", camera()->viewMatrix().normalMatrix());
	program->setUniformValue("amplitude" , float(0.1));
	program->setUniformValue("freq", float(0.5));
	program->setUniformValue("time", float(elapsedTimer.elapsed()/1000.));
	//les linies comentades donen error de la funcio setUniformValue
}


void AnimateVertices::postFrame()
{
	//Nomes cal alliberar els shaders del programa
	program->release();
}
