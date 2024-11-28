import express from 'express'
import { connectToDatabase } from '../lib/db.js'
const router = express.Router()

// Obtener todas los proyecto
router.get('/proyectoA', async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [row] = await db.query('SELECT * FROM proyectos ORDER BY id DESC')
        return res.send(row)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

})


// Obtener todas las asignaciones de prueba por proyecto
router.get('/proyectoX/:seguimiento', async (req, res) => {
    const { seguimiento } = req.params;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT * FROM proyectos 
            WHERE proyectos.id=?`, [seguimiento]);
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// inserta datos a proyecto
router.post('/proyecto', async (req, res) => {
    const { nombre, descripcion, fechai, fechaf } = req.body;
    const estado = 'Activo';
    try {
        const db = await connectToDatabase()
        const [row] = await db.query('INSERT INTO proyectos(nombre,descripcion,fecha_inicio,fecha_fin, estado)VALUES (?,?,?,?, ?)',
            [nombre, descripcion, fechai, fechaf, estado])
        return res.status(200).json({ message: "Ok" })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// actualiza datos de un proyecto
router.put('/proyecto/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fechai, fechaf } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
            [nombre, descripcion, fechai, fechaf, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Proyecto no se actualizó" });
        }
        return res.status(200).json({ message: "Proyecto actualizado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al actualizar el proyecto", error: err });
    }
});

// elimina un proyecto
router.delete('/proyecto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('DELETE FROM proyectos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        return res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar el proyecto", error: err });
    }
});

export default router;
