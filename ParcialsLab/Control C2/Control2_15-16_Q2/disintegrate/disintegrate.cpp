#include "disintegrate.h"

void Disintegrate::onPluginLoad()
{
    // Carregar shader, compile & link 
    QString vs_src = "#version 330 core\n \
                      uniform mat4 modelViewProjectionMatrix; \
                      in vec3 vertex; \
                      in vec3 color; \
                      out vec4 vcolor; \
                      \
                      void main() { \
                         gl_Position = modelViewProjectionMatrix * vec4(vertex,1.0); \
                         vcolor = vec4(color,1.0); \
                      }";
    vs = new QGLShader(QGLShader::Vertex, this);
    vs->compileSourceCode(vs_src);
    cout << "VS log:" << vs->log().toStdString() << endl;
    
    QString gs_src = "#version 330 core\n \
                      layout(triangles) in; \
                      layout(triangle_strip, max_vertices = 36) out; \
                      in vec4 vcolor[]; \
                      out vec4 gcolor; \
                      uniform float time; \
                      \
                      void main( void ){ \
                         for( int i = 0 ; i < 3 ; i++ ) \
                         { \
                            gcolor = vcolor[i]; \
                            gl_Position = gl_in[i].gl_Position; \
                            EmitVertex(); \
                         } \
                         EndPrimitive(); \
                      }";
    gs = new QGLShader(QGLShader::Geometry, this);
    gs->compileSourceCode(gs_src);
    cout << "GS log:" << gs->log().toStdString() << endl;

    QString fs_src = "#version 330 core\n \
                      out vec4 fragColor; \
                      in vec4 gcolor; \
                      \
                      void main() { \
                         fragColor=gcolor; \
                      }";
    fs = new QGLShader(QGLShader::Fragment, this);
    fs->compileSourceCode(fs_src);
    cout << "FS log:" << fs->log().toStdString() << endl;

    program = new QGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(gs);
    program->addShader(fs);
    program->link();
    cout << "Link log:" << program->log().toStdString() << endl;
    
    timer.start();

    QTimer *autoupdate = new QTimer(this);
    connect(autoupdate, SIGNAL(timeout()), glwidget(), SLOT(updateGL()));
    autoupdate->start();
}

void Disintegrate::preFrame() 
{
    // bind shader and define uniforms
    program->bind();
    program->setUniformValue("time", timer.elapsed() / 1000.0f);
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->modelviewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 
}

void Disintegrate::postFrame() 
{
    // unbind shader
    program->release();
}

#if QT_VERSION < 0x050000
Q_EXPORT_PLUGIN2(disintegrate, Disintegrate)   // plugin name, plugin class
#endif

