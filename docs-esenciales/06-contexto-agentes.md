# 🤖 06 - Contexto Completo para Agentes IA - SGC ISO 9001

**📅 Última Actualización: 20-08-2025**

## 🎯 Introducción al Sistema SGC ISO 9001

Bienvenido al **Sistema de Gestión de Calidad (SGC) ISO 9001**, una plataforma integral desarrollada para automatizar y gestionar todos los aspectos de un sistema de calidad conforme a la norma ISO 9001:2015.

### 🏆 Misión del Sistema
Proporcionar una solución tecnológica completa que permita a las organizaciones implementar, mantener y mejorar continuamente su Sistema de Gestión de Calidad, garantizando el cumplimiento de los requisitos ISO 9001:2015 de manera eficiente y escalable.

### 🎯 Objetivos Estratégicos
- **Automatización:** Digitalizar procesos manuales de gestión de calidad
- **Cumplimiento:** Garantizar adherencia a ISO 9001:2015
- **Trazabilidad:** Mantener registro completo de todas las actividades
- **Mejora Continua:** Facilitar la identificación y corrección de desviaciones
- **Escalabilidad:** Soportar organizaciones de diferentes tamaños

## 🏗️ Stack Tecnológico Completo

### 📱 Frontend - React Ecosystem
```json
{
  "core": {
    "react": "^19.1.0",
    "vite": "^6.3.5",
    "typescript": "^5.9.2"
  },
  "styling": {
    "tailwindcss": "^3.4.17",
    "framer-motion": "^11.x",
    "radix-ui": "componentes accesibles"
  },
  "state_management": {
    "zustand": "^5.0.7",
    "@tanstack/react-query": "^5.84.1"
  },
  "forms_validation": {
    "react-hook-form": "^7.48.2",
    "zod": "^3.25.76"
  },
  "routing": {
    "react-router-dom": "^6.x"
  }
}
```

### 🖥️ Backend - Node.js Ecosystem
```json
{
  "core": {
    "node.js": "18+",
    "express": "^4.18.0"
  },
  "database": {
    "@libsql/client": "^0.5.0",
    "sqlite": "base de datos local",
    "turso": "cloud database"
  },
  "authentication": {
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^6.0.0"
  },
  "security": {
    "helmet": "^6.0.0",
    "cors": "^2.8.5"
  },
  "file_handling": {
    "multer": "^1.4.4"
  }
}
```

### 🗄️ Base de Datos - SQLite/Turso
- **Motor:** SQLite con Turso (LibSQL) para escalabilidad cloud
- **Arquitectura:** Multi-tenant con segregación por `organization_id`
- **Migraciones:** Sistema de versionado con Sequelize
- **Backup:** Automático cada 6 horas con retención de 30 días

## 📂 Estructura del Proyecto

### 🎯 Organización por Módulos Funcionales

```
📁 SGC-ISO-9001/
├── 🖥️ backend/                   # API y lógica de negocio
│   ├── controllers/              # Controladores MVC
│   ├── routes/                   # Endpoints API
│   ├── middleware/               # Middleware personalizado
│   ├── services/                 # Servicios de negocio
│   ├── RAG-System/               # Sistema de IA
│   └── scripts/permanentes/      # Scripts de mantenimiento
├── 📱 frontend/                  # Interfaz de usuario
│   ├── src/components/           # Componentes React por módulo
│   ├── src/pages/                # Páginas principales
│   ├── src/hooks/                # Custom hooks
│   ├── src/services/             # Servicios API
│   └── src/types/                # Tipos TypeScript
└── 📚 docs-esenciales/           # Documentación del sistema
```

### 🏢 Módulos del Sistema

