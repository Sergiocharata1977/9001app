const express = require('express');
const router = express.Router();
const coordinacionController = require('../controllers/coordinacionController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Rutas públicas (requieren autenticación)
router.get('/tareas', coordinacionController.obtenerTareas);
router.get('/tareas/:tareaNumero', coordinacionController.obtenerTareaPorNumero);
router.get('/estadisticas', coordinacionController.obtenerEstadisticas);
router.get('/buscar', coordinacionController.buscarTareas);
router.get('/modulo/:modulo', coordinacionController.obtenerTareasPorModulo);
router.get('/estado/:estado', coordinacionController.obtenerTareasPorEstado);

// Rutas de administración (requieren permisos de admin)
router.use(adminMiddleware);

router.post('/tareas', coordinacionController.crearTarea);
router.put('/tareas/:tareaNumero', coordinacionController.actualizarTarea);
router.delete('/tareas/:tareaNumero', coordinacionController.eliminarTarea);
router.post('/sincronizar', coordinacionController.sincronizarDesdeDocumentacion);

module.exports = router;
