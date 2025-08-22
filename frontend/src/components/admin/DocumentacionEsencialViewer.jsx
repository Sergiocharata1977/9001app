import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, Clock, BookOpen, Database, Map, Users, Settings } from 'lucide-react';

const DocumentacionEsencialViewer = () => {
  const [selectedDoc, setSelectedDoc] = useState('01-log-tareas-agentes');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  // Estructura de documentación esencial
  const documentos = [
    {
      id: '01-log-tareas-agentes',
      nombre: '01 - Log de Tareas de Agentes',
      descripcion: 'Log cronológico de tareas de agentes IA',
      icono: Clock,
      color: 'blue',
      endpoint: '/api/coordinacion-document'
    },
    {
      id: '02-bitacora-agentes',
      nombre: '02 - Bitácora de Agentes',
      descripcion: 'Bitácora de actividades y tipos de agentes',
      icono: Users,
      color: 'purple',
      archivo: '02-bitacora-agentes.md'
    },
    {
      id: '03-documentacion-sistema',
      nombre: '03 - Documentación del Sistema',
      descripcion: 'Documentación completa del sistema SGC',
      icono: BookOpen,
      color: 'green',
      archivo: '03-documentacion-sistema.md'
    },
    {
      id: '04-mapa-archivos',
      nombre: '04 - Mapa de Archivos',
      descripcion: 'Estructura de archivos (generado automáticamente)',
      icono: Map,
      color: 'orange',
      archivo: '04-mapa-archivos.md',
      automatico: true
    },
    {
      id: '05-mapa-database',
      nombre: '05 - Mapa de Base de Datos',
      descripcion: 'Esquema de BD (generado automáticamente)',
      icono: Database,
      color: 'cyan',
      archivo: '05-mapa-database.md',
      automatico: true
    },
    {
      id: '06-contexto-agentes',
      nombre: '06 - Contexto para Agentes',
      descripcion: 'Contexto completo para nuevos agentes IA',
      icono: Settings,
      color: 'indigo',
      archivo: '06-contexto-agentes.md'
    }
  ];

  // Cargar contenido del documento seleccionado
  const loadDocument = async (docId) => {
    try {
      setIsLoading(true);
      const doc = documentos.find(d => d.id === docId);
      
      if (!doc) return;
      
      let response;
      if (doc.endpoint) {
        // Usar endpoint específico (para el log de tareas)
        response = await fetch(doc.endpoint);
      } else {
        // Usar endpoint genérico para otros documentos
        response = await fetch(`/api/docs/${doc.archivo}`);
      }
      
      if (!response.ok) {
        throw new Error(`No se pudo cargar ${doc.nombre}`);
      }
      
      const data = await response.text();
      setContent(data);
      setLastUpdate(new Date().toLocaleString('es-ES'));
      
    } catch (error) {
      console.error('Error loading document:', error);
      setContent(`# Error al cargar documento\n\nNo se pudo cargar el contenido de ${docId}.\n\nError: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar documento inicial
  useEffect(() => {
    loadDocument(selectedDoc);
  }, [selectedDoc]);

  // Función para renderizar markdown simple
  const renderMarkdown = (markdown) => {
    if (!markdown) return '';
    
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-slate-700 mt-6 mb-3 border-b border-slate-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mt-8 mb-4 border-b border-slate-300 pb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-slate-900 mt-8 mb-6 border-b border-slate-400 pb-4">$1</h1>')
      
      // Emojis y badges
      .replace(/✅/g, '<span class="inline-block w-4 h-4 text-green-600">✓</span>')
      .replace(/❌/g, '<span class="inline-block w-4 h-4 text-red-600">✗</span>')
      .replace(/🔄/g, '<span class="inline-block w-4 h-4 text-blue-600">🔄</span>')
      .replace(/⏸️/g, '<span class="inline-block w-4 h-4 text-orange-600">⏸️</span>')
      
      // Texto en negrita y cursiva
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Listas
      .replace(/^- 📅 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-blue-600 mr-2">📅</span> <span class="font-medium">$1</span></li>')
      .replace(/^- ⏰ (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-green-600 mr-2">⏰</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 🤖 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-purple-600 mr-2">🤖</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 🖊️ (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-purple-600 mr-2">🖊️</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 🎯 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-orange-600 mr-2">🎯</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 🔄 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-blue-600 mr-2">🔄</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 📦 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-green-600 mr-2">📦</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 📁 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-blue-600 mr-2">📁</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 📄 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-green-600 mr-2">📄</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 🗑️ (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-red-600 mr-2">🗑️</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 📋 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-purple-600 mr-2">📋</span> <span class="font-medium">$1</span></li>')
      .replace(/^- 📑 (.*$)/gim, '<li class="ml-4 mb-2 flex items-center"><span class="text-purple-600 mr-2">📑</span> <span class="font-medium">$1</span></li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      
      // Código
      .replace(/```([^`]+)```/g, '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm">$1</code>')
      
      // Separadores
      .replace(/^---$/gim, '<hr class="my-8 border-slate-300">')
      
      // Párrafos
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/^(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  Documentación Esencial SGC
                </h1>
                <p className="text-slate-600">
                  Sistema de documentación reorganizado - Estructura limpia sin fechas
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => loadDocument(selectedDoc)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Actualizar
                </button>
              </div>
            </div>
            
            {/* Status bar */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">
                  Última actualización: {lastUpdate || 'Nunca'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Documentos Esenciales</h3>
              
              <div className="space-y-2">
                {documentos.map((doc) => {
                  const IconComponent = doc.icono;
                  const isSelected = selectedDoc === doc.id;
                  const colorClasses = {
                    blue: 'text-blue-600 bg-blue-50 border-blue-200',
                    purple: 'text-purple-600 bg-purple-50 border-purple-200',
                    green: 'text-green-600 bg-green-50 border-green-200',
                    orange: 'text-orange-600 bg-orange-50 border-orange-200',
                    cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200'
                  };
                  
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoc(doc.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        isSelected 
                          ? `${colorClasses[doc.color]} shadow-md` 
                          : 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className={`w-5 h-5 mt-0.5 ${isSelected ? '' : 'text-slate-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {doc.nombre}
                            {doc.automatico && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                AUTO
                              </span>
                            )}
                          </div>
                          <div className="text-xs opacity-75 mt-1">
                            {doc.descripcion}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Información adicional */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Sistema Reorganizado</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>✅ Sin fechas en nombres</li>
                  <li>✅ Orden cronológico inverso</li>
                  <li>✅ Mapas automáticos cada 20min</li>
                  <li>✅ Contexto completo para agentes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="p-6">
                {/* Header del documento */}
                <div className="mb-6">
                  {(() => {
                    const doc = documentos.find(d => d.id === selectedDoc);
                    const IconComponent = doc?.icono || FileText;
                    const colorClasses = {
                      blue: 'text-blue-600',
                      purple: 'text-purple-600',
                      green: 'text-green-600',
                      orange: 'text-orange-600',
                      cyan: 'text-cyan-600',
                      indigo: 'text-indigo-600'
                    };
                    
                    return (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`w-6 h-6 ${colorClasses[doc?.color] || 'text-slate-600'}`} />
                          <div>
                            <h2 className="text-xl font-bold text-slate-800">
                              {doc?.nombre || 'Documento'}
                            </h2>
                            <p className="text-slate-600 text-sm">
                              {doc?.descripcion}
                              {doc?.automatico && (
                                <span className="ml-2 text-green-600 font-medium">
                                  (Actualizado automáticamente)
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        {isLoading && (
                          <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Contenido del documento */}
                <div className="prose prose-slate max-w-none">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-slate-600">Cargando documento...</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer con información del sistema */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-slate-600">Documentos Esenciales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-slate-600">Mapas Automáticos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">20min</div>
              <div className="text-sm text-slate-600">Frecuencia de Actualización</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentacionEsencialViewer;