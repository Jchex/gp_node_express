import express from 'express';
import { connectToDatabase } from '../lib/db.js';
const router = express.Router();

// Obtener todos los roles
router.get('/rol', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM roles');
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Obtener todos los usuarios
router.get('/usuario', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM usuarios ');
        return res.send(rows);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


// Crear un nuevo usuario
router.post('/usuario', async (req, res) => {
    const { nombre, email, pass, rol } = req.body;

    try {
        const db = await connectToDatabase();
        // Verificar si el email ya existe
        const [existingUser] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso" });
        }
        // Si el email no existe, proceder a insertar el nuevo usuario
        const [result] = await db.query(
            'INSERT INTO usuarios(nombre, email, pass, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, pass, rol]
        );
        return res.status(200).json({ message: "Usuario creado correctamente" });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el usuario', details: err });
        console.log(err);
    }

});

// Actualizar un usuario
router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, pass, rol } = req.body;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query(
            'UPDATE usuarios SET nombre = ?, email = ?, pass = ?, rol = ? WHERE id = ?',
            [nombre, email, pass, rol, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al actualizar el usuario", error: err });
    }
});

// Eliminar un usuario
router.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al eliminar el usuario", error: err });
    }
});

export default router;