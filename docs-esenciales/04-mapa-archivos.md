# 📁 04 - Mapa de Archivos del Proyecto - SGC ISO 9001

**📅 Última Actualización: 22/8/2025**
**🔄 Generado Automáticamente:** Este documento se actualiza cada 20 minutos

## 📂 Estructura General del Proyecto

```
📁 .vscode/
  📋 settings.json (99B)
📁 backend/
  📁 config/
    📄 env-setup.js (1.2KB)
    📋 isoflow4-config.json (545B)
  📁 controllers/
    📄 adminController.js (23.1KB)
    📄 auditoriasController.js (31.5KB)
    📄 authController.js (10.1KB)
    📄 competenciasController.js (5.5KB)
    📄 direccion.controller.js (2.7KB)
    📄 encuestas.controller.js (5.2KB)
    📄 evaluacionDetalleController.js (1.7KB)
    📄 evaluacionesController.js (8.5KB)
    📄 evaluacionesSgcController.js (16KB)
    📄 evaluacionProgramacionController.js (5.4KB)
    📄 eventController.js (3.8KB)
    📄 planesController.js (5.3KB)
    📄 productosController.js (10.5KB)
    📄 superAdminController.js (10.4KB)
    📄 userController.js (19.2KB)
  📁 database/
    📁 migrations/
      🗄️ 20241201_create_crm_tables.sql (6.5KB)
      🗄️ 20241201_create_rag_tables.sql (2.8KB)
  📁 lib/
    📄 tursoClient.js (534B)
  📁 middleware/
    📄 auditMiddleware.js (7.4KB)
    📄 authMiddleware.js (2.7KB)
    📄 basicAuthMiddleware.js (2.8KB)
    📄 errorHandler.js (1.4KB)
    📄 permissionsMiddleware.js (5.8KB)
    📄 planLimits.js (7.8KB)
    📄 security.js (3.8KB)
    📄 simpleAuth.js (1.6KB)
    📄 tenantMiddleware.js (3.9KB)
  📁 RAG-System/
    📁 controllers/
      📄 ragController.js (11.2KB)
    📁 models/
      📄 ragDataModel.js (22.1KB)
    📁 routes/
      📄 ragRoutes.js (3.2KB)
    📁 services/
      📄 ragService.js (10.4KB)
  📁 routes/
    📄 acciones.routes.js (6.7KB)
    📄 actividad.routes.js (3.5KB)
... (estructura completa disponible en el proyecto)
```

## 📊 Estadísticas de Archivos

### 📈 Distribución por Tipo
- **JavaScript:** 611 archivos
- **TypeScript:** 44 archivos  
- **Markdown:** 19 archivos
- **JSON:** 13 archivos
- **SQL:** 3 archivos
- **Scripts:** 7 archivos
- **Configuración:** 5 archivos
- **Otros:** 56 archivos

### 📁 Total de Archivos
**758 archivos** (excluyendo node_modules)

## 🔄 Archivos Críticos del Sistema

### 📚 Documentación Esencial
- `01-log-tareas-agentes.md` - Log cronológico de tareas
- `02-bitacora-agentes.md` - Bitácora de actividades  
- `03-documentacion-sistema.md` - Documentación completa
- `04-mapa-archivos.md` - Este archivo (generado automáticamente)
- `05-mapa-database.md` - Esquema BD (generado automáticamente)
- `06-contexto-agentes.md` - Contexto para nuevos agentes

### 🔧 Scripts de Automatización
- `iniciar-sistema-avanzado.ps1` - Inicio completo del sistema
- `deploy-quick.bat` - Despliegue rápido
- `deploy-server.sh` - Despliegue en servidor
- `control-continuo.ps1` - Monitoreo continuo

### 🖥️ Archivos Backend Críticos
- `backend/index.js` - Punto de entrada principal
- `backend/routes/coordinacion.routes.js` - API de coordinación
- `backend/RAG-System/` - Sistema de IA

### 📱 Archivos Frontend Críticos
- `frontend/src/App.jsx` - Componente principal
- `frontend/src/components/menu/Sidebar.jsx` - Menú principal
- `frontend/src/components/admin/CoordinacionAgentesViewer.jsx` - Visor de agentes

---

*Mapa de archivos generado automáticamente el 22/8/2025 - Sistema SGC ISO 9001*