import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import procesosService from '@/services/procesosService'

export interface HallazgoFormData {
  titulo: string
  descripcion: string
  origen: string
  tipo_hallazgo: string
  prioridad: string
  proceso_id: string
  requisito_incumplido: string
}

export interface ProcesoItem { id: number; nombre: string }

export interface HallazgoFormProps {
  onSubmit: (data: HallazgoFormData) => void
  onCancel: () => void
  initialData?: Partial<HallazgoFormData>
}

const HallazgoForm: React.FC<HallazgoFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<HallazgoFormData>({
    titulo: '',
    descripcion: '',
    origen: '',
    tipo_hallazgo: '',
    prioridad: '',
    proceso_id: '',
    requisito_incumplido: '',
  })
  const [procesos, setProcesos] = useState<ProcesoItem[]>([])

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const data = await procesosService.getProcesos()
        setProcesos(data as ProcesoItem[])
      } catch (error) {
        console.error('Error al cargar los procesos:', error)
      }
    }
    fetchProcesos()
  }, [])

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...(initialData as HallazgoFormData) }))
    }
  }, [initialData])

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof HallazgoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const origenOptions = [
    { value: 'auditoria_interna', label: 'Auditoría Interna' },
    { value: 'auditoria_externa', label: 'Auditoría Externa' },
    { value: 'reclamo_cliente', label: 'Reclamo de Cliente' },
    { value: 'revision_direccion', label: 'Revisión por la Dirección' },
    { value: 'analisis_datos', label: 'Análisis de Datos' },
    { value: 'otro', label: 'Otro' }
  ] as const
  const tipoOptions = [
    'No Conformidad Mayor',
    'No Conformidad Menor',
    'Riesgo',
    'Oportunidad de Mejora',
    'Recomendación de Dirección'
  ] as const
  const prioridadOptions = [
    { value: 'baja', label: 'Baja' },
    { value: 'media', label: 'Media' },
    { value: 'alta', label: 'Alta' }
  ] as const

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="titulo">Título del Hallazgo</Label>
        <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="descripcion">Descripción detallada</Label>
        <Textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="origen">Origen</Label>
          <Select onValueChange={(value) => handleSelectChange('origen', value)} value={formData.origen}>
            <SelectTrigger><SelectValue placeholder="Seleccione un origen" /></SelectTrigger>
            <SelectContent>
              {origenOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tipo_hallazgo">Tipo</Label>
          <Select onValueChange={(value) => handleSelectChange('tipo_hallazgo', value)} value={formData.tipo_hallazgo}>
            <SelectTrigger><SelectValue placeholder="Seleccione un tipo" /></SelectTrigger>
            <SelectContent>
              {tipoOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prioridad">Prioridad</Label>
          <Select onValueChange={(value) => handleSelectChange('prioridad', value)} value={formData.prioridad}>
            <SelectTrigger><SelectValue placeholder="Seleccione una prioridad" /></SelectTrigger>
            <SelectContent>
              {prioridadOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="proceso_id">Proceso Involucrado</Label>
          <Select onValueChange={(value) => handleSelectChange('proceso_id', value)} value={formData.proceso_id}>
            <SelectTrigger><SelectValue placeholder="Seleccione un proceso" /></SelectTrigger>
            <SelectContent>
              {procesos.map(proceso => <SelectItem key={proceso.id} value={proceso.id.toString()}>{proceso.nombre}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="requisito_incumplido">Requisito Incumplido (si aplica)</Label>
        <Input id="requisito_incumplido" name="requisito_incumplido" value={formData.requisito_incumplido} onChange={handleChange} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Registrar Hallazgo</Button>
      </div>
    </form>
  )
}

export default HallazgoForm