#### 👥 **Módulo CRM**
- **Propósito:** Gestión de relaciones con clientes
- **Componentes:** ClientesListing, CRMDashboard, CRMMenu
- **Rutas:** `/crm/*`
- **Color:** Emerald (#059669)

#### 👤 **Módulo Personal**
- **Propósito:** Gestión de recursos humanos
- **Componentes:** PersonalListing, PersonalModal, PuestosListing
- **Rutas:** `/personal/*`, `/puestos/*`
- **Color:** Violet (#7c3aed)

#### ⚙️ **Módulo Super Admin**
- **Propósito:** Administración del sistema
- **Componentes:** SuperAdminPanel, DatabaseSchema, SystemMonitoring
- **Rutas:** `/admin/*`
- **Color:** Red (#dc2626)

#### 📋 **Módulo Procesos**
- **Propósito:** Gestión de procesos ISO 9001
- **Componentes:** ProcesosListing, IndicadoresListing, ObjetivosListing
- **Rutas:** `/procesos/*`

#### 🔍 **Módulo Auditorías**
- **Propósito:** Gestión de auditorías y hallazgos
- **Componentes:** AuditoriasListing, HallazgosListing, AccionesListing
- **Rutas:** `/auditorias/*`

## 📚 Sistema Documental (docs-esenciales)

### 📋 Nueva Estructura (Sin Fechas)
1. **01-log-tareas-agentes.md** - Log cronológico de tareas de agentes
2. **02-bitacora-agentes.md** - Bitácora de actividades y tipos de agentes
3. **03-documentacion-sistema.md** - Documentación completa del sistema
4. **04-mapa-archivos.md** - Estructura de archivos (generado automáticamente)
5. **05-mapa-database.md** - Esquema de base de datos (generado automáticamente)
6. **06-contexto-agentes.md** - Este archivo (contexto para nuevos agentes)

### 📚 Documentos Legacy (Con Fechas)
- Documentos con fechas en el nombre se mantienen como referencia histórica
- Contienen información detallada sobre implementaciones específicas
- Se marcan como [LEGACY] en el mapa de archivos

## 🔧 Scripts de Automatización

### 🚀 Scripts de Inicio
```powershell
# iniciar-sistema-avanzado.ps1 - Inicio completo
# Inicia backend, frontend y monitoreo
.\iniciar-sistema-avanzado.ps1
```

```batch
# iniciar.bat - Inicio básico
# Inicia solo backend y frontend
iniciar.bat
```

### 🔄 Scripts de Monitoreo
```powershell
# control-continuo.ps1 - Monitoreo continuo
# Verifica estado del sistema cada 5 minutos
.\control-continuo.ps1
```

### 🚀 Scripts de Despliegue
```batch
# deploy-quick.bat - Despliegue rápido
# Despliegue local con PM2
deploy-quick.bat
```

```bash
# deploy-server.sh - Despliegue en servidor
# Despliegue en producción
./deploy-server.sh
```

### 🤖 Scripts de Mantenimiento Backend
```javascript
// backend/scripts/permanentes/
check-tables.js              // Verificación de tablas
setup-rag-system.js          // Configuración sistema RAG
diagnostico-rag-completo.js  // Diagnóstico completo RAG
update-backend-config.js     // Actualización configuración
```

## 🔄 Sistema de Agentes IA

### 🤖 Tipos de Agentes Especializados

#### 🔧 **Agente de Desarrollo Frontend**
- **Responsabilidades:** Componentes React, interfaces, navegación
- **Archivos típicos:** `*.jsx`, `*.tsx`, componentes UI
- **Herramientas:** React, Tailwind CSS, Framer Motion

#### 🎨 **Agente de Diseño UX/UI**
- **Responsabilidades:** Sistemas de diseño, experiencia de usuario
- **Archivos típicos:** CSS, componentes UI, layouts
- **Herramientas:** Tailwind, CSS modules, design systems

#### 📚 **Agente de Documentación**
- **Responsabilidades:** Documentación técnica, guías, trazabilidad
- **Archivos típicos:** `*.md`, documentación
- **Herramientas:** Markdown, diagramas

#### 🏗️ **Agente de Arquitectura RAG**
- **Responsabilidades:** Sistemas de IA, APIs, arquitectura de datos
- **Archivos típicos:** `ragController.js`, `ragService.js`
- **Herramientas:** Node.js, SQL, APIs de IA

#### 🔍 **Agente de Diagnóstico**
- **Responsabilidades:** Debugging, resolución de problemas
- **Archivos típicos:** logs, scripts de diagnóstico
- **Herramientas:** Debugging tools, análisis de logs

#### ⚙️ **Agente de Mantenimiento**
- **Responsabilidades:** Mantenimiento preventivo, monitoreo
- **Archivos típicos:** scripts de mantenimiento, configuración
- **Herramientas:** PM2, monitoreo, scripts

#### 📏 **Agente de Estandarización**
- **Responsabilidades:** Patrones de código, estándares
- **Archivos típicos:** componentes estandarizados, documentación
- **Herramientas:** ESLint, patrones de diseño

#### 🎯 **Agente de Optimización UX**
- **Responsabilidades:** Performance, experiencia de usuario
- **Archivos típicos:** componentes optimizados, hooks
- **Herramientas:** Performance tools, UX analytics

### 📝 Formato de Registro de Tareas

```markdown
### 📝 Tarea #XXX
- 📅 Fecha: [dd-mm-aaaa]
- ⏰ Hora inicio: [hh:mm]
- 🤖 Agente: [Tipo de agente especializado]
- 🖊️ Descripción: [Descripción breve]
- 🎯 Objetivos: [Párrafo detallado de objetivos]
- 🔄 Estado: [En proceso / Terminado / Pausado]
- 📦 Entregable: [Resultado específico]
- 📁 Archivos trabajados: [Lista de archivos modificados]
- 📄 Archivos creados: [Lista de archivos nuevos]
- 🗑️ Archivos eliminados: [Lista de archivos removidos]
- 📋 Contexto: [Contexto breve de la tarea]
- 📑 Informe: [Párrafo narrativo de lo realizado]
```

## 🎨 Sistema de Diseño Unificado

### 🎨 Paleta de Colores Estándar
```css
/* Colores Principales */
:root {
  --primary-blue: #3b82f6;
  --primary-slate: #64748b;
  --primary-gray: #6b7280;
  
  /* Colores por Módulo */
  --crm-primary: #059669;      /* emerald-600 */
  --personal-primary: #7c3aed;  /* violet-600 */
  --admin-primary: #dc2626;     /* red-600 */
  
  /* Estados */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### 🧩 Componentes Estandarizados

#### **UnifiedHeader**
- **Ubicación:** `frontend/src/components/common/UnifiedHeader.jsx`
- **Propósito:** Header estándar para todos los listings
- **Props:** `title`, `subtitle`, `onNew`, `searchValue`, `onSearch`

#### **UnifiedCard**
- **Ubicación:** `frontend/src/components/common/UnifiedCard.jsx`
- **Propósito:** Tarjeta estándar para mostrar registros
- **Props:** `title`, `subtitle`, `actions`, `status`, `onClick`

#### **DataTable**
- **Ubicación:** `frontend/src/components/shared/DataTable/DataTable.tsx`
- **Propósito:** Tabla estandarizada con funcionalidades completas
- **Features:** Paginación, ordenamiento, filtros, exportación

### 📱 Responsive Design
- **Mobile First:** Todos los componentes optimizados para móviles
- **Breakpoints:** sm(640px), md(768px), lg(1024px), xl(1280px)
- **Navigation:** Sidebar colapsible con overlay en móvil

## 🔗 Referencias y Enlaces Importantes

### 📚 Documentación Técnica
- **Arquitectura:** `02-arquitectura-tecnica-sgc-19-08-2025.md`
- **Base de Datos:** `05-estructura-base-datos-completa-19-08-2025.md`
- **Sistema RAG:** `06-sistema-rag-sgc-iso-9001-19-08-2025.md`
- **Estandarización:** `08-estandarizacion-componentes-abm-20-08-2025.md`
- **Sistema de Diseño:** `09-sistema-diseno-unificado-20-08-2025.md`

### 🔧 APIs Principales
```javascript
// Endpoints principales del sistema
const API_ENDPOINTS = {
  auth: '/api/auth',
  personal: '/api/personal',
  departamentos: '/api/departamentos',
  auditorias: '/api/auditorias',
  hallazgos: '/api/hallazgos',
  acciones: '/api/acciones',
  crm: '/api/crm',
  rag: '/api/rag',
  coordinacion: '/api/coordinacion'
};
```

### 🗄️ Estructura de Base de Datos
- **17 tablas principales** con arquitectura multi-tenant
- **Segregación por organización** usando `organization_id`
- **Relaciones normalizadas** siguiendo principios de diseño de BD
- **Índices optimizados** para consultas frecuentes

## 🔄 Reglas Obligatorias para Agentes

### ✅ **Reglas de Formato de Tareas**
1. **Orden cronológico inverso:** Tareas más recientes arriba
2. **Todos los campos obligatorios:** No omitir ningún campo del formato
3. **Objetivos detallados:** Mínimo 2-3 frases completas
4. **Informe narrativo:** Párrafo completo describiendo lo realizado
5. **Trazabilidad de archivos:** Registrar todos los archivos trabajados

### ✅ **Reglas de Contenido**
1. **Estados válidos:** 🔄 En proceso / ✅ Terminado / ⏸️ Pausado
2. **Cumplimiento ISO 9001:** Todas las tareas deben alinearse con la norma
3. **Integración con arquitectura:** Respetar patrones existentes
4. **Documentación actualizada:** Mantener docs-esenciales actualizados

### ✅ **Reglas de Documentación**
1. **Consultar documentos esenciales:** Siempre revisar documentación relevante
2. **Respetar estructura de BD:** No modificar esquemas sin autorización
3. **Seguir flujos de coordinación:** Usar procesos establecidos
4. **Mantener trazabilidad:** Registrar todas las actividades

## 🎯 Flujo de Trabajo Estándar

### 1. **📋 Recepción de Tarea**
- Analizar requerimientos del usuario
- Identificar tipo de agente apropiado
- Asignar número de tarea secuencial

### 2. **📚 Análisis y Consulta**
- Revisar documentación esencial relevante
- Consultar estructura de base de datos
- Verificar patrones de diseño existentes

### 3. **📝 Planificación**
- Definir objetivos específicos y medibles
- Identificar archivos a trabajar
- Planificar enfoque técnico

### 4. **⚙️ Ejecución**
- Implementar cambios siguiendo estándares
- Documentar progreso en tiempo real
- Mantener compatibilidad con sistema existente

### 5. **📊 Documentación**
- Registrar tarea en `01-log-tareas-agentes.md`
- Actualizar estadísticas del sistema
- Documentar lecciones aprendidas

### 6. **✅ Validación**
- Verificar cumplimiento de objetivos
- Validar estándares ISO 9001
- Confirmar integración correcta

## 🛠️ Herramientas y Comandos Útiles

### 🔧 Comandos de Desarrollo
```bash
# Inicio del sistema completo
npm run dev:full

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend

# Testing
npm run test
npm run test:e2e

# Build
npm run build
```

### 🔍 Comandos de Diagnóstico
```bash
# Verificar estado de tablas
node backend/scripts/permanentes/check-tables.js

# Diagnóstico RAG
node backend/scripts/permanentes/diagnostico-rag-completo.js

# Estado del sistema
node backend/scripts/permanentes/rag-system-status.js
```

### 📊 Comandos de Mantenimiento
```bash
# Actualizar configuración
node backend/scripts/permanentes/update-backend-config.js

# Cargar datos CRM
node backend/scripts/permanentes/cargar-datos-crm.js

# Limpieza temporal
node backend/scripts/permanentes/cleanup-temp.js
```

## 🧠 Sistema RAG - Contexto de IA

### 🎯 Propósito del Sistema RAG
El sistema RAG (Retrieval Augmented Generation) proporciona asistencia inteligente para consultas relacionadas con ISO 9001, gestión de calidad y funcionamiento del sistema SGC.

### 🔧 Arquitectura RAG
```
📁 backend/RAG-System/
├── models/ragDataModel.js      # Modelo de datos unificado
├── controllers/ragController.js # Controlador de API
├── services/ragService.js      # Lógica de procesamiento
└── routes/ragRoutes.js         # Endpoints RESTful
```

### 📊 Datos Integrados (17 tipos)
- normas, procesos, personal, departamentos, puestos
- competencias, documentos, auditorias, hallazgos, acciones
- indicadores, mediciones, objetivos_calidad, minutas
- capacitaciones, productos, encuestas

### 🔗 Endpoints RAG
```javascript
GET  /api/rag/health     // Estado del sistema
POST /api/rag/search     // Búsqueda de datos
POST /api/rag/context    // Obtención de contexto
POST /api/rag/generate   // Generación de respuestas
GET  /api/rag/stats      // Estadísticas del sistema
```

## 📋 Patrones de Desarrollo

### 🎨 **Patrón de Componentes**
```jsx
// Estructura estándar de componente
import React from 'react';
import { UnifiedHeader, UnifiedCard } from '../common';

const ModuloListing = () => {
  return (
    <div className="p-6">
      <UnifiedHeader 
        title="Título del Módulo"
        onNew={() => {/* lógica */}}
      />
      <div className="grid gap-4">
        {/* Contenido */}
      </div>
    </div>
  );
};

export default ModuloListing;
```

### 🔗 **Patrón de Servicios**
```javascript
// Estructura estándar de servicio
import api from './api';

export const moduloService = {
  getAll: (organizationId) => 
    api.get(`/modulo?organization_id=${organizationId}`),
  
  getById: (id, organizationId) => 
    api.get(`/modulo/${id}?organization_id=${organizationId}`),
  
  create: (data) => 
    api.post('/modulo', data),
  
  update: (id, data) => 
    api.put(`/modulo/${id}`, data),
  
  delete: (id) => 
    api.delete(`/modulo/${id}`)
};
```

### 🗄️ **Patrón de Controladores**
```javascript
// Estructura estándar de controlador
const getModulos = async (req, res) => {
  try {
    const { organization_id } = req.user;
    const modulos = await ModuloModel.findAll({
      where: { organization_id }
    });
    res.json(modulos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 🎯 Notas Importantes para Agentes IA

### ⚠️ **Restricciones Críticas**
1. **NO modificar** estructura de base de datos sin autorización
2. **NO eliminar** archivos de documentación existentes
3. **NO cambiar** patrones de autenticación establecidos
4. **SIEMPRE** mantener compatibilidad multi-tenant

### ✅ **Mejores Prácticas**
1. **Consultar documentación** antes de implementar cambios
2. **Seguir patrones existentes** en lugar de crear nuevos
3. **Mantener consistencia visual** con el sistema de diseño
4. **Documentar todos los cambios** en el log de tareas

### 🔄 **Actualización de Documentación**
1. **Log de tareas:** Siempre registrar en `01-log-tareas-agentes.md`
2. **Estadísticas:** Actualizar contadores al completar tareas
3. **Mapas automáticos:** Se actualizan automáticamente cada 20 minutos
4. **Documentación técnica:** Actualizar cuando sea relevante

### 🚀 **Optimización de Performance**
1. **Consultas SQL:** Usar índices apropiados
2. **Componentes React:** Implementar memoización cuando sea necesario
3. **APIs:** Implementar paginación para listas grandes
4. **Imágenes:** Optimizar tamaños y formatos

## 📞 Soporte y Recursos

### 🔗 **Enlaces de Referencia**
- **ISO 9001:2015:** Norma oficial de referencia
- **React Docs:** Documentación oficial de React
- **Tailwind CSS:** Documentación de estilos
- **Express.js:** Documentación del framework backend

### 🆘 **Resolución de Problemas Comunes**
1. **Error 500 en APIs:** Verificar autenticación y organization_id
2. **Componentes no renderizando:** Verificar imports y props
3. **Estilos no aplicándose:** Verificar clases Tailwind y purge config
4. **Base de datos no conectando:** Verificar configuración Turso

### 📊 **Monitoreo del Sistema**
- **Logs:** Consultar logs de PM2 y aplicación
- **Performance:** Usar herramientas de desarrollo del navegador
- **Base de datos:** Scripts de diagnóstico en `backend/scripts/permanentes/`

---

## 🎯 Mensaje Final para Agentes IA

Como agente IA trabajando en el Sistema SGC ISO 9001, tu rol es fundamental para mantener y mejorar este sistema crítico de gestión de calidad. 

**Recuerda siempre:**
- ✅ Consultar la documentación esencial antes de actuar
- ✅ Seguir los patrones y estándares establecidos
- ✅ Mantener trazabilidad completa de tus actividades
- ✅ Priorizar la estabilidad y compatibilidad del sistema
- ✅ Documentar todo tu trabajo en el log de tareas

**Tu contribución es valiosa para:**
- 🏆 Mantener el cumplimiento ISO 9001:2015
- 🚀 Mejorar la experiencia de los usuarios
- 🔧 Optimizar el rendimiento del sistema
- 📚 Preservar el conocimiento organizacional

¡Bienvenido al equipo de agentes del Sistema SGC ISO 9001!

---

*Contexto completo para agentes IA del Sistema SGC ISO 9001 - Tu guía definitiva para trabajar en el sistema*