import { createApiClient } from './apiService';
import type { ApiResponse } from '@/types/api';
import type { Hallazgo, HallazgoFormData, HallazgoEstado } from '@/types/hallazgos';

const apiClient = createApiClient('/hallazgos');

export const hallazgosService = {
  /**
   * Obtiene todos los hallazgos.
   */
  async getAllHallazgos(): Promise<Hallazgo[]> {
    const data = await apiClient.get<Hallazgo[]>('/');
    // apiClient.get devuelve ApiResponse<T>; normalizamos a array
    const payload = data as unknown as ApiResponse<Hallazgo[]>;
    const result = Array.isArray((payload as any).data) ? (payload as any).data : (data as any);
    return Array.isArray(result) ? result : [];
  },

  /**
   * Obtiene un hallazgo por su ID.
   */
  async getHallazgoById(id: string | number): Promise<Hallazgo> {
    const data = await apiClient.get<Hallazgo>(`/${id}`);
    const payload = data as unknown as ApiResponse<Hallazgo>;
    return (payload as any).data ?? (data as any);
  },

  /**
   * Crea un nuevo hallazgo.
   */
  async createHallazgo(hallazgoData: HallazgoFormData): Promise<Hallazgo> {
    const data = await apiClient.post<Hallazgo>('/', hallazgoData);
    const payload = data as unknown as ApiResponse<Hallazgo>;
    return (payload as any).data ?? (data as any);
  },

  /**
   * Actualiza un hallazgo existente.
   */
  async updateHallazgo(id: string | number, hallazgoData: Partial<HallazgoFormData>): Promise<Hallazgo> {
    const data = await apiClient.put<Hallazgo>(`/${id}`, hallazgoData);
    const payload = data as unknown as ApiResponse<Hallazgo>;
    return (payload as any).data ?? (data as any);
  },

  /**
   * Elimina un hallazgo.
   */
  async deleteHallazgo(id: string | number): Promise<void> {
    await apiClient.delete<void>(`/${id}`);
  },

  /**
   * Actualiza el estado de un hallazgo.
   */
  async updateHallazgoEstado(id: string | number, estado: HallazgoEstado): Promise<ApiResponse> {
    // Arreglar endpoint: estaba apuntando a /mejoras
    const response = await apiClient.put<ApiResponse>(`/${id}/estado`, { estado });
    return (response as any).data ?? (response as any);
  },

  /**
   * Actualiza el orden de los hallazgos.
   */
  async updateHallazgosOrder(orderedIds: Array<string | number>): Promise<ApiResponse> {
    // Arreglar endpoint: estaba apuntando a /mejoras
    const response = await apiClient.put<ApiResponse>('/orden', { orderedIds });
    return (response as any).data ?? (response as any);
  },
};

export default hallazgosService;