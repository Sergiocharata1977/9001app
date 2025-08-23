// Tipos para el módulo de documentos

export interface Documento {
  id: number;
  titulo: string;
  descripcion?: string;
  tipo: 'procedimiento' | 'instruccion' | 'formulario' | 'registro' | 'manual' | 'politica' | 'minuta';
  codigo?: string;
  version: string;
  estado: 'borrador' | 'en_revision' | 'aprobado' | 'obsoleto';
  autor?: string;
  revisor?: string;
  aprobador?: string;
  fecha_aprobacion?: string;
  fecha_vencimiento?: string;
  proceso_id?: number;
  archivo_url?: string;
  archivo_nombre?: string;
  archivo_tipo?: string;
  archivo_tamano?: number;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DocumentoFormData {
  titulo: string;
  descripcion?: string;
  tipo: Documento['tipo'];
  codigo?: string;
  version: string;
  estado: Documento['estado'];
  autor?: string;
  revisor?: string;
  aprobador?: string;
  fecha_aprobacion?: string;
  fecha_vencimiento?: string;
  proceso_id?: number;
  archivo_url?: string;
  tags?: string[];
}

export interface DocumentoUploadData {
  documento: File;
  tipo: Documento['tipo'];
}

export interface DocumentoResponse {
  success: boolean;
  data?: Documento | Documento[];
  message?: string;
  error?: string;
}