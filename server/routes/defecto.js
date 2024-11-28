import express from 'express';
import { connectToDatabase } from '../lib/db.js';
const router = express.Router();

// Obtener todos los defectos
router.get('/defecto', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM defectos');
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Crear un nuevo defecto
router.post('/defecto', async (req, res) => {
    const { defecto, descripcion } = req.body;

    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'INSERT INTO defectos(defecto, descripcion) VALUES (?, ?)',
            [defecto, descripcion]
        );
        return res.status(200).json({ message: "Defecto creado correctamente", id: result.insertId });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Actualizar un defecto
router.put('/defecto/:id', async (req, res) => {
    const { id } = req.params;
    const { defecto, descripcion } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE defectos SET defecto = ?, descripcion = ? WHERE id = ?',
            [defecto, descripcion, id]
        );
        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Defecto no encontrado" });
        }
        return res.status(200).json({ message: "Defecto actualizado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al actualizar el defecto", error: err });
    }
});

// Eliminar un defecto
router.delete('/defecto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('DELETE FROM defectos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Defecto no encontrado" });
        }
        return res.status(200).json({ message: "Defecto eliminado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar el defecto", error: err });
    }
});

export default router;