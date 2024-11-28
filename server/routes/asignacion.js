import express from 'express';
import { connectToDatabase } from '../lib/db.js';
const router = express.Router();

// Obtener todas las asignaciones de prueba
router.get('/asignacion', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT 
                asignaciones_de_prueba.*, 
                proyectos.nombre AS proyecto_nombre, 
                casos_de_prueba.prueba AS prueba_nombre, 
                casos_de_prueba.prioridad AS prueba_prioridad, 
                usuarios.nombre AS usuario_nombre
            FROM 
                asignaciones_de_prueba 
            INNER JOIN 
                proyectos ON asignaciones_de_prueba.proyecto = proyectos.id
            INNER JOIN 
                casos_de_prueba ON asignaciones_de_prueba.prueba = casos_de_prueba.id
                       INNER JOIN 
                usuarios ON asignaciones_de_prueba.usuario_id = usuarios.id
                ORDER BY asignaciones_de_prueba.id DESC
        `);
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Obtener todas las asignaciones de prueba por proyecto
router.get('/asignacionXP/:seguimiento', async (req, res) => {
    const { seguimiento } = req.params;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT 
                asignaciones_de_prueba.*, 
                proyectos.nombre AS proyecto_nombre, 
                casos_de_prueba.prueba AS prueba_nombre, 
                casos_de_prueba.prioridad AS prueba_prioridad, 
                usuarios.nombre AS usuario_nombre
            FROM 
                asignaciones_de_prueba 
            INNER JOIN 
                proyectos ON asignaciones_de_prueba.proyecto = proyectos.id
            INNER JOIN 
                casos_de_prueba ON asignaciones_de_prueba.prueba = casos_de_prueba.id
            INNER JOIN 
                usuarios ON asignaciones_de_prueba.usuario_id = usuarios.id
            WHERE asignaciones_de_prueba.proyecto=?`, [seguimiento]);
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Obtener todas las asignaciones de prueba por usuario asignado
router.get('/asignacionXU/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT 
                asignaciones_de_prueba.*, 
                proyectos.nombre AS proyecto_nombre, 
                casos_de_prueba.prueba AS prueba_nombre, 
                usuarios.nombre AS usuario_nombre
            FROM 
                asignaciones_de_prueba 
            INNER JOIN 
                proyectos ON asignaciones_de_prueba.proyecto = proyectos.id
            INNER JOIN 
                casos_de_prueba ON asignaciones_de_prueba.prueba = casos_de_prueba.id
                       INNER JOIN 
                usuarios ON asignaciones_de_prueba.usuario_id = usuarios.id
            WHERE asignaciones_de_prueba.usuario_id=?`, [id]);
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});



// Crear una nueva asignación de prueba
router.post('/asignacion', async (req, res) => {
    const { proyecto,usuario_id,prueba,fecha_asignacion,fecha_finalizacion,estado } = req.body; // Cambiar los campos a los nuevos
    
    console.log('LLEGO .... ', req.body);
    
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'INSERT INTO asignaciones_de_prueba(proyecto, usuario_id, prueba, fecha_asignacion,fecha_finalizacion,estado) VALUES (?, ?, ?, ?, ?, ?)', // Cambiar a la tabla asignaciones_de_prueba
            [proyecto,usuario_id,prueba,fecha_asignacion,fecha_finalizacion,estado]
        );
        await db.query(
            'UPDATE proyectos SET estado = ? WHERE id = ?',
            ['PRUEBAS',proyecto]
        );

        return res.status(200).json({ message: "Asignación de prueba creada correctamente", id: result.insertId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al crear la asignación de prueba", error: err });
    }
});

// Ingreso de los defectos y actualizacion de asignación de prueba
router.put('/asignacion/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha_ejecucion,criterio, defectos } = req.body;
    console.log(req.body)
    var estado = "Prueba realizada";
    try {
        //  console.log("Defectos recibidos:", defectos);
        const db = await connectToDatabase();
        // Ejecutar la consulta de actualización
        const [result] = await db.query(
            'UPDATE asignaciones_de_prueba SET estado = ?,fecha_ejecucion = ?,criterio = ? WHERE id = ?', // Cambiar a la tabla asignaciones_de_prueba
            [estado,fecha_ejecucion,criterio, id]
        );
        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Prueba no encontrada" });
        }
        // Insertar defectos en la tabla defectos_prueba
        if (defectos && defectos.length > 0) {
            const insertPromises = defectos.map(defecto => {
                return db.query(
                    'INSERT INTO defectos_prueba (id_prueba, id_defecto) VALUES (?, ?)',
                    [id, defecto]
                );
            });
            // Esperar a que todas las inserciones se completen
            await Promise.all(insertPromises);
        }

        return res.status(200).json({ message: "Prueba actualizada correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al actualizar la asignación de prueba", error: err });
    }
});


// Eliminar una asignación de prueba
router.delete('/asignacion/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('DELETE FROM asignaciones_de_prueba WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Asignación de prueba no encontrada" });
        }
        return res.status(200).json({ message: "Asignación de prueba eliminada correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar la asignación de prueba", error: err });
    }
});

export default router;