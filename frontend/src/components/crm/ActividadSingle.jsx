import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Users, 
  Calendar,
  Clock,
  MapPin,
  FileText,
  Target,
  CheckCircle,
  AlertCircle,
  User,
  Building
} from 'lucide-react';
import { crmService } from '@/services/crmService';
import { 
  TIPOS_ACTIVIDAD, 
  ESTADOS_ACTIVIDAD, 
  PRIORIDADES_ACTIVIDAD,
  getTipoActividadColor,
  getEstadoActividadColor,
  getPrioridadActividadColor
} from '@/types/crm';
import { toast } from 'sonner';

const ActividadSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [actividad, setActividad] = useState(null);
  const [oportunidadRelacionada, setOportunidadRelacionada] = useState(null);
  const [clienteRelacionado, setClienteRelacionado] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informacion');

  useEffect(() => {
    if (id) {
      cargarDatosActividad();
    }
  }, [id]);

  const cargarDatosActividad = async () => {
    try {
      setIsLoading(true);
      
      // Cargar datos de la actividad
      const actividadResponse = await crmService.getActividad(id);
      const actividadData = actividadResponse.data;
      setActividad(actividadData);
      
      // Cargar oportunidad relacionada si existe
      if (actividadData.oportunidad_id) {
        try {
          const oportunidadResponse = await crmService.getOportunidad(actividadData.oportunidad_id);
          setOportunidadRelacionada(oportunidadResponse.data);
        } catch (error) {
          console.log('No se pudo cargar la oportunidad relacionada');
        }
      }
      
      // Cargar cliente relacionado si existe
      if (actividadData.cliente_id) {
        try {
          const clienteResponse = await crmService.getCliente(actividadData.cliente_id);
          setClienteRelacionado(clienteResponse.data);
        } catch (error) {
          console.log('No se pudo cargar el cliente relacionado');
        }
      }
      
    } catch (error) {
      console.error('Error cargando actividad:', error);
      toast.error('Error cargando información de la actividad');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // Abrir modal de edición
    console.log('Editar actividad:', actividad);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        await crmService.deleteActividad(id);
        toast.success('Actividad eliminada exitosamente');
        navigate('/app/crm/actividades');
      } catch (error) {
        console.error('Error eliminando actividad:', error);
        toast.error('Error eliminando actividad');
      }
    }
  };

  const getTipoInfo = (tipo) => {
    return TIPOS_ACTIVIDAD.find(t => t.value === tipo) || {};
  };

  const getEstadoInfo = (estado) => {
    return ESTADOS_ACTIVIDAD.find(e => e.value === estado) || {};
  };

  const getPrioridadInfo = (prioridad) => {
    return PRIORIDADES_ACTIVIDAD.find(p => p.value === prioridad) || {};
  };

  const calcularTiempoTranscurrido = () => {
    if (!actividad?.fecha_actividad) return null;
    
    const fechaActividad = new Date(actividad.fecha_actividad);
    const ahora = new Date();
    const diferencia = ahora - fechaActividad;
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(horas / 24);
    
    if (dias > 0) {
      return `${dias} día${dias > 1 ? 's' : ''} ${dias === 1 ? 'hace' : 'atrás'}`;
    } else if (horas > 0) {
      return `${horas} hora${horas > 1 ? 's' : ''} ${horas === 1 ? 'hace' : 'atrás'}`;
    } else {
      return 'Reciente';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando actividad...</p>
        </div>
      </div>
    );
  }

  if (!actividad) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Actividad no encontrada</h2>
        <p className="text-gray-600 mt-2">La actividad solicitada no existe o no tienes permisos para verla.</p>
        <Button onClick={() => navigate('/app/crm/actividades')} className="mt-4">
          Volver a Actividades
        </Button>
      </div>
    );
  }

  const tipoInfo = getTipoInfo(actividad.tipo_actividad);
  const estadoInfo = getEstadoInfo(actividad.estado);
  const prioridadInfo = getPrioridadInfo(actividad.prioridad);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/app/crm/actividades')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{actividad.titulo}</h1>
            <p className="text-gray-600">
              {tipoInfo.label} - {new Date(actividad.fecha_actividad).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Información de Estado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                estadoInfo.value === 'completada' ? 'bg-green-100' :
                estadoInfo.value === 'en_proceso' ? 'bg-yellow-100' :
                estadoInfo.value === 'cancelada' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {estadoInfo.value === 'completada' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : estadoInfo.value === 'cancelada' ? (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <Clock className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="text-lg font-bold">{estadoInfo.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Prioridad</p>
                <p className="text-lg font-bold">{prioridadInfo.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="text-lg font-bold">{actividad.duracion_minutos} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tiempo</p>
                <p className="text-lg font-bold">{calcularTiempoTranscurrido()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido Principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="relaciones">Relaciones</TabsTrigger>
          <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Actividad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tipo:</span>
                  <Badge variant="outline" style={{ borderColor: tipoInfo.color }}>
                    {tipoInfo.label}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fecha y Hora:</span>
                  <span>{new Date(actividad.fecha_actividad).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Duración:</span>
                  <span>{actividad.duracion_minutos} minutos</span>
                </div>
                
                {actividad.ubicacion && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Ubicación:</span>
                    <span>{actividad.ubicacion}</span>
                  </div>
                )}
                
                {actividad.participantes && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Participantes:</span>
                    <span>{actividad.participantes}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Vendedor */}
            <Card>
              <CardHeader>
                <CardTitle>Responsable</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {actividad.vendedor_nombre && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Vendedor</p>
                      <p className="font-medium">{actividad.vendedor_nombre}</p>
                    </div>
                  </div>
                )}
                
                {actividad.vendedor_email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{actividad.vendedor_email}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Creada</p>
                    <p className="font-medium">{new Date(actividad.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Descripción */}
          {actividad.descripcion && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{actividad.descripcion}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="relaciones" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Oportunidad Relacionada */}
            {oportunidadRelacionada && (
              <Card>
                <CardHeader>
                  <CardTitle>Oportunidad Relacionada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Título:</span>
                      <span>{oportunidadRelacionada.titulo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Etapa:</span>
                      <Badge variant="outline">
                        {oportunidadRelacionada.etapa}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Valor:</span>
                      <span className="font-bold text-green-600">
                        ${(oportunidadRelacionada.valor_estimado || 0).toLocaleString()}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/app/crm/oportunidades/${oportunidadRelacionada.id}`)}
                      className="w-full mt-3"
                    >
                      Ver Oportunidad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cliente Relacionado */}
            {clienteRelacionado && (
              <Card>
                <CardHeader>
                  <CardTitle>Cliente Relacionado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Nombre:</span>
                      <span>{clienteRelacionado.nombre}</span>
                    </div>
                    {clienteRelacionado.razon_social && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Empresa:</span>
                        <span>{clienteRelacionado.razon_social}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tipo:</span>
                      <Badge variant="outline">
                        {clienteRelacionado.tipo_cliente}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/app/crm/clientes/${clienteRelacionado.id}`)}
                      className="w-full mt-3"
                    >
                      Ver Cliente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sin relaciones */}
            {!oportunidadRelacionada && !clienteRelacionado && (
              <Card>
                <CardHeader>
                  <CardTitle>Relaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Esta actividad no está relacionada con una oportunidad o cliente específico</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="seguimiento" className="space-y-6">
          {/* Resultado */}
          {actividad.resultado && (
            <Card>
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{actividad.resultado}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Próxima Acción */}
          {(actividad.proxima_accion || actividad.fecha_proxima_accion) && (
            <Card>
              <CardHeader>
                <CardTitle>Próxima Acción</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  {actividad.proxima_accion && (
                    <p className="text-gray-700 leading-relaxed">{actividad.proxima_accion}</p>
                  )}
                  {actividad.fecha_proxima_accion && (
                    <div className="flex items-center text-sm text-blue-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Programada para: {new Date(actividad.fecha_proxima_accion).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observaciones */}
          {actividad.observaciones && (
            <Card>
              <CardHeader>
                <CardTitle>Observaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{actividad.observaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Adjuntos */}
          {actividad.adjuntos && (
            <Card>
              <CardHeader>
                <CardTitle>Adjuntos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">{actividad.adjuntos}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Historial */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de la Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Actividad creada</p>
                    <p className="text-sm text-gray-600">Se programó la actividad</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(actividad.created_at).toLocaleString()}
                  </span>
                </div>
                
                {actividad.updated_at !== actividad.created_at && (
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Última actualización</p>
                      <p className="text-sm text-gray-600">Se modificó la información</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(actividad.updated_at).toLocaleString()}
                    </span>
                  </div>
                )}

                {actividad.estado === 'completada' && (
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Actividad completada</p>
                      <p className="text-sm text-gray-600">La actividad fue marcada como completada</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {calcularTiempoTranscurrido()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActividadSingle;