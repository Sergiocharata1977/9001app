# 05 - Mapa de Base de Datos (Generado automáticamente)

No editar manualmente. Este archivo es actualizado por `scripts/generate-db-map.js`.

Última generación: 2025-08-22T14:04:40.958Z

---
## Resumen
- Tablas: 35
- Última actualización: 2025-08-20T12:00:00.244Z

---

## Tablas

### acciones
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - hallazgo_id: TEXT (NOT NULL)
  - numeroAccion: TEXT (NOT NULL)
  - estado: TEXT (NOT NULL)
  - descripcion_accion: TEXT
  - responsable_accion: TEXT
  - fecha_plan_accion: TEXT
  - comentarios_ejecucion: TEXT
  - fecha_ejecucion_accion: TEXT
  - eficacia: TEXT
  - observaciones: TEXT
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### auditoria_aspectos
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - auditoria_id: TEXT (NOT NULL)
  - proceso_id: TEXT
  - proceso_nombre: TEXT (NOT NULL)
  - documentacion_referenciada: TEXT
  - auditor_nombre: TEXT
  - observaciones: TEXT
  - conformidad: TEXT
  - created_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### auditorias
- Registros: 2
- Columnas:
  - id: TEXT (PK)
  - codigo: TEXT (NOT NULL)
  - titulo: TEXT (NOT NULL)
  - area: TEXT (NOT NULL)
  - responsable_id: TEXT
  - fecha_programada: TEXT (NOT NULL)
  - fecha_ejecucion: TEXT
  - estado: TEXT
  - objetivos: TEXT
  - alcance: TEXT
  - criterios: TEXT
  - resultados: TEXT
  - observaciones: TEXT
  - organization_id: INTEGER (NOT NULL)
  - created_at: TEXT
  - updated_at: TEXT

### capacitacion_asistentes
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - capacitacion_id: TEXT (NOT NULL)
  - empleado_id: TEXT (NOT NULL)
  - organization_id: TEXT (NOT NULL)
  - asistencia: INTEGER
  - created_at: DATETIME
  - updated_at: DATETIME
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined

### capacitaciones
- Registros: 2
- Columnas:
  - id: INTEGER (PK)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - fecha_programada: TEXT
  - duracion_horas: INTEGER
  - instructor: TEXT
  - estado: TEXT
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT

### competencias
- Registros: 6
- Columnas:
  - id: INTEGER (PK)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - organization_id: INTEGER (NOT NULL)
  - estado: TEXT
  - created_at: DATETIME
  - updated_at: DATETIME

### departamentos
- Registros: 6
- Columnas:
  - id: TEXT (PK)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - responsable_id: TEXT
  - organization_id: INTEGER
  - objetivos: TEXT
  - updated_at: TEXT
  - created_at: TEXT

### documentos
- Registros: 2
- Columnas:
  - id: INTEGER (PK)
  - titulo: TEXT (NOT NULL)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - version: TEXT
  - archivo_nombre: TEXT (NOT NULL)
  - archivo_path: TEXT (NOT NULL)
  - tipo_archivo: TEXT
  - tamaño: INTEGER
  - organization_id: INTEGER (NOT NULL)
  - created_at: DATETIME
  - updated_at: DATETIME

### encuestas
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - titulo: TEXT (NOT NULL)
  - descripcion: TEXT
  - fecha_creacion: TEXT (NOT NULL)
  - fecha_cierre: TEXT
  - estado: TEXT
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT

### evaluacion_programacion
- Registros: 3
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - fecha_inicio: DATE
  - fecha_fin: DATE
  - estado: TEXT (NOT NULL)
  - fecha_creacion: DATETIME
  - fecha_actualizacion: DATETIME
  - usuario_creador: TEXT
- Relaciones:
  - FK: undefined → undefined

### evaluaciones_competencias_detalle
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - evaluacion_id: INTEGER (NOT NULL)
  - competencia_id: INTEGER (NOT NULL)
  - puntaje: INTEGER (NOT NULL)
  - created_at: TEXT
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined
  - FK: undefined → undefined

### evaluaciones_individuales
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - empleado_id: TEXT (NOT NULL)
  - evaluador_id: TEXT (NOT NULL)
  - fecha_evaluacion: TEXT (NOT NULL)
  - observaciones: TEXT
  - puntaje_total: REAL
  - estado: TEXT
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined
  - FK: undefined → undefined

