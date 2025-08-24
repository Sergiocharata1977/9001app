import { createApiClient, ApiClient } from './apiService';

// Interfaces para tipos de datos
export interface AccionData {
  id?: number;
  titulo: string;
  descripcion?: string;
  responsable?: string;
  prioridad?: 'baja' | 'media' | 'alta';
  fechaVencimiento?: string;
  hallazgo_id?: number | null;
  estado?: string;
  fechaCreacion?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AccionUpdateData {
  titulo?: string;
  descripcion?: string;
  responsable?: string;
  prioridad?: 'baja' | 'media' | 'alta';
  fechaVencimiento?: string;
  estado?: string;
  [key: string]: any; // Para campos adicionales del workflow
}

interface AccionesService {
  getAllAcciones: (hallazgo_id?: number | null) => Promise<AccionData[]>;
  createAccion: (accionData: AccionData) => Promise<AccionData>;
  updateAccion: (id: number, updateData: AccionUpdateData) => Promise<AccionData>;
  getAccionById: (id: number) => Promise<AccionData>;
  deleteAccion: (id: number) => Promise<{ success: boolean; message?: string }>;
}

const apiClient = createApiClient('/acciones');

const accionesService: AccionesService = {
  // Obtener todas las acciones, opcionalmente filtradas por hallazgo_id
  getAllAcciones: async (hallazgo_id = null) => {
    try {
      const params = hallazgo_id ? { hallazgo_id } : {};
      const response = await apiClient.get<AccionData[]>('/', { params });
      console.log('🚀 DEBUG: Acciones obtenidas del API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las acciones de mejora:', error);
      throw error;
    }
  },

  // Crear una nueva acción de mejora
  createAccion: async (accionData: AccionData) => {
    try {
      const response = await apiClient.post<AccionData>('/', accionData);
      console.log('✅ Acción de mejora creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al crear la acción de mejora:', error);
      throw error;
    }
  },

  // Actualizar una acción de mejora (ej: cambiar estado)
  updateAccion: async (id: number, updateData: AccionUpdateData) => {
    try {
      const response = await apiClient.put<AccionData>(`/${id}`, updateData);
      console.log('✅ Acción de mejora actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Obtener el detalle de una acción específica
  getAccionById: async (id: number) => {
    try {
      const response = await apiClient.get<AccionData>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una acción de mejora
  deleteAccion: async (id: number) => {
    try {
      const response = await apiClient.delete<{ success: boolean; message?: string }>(`/${id}`);
      console.log('✅ Acción de mejora eliminada:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la acción de mejora ${id}:`, error);
      throw error;
    }
  }
};

export default accionesService;