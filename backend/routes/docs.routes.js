const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para obtener cualquier documento de docs-esenciales
router.get('/docs/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Validar que el archivo sea uno de los documentos permitidos
    const allowedDocs = [
      '01-log-tareas-agentes.md',
      '02-bitacora-agentes.md', 
      '03-documentacion-sistema.md',
      '04-mapa-archivos.md',
      '05-mapa-database.md',
      '06-contexto-agentes.md'
    ];
    
    if (!allowedDocs.includes(filename)) {
      return res.status(403).json({
        error: 'Documento no permitido',
        message: `El archivo ${filename} no está en la lista de documentos permitidos`
      });
    }
    
    // Ruta al documento
    const documentPath = path.join(__dirname, '..', '..', 'docs-esenciales', filename);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(documentPath)) {
      return res.status(404).json({
        error: 'Documento no encontrado',
        message: `El archivo ${filename} no existe`
      });
    }
    
    // Leer el contenido del archivo
    const content = fs.readFileSync(documentPath, 'utf8');
    
    // Configurar headers para texto plano
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Enviar el contenido
    res.send(content);
    
  } catch (error) {
    console.error('Error al leer documento:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo leer el documento'
    });
  }
});

// Ruta para obtener la lista de documentos disponibles
router.get('/docs', (req, res) => {
  try {
    const documentos = [
      {
        id: '01-log-tareas-agentes',
        nombre: '01 - Log de Tareas de Agentes',
        descripcion: 'Log cronológico de tareas de agentes IA',
        archivo: '01-log-tareas-agentes.md',
        automatico: false
      },
      {
        id: '02-bitacora-agentes',
        nombre: '02 - Bitácora de Agentes',
        descripcion: 'Bitácora de actividades y tipos de agentes',
        archivo: '02-bitacora-agentes.md',
        automatico: false
      },
      {
        id: '03-documentacion-sistema',
        nombre: '03 - Documentación del Sistema',
        descripcion: 'Documentación completa del sistema SGC',
        archivo: '03-documentacion-sistema.md',
        automatico: false
      },
      {
        id: '04-mapa-archivos',
        nombre: '04 - Mapa de Archivos',
        descripcion: 'Estructura de archivos (generado automáticamente)',
        archivo: '04-mapa-archivos.md',
        automatico: true
      },
      {
        id: '05-mapa-database',
        nombre: '05 - Mapa de Base de Datos',
        descripcion: 'Esquema de BD (generado automáticamente)',
        archivo: '05-mapa-database.md',
        automatico: true
      },
      {
        id: '06-contexto-agentes',
        nombre: '06 - Contexto para Agentes',
        descripcion: 'Contexto completo para nuevos agentes IA',
        archivo: '06-contexto-agentes.md',
        automatico: false
      }
    ];
    
    // Verificar qué documentos existen
    const docsPath = path.join(__dirname, '..', '..', 'docs-esenciales');
    const documentosExistentes = documentos.map(doc => {
      const filePath = path.join(docsPath, doc.archivo);
      const exists = fs.existsSync(filePath);
      let lastModified = null;
      let size = 0;
      
      if (exists) {
        const stats = fs.statSync(filePath);
        lastModified = stats.mtime.toISOString();
        size = stats.size;
      }
      
      return {
        ...doc,
        exists,
        lastModified,
        size
      };
    });
    
    res.json({
      documentos: documentosExistentes,
      total: documentosExistentes.length,
      existentes: documentosExistentes.filter(d => d.exists).length,
      automaticos: documentosExistentes.filter(d => d.automatico).length
    });
    
  } catch (error) {
    console.error('Error al obtener lista de documentos:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo obtener la lista de documentos'
    });
  }
});

// Ruta para forzar actualización de documentos automáticos
router.post('/docs/update-auto', async (req, res) => {
  try {
    // Ejecutar script de actualización
    const { spawn } = require('child_process');
    const scriptPath = path.join(__dirname, '..', 'scripts', 'permanentes', 'actualizar-documentacion.js');
    
    const child = spawn('node', [scriptPath, '--force'], {
      cwd: path.join(__dirname, '..', '..')
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        res.json({
          success: true,
          message: 'Documentación automática actualizada correctamente',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({
          error: 'Error al actualizar documentación',
          message: 'El script de actualización falló'
        });
      }
    });
    
    child.on('error', (error) => {
      res.status(500).json({
        error: 'Error al ejecutar script',
        message: error.message
      });
    });
    
  } catch (error) {
    console.error('Error al actualizar documentación automática:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar la documentación automática'
    });
  }
});

// Ruta para obtener estadísticas de documentación
router.get('/docs/stats', (req, res) => {
  try {
    const docsPath = path.join(__dirname, '..', '..', 'docs-esenciales');
    const files = fs.readdirSync(docsPath);
    
    const stats = {
      total_archivos: files.length,
      documentos_nuevos: files.filter(f => /^0[1-6]-/.test(f)).length,
      documentos_legacy: files.filter(f => /-\d{2}-\d{2}-\d{4}\.md$/.test(f)).length,
      otros_archivos: files.filter(f => !f.endsWith('.md')).length,
      tamaño_total: files.reduce((total, file) => {
        const filePath = path.join(docsPath, file);
        if (fs.existsSync(filePath)) {
          return total + fs.statSync(filePath).size;
        }
        return total;
      }, 0)
    };
    
    res.json(stats);
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las estadísticas'
    });
  }
});

module.exports = router;