### hallazgos
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - numeroHallazgo: TEXT (NOT NULL)
  - titulo: TEXT (NOT NULL)
  - descripcion: TEXT
  - estado: TEXT (NOT NULL)
  - origen: TEXT
  - tipo_hallazgo: TEXT
  - prioridad: TEXT
  - fecha_deteccion: TEXT (NOT NULL)
  - fecha_cierre: TEXT
  - proceso_id: TEXT (NOT NULL)
  - requisito_incumplido: TEXT
  - orden: INTEGER
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### indicadores
- Registros: 4
- Columnas:
  - id: INTEGER (PK)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - proceso_id: INTEGER
  - frecuencia_medicion: TEXT
  - meta: REAL
  - formula: TEXT
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### limites_uso
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - tipo_recurso: VARCHAR(50) (NOT NULL)
  - limite_actual: INTEGER
  - limite_maximo: INTEGER (NOT NULL)
  - fecha_reset: DATE
  - periodo_reset: VARCHAR(20)
  - created_at: DATETIME
  - updated_at: DATETIME
- Relaciones:
  - FK: undefined → undefined

### mediciones
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - indicador_id: TEXT (NOT NULL)
  - valor: REAL (NOT NULL)
  - fecha_medicion: TEXT (NOT NULL)
  - observaciones: TEXT
  - responsable: TEXT
  - fecha_creacion: TEXT (NOT NULL)
  - organization_id: INTEGER
- Relaciones:
  - FK: undefined → undefined

### minutas
- Registros: 6
- Columnas:
  - id: INTEGER (PK)
  - titulo: TEXT (NOT NULL)
  - responsable: TEXT (NOT NULL)
  - descripcion: TEXT
  - created_at: DATETIME

### normas
- Registros: 54
- Columnas:
  - id: INTEGER (PK)
  - codigo: TEXT (NOT NULL)
  - titulo: TEXT (NOT NULL)
  - descripcion: TEXT
  - version: TEXT
  - tipo: TEXT
  - estado: TEXT
  - categoria: TEXT
  - responsable: TEXT
  - fecha_revision: DATE
  - observaciones: TEXT
  - organization_id: INTEGER (NOT NULL)
  - created_at: DATETIME
  - updated_at: DATETIME

### objetivos_calidad
- Registros: 11
- Columnas:
  - id: TEXT (PK)
  - nombre_objetivo: TEXT (NOT NULL)
  - descripcion: TEXT
  - proceso_id: TEXT
  - indicador_asociado_id: INTEGER
  - meta: TEXT
  - responsable: TEXT
  - fecha_inicio: TEXT
  - fecha_fin: TEXT
  - organization_id: INTEGER
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined

### organization_features
- Registros: 35
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - feature_name: TEXT (NOT NULL)
  - is_enabled: INTEGER (NOT NULL)
  - created_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### organizations
- Registros: 6
- Columnas:
  - id: INTEGER (PK)
  - name: TEXT (NOT NULL)
  - email: TEXT
  - phone: TEXT
  - plan: TEXT (NOT NULL)
  - is_active: INTEGER (NOT NULL)
  - created_at: TEXT
  - updated_at: TEXT

### personal
- Registros: 9
- Columnas:
  - id: TEXT (PK)
  - organization_id: INTEGER (NOT NULL)
  - nombres: TEXT (NOT NULL)
  - apellidos: TEXT (NOT NULL)
  - email: TEXT (NOT NULL)
  - telefono: TEXT
  - documento_identidad: TEXT
  - fecha_nacimiento: TEXT
  - nacionalidad: TEXT
  - direccion: TEXT
  - telefono_emergencia: TEXT
  - fecha_contratacion: TEXT
  - numero_legajo: TEXT
  - estado: TEXT
  - created_at: DATETIME
  - updated_at: DATETIME

### planes
- Registros: 4
- Columnas:
  - id: INTEGER (PK)
  - nombre: VARCHAR(100) (NOT NULL)
  - descripcion: TEXT
  - precio_mensual: DECIMAL(10,2)
  - precio_anual: DECIMAL(10,2)
  - max_usuarios: INTEGER
  - max_departamentos: INTEGER
  - max_documentos: INTEGER
  - max_auditorias: INTEGER
  - max_hallazgos: INTEGER
  - max_acciones: INTEGER
  - caracteristicas: TEXT
  - estado: VARCHAR(20)
  - es_plan_gratuito: BOOLEAN
  - orden_display: INTEGER
  - created_at: DATETIME
  - updated_at: DATETIME

