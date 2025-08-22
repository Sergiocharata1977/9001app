#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { generarMapaArchivos } = require('./generar-mapa-archivos');
const { generarMapaDatabase } = require('./generar-mapa-database');

// Función principal para actualizar toda la documentación
async function actualizarDocumentacion() {
  try {
    console.log('🔄 Iniciando actualización automática de documentación...');
    console.log(`⏰ Timestamp: ${new Date().toLocaleString('es-ES')}`);
    
    // Generar mapa de archivos
    console.log('\n📁 Generando mapa de archivos...');
    await generarMapaArchivos();
    
    // Generar mapa de base de datos
    console.log('\n🗄️ Generando mapa de base de datos...');
    await generarMapaDatabase();
    
    console.log('\n✅ Documentación actualizada exitosamente');
    console.log('📚 Archivos actualizados:');
    console.log('  - 04-mapa-archivos.md');
    console.log('  - 05-mapa-database.md');
    
    // Log de éxito para monitoreo
    const logMessage = `[${new Date().toISOString()}] ✅ Documentación actualizada automáticamente\n`;
    const logPath = path.join(__dirname, 'update-docs.log');
    fs.appendFileSync(logPath, logMessage);
    
  } catch (error) {
    console.error('❌ Error al actualizar documentación:', error);
    
    // Log de error para monitoreo
    const errorMessage = `[${new Date().toISOString()}] ❌ Error: ${error.message}\n`;
    const logPath = path.join(__dirname, 'update-docs.log');
    fs.appendFileSync(logPath, errorMessage);
    
    process.exit(1);
  }
}

// Función para verificar si necesita actualización
function necesitaActualizacion() {
  try {
    const mapaArchivosPath = path.join(__dirname, '..', '..', '..', 'docs-esenciales', '04-mapa-archivos.md');
    const mapaDatabasePath = path.join(__dirname, '..', '..', '..', 'docs-esenciales', '05-mapa-database.md');
    
    // Verificar si los archivos existen
    if (!fs.existsSync(mapaArchivosPath) || !fs.existsSync(mapaDatabasePath)) {
      return true;
    }
    
    // Verificar última modificación (actualizar cada 20 minutos)
    const stats = fs.statSync(mapaArchivosPath);
    const minutosDesdeUltimaActualizacion = (Date.now() - stats.mtime.getTime()) / (1000 * 60);
    
    return minutosDesdeUltimaActualizacion >= 20;
    
  } catch (error) {
    console.log('⚠️ Error verificando necesidad de actualización, forzando actualización');
    return true;
  }
}

// Función para ejecutar en modo daemon (cada 20 minutos)
function iniciarModoDaemon() {
  console.log('🤖 Iniciando modo daemon - Actualización automática cada 20 minutos');
  
  // Ejecutar inmediatamente si es necesario
  if (necesitaActualizacion()) {
    actualizarDocumentacion();
  }
  
  // Configurar intervalo de 20 minutos
  setInterval(() => {
    if (necesitaActualizacion()) {
      actualizarDocumentacion();
    } else {
      console.log('ℹ️ Documentación actualizada recientemente, omitiendo actualización');
    }
  }, 20 * 60 * 1000); // 20 minutos
  
  console.log('✅ Daemon iniciado correctamente');
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--daemon')) {
  iniciarModoDaemon();
} else if (args.includes('--force')) {
  actualizarDocumentacion();
} else if (args.includes('--check')) {
  console.log(`🔍 Necesita actualización: ${necesitaActualizacion() ? 'Sí' : 'No'}`);
} else {
  // Modo por defecto: actualizar si es necesario
  if (necesitaActualizacion()) {
    actualizarDocumentacion();
  } else {
    console.log('ℹ️ Documentación actualizada recientemente');
  }
}

module.exports = { 
  actualizarDocumentacion, 
  necesitaActualizacion, 
  iniciarModoDaemon 
};