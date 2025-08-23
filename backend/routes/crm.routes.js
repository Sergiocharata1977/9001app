const express = require('express');
const tursoClient = require('../lib/tursoClient.js');
const { auditMiddleware, auditActions, resourceTypes } = require('../middleware/auditMiddleware.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const crypto = require('crypto');

const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// ===============================================
// RUTAS PARA CONTACTOS
// ===============================================

// GET /api/crm/contactos - Obtener todos los contactos
router.get('/contactos', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    console.log('📋 Obteniendo contactos para organización:', orgId);

    const result = await tursoClient.execute({
      sql: `SELECT * FROM crm_contactos 
            WHERE organization_id = ? AND is_active = 1
            ORDER BY nombre, apellidos`,
      args: [orgId]
    });

    console.log(`✅ Encontrados ${result.rows.length} contactos`);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length,
      message: `${result.rows.length} contactos encontrados`
    });

  } catch (error) {
    console.error('Error obteniendo contactos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    });
  }
});

// GET /api/crm/contactos/:id - Obtener contacto por ID
router.get('/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;

    console.log(`🔍 Obteniendo contacto ${id}`);

    const result = await tursoClient.execute({
      sql: `SELECT * FROM crm_contactos 
            WHERE id = ? AND organization_id = ? AND is_active = 1`,
      args: [id, orgId]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }

    console.log(`✅ Contacto ${id} encontrado`);

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error obteniendo contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contacto',
      error: error.message
    });
  }
});

// POST /api/crm/contactos - Crear nuevo contacto
router.post('/contactos', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    const contactoId = crypto.randomUUID();
    const now = new Date().toISOString();

    const {
      nombre, apellidos, cargo, empresa, telefono, email, direccion, ciudad, estado,
      zona_geografica, tipo_contacto, fuente_contacto, estado_contacto, observaciones
    } = req.body;

    console.log('➕ Creando nuevo contacto:', nombre);

    const result = await tursoClient.execute({
      sql: `INSERT INTO crm_contactos (
        id, organization_id, nombre, apellidos, cargo, empresa, telefono, email,
        direccion, ciudad, estado, zona_geografica, tipo_contacto, fuente_contacto,
        estado_contacto, observaciones, created_at, updated_at, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        contactoId, orgId, nombre, apellidos, cargo, empresa, telefono, email,
        direccion, ciudad, estado, zona_geografica, tipo_contacto, fuente_contacto,
        estado_contacto, observaciones, now, now, req.user?.nombre
      ]
    });

    console.log(`✅ Contacto creado con ID: ${contactoId}`);

    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: { id: contactoId, nombre }
    });

  } catch (error) {
    console.error('Error creando contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear contacto',
      error: error.message
    });
  }
});

// PUT /api/crm/contactos/:id - Actualizar contacto
router.put('/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;
    const now = new Date().toISOString();

    const {
      nombre, apellidos, cargo, empresa, telefono, email, direccion, ciudad, estado,
      zona_geografica, tipo_contacto, fuente_contacto, estado_contacto, observaciones
    } = req.body;

    console.log(`✏️ Actualizando contacto ${id}`);

    const result = await tursoClient.execute({
      sql: `UPDATE crm_contactos SET 
        nombre = ?, apellidos = ?, cargo = ?, empresa = ?, telefono = ?, email = ?,
        direccion = ?, ciudad = ?, estado = ?, zona_geografica = ?, tipo_contacto = ?,
        fuente_contacto = ?, estado_contacto = ?, observaciones = ?, updated_at = ?, updated_by = ?
        WHERE id = ? AND organization_id = ?`,
      args: [
        nombre, apellidos, cargo, empresa, telefono, email, direccion, ciudad, estado,
        zona_geografica, tipo_contacto, fuente_contacto, estado_contacto, observaciones,
        now, req.user?.nombre, id, orgId
      ]
    });

    console.log(`✅ Contacto ${id} actualizado`);

    res.json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      data: { id, nombre }
    });

  } catch (error) {
    console.error('Error actualizando contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar contacto',
      error: error.message
    });
  }
});

// DELETE /api/crm/contactos/:id - Eliminar contacto (soft delete)
router.delete('/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;

    console.log(`🗑️ Eliminando contacto ${id}`);

    const result = await tursoClient.execute({
      sql: `UPDATE crm_contactos SET is_active = 0, updated_at = ?, updated_by = ?
            WHERE id = ? AND organization_id = ?`,
      args: [new Date().toISOString(), req.user?.nombre, id, orgId]
    });

    console.log(`✅ Contacto ${id} eliminado`);

    res.json({
      success: true,
      message: 'Contacto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar contacto',
      error: error.message
    });
  }
});

// ===============================================
// RUTAS PARA CLIENTES AGRO (ACTUALIZADAS)
// ===============================================

// GET /api/crm/clientes-agro - Obtener todos los clientes agro
router.get('/clientes-agro', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    const { search, tipo_cliente, categoria_agro } = req.query;

    console.log('📋 Obteniendo clientes agro para organización:', orgId);

    let sql = `SELECT ca.*, 
            c.nombre as contacto_nombre, c.apellidos as contacto_apellidos, c.email as contacto_email,
            (v.nombres || ' ' || v.apellidos) as vendedor_nombre, v.email as vendedor_email,
            (t.nombres || ' ' || t.apellidos) as tecnico_nombre, t.email as tecnico_email,
            (s.nombres || ' ' || s.apellidos) as supervisor_nombre
            FROM clientes_agro ca
            LEFT JOIN crm_contactos c ON ca.contacto_id = c.id
            LEFT JOIN personal v ON ca.vendedor_asignado_id = v.id
            LEFT JOIN personal t ON ca.tecnico_asignado_id = t.id
            LEFT JOIN personal s ON ca.supervisor_comercial_id = s.id
            WHERE ca.organization_id = ? AND ca.is_active = 1`;

    const args = [orgId];

    if (search) {
      sql += ` AND (ca.razon_social LIKE ? OR ca.rfc LIKE ? OR c.nombre LIKE ?)`;
      const searchTerm = `%${search}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }

    if (tipo_cliente && tipo_cliente !== 'todos') {
      sql += ` AND ca.tipo_cliente = ?`;
      args.push(tipo_cliente);
    }

    if (categoria_agro && categoria_agro !== 'todas') {
      sql += ` AND ca.categoria_agro = ?`;
      args.push(categoria_agro);
    }

    sql += ` ORDER BY ca.created_at DESC`;

    const result = await tursoClient.execute({ sql, args });

    console.log(`✅ Encontrados ${result.rows.length} clientes agro`);

    res.json({
      success: true,
      data: result.rows,
      message: `${result.rows.length} clientes agro encontrados`
    });

  } catch (error) {
    console.error('Error obteniendo clientes agro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener clientes agro',
      error: error.message
    });
  }
});