### politica_calidad
- Registros: 4
- Columnas:
  - id: TEXT (PK)
  - organization_id: INTEGER (NOT NULL)
  - politica_calidad: TEXT
  - alcance: TEXT
  - mapa_procesos: TEXT
  - organigrama: TEXT
  - created_at: DATETIME
  - updated_at: DATETIME
  - estado: TEXT
  - nombre: TEXT

### procesos
- Registros: 5
- Columnas:
  - id: TEXT (PK)
  - nombre: TEXT (NOT NULL)
  - responsable: TEXT
  - descripcion: TEXT
  - organization_id: INTEGER
  - created_at: TEXT
  - updated_at: TEXT

### productos
- Registros: 3
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - nombre: TEXT (NOT NULL)
  - descripcion: TEXT
  - codigo: TEXT
  - tipo: TEXT (NOT NULL)
  - categoria: TEXT
  - estado: TEXT (NOT NULL)
  - version: TEXT
  - fecha_creacion: DATE
  - fecha_revision: DATE
  - responsable: TEXT
  - especificaciones: TEXT
  - requisitos_calidad: TEXT
  - proceso_aprobacion: TEXT
  - documentos_asociados: TEXT
  - observaciones: TEXT
  - created_at: DATETIME
  - updated_at: DATETIME
  - created_by: INTEGER
  - updated_by: INTEGER
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined
  - FK: undefined → undefined

### productos_historial
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - producto_id: INTEGER (NOT NULL)
  - organization_id: INTEGER (NOT NULL)
  - campo_modificado: TEXT (NOT NULL)
  - valor_anterior: TEXT
  - valor_nuevo: TEXT
  - usuario_responsable: TEXT
  - fecha_cambio: DATETIME
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined

### puestos
- Registros: 9
- Columnas:
  - id: TEXT (PK)
  - nombre: TEXT (NOT NULL)
  - descripcion_responsabilidades: TEXT
  - requisitos_experiencia: TEXT
  - requisitos_formacion: TEXT
  - departamento_id: TEXT
  - reporta_a_id: TEXT
  - organization_id: TEXT (NOT NULL)
  - created_at: TEXT
  - updated_at: TEXT

### refresh_tokens
- Registros: 2
- Columnas:
  - id: INTEGER (PK)
  - user_id: INTEGER (NOT NULL)
  - token: TEXT (NOT NULL)
  - expires_at: TEXT (NOT NULL)
  - created_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### relaciones_sgc
- Registros: 13
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - origen_tipo: TEXT (NOT NULL)
  - origen_id: INTEGER (NOT NULL)
  - destino_tipo: TEXT (NOT NULL)
  - destino_id: INTEGER (NOT NULL)
  - descripcion: TEXT
  - fecha_creacion: DATETIME
  - usuario_creador: TEXT

### sqlite_sequence
- Registros: 16
- Columnas:
  - name: 
  - seq: 

### suscripciones
- Registros: 5
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - plan_id: INTEGER (NOT NULL)
  - estado: VARCHAR(20)
  - fecha_inicio: DATE (NOT NULL)
  - fecha_fin: DATE
  - fecha_renovacion: DATE
  - precio_pagado: DECIMAL(10,2)
  - moneda: VARCHAR(3)
  - metodo_pago: VARCHAR(50)
  - periodo: VARCHAR(20)
  - cancelada_por_usuario: BOOLEAN
  - motivo_cancelacion: TEXT
  - created_at: DATETIME
  - updated_at: DATETIME
- Relaciones:
  - FK: undefined → undefined
  - FK: undefined → undefined

### temas_capacitacion
- Registros: 0
- Columnas:
  - id: TEXT (PK)
  - capacitacion_id: TEXT (NOT NULL)
  - organization_id: TEXT (NOT NULL)
  - titulo: TEXT (NOT NULL)
  - descripcion: TEXT
  - orden: INTEGER
  - created_at: DATETIME
  - updated_at: DATETIME
- Relaciones:
  - FK: undefined → undefined

### usuarios
- Registros: 5
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - name: TEXT (NOT NULL)
  - email: TEXT (NOT NULL)
  - password_hash: TEXT (NOT NULL)
  - role: TEXT (NOT NULL)
  - is_active: INTEGER (NOT NULL)
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined

### usuarios_backup
- Registros: 0
- Columnas:
  - id: INTEGER (PK)
  - organization_id: INTEGER (NOT NULL)
  - name: TEXT (NOT NULL)
  - email: TEXT (NOT NULL)
  - password_hash: TEXT (NOT NULL)
  - role: TEXT (NOT NULL)
  - is_active: INTEGER
  - created_at: TEXT
  - updated_at: TEXT
- Relaciones:
  - FK: undefined → undefined
