#!/usr/bin/env node

// ===============================================
// SCRIPT: MIGRACIÓN TIPO PERSONAL
// Fecha: 20-01-2025
// Objetivo: Agregar campo tipo_personal a tabla personal
// ===============================================

const tursoClient = require('../../lib/tursoClient.js');
const fs = require('fs');

console.log('🚀 Iniciando migración tipo_personal...\n');

async function executeMigration() {
  try {
    console.log('📋 Leyendo archivo de migración...');
    const migrationPath = './backend/database/migrations/20250120_add_tipo_personal_field.sql';
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Dividir en statements individuales y filtrar comentarios
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && !s.startsWith('PRAGMA'));
    
    console.log(`📝 Ejecutando ${statements.length} statements...\n`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        try {
          console.log(`${i + 1}. Ejecutando: ${statement.substring(0, 60)}...`);
          await tursoClient.execute(statement);
          console.log('   ✅ Exitoso\n');
        } catch (error) {
          if (error.message.includes('duplicate column name') || 
              error.message.includes('already exists')) {
            console.log('   ⚠️  Ya existe (ignorando)\n');
          } else {
            console.error('   ❌ Error:', error.message);
            throw error;
          }
        }
      }
    }
    
    // Verificar la estructura actualizada
    console.log('🔍 Verificando estructura de tabla personal...');
    const result = await tursoClient.execute('PRAGMA table_info(personal)');
    
    console.log('\n📋 Campos de la tabla personal:');
    result.rows.forEach(row => {
      console.log(`   - ${row[1]} (${row[2]}) ${row[3] ? 'NOT NULL' : ''} ${row[5] ? 'PK' : ''}`);
    });
    
    // Verificar si el campo tipo_personal fue agregado
    const tipoPersonalExists = result.rows.some(row => row[1] === 'tipo_personal');
    if (tipoPersonalExists) {
      console.log('\n✅ Campo tipo_personal agregado exitosamente');
      
      // Actualizar registros existentes de vendedores si es necesario
      console.log('🔄 Actualizando registros existentes...');
      await tursoClient.execute(`
        UPDATE personal 
        SET tipo_personal = 'vendedor', zona_venta = 'Centro', especialidad_ventas = 'General'
        WHERE email LIKE '%vendedor%' OR nombres LIKE '%Vendedor%'
      `);
      
      console.log('✅ Registros de vendedores actualizados');
    } else {
      console.log('❌ Campo tipo_personal no fue agregado');
    }
    
    console.log('\n🎉 Migración completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  }
}

executeMigration();