// GET /api/crm/clientes-agro/:id - Obtener cliente agro por ID
router.get('/clientes-agro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;

    console.log(`🔍 Obteniendo cliente agro ${id}`);

    const result = await tursoClient.execute({
      sql: `SELECT ca.*, 
            c.nombre as contacto_nombre, c.apellidos as contacto_apellidos, c.email as contacto_email,
            (v.nombres || ' ' || v.apellidos) as vendedor_nombre, v.email as vendedor_email,
            (t.nombres || ' ' || t.apellidos) as tecnico_nombre, t.email as tecnico_email,
            (s.nombres || ' ' || s.apellidos) as supervisor_nombre
            FROM clientes_agro ca
            LEFT JOIN crm_contactos c ON ca.contacto_id = c.id
            LEFT JOIN personal v ON ca.vendedor_asignado_id = v.id
            LEFT JOIN personal t ON ca.tecnico_asignado_id = t.id
            LEFT JOIN personal s ON ca.supervisor_comercial_id = s.id
            WHERE ca.id = ? AND ca.organization_id = ? AND ca.is_active = 1`,
      args: [id, orgId]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cliente agro no encontrado'
      });
    }

    console.log(`✅ Cliente agro ${id} encontrado`);

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error obteniendo cliente agro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cliente agro',
      error: error.message
    });
  }
});

// POST /api/crm/clientes-agro - Crear nuevo cliente agro
router.post('/clientes-agro', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    const clienteId = crypto.randomUUID();
    const now = new Date().toISOString();

    const {
      contacto_id, razon_social, rfc, tipo_cliente, categoria_agro, zona_geografica, region,
      clima_zona, tipo_suelo, direccion, ciudad, estado, superficie_total, cultivos_principales,
      sistema_riego, tipo_agricultura, vendedor_asignado_id, tecnico_asignado_id,
      supervisor_comercial_id, preferencias_estacionales, observaciones
    } = req.body;

    console.log('➕ Creando nuevo cliente agro:', razon_social);

    const result = await tursoClient.execute({
      sql: `INSERT INTO clientes_agro (
        id, organization_id, contacto_id, razon_social, rfc, tipo_cliente, categoria_agro,
        zona_geografica, region, clima_zona, tipo_suelo, direccion, ciudad, estado,
        superficie_total, cultivos_principales, sistema_riego, tipo_agricultura,
        vendedor_asignado_id, tecnico_asignado_id, supervisor_comercial_id,
        preferencias_estacionales, observaciones, created_at, updated_at, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        clienteId, orgId, contacto_id, razon_social, rfc, tipo_cliente, categoria_agro,
        zona_geografica, region, clima_zona, tipo_suelo, direccion, ciudad, estado,
        superficie_total, cultivos_principales, sistema_riego, tipo_agricultura,
        vendedor_asignado_id, tecnico_asignado_id, supervisor_comercial_id,
        preferencias_estacionales, observaciones, now, now, req.user?.nombre
      ]
    });

    console.log(`✅ Cliente agro creado con ID: ${clienteId}`);

    res.status(201).json({
      success: true,
      message: 'Cliente agro creado exitosamente',
      data: { id: clienteId, razon_social }
    });

  } catch (error) {
    console.error('Error creando cliente agro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cliente agro',
      error: error.message
    });
  }
});

// PUT /api/crm/clientes-agro/:id - Actualizar cliente agro
router.put('/clientes-agro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;
    const now = new Date().toISOString();

    const {
      contacto_id, razon_social, rfc, tipo_cliente, categoria_agro, zona_geografica, region,
      clima_zona, tipo_suelo, direccion, ciudad, estado, superficie_total, cultivos_principales,
      sistema_riego, tipo_agricultura, vendedor_asignado_id, tecnico_asignado_id,
      supervisor_comercial_id, preferencias_estacionales, observaciones
    } = req.body;

    console.log(`✏️ Actualizando cliente agro ${id}`);

    const result = await tursoClient.execute({
      sql: `UPDATE clientes_agro SET
        contacto_id = ?, razon_social = ?, rfc = ?, tipo_cliente = ?, categoria_agro = ?,
        zona_geografica = ?, region = ?, clima_zona = ?, tipo_suelo = ?, direccion = ?,
        ciudad = ?, estado = ?, superficie_total = ?, cultivos_principales = ?,
        sistema_riego = ?, tipo_agricultura = ?, vendedor_asignado_id = ?,
        tecnico_asignado_id = ?, supervisor_comercial_id = ?, preferencias_estacionales = ?,
        observaciones = ?, updated_at = ?, updated_by = ?
        WHERE id = ? AND organization_id = ?`,
      args: [
        contacto_id, razon_social, rfc, tipo_cliente, categoria_agro, zona_geografica, region,
        clima_zona, tipo_suelo, direccion, ciudad, estado, superficie_total, cultivos_principales,
        sistema_riego, tipo_agricultura, vendedor_asignado_id, tecnico_asignado_id,
        supervisor_comercial_id, preferencias_estacionales, observaciones, now, req.user?.nombre,
        id, orgId
      ]
    });

    console.log(`✅ Cliente agro ${id} actualizado`);

    res.json({
      success: true,
      message: 'Cliente agro actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error actualizando cliente agro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar cliente agro',
      error: error.message
    });
  }
});

// DELETE /api/crm/clientes-agro/:id - Eliminar cliente agro (soft delete)
router.delete('/clientes-agro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orgId = req.user?.organization_id;

    console.log(`🗑️ Eliminando cliente agro ${id}`);

    const result = await tursoClient.execute({
      sql: `UPDATE clientes_agro SET is_active = 0, updated_at = ?, updated_by = ?
        WHERE id = ? AND organization_id = ?`,
      args: [new Date().toISOString(), req.user?.nombre, id, orgId]
    });

    console.log(`✅ Cliente agro ${id} eliminado`);

    res.json({
      success: true,
      message: 'Cliente agro eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando cliente agro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cliente agro',
      error: error.message
    });
  }
});

// ===============================================
// RUTAS PARA CULTIVOS POR CLIENTE
// ===============================================

// GET /api/crm/cultivos-cliente/:clienteId - Obtener cultivos de un cliente
router.get('/cultivos-cliente/:clienteId', async (req, res) => {
  try {
    const { clienteId } = req.params;
    const orgId = req.user?.organization_id;

    console.log(`🌾 Obteniendo cultivos del cliente ${clienteId}`);

    const result = await tursoClient.execute({
      sql: `SELECT * FROM crm_cultivos_cliente 
            WHERE cliente_id = ? AND organization_id = ? AND is_active = 1
            ORDER BY fecha_siembra DESC`,
      args: [clienteId, orgId]
    });

    console.log(`✅ Encontrados ${result.rows.length} cultivos`);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length,
      message: `${result.rows.length} cultivos encontrados`
    });

  } catch (error) {
    console.error('Error obteniendo cultivos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cultivos',
      error: error.message
    });
  }
});

// POST /api/crm/cultivos-cliente - Crear nuevo cultivo
router.post('/cultivos-cliente', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    const cultivoId = crypto.randomUUID();
    const now = new Date().toISOString();

    const {
      cliente_id, nombre_cultivo, variedad, superficie, fecha_siembra,
      fecha_cosecha_esperada, rendimiento_anterior, rendimiento_esperado, estado_cultivo
    } = req.body;

    console.log('🌱 Creando nuevo cultivo:', nombre_cultivo);

    const result = await tursoClient.execute({
      sql: `INSERT INTO crm_cultivos_cliente (
        id, organization_id, cliente_id, nombre_cultivo, variedad, superficie,
        fecha_siembra, fecha_cosecha_esperada, rendimiento_anterior,
        rendimiento_esperado, estado_cultivo, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        cultivoId, orgId, cliente_id, nombre_cultivo, variedad, superficie,
        fecha_siembra, fecha_cosecha_esperada, rendimiento_anterior,
        rendimiento_esperado, estado_cultivo, now, now
      ]
    });

    console.log(`✅ Cultivo creado con ID: ${cultivoId}`);

    res.status(201).json({
      success: true,
      message: 'Cultivo creado exitosamente',
      data: { id: cultivoId, nombre_cultivo }
    });

  } catch (error) {
    console.error('Error creando cultivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cultivo',
      error: error.message
    });
  }
});

// ===============================================
// RUTAS PARA OBTENER DATOS DE REFERENCIA
// ===============================================

// GET /api/crm/vendedores - Obtener vendedores disponibles
router.get('/vendedores', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    console.log('👥 Obteniendo vendedores para organización:', orgId);

    const result = await tursoClient.execute({
      sql: `SELECT id, nombres, apellidos, email, telefono 
            FROM personal 
            WHERE organization_id = ? AND is_active = 1
            ORDER BY nombres, apellidos`,
      args: [orgId]
    });

    console.log(`✅ Encontrados ${result.rows.length} vendedores`);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Error obteniendo vendedores:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener vendedores',
      error: error.message
    });
  }
});

// GET /api/crm/tecnicos - Obtener técnicos disponibles
router.get('/tecnicos', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    console.log('🔧 Obteniendo técnicos para organización:', orgId);

    const result = await tursoClient.execute({
      sql: `SELECT id, nombres, apellidos, email, telefono 
            FROM personal 
            WHERE organization_id = ? AND is_active = 1
            ORDER BY nombres, apellidos`,
      args: [orgId]
    });

    console.log(`✅ Encontrados ${result.rows.length} técnicos`);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Error obteniendo técnicos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener técnicos',
      error: error.message
    });
  }
});

// ===============================================
// RUTAS LEGACY (MANTENER COMPATIBILIDAD)
// ===============================================

// GET /api/crm/clientes - Obtener todos los clientes (legacy)
router.get('/clientes', async (req, res) => {
  try {
    const orgId = req.user?.organization_id;
    console.log('📋 Obteniendo clientes legacy para organización:', orgId);

    const result = await tursoClient.execute({
      sql: `SELECT c.*, 
            (v.nombres || ' ' || v.apellidos) as vendedor_nombre, v.email as vendedor_email,
            (s.nombres || ' ' || s.apellidos) as supervisor_nombre
            FROM clientes c
            LEFT JOIN personal v ON c.vendedor_asignado_id = v.id
            LEFT JOIN personal s ON c.supervisor_comercial_id = s.id
            WHERE c.organization_id = ? AND c.is_active = 1
            ORDER BY c.nombre`,
      args: [orgId]
    });

    console.log(`✅ Encontrados ${result.rows.length} clientes legacy`);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length,
      message: `${result.rows.length} clientes legacy encontrados`
    });

  } catch (error) {
    console.error('Error obteniendo clientes legacy:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener clientes legacy',
      error: error.message
    });
  }
});

module.exports = router;
