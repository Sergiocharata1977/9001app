import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { crmService, vendedoresService } from '@/services/crmService';
import { TIPOS_CLIENTE, CATEGORIAS_CLIENTE } from '@/types/crm';

const ClienteModal = ({ isOpen, onClose, cliente = null, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    razon_social: '',
    rfc: '',
    tipo_cliente: 'potencial',
    categoria: 'C',
    direccion: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    pais: 'México',
    telefono: '',
    email: '',
    sitio_web: '',
    representante_legal: '',
    vendedor_asignado_id: '',
    supervisor_comercial_id: '',
    zona_venta: '',
    especialidad_interes: '',
    observaciones: ''
  });

  const [vendedores, setVendedores] = useState([]);
  const [supervisores, setSupervisores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEditing = !!cliente;

  useEffect(() => {
    if (isOpen) {
      cargarVendedores();
      if (cliente) {
        setFormData({ ...cliente });
      } else {
        resetForm();
      }
    }
  }, [isOpen, cliente]);

  const cargarVendedores = async () => {
    try {
      const response = await vendedoresService.getVendedoresPersonal();
      setVendedores(response.data || []);
      
      // Los supervisores son vendedores con rol gerencial
      const supervisoresData = response.data?.filter(v => 
        v.tipo_personal === 'gerencial' || v.especialidad_ventas?.includes('Supervisor')
      ) || [];
      setSupervisores(supervisoresData);
    } catch (error) {
      console.error('Error cargando vendedores:', error);
      toast.error('Error cargando vendedores');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      razon_social: '',
      rfc: '',
      tipo_cliente: 'potencial',
      categoria: 'C',
      direccion: '',
      ciudad: '',
      estado: '',
      codigo_postal: '',
      pais: 'México',
      telefono: '',
      email: '',
      sitio_web: '',
      representante_legal: '',
      vendedor_asignado_id: '',
      supervisor_comercial_id: '',
      zona_venta: '',
      especialidad_interes: '',
      observaciones: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.telefono && !/^[\d\s\-\+\(\)]+$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
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
        result = await crmService.updateCliente(cliente.id, formData);
        toast.success('Cliente actualizado exitosamente');
      } else {
        result = await crmService.createCliente(formData);
        toast.success('Cliente creado exitosamente');
      }
      
      if (onSave) {
        onSave(result.data);
      }
      
      onClose();
    } catch (error) {
      console.error('Error guardando cliente:', error);
      toast.error(error.response?.data?.message || 'Error guardando cliente');
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Nombre del cliente"
                className={errors.nombre ? 'border-red-500' : ''}
              />
              {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="razon_social">Razón Social</Label>
              <Input
                id="razon_social"
                value={formData.razon_social}
                onChange={(e) => handleInputChange('razon_social', e.target.value)}
                placeholder="Razón social de la empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rfc">RFC</Label>
              <Input
                id="rfc"
                value={formData.rfc}
                onChange={(e) => handleInputChange('rfc', e.target.value)}
                placeholder="RFC del cliente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_cliente">Tipo de Cliente</Label>
              <Select value={formData.tipo_cliente} onValueChange={(value) => handleInputChange('tipo_cliente', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_CLIENTE.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_CLIENTE.map((categoria) => (
                    <SelectItem key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendedor_asignado_id">Vendedor Asignado</Label>
              <Select value={formData.vendedor_asignado_id} onValueChange={(value) => handleInputChange('vendedor_asignado_id', value)}>
                <SelectTrigger>
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
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className={errors.telefono ? 'border-red-500' : ''}
                />
                {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="cliente@empresa.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitio_web">Sitio Web</Label>
                <Input
                  id="sitio_web"
                  value={formData.sitio_web}
                  onChange={(e) => handleInputChange('sitio_web', e.target.value)}
                  placeholder="https://www.empresa.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="representante_legal">Representante Legal</Label>
                <Input
                  id="representante_legal"
                  value={formData.representante_legal}
                  onChange={(e) => handleInputChange('representante_legal', e.target.value)}
                  placeholder="Nombre del representante"
                />
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Dirección</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Calle, número, colonia"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => handleInputChange('ciudad', e.target.value)}
                  placeholder="Ciudad"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  placeholder="Estado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo_postal">Código Postal</Label>
                <Input
                  id="codigo_postal"
                  value={formData.codigo_postal}
                  onChange={(e) => handleInputChange('codigo_postal', e.target.value)}
                  placeholder="12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais">País</Label>
                <Input
                  id="pais"
                  value={formData.pais}
                  onChange={(e) => handleInputChange('pais', e.target.value)}
                  placeholder="México"
                />
              </div>
            </div>
          </div>

          {/* Información Comercial */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Información Comercial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supervisor_comercial_id">Supervisor Comercial</Label>
                <Select value={formData.supervisor_comercial_id} onValueChange={(value) => handleInputChange('supervisor_comercial_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisores.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.nombres} {supervisor.apellidos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zona_venta">Zona de Venta</Label>
                <Select value={formData.zona_venta} onValueChange={(value) => handleInputChange('zona_venta', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="norte">Norte</SelectItem>
                    <SelectItem value="sur">Sur</SelectItem>
                    <SelectItem value="este">Este</SelectItem>
                    <SelectItem value="oeste">Oeste</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="especialidad_interes">Especialidad de Interés</Label>
                <Input
                  id="especialidad_interes"
                  value={formData.especialidad_interes}
                  onChange={(e) => handleInputChange('especialidad_interes', e.target.value)}
                  placeholder="Productos o servicios de interés"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleInputChange('observaciones', e.target.value)}
                  placeholder="Observaciones adicionales..."
                  rows={3}
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
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'} Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClienteModal;