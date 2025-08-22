-- ===============================================
-- MIGRACIÓN: AGREGAR CAMPO TIPO_PERSONAL
-- Fecha: 2025-01-20
-- Agente: CRM Personal Vendedores
-- Descripción: Agregar campo tipo_personal para clasificar vendedores
-- ===============================================

-- Agregar campo tipo_personal a la tabla personal
ALTER TABLE personal ADD COLUMN tipo_personal TEXT DEFAULT 'administrativo' CHECK (tipo_personal IN ('vendedor', 'administrativo', 'operativo', 'gerencial', 'tecnico'));

-- Agregar campos adicionales para vendedores
ALTER TABLE personal ADD COLUMN zona_venta TEXT;
ALTER TABLE personal ADD COLUMN meta_mensual REAL DEFAULT 0;
ALTER TABLE personal ADD COLUMN comision_porcentaje REAL DEFAULT 0;
ALTER TABLE personal ADD COLUMN supervisor_id TEXT;
ALTER TABLE personal ADD COLUMN especialidad_ventas TEXT;
ALTER TABLE personal ADD COLUMN fecha_inicio_ventas TEXT;

-- Agregar relación con supervisor
-- FOREIGN KEY (supervisor_id) REFERENCES personal(id) -- Se agregará en trigger

-- Índices para optimizar consultas de vendedores
CREATE INDEX IF NOT EXISTS idx_personal_tipo ON personal(tipo_personal);
CREATE INDEX IF NOT EXISTS idx_personal_zona_venta ON personal(zona_venta);
CREATE INDEX IF NOT EXISTS idx_personal_supervisor ON personal(supervisor_id);

-- Comentarios para documentación
PRAGMA table_info(personal);