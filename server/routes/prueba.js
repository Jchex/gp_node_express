import express from 'express';
import { connectToDatabase } from '../lib/db.js';
const router = express.Router();

// Obtener todos los casos de prueba
router.get('/prueba', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM casos_de_prueba');
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Crear un nuevo caso de prueba
router.post('/prueba', async (req, res) => {
    console.log('req.body', req.body);
    
    const { prueba, escenario, nombre, descripcion, resultado_esperado, prioridad } = req.body;
    console.log(nombre)
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'INSERT INTO casos_de_prueba(prueba, escenario, nombre, descripcion, resultado_esperado, prioridad) VALUES (?, ?, ?, ?, ?, ?)',
            [prueba, escenario, nombre, descripcion, resultado_esperado, prioridad]
        );
        return res.status(200).json({ message: "Caso de prueba creado correctamente", id: result.insertId });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Actualizar un caso de prueba
router.put('/prueba/:id', async (req, res) => {
    const { id } = req.params;
    const { prueba, escenario, descripcion, resultado_esperado, prioridad } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE casos_de_prueba SET prueba = ?, escenario = ?, descripcion = ?, resultado_esperado = ?, prioridad = ? WHERE id = ?',
            [prueba, escenario, descripcion, resultado_esperado, prioridad, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Caso de prueba no encontrado" });
        }
        return res.status(200).json({ message: "Caso de prueba actualizado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al actualizar el caso de prueba", error: err });
    }
});

// Eliminar un caso de prueba
router.delete('/prueba/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('DELETE FROM casos_de_prueba WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Caso de prueba no encontrado" });
        }
        return res.status(200).json({ message: "Caso de prueba eliminado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar el caso de prueba", error: err });
    }
});

export default router;