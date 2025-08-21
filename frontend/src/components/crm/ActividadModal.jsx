import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { crmService, vendedoresService } from '@/services/crmService';
import { TIPOS_ACTIVIDAD, ESTADOS_ACTIVIDAD, PRIORIDADES_ACTIVIDAD } from '@/types/crm';

const ActividadModal = ({ isOpen, onClose, actividad = null, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    oportunidad_id: '',
    cliente_id: '',
    vendedor_id: '',
    tipo_actividad: 'llamada',
    fecha_actividad: '',
    duracion_minutos: 30,
    estado: 'programada',
    resultado: '',
    proxima_accion: '',
    fecha_proxima_accion: '',
    prioridad: 'media',
    ubicacion: '',
    participantes: '',
    adjuntos: '',
    observaciones: ''
  });

  const [oportunidades, setOportunidades] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!actividad;

  useEffect(() => {
    if (isOpen) {
      cargarDatosReferencia();
      if (actividad) {
        setFormData({ ...actividad });
      } else {
        resetForm();
      }
    }
  }, [isOpen, actividad]);

  const cargarDatosReferencia = async () => {
    try {
      const oportunidadesResponse = await crmService.getOportunidades();
      setOportunidades(oportunidadesResponse.data || []);
      
      const clientesResponse = await crmService.getClientes();
      setClientes(clientesResponse.data || []);
      
      const vendedoresResponse = await vendedoresService.getVendedoresPersonal();
      setVendedores(vendedoresResponse.data || []);
    } catch (error) {
      console.error('Error cargando datos de referencia:', error);
      toast.error('Error cargando datos de referencia');
    }
  };

  const resetForm = () => {
    const now = new Date();
    const fechaHoy = now.toISOString().split('T')[0];
    const horaActual = now.toTimeString().slice(0, 5);
    
    setFormData({
      titulo: '',
      descripcion: '',
      oportunidad_id: '',
      cliente_id: '',
      vendedor_id: '',
      tipo_actividad: 'llamada',
      fecha_actividad: `${fechaHoy}T${horaActual}`,
      duracion_minutos: 30,
      estado: 'programada',
      resultado: '',
      proxima_accion: '',
      fecha_proxima_accion: '',
      prioridad: 'media',
      ubicacion: '',
      participantes: '',
      adjuntos: '',
      observaciones: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    
    if (!formData.vendedor_id) {
      newErrors.vendedor_id = 'Debe asignar un vendedor';
    }
    
    if (!formData.fecha_actividad) {
      newErrors.fecha_actividad = 'La fecha es requerida';
    }
    
    if (formData.duracion_minutos < 0) {
      newErrors.duracion_minutos = 'La duración no puede ser negativa';
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
        result = await crmService.updateActividad(actividad.id, formData);
        toast.success('Actividad actualizada exitosamente');
      } else {
        result = await crmService.createActividad(formData);
        toast.success('Actividad creada exitosamente');
      }
      
      if (onSave) {
        onSave(result.data);
      }
      
      onClose();
    } catch (error) {
      console.error('Error guardando actividad:', error);
      toast.error(error.response?.data?.message || 'Error guardando actividad');
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

  const clientesFiltrados = formData.oportunidad_id 
    ? clientes.filter(c => c.id === oportunidades.find(o => o.id === formData.oportunidad_id)?.cliente_id)
    : clientes;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Actividad' : 'Nueva Actividad'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Título de la actividad"
                className={errors.titulo ? 'border-red-500' : ''}
              />
              {errors.titulo && <p className="text-red-500 text-xs">{errors.titulo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_actividad">Tipo de Actividad</Label>
              <Select value={formData.tipo_actividad} onValueChange={(value) => handleInputChange('tipo_actividad', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_ACTIVIDAD.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Programación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha_actividad">Fecha y Hora *</Label>
                <Input
                  id="fecha_actividad"
                  type="datetime-local"
                  value={formData.fecha_actividad}
                  onChange={(e) => handleInputChange('fecha_actividad', e.target.value)}
                  className={errors.fecha_actividad ? 'border-red-500' : ''}
                />
                {errors.fecha_actividad && <p className="text-red-500 text-xs">{errors.fecha_actividad}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion_minutos">Duración (min)</Label>
                <Input
                  id="duracion_minutos"
                  type="number"
                  min="1"
                  value={formData.duracion_minutos}
                  onChange={(e) => handleInputChange('duracion_minutos', parseInt(e.target.value) || 30)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridad">Prioridad</Label>
                <Select value={formData.prioridad} onValueChange={(value) => handleInputChange('prioridad', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORIDADES_ACTIVIDAD.map((prioridad) => (
                      <SelectItem key={prioridad.value} value={prioridad.value}>
                        {prioridad.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'} Actividad
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActividadModal;