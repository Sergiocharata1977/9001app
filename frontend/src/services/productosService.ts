import apiService from './apiService';
import { Producto } from '../types';
import { ApiResponse } from '../types/api';

// Tipo para los datos del formulario de producto
interface ProductoFormData {
  nombre: string;
  codigo: string;
  descripcion: string;
  estado: Producto['estado'];
  tipo: Producto['tipo'];
  categoria: string;
  responsable: string;
  fecha_revision?: string;
  version: string;
  especificaciones?: string;
  requisitos_calidad?: string;
  proceso_aprobacion?: string;
  documentos_asociados?: string;
  observaciones?: string;
}

// Tipo para la respuesta del backend
interface ProductosResponse {
  success: boolean;
  data: Producto[];
}

interface ProductosService {
  getProductos(): Promise<Producto[]>;
  getAll(): Promise<Producto[]>;
  getById(id: number | string): Promise<Producto>;
  create(productoData: ProductoFormData): Promise<ApiResponse<Producto>>;
  update(id: number | string, productoData: Partial<ProductoFormData>): Promise<ApiResponse<Producto>>;
  delete(id: number | string): Promise<ApiResponse<void>>;
  search(query: string): Promise<ApiResponse<Producto[]>>;
  getByCategory(categoria: string): Promise<ApiResponse<Producto[]>>;
}

// Servicio para gestión de productos y servicios
export const productosService: ProductosService = {
  // Obtener todos los productos (alias para compatibilidad)
  async getProductos(): Promise<Producto[]> {
    return this.getAll();
  },
  
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    try {
      const response = await apiService.get<Producto[] | ProductosResponse>('/productos');
      // Asegurar que devolvemos un array
      if (response.data && (response.data as ProductosResponse).data) {
        return (response.data as ProductosResponse).data; // Si el backend devuelve { success: true, data: [...] }
      } else if (Array.isArray(response.data)) {
        return response.data as Producto[]; // Si el backend devuelve directamente el array
      } else {
        console.warn('Respuesta inesperada del backend:', response.data);
        return []; // Devolver array vacío si la respuesta no es la esperada
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  async getById(id: number | string): Promise<Producto> {
    try {
      const response = await apiService.get<Producto>(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear un nuevo producto
  async create(productoData: ProductoFormData): Promise<ApiResponse<Producto>> {
    try {
      const response = await apiService.post<ApiResponse<Producto>>('/productos', productoData);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  // Actualizar un producto
  async update(id: number | string, productoData: Partial<ProductoFormData>): Promise<ApiResponse<Producto>> {
    try {
      const response = await apiService.put<ApiResponse<Producto>>(`/productos/${id}`, productoData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar un producto
  async delete(id: number | string): Promise<ApiResponse<void>> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  // Buscar productos
  async search(query: string): Promise<ApiResponse<Producto[]>> {
    try {
      const response = await apiService.get<ApiResponse<Producto[]>>('/productos/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },

  // Obtener productos por categoría
  async getByCategory(categoria: string): Promise<ApiResponse<Producto[]>> {
    try {
      const response = await apiService.get<ApiResponse<Producto[]>>('/productos/categoria', {
        params: { categoria }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  }
};

export default productosService;