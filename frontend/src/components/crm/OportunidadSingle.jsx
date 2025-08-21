import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Building, 
  User,
  Target,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { crmService } from '@/services/crmService';
import { ETAPAS_OPORTUNIDAD, TIPOS_OPORTUNIDAD, getEtapaOportunidadColor, formatearMoneda } from '@/types/crm';
import { toast } from 'sonner';

const OportunidadSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [oportunidad, setOportunidad] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informacion');

  useEffect(() => {
    if (id) {
      cargarDatosOportunidad();
    }
  }, [id]);

  const cargarDatosOportunidad = async () => {
    try {
      setIsLoading(true);
      
      // Cargar datos de la oportunidad
      const oportunidadResponse = await crmService.getOportunidad(id);
      setOportunidad(oportunidadResponse.data);
      
      // Cargar actividades de la oportunidad
      const actividadesResponse = await crmService.getActividades({ oportunidad_id: id });
      setActividades(actividadesResponse.data || []);
      
      // Cargar productos/servicios (si existe endpoint)
      try {
        const productosResponse = await crmService.getProductosOportunidad(id);
        setProductos(productosResponse.data || []);
      } catch (error) {
        // Si no existe el endpoint, no hacer nada
        setProductos([]);
      }
      
    } catch (error) {
      console.error('Error cargando oportunidad:', error);
      toast.error('Error cargando información de la oportunidad');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // Abrir modal de edición
    console.log('Editar oportunidad:', oportunidad);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oportunidad?')) {
      try {
        await crmService.deleteOportunidad(id);
        toast.success('Oportunidad eliminada exitosamente');
        navigate('/app/crm/oportunidades');
      } catch (error) {
        console.error('Error eliminando oportunidad:', error);
        toast.error('Error eliminando oportunidad');
      }
    }
  };

  const getEtapaInfo = (etapa) => {
    return ETAPAS_OPORTUNIDAD.find(e => e.value === etapa) || {};
  };

  const getTipoInfo = (tipo) => {
    return TIPOS_OPORTUNIDAD.find(t => t.value === tipo) || {};
  };

  const calcularTiempoRestante = () => {
    if (!oportunidad?.fecha_cierre_esperada) return null;
    
    const fechaCierre = new Date(oportunidad.fecha_cierre_esperada);
    const ahora = new Date();
    const diferencia = fechaCierre - ahora;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    
    return dias;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando oportunidad...</p>
        </div>
      </div>
    );
  }

  if (!oportunidad) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Oportunidad no encontrada</h2>
        <p className="text-gray-600 mt-2">La oportunidad solicitada no existe o no tienes permisos para verla.</p>
        <Button onClick={() => navigate('/app/crm/oportunidades')} className="mt-4">
          Volver a Oportunidades
        </Button>
      </div>
    );
  }

  const etapaInfo = getEtapaInfo(oportunidad.etapa);
  const tipoInfo = getTipoInfo(oportunidad.tipo_oportunidad);
  const diasRestantes = calcularTiempoRestante();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/app/crm/oportunidades')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{oportunidad.titulo}</h1>
            <p className="text-gray-600">{oportunidad.cliente_nombre}</p>
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

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Valor Estimado</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatearMoneda(oportunidad.valor_estimado, oportunidad.moneda)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Probabilidad</p>
                <div className="flex items-center space-x-2">
                  <Progress value={oportunidad.probabilidad} className="flex-1" />
                  <span className="text-lg font-bold">{oportunidad.probabilidad}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Días Restantes</p>
                <p className={`text-2xl font-bold ${
                  diasRestantes !== null 
                    ? diasRestantes < 0 
                      ? 'text-red-600' 
                      : diasRestantes < 7 
                        ? 'text-orange-600' 
                        : 'text-green-600'
                    : 'text-gray-400'
                }`}>
                  {diasRestantes !== null ? diasRestantes : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Actividades</p>
                <p className="text-2xl font-bold">{actividades.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido Principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="actividades">Actividades</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="estrategia">Estrategia</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Etapa:</span>
                  <Badge 
                    variant="outline" 
                    style={{ borderColor: etapaInfo.color }}
                    className="flex items-center space-x-1"
                  >
                    {etapaInfo.probabilidad === 100 ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : etapaInfo.probabilidad === 0 ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <Target className="w-3 h-3" />
                    )}
                    <span>{etapaInfo.label}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tipo:</span>
                  <Badge variant="outline">
                    {tipoInfo.label}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Valor:</span>
                  <span className="font-bold text-green-600">
                    {formatearMoneda(oportunidad.valor_estimado, oportunidad.moneda)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Moneda:</span>
                  <span>{oportunidad.moneda}</span>
                </div>
                
                {oportunidad.fecha_cierre_esperada && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Fecha Cierre Esperada:</span>
                    <span>{new Date(oportunidad.fecha_cierre_esperada).toLocaleDateString()}</span>
                  </div>
                )}
                
                {oportunidad.fecha_cierre_real && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Fecha Cierre Real:</span>
                    <span>{new Date(oportunidad.fecha_cierre_real).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Cliente y Vendedor */}
            <Card>
              <CardHeader>
                <CardTitle>Cliente y Vendedor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {oportunidad.cliente_nombre && (
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium">{oportunidad.cliente_nombre}</p>
                    </div>
                  </div>
                )}
                
                {oportunidad.vendedor_nombre && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Vendedor</p>
                      <p className="font-medium">{oportunidad.vendedor_nombre}</p>
                    </div>
                  </div>
                )}
                
                {oportunidad.supervisor_nombre && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Supervisor</p>
                      <p className="font-medium">{oportunidad.supervisor_nombre}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Creación</p>
                    <p className="font-medium">{new Date(oportunidad.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Descripción */}
          {oportunidad.descripcion && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{oportunidad.descripcion}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="actividades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actividades ({actividades.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {actividades.length > 0 ? (
                <div className="space-y-4">
                  {actividades.map((actividad) => (
                    <Card key={actividad.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{actividad.titulo}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {actividad.tipo_actividad}
                            </Badge>
                            <Badge variant={
                              actividad.estado === 'completada' ? 'default' :
                              actividad.estado === 'en_proceso' ? 'secondary' :
                              'outline'
                            }>
                              {actividad.estado}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>📅 {new Date(actividad.fecha_actividad).toLocaleString()}</span>
                          <span>⏱️ {actividad.duracion_minutos} min</span>
                          <span>📍 {actividad.prioridad}</span>
                        </div>
                        {actividad.descripcion && (
                          <p className="text-gray-700 text-sm mb-2">{actividad.descripcion}</p>
                        )}
                        {actividad.resultado && (
                          <div className="bg-green-50 p-2 rounded text-sm">
                            <strong>Resultado:</strong> {actividad.resultado}
                          </div>
                        )}
                        {actividad.proxima_accion && (
                          <div className="bg-blue-50 p-2 rounded text-sm mt-2">
                            <strong>Próxima acción:</strong> {actividad.proxima_accion}
                            {actividad.fecha_proxima_accion && (
                              <span className="text-gray-600"> - {new Date(actividad.fecha_proxima_accion).toLocaleDateString()}</span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay actividades registradas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos y Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              {oportunidad.productos_servicios ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Productos/Servicios de Interés:</h4>
                  <p className="text-gray-700">{oportunidad.productos_servicios}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No se han especificado productos o servicios</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estrategia" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estrategia de Venta */}
            {oportunidad.estrategia_venta && (
              <Card>
                <CardHeader>
                  <CardTitle>Estrategia de Venta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{oportunidad.estrategia_venta}</p>
                </CardContent>
              </Card>
            )}

            {/* Competencia */}
            {oportunidad.competencia && (
              <Card>
                <CardHeader>
                  <CardTitle>Competencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{oportunidad.competencia}</p>
                </CardContent>
              </Card>
            )}

            {/* Recursos Requeridos */}
            {oportunidad.recursos_requeridos && (
              <Card>
                <CardHeader>
                  <CardTitle>Recursos Requeridos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{oportunidad.recursos_requeridos}</p>
                </CardContent>
              </Card>
            )}

            {/* Riesgos */}
            {oportunidad.riesgos && (
              <Card>
                <CardHeader>
                  <CardTitle>Riesgos Identificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-gray-700">{oportunidad.riesgos}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Observaciones */}
          {oportunidad.observaciones && (
            <Card>
              <CardHeader>
                <CardTitle>Observaciones Adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{oportunidad.observaciones}</p>
              </CardContent>
            </Card>
          )}

          {/* Motivo de Cierre */}
          {oportunidad.motivo_cierre && (
            <Card>
              <CardHeader>
                <CardTitle>Motivo de Cierre</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-lg ${
                  oportunidad.etapa === 'cerrada_ganada' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <p className="text-gray-700">{oportunidad.motivo_cierre}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OportunidadSingle;