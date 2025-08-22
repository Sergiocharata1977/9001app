import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { crmService, vendedoresService } from '@/services/crmService';
import { ETAPAS_OPORTUNIDAD, TIPOS_OPORTUNIDAD } from '@/types/crm';

const OportunidadModal = ({ isOpen, onClose, oportunidad = null, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    cliente_id: '',
    vendedor_id: '',
    supervisor_id: '',
    tipo_oportunidad: 'nueva',
    etapa: 'prospeccion',
    probabilidad: 10,
    valor_estimado: 0,
    moneda: 'MXN',
    fecha_cierre_esperada: '',
    productos_servicios: '',
    competencia: '',
    recursos_requeridos: '',
    riesgos: '',
    estrategia_venta: '',
    observaciones: ''
  });

  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!oportunidad;

  useEffect(() => {
    if (isOpen) {
      cargarDatosReferencia();
      if (oportunidad) {
        setFormData({ ...oportunidad });
      } else {
        resetForm();
      }
    }
  }, [isOpen, oportunidad]);

  const cargarDatosReferencia = async () => {
    try {
      // Cargar clientes
      const clientesResponse = await crmService.getClientes();
      setClientes(clientesResponse.data || []);
      
      // Cargar vendedores
      const vendedoresResponse = await vendedoresService.getVendedoresPersonal();
      setVendedores(vendedoresResponse.data || []);
      
      // Los supervisores son vendedores con rol gerencial
      const supervisoresData = vendedoresResponse.data?.filter(v => 
        v.tipo_personal === 'gerencial' || v.especialidad_ventas?.includes('Supervisor')
      ) || [];
      setSupervisores(supervisoresData);
    } catch (error) {
      console.error('Error cargando datos de referencia:', error);
      toast.error('Error cargando datos de referencia');
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      cliente_id: '',
      vendedor_id: '',
      supervisor_id: '',
      tipo_oportunidad: 'nueva',
      etapa: 'prospeccion',
      probabilidad: 10,
      valor_estimado: 0,
      moneda: 'MXN',
      fecha_cierre_esperada: '',
      productos_servicios: '',
      competencia: '',
      recursos_requeridos: '',
      riesgos: '',
      estrategia_venta: '',
      observaciones: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    
    if (!formData.cliente_id) {
      newErrors.cliente_id = 'Debe seleccionar un cliente';
    }
    
    if (!formData.vendedor_id) {
      newErrors.vendedor_id = 'Debe asignar un vendedor';
    }
    
    if (formData.valor_estimado < 0) {
      newErrors.valor_estimado = 'El valor no puede ser negativo';
    }
    
    if (formData.probabilidad < 0 || formData.probabilidad > 100) {
      newErrors.probabilidad = 'La probabilidad debe estar entre 0 y 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    setIsLoading(true);
    
    try {
      let result;
      if (isEditing) {
        result = await crmService.updateOportunidad(oportunidad.id, formData);
        toast.success('Oportunidad actualizada exitosamente');
      } else {
        result = await crmService.createOportunidad(formData);
        toast.success('Oportunidad creada exitosamente');
      }
      
      if (onSave) {
        onSave(result.data);
      }
      
      onClose();
    } catch (error) {
      console.error('Error guardando oportunidad:', error);
      toast.error(error.response?.data?.message || 'Error guardando oportunidad');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Actualizar probabilidad automáticamente según la etapa
  const handleEtapaChange = (etapa) => {
    const probabilidades = {
      'prospeccion': 10,
      'calificacion': 25,
      'propuesta': 50,
      'negociacion': 75,
      'cerrada_ganada': 100,
      'cerrada_perdida': 0
    };
    
    setFormData(prev => ({
      ...prev,
      etapa,
      probabilidad: probabilidades[etapa] || prev.probabilidad
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Oportunidad' : 'Nueva Oportunidad'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Título de la oportunidad"
                className={errors.titulo ? 'border-red-500' : ''}
              />
              {errors.titulo && <p className="text-red-500 text-xs">{errors.titulo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cliente_id">Cliente *</Label>
              <Select value={formData.cliente_id} onValueChange={(value) => handleInputChange('cliente_id', value)}>
                <SelectTrigger className={errors.cliente_id ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cliente_id && <p className="text-red-500 text-xs">{errors.cliente_id}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendedor_id">Vendedor *</Label>
              <Select value={formData.vendedor_id} onValueChange={(value) => handleInputChange('vendedor_id', value)}>
                <SelectTrigger className={errors.vendedor_id ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Seleccionar vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {vendedores.map((vendedor) => (
                    <SelectItem key={vendedor.id} value={vendedor.id}>
                      {vendedor.nombres} {vendedor.apellidos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vendedor_id && <p className="text-red-500 text-xs">{errors.vendedor_id}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_oportunidad">Tipo de Oportunidad</Label>
              <Select value={formData.tipo_oportunidad} onValueChange={(value) => handleInputChange('tipo_oportunidad', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_OPORTUNIDAD.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="etapa">Etapa</Label>
              <Select value={formData.etapa} onValueChange={handleEtapaChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ETAPAS_OPORTUNIDAD.map((etapa) => (
                    <SelectItem key={etapa.value} value={etapa.value}>
                      {etapa.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información Financiera */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Información Financiera</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valor_estimado">Valor Estimado</Label>
                <Input
                  id="valor_estimado"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.valor_estimado}
                  onChange={(e) => handleInputChange('valor_estimado', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className={errors.valor_estimado ? 'border-red-500' : ''}
                />
                {errors.valor_estimado && <p className="text-red-500 text-xs">{errors.valor_estimado}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="moneda">Moneda</Label>
                <Select value={formData.moneda} onValueChange={(value) => handleInputChange('moneda', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                    <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="probabilidad">Probabilidad (%)</Label>
                <Input
                  id="probabilidad"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probabilidad}
                  onChange={(e) => handleInputChange('probabilidad', parseInt(e.target.value) || 0)}
                  className={errors.probabilidad ? 'border-red-500' : ''}
                />
                {errors.probabilidad && <p className="text-red-500 text-xs">{errors.probabilidad}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha_cierre_esperada">Fecha de Cierre Esperada</Label>
                <Input
                  id="fecha_cierre_esperada"
                  type="date"
                  value={formData.fecha_cierre_esperada}
                  onChange={(e) => handleInputChange('fecha_cierre_esperada', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Descripción detallada de la oportunidad..."
                rows={3}
              />
            </div>
          </div>

          {/* Información Comercial Avanzada */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Información Comercial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productos_servicios">Productos/Servicios</Label>
                <Textarea
                  id="productos_servicios"
                  value={formData.productos_servicios}
                  onChange={(e) => handleInputChange('productos_servicios', e.target.value)}
                  placeholder="Productos o servicios involucrados..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competencia">Competencia</Label>
                <Textarea
                  id="competencia"
                  value={formData.competencia}
                  onChange={(e) => handleInputChange('competencia', e.target.value)}
                  placeholder="Competidores identificados..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recursos_requeridos">Recursos Requeridos</Label>
                <Textarea
                  id="recursos_requeridos"
                  value={formData.recursos_requeridos}
                  onChange={(e) => handleInputChange('recursos_requeridos', e.target.value)}
                  placeholder="Recursos necesarios para cerrar..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riesgos">Riesgos</Label>
                <Textarea
                  id="riesgos"
                  value={formData.riesgos}
                  onChange={(e) => handleInputChange('riesgos', e.target.value)}
                  placeholder="Riesgos identificados..."
                  rows={2}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="estrategia_venta">Estrategia de Venta</Label>
                <Textarea
                  id="estrategia_venta"
                  value={formData.estrategia_venta}
                  onChange={(e) => handleInputChange('estrategia_venta', e.target.value)}
                  placeholder="Estrategia para cerrar la oportunidad..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleInputChange('observaciones', e.target.value)}
                  placeholder="Observaciones adicionales..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-slate-600 hover:bg-slate-700"
            >
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'} Oportunidad
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadModal;