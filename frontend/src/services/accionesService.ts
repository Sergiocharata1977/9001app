import { createApiClient } from './apiService';
import type { Accion, AccionFormData, AccionUpdateData, AccionService } from '../types/acciones';

const apiClient = createApiClient('/acciones');

const accionesService: AccionService = {
  // Obtener todas las acciones, opcionalmente filtradas por hallazgo_id
  getAllAcciones: async (hallazgo_id: number | null = null): Promise<Accion[]> => {
    try {
      const params = hallazgo_id ? { hallazgo_id } : {};
      const data = await apiClient.get<Accion[]>('/', { params });
      console.log('🚀 DEBUG: Acciones obtenidas del API:', data);
      return data.data;
    } catch (error) {
      console.error('Error al obtener las acciones de mejora:', error);
      throw error;
    }
  },

  // Crear una nueva acción de mejora
  createAccion: async (accionData: AccionFormData): Promise<Accion> => {
    try {
      const data = await apiClient.post<Accion>('/', accionData);
      console.log('✅ Acción de mejora creada:', data);
      return data.data;
    } catch (error) {
      console.error('Error al crear la acción de mejora:', error);
      throw error;
    }
  },

  // Actualizar una acción de mejora (ej: cambiar estado)
  updateAccion: async (id: number, updateData: AccionUpdateData): Promise<Accion> => {
    try {
      const data = await apiClient.put<Accion>(`/${id}`, updateData);
      console.log('✅ Acción de mejora actualizada:', data);
      return data.data;
    } catch (error) {
      console.error(`Error al actualizar la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Obtener el detalle de una acción específica
  getAccionById: async (id: number): Promise<Accion> => {
    try {
      const data = await apiClient.get<Accion>(`/${id}`);
      return data.data;
    } catch (error) {
      console.error(`Error al obtener la acción de mejora ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una acción de mejora
  deleteAccion: async (id: number): Promise<void> => {
    try {
      const data = await apiClient.delete<void>(`/${id}`);
      console.log('✅ Acción de mejora eliminada:', data);
    } catch (error) {
      console.error(`Error al eliminar la acción de mejora ${id}:`, error);
      throw error;
    }
  }
};

export default accionesService;