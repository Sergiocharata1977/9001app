#!/usr/bin/env node

// ===============================================
// SCRIPT: CAMBIAR PUERTO DEL BACKEND
// Fecha: 20-01-2025
// Objetivo: Cambiar puerto del backend de 5000 a 5001
// ===============================================

const fs = require('fs');
const path = require('path');

console.log('🔧 Cambiando puerto del backend de 5000 a 5001...\n');

async function changeBackendPort() {
  try {
    // 1. Modificar index.js
    const indexPath = path.join(__dirname, '../../index.js');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Buscar y reemplazar configuraciones de puerto
      const originalContent = indexContent;
      
      // Reemplazar puerto por defecto
      indexContent = indexContent.replace(
        /const PORT = process\.env\.PORT \|\| 5000/g,
        'const PORT = process.env.PORT || 5001'
      );
      
      // Reemplazar otras referencias al puerto 5000
      indexContent = indexContent.replace(/5000/g, '5001');
      
      if (originalContent !== indexContent) {
        fs.writeFileSync(indexPath, indexContent);
        console.log('✅ index.js actualizado - Puerto cambiado a 5001');
      } else {
        console.log('ℹ️  No se encontraron referencias al puerto 5000 en index.js');
      }
    }
    
    // 2. Crear/actualizar archivo .env
    const envPath = path.join(__dirname, '../../.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Verificar si ya existe PORT
    if (envContent.includes('PORT=')) {
      envContent = envContent.replace(/PORT=\d+/g, 'PORT=5001');
    } else {
      envContent += '\n# Puerto del servidor\nPORT=5001\n';
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env actualizado con PORT=5001');
    
    // 3. Verificar package.json
    const packagePath = path.join(__dirname, '../../package.json');
    if (fs.existsSync(packagePath)) {
      let packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      
      if (packageJson.scripts && packageJson.scripts.start) {
        // Actualizar script si hace referencia al puerto
        if (packageJson.scripts.start.includes('5000')) {
          packageJson.scripts.start = packageJson.scripts.start.replace('5000', '5001');
          fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
          console.log('✅ package.json actualizado');
        }
      }
    }
    
    console.log('\n🎯 BACKEND CONFIGURADO PARA PUERTO 5001');
    console.log('');
    console.log('📋 PRÓXIMOS PASOS:');
    console.log('1. Verifica que el frontend apunte al puerto correcto');
    console.log('2. Ejecuta: npm run dev');
    console.log('3. El backend debería iniciarse en puerto 5001');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error cambiando puerto:', error);
  }
}

async function updateFrontendConfig() {
  try {
    console.log('🔧 Verificando configuración del frontend...\n');
    
    // Archivos a verificar en el frontend
    const frontendFiles = [
      '../../../frontend/src/services/apiService.js',
      '../../../frontend/public/env-config.js',
      '../../../frontend/env-config.js',
      '../../../frontend/.env',
      '../../../frontend/.env.local'
    ];
    
    let frontendUpdated = false;
    
    for (const file of frontendFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Reemplazar referencias al puerto 5000
        content = content.replace(/localhost:5000/g, 'localhost:5001');
        content = content.replace(/127\.0\.0\.1:5000/g, '127.0.0.1:5001');
        content = content.replace(/http:\/\/.*:5000/g, 'http://localhost:5001');
        
        if (originalContent !== content) {
          fs.writeFileSync(filePath, content);
          console.log(`✅ ${path.basename(file)} actualizado para puerto 5001`);
          frontendUpdated = true;
        }
      }
    }
    
    if (!frontendUpdated) {
      console.log('ℹ️  No se encontraron configuraciones de puerto en el frontend para actualizar');
    }
    
  } catch (error) {
    console.error('❌ Error actualizando frontend:', error);
  }
}

async function main() {
  await changeBackendPort();
  await updateFrontendConfig();
  
  console.log('\n🚀 CONFIGURACIÓN COMPLETADA');
  console.log('');
  console.log('💡 INSTRUCCIONES FINALES:');
  console.log('1. Cierra cualquier terminal/proceso que esté ejecutándose');
  console.log('2. Abre una nueva terminal');
  console.log('3. Ejecuta: cd backend && npm run dev');
  console.log('4. El servidor debería iniciarse en puerto 5001');
  console.log('5. Actualiza el frontend si es necesario para apuntar a :5001');
  console.log('');
}

main();