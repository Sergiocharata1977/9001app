import apiService from './apiService';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Documento, DocumentoFormData } from '../types/documentos';

interface DocumentosService {
  getDocumentos(): Promise<Documento[]>;
  getDocumentoById(id: number | string): Promise<AxiosResponse<Documento>>;
  createDocumento(data: DocumentoFormData): Promise<AxiosResponse<Documento>>;
  updateDocumento(id: number | string, data: Partial<DocumentoFormData>): Promise<AxiosResponse<Documento>>;
  uploadDocument(file: File, tipo?: Documento['tipo']): Promise<AxiosResponse<Documento>>;
  getDocumentosByTipo(tipo: Documento['tipo']): Promise<AxiosResponse<Documento[]>>;
  deleteDocumento(id: number | string): Promise<AxiosResponse<void>>;
  downloadDocumento(id: number | string): Promise<AxiosResponse<Blob>>;
}

const documentosService: DocumentosService = {
  // Obtener todos los documentos
  async getDocumentos(): Promise<Documento[]> {
    try {
      console.log('📄 Obteniendo todos los documentos...');
      const response = await apiService.get<Documento[]>('/documentos');
      console.log(`✅ ${response?.data?.length || 0} documentos obtenidos`);
      console.log('📄 Respuesta completa:', response);
      return Array.isArray(response?.data) ? response.data : [];
    } catch (error) {
      console.error('❌ Error al obtener documentos:', error);
      return [];
    }
  },

  // Obtener documento por ID
  async getDocumentoById(id: number | string): Promise<AxiosResponse<Documento>> {
    try {
      const response = await apiService.get<Documento>(`/documentos/${id}`);
      return response;
    } catch (error) {
      console.error(`Error al obtener documento ${id}:`, error);
      throw error;
    }
  },

  // Crear nuevo documento
  async createDocumento(data: DocumentoFormData): Promise<AxiosResponse<Documento>> {
    try {
      const response = await apiService.post<Documento>('/documentos', data);
      return response;
    } catch (error) {
      console.error('Error al crear documento:', error);
      throw error;
    }
  },

  // Actualizar documento
  async updateDocumento(id: number | string, data: Partial<DocumentoFormData>): Promise<AxiosResponse<Documento>> {
    try {
      const response = await apiService.put<Documento>(`/documentos/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error al actualizar documento ${id}:`, error);
      throw error;
    }
  },

  // Subir documento
  async uploadDocument(file: File, tipo: Documento['tipo'] = 'minuta'): Promise<AxiosResponse<Documento>> {
    const formData = new FormData();
    formData.append('documento', file);
    formData.append('tipo', tipo);
    
    return await apiService.post<Documento>('/documentos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Obtener documentos por tipo
  async getDocumentosByTipo(tipo: Documento['tipo']): Promise<AxiosResponse<Documento[]>> {
    return await apiService.get<Documento[]>(`/documentos/tipo/${tipo}`);
  },

  // Eliminar documento
  async deleteDocumento(id: number | string): Promise<AxiosResponse<void>> {
    return await apiService.delete<void>(`/documentos/${id}`);
  },

  // Descargar documento
  async downloadDocumento(id: number | string): Promise<AxiosResponse<Blob>> {
    return await apiService.get<Blob>(`/documentos/${id}/download`, {
      responseType: 'blob',
    } as AxiosRequestConfig);
  },
};

export default documentosService;