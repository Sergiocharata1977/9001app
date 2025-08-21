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
  MapPin, 
  Calendar,
  Building,
  User,
  Target,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react';
import { crmService } from '@/services/crmService';
import { TIPOS_CLIENTE, CATEGORIAS_CLIENTE, getTipoClienteColor, getCategoriaClienteColor } from '@/types/crm';
import { toast } from 'sonner';

const ClienteSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [cliente, setCliente] = useState(null);
  const [oportunidades, setOportunidades] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informacion');

  useEffect(() => {
    if (id) {
      cargarDatosCliente();
    }
  }, [id]);

  const cargarDatosCliente = async () => {
    try {
      setIsLoading(true);
      
      // Cargar datos del cliente
      const clienteResponse = await crmService.getCliente(id);
      setCliente(clienteResponse.data);
      
      // Cargar oportunidades del cliente
      const oportunidadesResponse = await crmService.getOportunidades({ cliente_id: id });
      setOportunidades(oportunidadesResponse.data || []);
      
      // Cargar actividades del cliente
      const actividadesResponse = await crmService.getActividades({ cliente_id: id });
      setActividades(actividadesResponse.data || []);
      
      // Calcular estadísticas
      calcularEstadisticas(oportunidadesResponse.data || [], actividadesResponse.data || []);
      
    } catch (error) {
      console.error('Error cargando cliente:', error);
      toast.error('Error cargando información del cliente');
    } finally {
      setIsLoading(false);
    }
  };

  const calcularEstadisticas = (oportunidades, actividades) => {
    const stats = {
      total_oportunidades: oportunidades.length,
      oportunidades_activas: oportunidades.filter(o => !['cerrada_ganada', 'cerrada_perdida'].includes(o.etapa)).length,
      oportunidades_ganadas: oportunidades.filter(o => o.etapa === 'cerrada_ganada').length,
      valor_total_oportunidades: oportunidades.reduce((sum, o) => sum + (o.valor_estimado || 0), 0),
      valor_oportunidades_ganadas: oportunidades.filter(o => o.etapa === 'cerrada_ganada').reduce((sum, o) => sum + (o.valor_estimado || 0), 0),
      total_actividades: actividades.length,
      actividades_completadas: actividades.filter(a => a.estado === 'completada').length,
      ultima_actividad: actividades.sort((a, b) => new Date(b.fecha_actividad) - new Date(a.fecha_actividad))[0]
    };
    
    setEstadisticas(stats);
  };

  const handleEdit = () => {
    // Abrir modal de edición
    console.log('Editar cliente:', cliente);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await crmService.deleteCliente(id);
        toast.success('Cliente eliminado exitosamente');
        navigate('/app/crm/clientes');
      } catch (error) {
        console.error('Error eliminando cliente:', error);
        toast.error('Error eliminando cliente');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando cliente...</p>
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Cliente no encontrado</h2>
        <p className="text-gray-600 mt-2">El cliente solicitado no existe o no tienes permisos para verlo.</p>
        <Button onClick={() => navigate('/app/crm/clientes')} className="mt-4">
          Volver a Clientes
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/app/crm/clientes')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{cliente.nombre}</h1>
            {cliente.razon_social && (
              <p className="text-gray-600">{cliente.razon_social}</p>
            )}
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

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Oportunidades</p>
                <p className="text-2xl font-bold">{estadisticas.total_oportunidades || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Valor Pipeline</p>
                <p className="text-2xl font-bold">
                  ${(estadisticas.valor_total_oportunidades || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Ventas Cerradas</p>
                <p className="text-2xl font-bold">
                  ${(estadisticas.valor_oportunidades_ganadas || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Actividades</p>
                <p className="text-2xl font-bold">{estadisticas.total_actividades || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido Principal */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="informacion">Información</TabsTrigger>
          <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          <TabsTrigger value="actividades">Actividades</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
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
                  <span className="font-medium">Tipo de Cliente:</span>
                  <Badge 
                    variant="outline" 
                    style={{ borderColor: getTipoClienteColor(cliente.tipo_cliente) }}
                  >
                    {TIPOS_CLIENTE.find(t => t.value === cliente.tipo_cliente)?.label}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Categoría:</span>
                  <Badge 
                    variant="outline" 
                    style={{ borderColor: getCategoriaClienteColor(cliente.categoria) }}
                  >
                    {CATEGORIAS_CLIENTE.find(c => c.value === cliente.categoria)?.label}
                  </Badge>
                </div>
                
                {cliente.rfc && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">RFC:</span>
                    <span>{cliente.rfc}</span>
                  </div>
                )}
                
                {cliente.representante_legal && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Representante Legal:</span>
                    <span>{cliente.representante_legal}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fecha de Registro:</span>
                  <span>{new Date(cliente.fecha_registro || cliente.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Información de Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cliente.telefono && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{cliente.telefono}</span>
                  </div>
                )}
                
                {cliente.email && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span>{cliente.email}</span>
                  </div>
                )}
                
                {cliente.sitio_web && (
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-3 text-gray-400" />
                    <a href={cliente.sitio_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {cliente.sitio_web}
                    </a>
                  </div>
                )}
                
                {(cliente.direccion || cliente.ciudad) && (
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1" />
                    <div>
                      {cliente.direccion && <div>{cliente.direccion}</div>}
                      {cliente.ciudad && cliente.estado && (
                        <div>{cliente.ciudad}, {cliente.estado}</div>
                      )}
                      {cliente.codigo_postal && <div>CP: {cliente.codigo_postal}</div>}
                      {cliente.pais && <div>{cliente.pais}</div>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Información Comercial */}
          {(cliente.vendedor_nombre || cliente.zona_venta || cliente.especialidad_interes) && (
            <Card>
              <CardHeader>
                <CardTitle>Información Comercial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cliente.vendedor_nombre && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Vendedor Asignado</p>
                        <p className="font-medium">{cliente.vendedor_nombre}</p>
                      </div>
                    </div>
                  )}
                  
                  {cliente.zona_venta && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Zona de Venta</p>
                        <p className="font-medium">{cliente.zona_venta}</p>
                      </div>
                    </div>
                  )}
                  
                  {cliente.especialidad_interes && (
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Especialidad de Interés</p>
                        <p className="font-medium">{cliente.especialidad_interes}</p>
                      </div>
                    </div>
                  )}
                  
                  {cliente.fecha_ultimo_contacto && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Último Contacto</p>
                        <p className="font-medium">{new Date(cliente.fecha_ultimo_contacto).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {cliente.observaciones && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Observaciones</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{cliente.observaciones}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="oportunidades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades ({oportunidades.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {oportunidades.length > 0 ? (
                <div className="space-y-4">
                  {oportunidades.map((oportunidad) => (
                    <Card key={oportunidad.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{oportunidad.titulo}</h3>
                          <Badge variant="outline">
                            ${(oportunidad.valor_estimado || 0).toLocaleString()}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Etapa: {oportunidad.etapa}</span>
                          <span>Probabilidad: {oportunidad.probabilidad}%</span>
                          {oportunidad.fecha_cierre_esperada && (
                            <span>Cierre: {new Date(oportunidad.fecha_cierre_esperada).toLocaleDateString()}</span>
                          )}
                        </div>
                        {oportunidad.descripcion && (
                          <p className="text-gray-700 mt-2">{oportunidad.descripcion}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay oportunidades registradas</p>
                </div>
              )}
            </CardContent>
          </Card>
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
                    <Card key={actividad.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{actividad.titulo}</h3>
                          <Badge variant="outline">
                            {actividad.tipo_actividad}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Estado: {actividad.estado}</span>
                          <span>Fecha: {new Date(actividad.fecha_actividad).toLocaleString()}</span>
                          <span>Duración: {actividad.duracion_minutos} min</span>
                        </div>
                        {actividad.descripcion && (
                          <p className="text-gray-700 mt-2">{actividad.descripcion}</p>
                        )}
                        {actividad.resultado && (
                          <div className="mt-2 bg-green-50 p-2 rounded">
                            <p className="text-sm"><strong>Resultado:</strong> {actividad.resultado}</p>
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

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cambios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Cliente creado</p>
                    <p className="text-sm text-gray-600">Se registró el cliente en el sistema</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(cliente.created_at).toLocaleString()}
                  </span>
                </div>
                
                {cliente.updated_at !== cliente.created_at && (
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Última actualización</p>
                      <p className="text-sm text-gray-600">Se modificó la información del cliente</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(cliente.updated_at).toLocaleString()}
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

export default ClienteSingle;