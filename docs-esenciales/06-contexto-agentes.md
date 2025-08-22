# 06 - Contexto para Agentes (Onboarding SGC ISO 9001)

## Introducción al Sistema SGC
- Objetivo: soportar operaciones ISO 9001 (procesos, documentos, auditorías, indicadores)
- Alcance: Frontend React + Backend Node/Express + BD (LibSQL/Turso/SQLite-like)
- Principios: trazabilidad, estandarización, auditabilidad, automatización

## Stack Tecnológico
- Frontend: React + Vite + Tailwind, TypeScript parcial, componentes UI internos
- Backend: Node.js (CommonJS), Express, rutas REST en `backend/`
- BD: cliente `@libsql/client` (compatibilidad SQLite), migraciones en `backend/database/migrations`
- Infraestructura: PM2 para orquestación (ecosystem.config.cjs), scripts en `scripts/`
- Utilidades: Axios, Socket.IO, tooling npm

## Estructura del Proyecto
- `backend/`: servidor Express, rutas `routes/`, controladores, middleware, RAG opcional
- `frontend/`: aplicación Vite, `src/components`, `src/pages`, `src/services`
- `docs-esenciales/`: documentación oficial SGC (este directorio)
- `scripts/`: automatización (generación de mapas, monitores, limpieza)
- Otros: archivos de despliegue, PM2, CI

## Sistema Documental (docs-esenciales)
- 01-log-tareas-agentes.md: log estructurado de tareas (más recientes arriba)
- 02-bitacora-agentes.md: entradas breves de actividad
- 03-documentacion-sistema.md: índice general del sistema
- 04-mapa-archivos.md: árbol del repositorio (auto-generado)
- 05-mapa-database.md: esquema y relaciones BD (auto-generado)
- 06-contexto-agentes.md: este documento

## Scripts de Automatización
- `scripts/generate-file-map.js`: genera 04-mapa-archivos.md
- `scripts/generate-db-map.js`: genera 05-mapa-database.md
- `scripts/update-docs.js`: ejecuta ambos generadores
- PM2: procesos con `cron_restart` para ejecución cada 20 min

## Referencias y Enlaces
- API BD: `/api/database/schema` (backend en `backend/routes/database.routes.js`)
- Configuración PM2: `ecosystem.config.cjs`
- Frontend documentación: `frontend/src/pages/Documentacion/`

## Notas para Agentes IA
- Mantener consistencia en nombres de archivos y rutas
- Priorizar cambios atómicos y verificables
- Actualizar 01 y 02 tras cada bloque de trabajo
- Evitar datos sensibles en logs
- Cuando generes contenido automático, incluir advertencia de no-edición manual