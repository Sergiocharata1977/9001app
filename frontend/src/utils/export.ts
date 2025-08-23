import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Tipos para las columnas de exportación
export interface ExportColumn {
  key: string;
  header: string;
}

// Tipo genérico para los datos
export type ExportData = Record<string, any>;

// Tipo para los formatos de exportación
export type ExportFormat = 'pdf' | 'excel';

/**
 * Exporta datos a formato PDF
 * @param data - Array de objetos con los datos a exportar
 * @param title - Título del documento
 * @param columns - Configuración de las columnas
 */
export const exportToPDF = (
  data: ExportData[], 
  title: string, 
  columns: ExportColumn[]
): void => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  // Date
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
  
  // Table
  const tableData = data.map(item => columns.map(col => {
    const value = item[col.key];
    // Convertir valores a string de forma segura
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }));
  
  autoTable(doc, {
    startY: 40,
    head: [columns.map(col => col.header)],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 'auto' }
    },
    margin: { top: 40 }
  });
  
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

/**
 * Exporta datos a formato Excel
 * @param data - Array de objetos con los datos a exportar
 * @param title - Título del documento
 * @param columns - Configuración de las columnas
 */
export const exportToExcel = (
  data: ExportData[], 
  title: string, 
  columns: ExportColumn[]
): void => {
  const ws = XLSX.utils.json_to_sheet(
    data.map(item => {
      const row: Record<string, any> = {};
      columns.forEach(col => {
        const value = item[col.key];
        // Manejar valores especiales para Excel
        if (value === null || value === undefined) {
          row[col.header] = '';
        } else if (typeof value === 'boolean') {
          row[col.header] = value ? 'Sí' : 'No';
        } else if (value instanceof Date) {
          row[col.header] = value.toLocaleDateString();
        } else if (typeof value === 'object') {
          row[col.header] = JSON.stringify(value);
        } else {
          row[col.header] = value;
        }
      });
      return row;
    })
  );
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

/**
 * Función principal para exportar datos en diferentes formatos
 * @param data - Array de objetos con los datos a exportar
 * @param title - Título del documento
 * @param columns - Configuración de las columnas
 * @param format - Formato de exportación ('pdf' o 'excel')
 * @throws Error si el formato no es soportado
 */
export const exportData = (
  data: ExportData[], 
  title: string, 
  columns: ExportColumn[], 
  format: ExportFormat = 'pdf'
): void => {
  switch (format.toLowerCase() as ExportFormat) {
    case 'pdf':
      exportToPDF(data, title, columns);
      break;
    case 'excel':
      exportToExcel(data, title, columns);
      break;
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
};