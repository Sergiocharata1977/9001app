import { createApiClient } from './apiService';

// Tipos para las acciones
export interface Accion {
  id?: number;
  titulo: string;
  descripcion: string;
  responsable: string;
  prioridad: 'baja' | 'media' | 'alta';
  fechaVencimiento: string;
  fechaCreacion?: string;
  hallazgo_id?: number | null;
  estado: string;
  // Campos adicionales del workflow
  planificacion_detalle?: string;
  recursos_necesarios?: string;
  fecha_inicio_planificada?: string;
  fecha_fin_planificada?: string;
  evidencia_ejecucion?: string;
  fecha_ejecucion?: string;
  observaciones_ejecucion?: string;
  metodo_verificacion?: string;
  responsable_verificacion?: string;
  fecha_verificacion_planificada?: string;
  resultado_verificacion?: string;
  evidencia_verificacion?: string;
  fecha_verificacion_real?: string;
  observaciones_verificacion?: string;
}

export interface AccionFormData extends Partial<Accion> {
  [key: string]: any;
}

interface AccionesService {
  getAllAcciones: (hallazgo_id?: number | null) => Promise<any>;
  createAccion: (accionData: AccionFormData) => Promise<any>;
  updateAccion: (id: number, updateData: AccionFormData) => Promise<any>;
  getAccionById: (id: number) => Promise<any>;
  deleteAccion: (id: number) => Promise<any>;
}

const apiClient = createApiClient('/acciones');

const accionesService: AccionesService = {
  // Obtener todas las acciones, opcionalmente filtradas por hallazgo_id
  getAllAcciones: async (hallazgo_id: number | null = null) => {
    try {
      const params = hallazgo_id ? { hallazgo_id } : {};
      const data = await apiClient.get('/', { params });
      console.log('🚀 DEBUG: Acciones obtenidas del API:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener las acciones de mejora:', error);
      throw error;
    }
  },

  // Crear una nueva acción de mejora
  createAccion: async (accionData: AccionFormData) => {
    try {
      const data = await apiClient.post('/', accionData);
      console.log('✅ Acción de mejora creada:', data);
      return data;
    } catch (error) {
      console.error('Error al crear la acción de mejora:', error);
      throw error;
    }
  },

  // Actualizar una acción de mejora (ej: cambiar estado)
  updateAccion: async (id: number, updateData: AccionFormData) => {
    try {
      const data = await apiClient.put(`/${id}`, updateData);
      console.log('✅ Acción de mejora actualizada:', data);
      return data;
    } catch (error) {
      console.error(`Error al actualizar la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Obtener el detalle de una acción específica
  getAccionById: async (id: number) => {
    try {
      const data = await apiClient.get(`/${id}`);
      return data;
    } catch (error) {
      console.error(`Error al obtener la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una acción de mejora
  deleteAccion: async (id: number) => {
    try {
      const data = await apiClient.delete(`/${id}`);
      console.log('✅ Acción de mejora eliminada:', data);
      return data;
    } catch (error) {
      console.error(`Error al eliminar la acción de mejora ${id}:`, error);
      throw error;
    }
  }
};

export default accionesService;