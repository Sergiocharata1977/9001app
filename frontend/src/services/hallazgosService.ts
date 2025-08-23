import { createApiClient } from './apiService';
import { Hallazgo, HallazgoFormData, HallazgoEstado } from '../types/hallazgos';
import { ApiResponse } from '../types/api';

interface HallazgosApiClient {
  get: <T = any>(endpoint?: string) => Promise<T>;
  post: <T = any>(endpoint?: string, data?: any) => Promise<T>;
  put: <T = any>(endpoint?: string, data?: any) => Promise<T>;
  delete: <T = any>(endpoint?: string) => Promise<T>;
}

const apiClient = createApiClient('/hallazgos') as HallazgosApiClient;

interface HallazgosService {
  getAllHallazgos(): Promise<Hallazgo[]>;
  getHallazgoById(id: string | number): Promise<Hallazgo>;
  createHallazgo(hallazgoData: HallazgoFormData): Promise<Hallazgo>;
  updateHallazgo(id: string | number, hallazgoData: Partial<HallazgoFormData>): Promise<Hallazgo>;
  deleteHallazgo(id: string | number): Promise<void>;
  updateHallazgoEstado(id: string | number, estado: HallazgoEstado): Promise<ApiResponse<Hallazgo>>;
  updateHallazgosOrder(orderedIds: string[]): Promise<ApiResponse<any>>;
}

export const hallazgosService: HallazgosService = {
  /**
   * Obtiene todos los hallazgos.
   * @returns {Promise<Array>} Lista de hallazgos.
   */
  async getAllHallazgos(): Promise<Hallazgo[]> {
    try {
      const data = await apiClient.get<Hallazgo[]>('/');
      // Validación defensiva
      const safeData = Array.isArray(data) ? data : [];
      console.log('🚀 DEBUG: Hallazgos obtenidos del API:', safeData);
      console.log('🚀 DEBUG: Cantidad de hallazgos del API:', safeData?.length);
      
      // Inspeccionar estructura de los primeros 3 hallazgos
      console.log('🔍 DEBUG: Estructura de los primeros 3 hallazgos:');
      safeData?.slice(0, 3).forEach((h, i) => {
        console.log(`   Hallazgo ${i+1}:`, {
          id: h.id,
          numeroHallazgo: h.numeroHallazgo,
          titulo: h.titulo,
          estado: h.estado,
          hasId: !!h.id,
          hasEstado: !!h.estado,
          allKeys: Object.keys(h)
        });
      });
      
      return safeData;
    } catch (error: any) {
      console.error('Error al obtener los hallazgos:', error);
      throw new Error(error.message || 'Error al cargar los hallazgos');
    }
  },

  /**
   * Obtiene un hallazgo por su ID.
   * @param {string} id - ID del hallazgo.
   * @returns {Promise<Object>} Datos del hallazgo.
   */
  async getHallazgoById(id: string | number): Promise<Hallazgo> {
    try {
      const data = await apiClient.get<Hallazgo>(`/${id}`);
      return data;
    } catch (error: any) {
      console.error(`Error al obtener el hallazgo con ID ${id}:`, error);
      throw new Error(error.message || 'Error al cargar el hallazgo');
    }
  },

  /**
   * Crea un nuevo hallazgo.
   * @param {Object} hallazgoData - Datos del hallazgo a crear.
   * @returns {Promise<Object>} El hallazgo creado.
   */
  async createHallazgo(hallazgoData: HallazgoFormData): Promise<Hallazgo> {
    try {
      const data = await apiClient.post<Hallazgo>('/', hallazgoData);
      return data;
    } catch (error: any) {
      console.error('Error al crear el hallazgo:', error);
      throw new Error(error.message || 'Error al crear el hallazgo');
    }
  },

  /**
   * Actualiza un hallazgo existente.
   * @param {string} id - ID del hallazgo a actualizar.
   * @param {Object} hallazgoData - Datos actualizados del hallazgo.
   * @returns {Promise<Object>} El hallazgo actualizado.
   */
  async updateHallazgo(id: string | number, hallazgoData: Partial<HallazgoFormData>): Promise<Hallazgo> {
    try {
      const data = await apiClient.put<Hallazgo>(`/${id}`, hallazgoData);
      return data;
    } catch (error: any) {
      console.error(`Error al actualizar el hallazgo con ID ${id}:`, error);
      throw new Error(error.message || 'Error al actualizar el hallazgo');
    }
  },

  /**
   * Elimina un hallazgo.
   * @param {string} id - ID del hallazgo a eliminar.
   * @returns {Promise<void>}
   */
  async deleteHallazgo(id: string | number): Promise<void> {
    try {
      await apiClient.delete(`/${id}`);
    } catch (error: any) {
      console.error(`Error al eliminar el hallazgo con ID ${id}:`, error);
      throw new Error(error.message || 'Error al eliminar el hallazgo');
    }
  },

  /**
   * Actualiza el estado de un hallazgo.
   * @param {string} id - ID del hallazgo a actualizar.
   * @param {string} estado - Nuevo estado del hallazgo.
   * @returns {Promise<void>}
   */
  async updateHallazgoEstado(id: string | number, estado: HallazgoEstado): Promise<ApiResponse<Hallazgo>> {
    try {
      const response = await apiClient.put<ApiResponse<Hallazgo>>(`/mejoras/${id}/estado`, { estado });
      return response;
    } catch (error: any) {
      console.error(`Error al actualizar el estado del hallazgo con ID ${id}:`, error);
      throw new Error(error.message || 'Error al actualizar el estado del hallazgo');
    }
  },

  /**
   * Actualiza el orden de los hallazgos.
   * @param {Array<string>} orderedIds - Lista de IDs ordenados.
   * @returns {Promise<Object>} La respuesta del servidor.
   */
  async updateHallazgosOrder(orderedIds: string[]): Promise<ApiResponse<any>> {
    try {
      const response = await apiClient.put<ApiResponse<any>>('/mejoras/orden', { orderedIds });
      return response;
    } catch (error: any) {
      console.error('Error al actualizar el orden de los hallazgos:', error);
      throw new Error(error.message || 'Error al actualizar el orden de los hallazgos');
    }
  },
};

export default hallazgosService;