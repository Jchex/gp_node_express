import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Clave secreta para firmar el token
const JWT_SECRET = 'gestor'; // Cambia esto a una clave más segura y mantenla en un lugar seguro

router.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email=? and pass=?', [email,pass]);
        // Verificar si el usuario existe y la contraseña es correcta
        if (rows.length > 0) {
            const user = rows[0];
            // verificar la contraseña usando bcrypt
            //const match = await bcrypt.compare(pass, user.pass);
            // if (!match) {
            //     return res.status(401).json({ message: "Usuario o Contraseña incorrecta" });
            // }

            // Generar el token
            const token = jwt.sign({ id: user.id, user: user.nombre, email: user.email, role: user.rol }, JWT_SECRET, {
                expiresIn: 5 // El token expirará en 1 hora
            });
            return res.status(200).json({ message: "Ok", token });
        } else {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

export default router;