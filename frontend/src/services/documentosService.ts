import apiService from './apiService';
import type { AxiosResponse } from 'axios';

// Tipado mínimo para documentos según usos en la UI
export interface DocumentoItem {
  id: string | number;
  nombre?: string;
  titulo?: string;
  descripcion?: string;
  tipo_archivo?: string;
  archivo_nombre?: string;
  [key: string]: any;
}

export interface UploadResponseData {
  id: string | number;
  nombre?: string;
  url?: string;
  size?: number;
  type?: string;
  uploaded_at?: string;
  [key: string]: any;
}

export const documentosService = {
  // Obtener todos los documentos
  async getDocumentos(): Promise<DocumentoItem[]> {
    try {
      // El backend puede devolver array directo o { data: [...] }
      const response = await apiService.get<DocumentoItem[] | { data: DocumentoItem[] }>(
        '/documentos'
      );
      const payload = response?.data;
      if (Array.isArray(payload)) return payload;
      if (payload && Array.isArray((payload as any).data)) return (payload as any).data;
      return [];
    } catch (error) {
      console.error('❌ Error al obtener documentos:', error);
      return [];
    }
  },

  // Obtener documento por ID (alias getDocumento para compatibilidad)
  async getDocumentoById(id: string | number): Promise<DocumentoItem> {
    const response = await apiService.get<DocumentoItem>(`/documentos/${id}`);
    return (response as AxiosResponse<DocumentoItem>).data;
  },

  async getDocumento(id: string | number): Promise<DocumentoItem> {
    return this.getDocumentoById(id);
  },

  // Crear nuevo documento
  async createDocumento(data: Record<string, any>): Promise<DocumentoItem> {
    const response = await apiService.post<DocumentoItem>('/documentos', data);
    return response.data;
  },

  // Actualizar documento
  async updateDocumento(id: string | number, data: Record<string, any>): Promise<DocumentoItem> {
    const response = await apiService.put<DocumentoItem>(`/documentos/${id}`, data);
    return response.data;
  },

  // Subir documento
  async uploadDocument(
    file: File,
    tipo: string = 'minuta'
  ): Promise<AxiosResponse<UploadResponseData>> {
    const formData = new FormData();
    formData.append('documento', file);
    formData.append('tipo', tipo);

    // Se devuelve AxiosResponse porque los consumidores usan .data
    return await apiService.post<UploadResponseData>('/documentos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Obtener documentos por tipo
  async getDocumentosByTipo(tipo: string): Promise<DocumentoItem[]> {
    const response = await apiService.get<DocumentoItem[] | { data: DocumentoItem[] }>(
      `/documentos/tipo/${tipo}`
    );
    const payload = response.data as any;
    return Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
  },

  // Eliminar documento (alias deleteDocument para compatibilidad)
  async deleteDocumento(id: string | number): Promise<void> {
    await apiService.delete(`/documentos/${id}`);
  },

  async deleteDocument(id: string | number): Promise<void> {
    return this.deleteDocumento(id);
  },

  // Descargar documento (con filename opcional)
  async downloadDocumento(id: string | number, filename: string = 'documento.pdf') {
    return apiService.downloadFile(`/documentos/${id}/download`, filename);
  },

  // Obtener URL temporal para visualizar documento
  async getViewUrl(id: string | number): Promise<string> {
    const response = await apiService.get<Blob>(`/documentos/${id}/download`, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data]);
    return window.URL.createObjectURL(blob);
  },
};

export default documentosService;