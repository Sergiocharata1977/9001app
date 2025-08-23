import apiService from './apiService';
import type { Producto } from '@/types';

// Servicio para gestión de productos y servicios
export const productosService = {
  // Obtener todos los productos (alias para compatibilidad)
  async getProductos(): Promise<Producto[]> {
    return this.getAll();
  },
  
  // Obtener todos los productos
  async getAll(): Promise<Producto[]> {
    try {
      const response = await apiService.get<Producto[] | { data: Producto[] }>(
        '/productos'
      );
      const payload = response.data as any;
      if (Array.isArray(payload)) {
        return payload;
      } else if (Array.isArray(payload?.data)) {
        return payload.data;
      } else {
        console.warn('Respuesta inesperada del backend:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  async getById(id: string | number): Promise<Producto> {
    try {
      const response = await apiService.get<Producto>(`/productos/${id}`);
      return response.data as Producto;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Crear un nuevo producto
  async create(productoData: Partial<Producto>): Promise<Producto> {
    try {
      const response = await apiService.post<Producto>('/productos', productoData);
      return response.data as Producto;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  // Actualizar un producto
  async update(id: string | number, productoData: Partial<Producto>): Promise<Producto> {
    try {
      const response = await apiService.put<Producto>(`/productos/${id}`, productoData);
      return response.data as Producto;
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  },

  // Eliminar un producto
  async delete(id: string | number): Promise<{ success?: boolean } | void> {
    try {
      const response = await apiService.delete(`/productos/${id}`);
      return (response.data as any) || undefined;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  },

  // Buscar productos
  async search(query: string): Promise<Producto[]> {
    try {
      const response = await apiService.get<Producto[] | { data: Producto[] }>(
        '/productos/search',
        {
          params: { q: query },
        }
      );
      const payload = response.data as any;
      return Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw error;
    }
  },

  // Obtener productos por categoría
  async getByCategory(categoria: string): Promise<Producto[]> {
    try {
      const response = await apiService.get<Producto[] | { data: Producto[] }>(
        '/productos/categoria',
        {
          params: { categoria },
        }
      );
      const payload = response.data as any;
      return Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error);
      throw error;
    }
  },
};

export default productosService;