import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface ExportColumn<T = any> {
  key: keyof T | string;
  header: string;
}

export const exportToPDF = <T = any>(data: T[], title: string, columns: ExportColumn<T>[]) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text(title, 20, 20);

  // Date
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);

  // Table
  const tableData = (data || []).map((item: any) => columns.map(col => item[col.key as any]));

  (doc as any).autoTable({
    startY: 40,
    head: [columns.map(col => col.header)],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap',
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 'auto' },
    },
    margin: { top: 40 },
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = <T = any>(data: T[], title: string, columns: ExportColumn<T>[]) => {
  const ws = XLSX.utils.json_to_sheet(
    (data || []).map((item: any) => {
      const row: Record<string, any> = {};
      columns.forEach(col => {
        row[col.header] = item[col.key as any];
      });
      return row;
    })
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(
    wb,
    `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
  );
};

export const exportData = <T = any>(
  data: T[],
  title: string,
  columns: ExportColumn<T>[],
  format: 'pdf' | 'excel' = 'pdf'
) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      exportToPDF<T>(data, title, columns);
      break;
    case 'excel':
      exportToExcel<T>(data, title, columns);
      break;
    default:
      throw new Error(`Formato no soportado: ${format}`);
  }
};