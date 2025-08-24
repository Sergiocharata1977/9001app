import { createApiClient } from './apiService'

export interface Accion {
  id: number
  titulo: string
  descripcion?: string
  responsable?: string
  prioridad?: 'baja' | 'media' | 'alta'
  fechaVencimiento?: string
  hallazgo_id?: number | null
  estado: string
  fechaCreacion?: string
  created_at?: string
  updated_at?: string
}

export interface CreateAccionInput {
  titulo: string
  descripcion?: string
  responsable?: string
  prioridad?: 'baja' | 'media' | 'alta'
  fechaVencimiento?: string
  hallazgo_id?: number | null
  estado?: string
  fechaCreacion?: string
}

export interface UpdateAccionInput {
  titulo?: string
  descripcion?: string
  responsable?: string
  prioridad?: 'baja' | 'media' | 'alta'
  fechaVencimiento?: string
  hallazgo_id?: number | null
  estado?: string
}

export interface AccionesServiceApi {
  getAllAcciones: (hallazgo_id?: number | null) => Promise<Accion[]>
  createAccion: (accionData: CreateAccionInput) => Promise<Accion>
  updateAccion: (id: number, updateData: UpdateAccionInput) => Promise<Accion>
  getAccionById: (id: number) => Promise<Accion>
  deleteAccion: (id: number) => Promise<{ success: boolean } | void>
}

const apiClient = createApiClient('/acciones')

export const accionesService: AccionesServiceApi = {
  // Obtener todas las acciones, opcionalmente filtradas por hallazgo_id
  getAllAcciones: async (hallazgo_id: number | null = null): Promise<Accion[]> => {
    const params = hallazgo_id ? { hallazgo_id } : {}
    const data = await apiClient.get<Accion[]>('/', { params })
    return data
  },

  // Crear una nueva acción de mejora
  createAccion: async (accionData: CreateAccionInput): Promise<Accion> => {
    const data = await apiClient.post<Accion>('/', accionData)
    return data
  },

  // Actualizar una acción de mejora (ej: cambiar estado)
  updateAccion: async (id: number, updateData: UpdateAccionInput): Promise<Accion> => {
    const data = await apiClient.put<Accion>(`/${id}`, updateData)
    return data
  },

  // Obtener el detalle de una acción específica
  getAccionById: async (id: number): Promise<Accion> => {
    const data = await apiClient.get<Accion>(`/${id}`)
    return data
  },

  // Eliminar una acción de mejora
  deleteAccion: async (id: number): Promise<{ success: boolean } | void> => {
    const data = await apiClient.delete<{ success: boolean }>(`/${id}`)
    return data
  }
}

export default accionesService