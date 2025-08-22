#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Función para generar el mapa de archivos
async function generarMapaArchivos() {
  try {
    console.log('🔄 Generando mapa de archivos...');
    
    const timestamp = new Date().toLocaleDateString('es-ES');
    const projectRoot = path.join(__dirname, '..', '..', '..');
    
    // Función recursiva para leer directorios
    function leerDirectorio(dirPath, basePath = '', nivel = 0) {
      const items = [];
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      // Filtrar directorios y archivos a ignorar
      const ignorar = ['node_modules', '.git', 'dist', 'build', '.next'];
      
      entries
        .filter(entry => !ignorar.includes(entry.name))
        .sort((a, b) => {
          // Directorios primero, luego archivos
          if (a.isDirectory() && !b.isDirectory()) return -1;
          if (!a.isDirectory() && b.isDirectory()) return 1;
          return a.name.localeCompare(b.name);
        })
        .forEach(entry => {
          const fullPath = path.join(dirPath, entry.name);
          const relativePath = path.join(basePath, entry.name);
          
          if (entry.isDirectory()) {
            items.push(`${'  '.repeat(nivel)}📁 ${entry.name}/`);
            // Recursión limitada a 3 niveles para evitar exceso
            if (nivel < 3) {
              const subItems = leerDirectorio(fullPath, relativePath, nivel + 1);
              items.push(...subItems);
            }
          } else {
            const stats = fs.statSync(fullPath);
            const size = formatFileSize(stats.size);
            const icon = getFileIcon(entry.name);
            items.push(`${'  '.repeat(nivel)}${icon} ${entry.name} (${size})`);
          }
        });
      
      return items;
    }
    
    // Función para formatear tamaño de archivos
    function formatFileSize(bytes) {
      if (bytes === 0) return '0B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
    }
    
    // Función para obtener icono de archivo
    function getFileIcon(filename) {
      const ext = path.extname(filename).toLowerCase();
      const iconMap = {
        '.js': '📄',
        '.jsx': '⚛️',
        '.ts': '📘',
        '.tsx': '⚛️',
        '.json': '📋',
        '.md': '📚',
        '.sql': '🗄️',
        '.ps1': '🔧',
        '.bat': '🔧',
        '.sh': '🔧',
        '.css': '🎨',
        '.html': '🌐',
        '.txt': '📄',
        '.yml': '⚙️',
        '.yaml': '⚙️'
      };
      return iconMap[ext] || '📄';
    }
    
    // Generar estructura
    const estructura = leerDirectorio(projectRoot);
    
    // Contar archivos por tipo
    const contadores = {
      javascript: 0,
      typescript: 0,
      markdown: 0,
      json: 0,
      sql: 0,
      scripts: 0,
      config: 0,
      otros: 0
    };
    
    // Recorrer archivos para estadísticas
    function contarArchivos(dirPath) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      
      entries.forEach(entry => {
        if (entry.name === 'node_modules' || entry.name === '.git') return;
        
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          contarArchivos(fullPath);
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          
          if (['.js', '.jsx'].includes(ext)) contadores.javascript++;
          else if (['.ts', '.tsx'].includes(ext)) contadores.typescript++;
          else if (ext === '.md') contadores.markdown++;
          else if (ext === '.json') contadores.json++;
          else if (ext === '.sql') contadores.sql++;
          else if (['.ps1', '.bat', '.sh'].includes(ext)) contadores.scripts++;
          else if (['config', 'package'].some(word => entry.name.includes(word))) contadores.config++;
          else contadores.otros++;
        }
      });
    }
    
    contarArchivos(projectRoot);
    
    // Generar contenido del mapa
    const contenido = `# 📁 04 - Mapa de Archivos del Proyecto - SGC ISO 9001

**📅 Última Actualización: ${timestamp}**
**🔄 Generado Automáticamente:** Este documento se actualiza cada 20 minutos

## 📂 Estructura General del Proyecto

\`\`\`
${estructura.slice(0, 50).join('\n')}
${estructura.length > 50 ? '... (estructura completa disponible en el proyecto)' : ''}
\`\`\`

## 📊 Estadísticas de Archivos

### 📈 Distribución por Tipo
- **JavaScript:** ${contadores.javascript} archivos
- **TypeScript:** ${contadores.typescript} archivos  
- **Markdown:** ${contadores.markdown} archivos
- **JSON:** ${contadores.json} archivos
- **SQL:** ${contadores.sql} archivos
- **Scripts:** ${contadores.scripts} archivos
- **Configuración:** ${contadores.config} archivos
- **Otros:** ${contadores.otros} archivos

### 📁 Total de Archivos
**${Object.values(contadores).reduce((a, b) => a + b, 0)} archivos** (excluyendo node_modules)

## 🔄 Archivos Críticos del Sistema

### 📚 Documentación Esencial
- \`01-log-tareas-agentes.md\` - Log cronológico de tareas
- \`02-bitacora-agentes.md\` - Bitácora de actividades  
- \`03-documentacion-sistema.md\` - Documentación completa
- \`04-mapa-archivos.md\` - Este archivo (generado automáticamente)
- \`05-mapa-database.md\` - Esquema BD (generado automáticamente)
- \`06-contexto-agentes.md\` - Contexto para nuevos agentes

### 🔧 Scripts de Automatización
- \`iniciar-sistema-avanzado.ps1\` - Inicio completo del sistema
- \`deploy-quick.bat\` - Despliegue rápido
- \`deploy-server.sh\` - Despliegue en servidor
- \`control-continuo.ps1\` - Monitoreo continuo

### 🖥️ Archivos Backend Críticos
- \`backend/index.js\` - Punto de entrada principal
- \`backend/routes/coordinacion.routes.js\` - API de coordinación
- \`backend/RAG-System/\` - Sistema de IA

### 📱 Archivos Frontend Críticos
- \`frontend/src/App.jsx\` - Componente principal
- \`frontend/src/components/menu/Sidebar.jsx\` - Menú principal
- \`frontend/src/components/admin/CoordinacionAgentesViewer.jsx\` - Visor de agentes

---

*Mapa de archivos generado automáticamente el ${timestamp} - Sistema SGC ISO 9001*`;

    // Escribir el archivo
    const outputPath = path.join(__dirname, '..', '..', '..', 'docs-esenciales', '04-mapa-archivos.md');
    fs.writeFileSync(outputPath, contenido, 'utf8');
    
    console.log('✅ Mapa de archivos generado exitosamente');
    console.log(`📁 Archivo: ${outputPath}`);
    console.log(`📊 Total archivos: ${Object.values(contadores).reduce((a, b) => a + b, 0)}`);
    
  } catch (error) {
    console.error('❌ Error al generar mapa de archivos:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  generarMapaArchivos();
}

module.exports = { generarMapaArchivos };