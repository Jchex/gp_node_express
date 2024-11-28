import express from 'express'
import { connectToDatabase } from '../lib/db.js'
const router = express.Router()

router.get('/dashproyecto', async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [row] = await db.query('SELECT * FROM proyectos')
        return res.send(row)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
});


router.get('/calendarproyecto', async (req, res) => {
    try {
        const db = await connectToDatabase();

        // Primera consulta: obtener los proyectos
        const [proyectos] = await db.query('SELECT * FROM proyectos ORDER BY id DESC');

        // Segunda consulta: obtener las asignaciones de prueba
        const [asignaciones] = await db.query(`
            SELECT asignaciones_de_prueba.*, 
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
                ORDER BY asignaciones_de_prueba.id DESC`);

        // Mapea los resultados de proyectos para el formato esperado por el calendario
        const eventosProyectos = proyectos.map(row => ({
            title: `Proyecto: ${row.nombre}`, // Título del evento
            allDay: true,
            desc: row.descripcion,
            start: new Date(row.fecha_inicio), // Fecha de inicio
            end: new Date(row.fecha_fin), // Fecha de fin
            style: { backgroundColor: '#10d4d1' } // Color para proyectos
        }));

        // Mapea los resultados de asignaciones para el formato esperado por el calendario
        const eventosAsignaciones = asignaciones.map(row => ({
            title: `Prueba: ${row.prueba_nombre} a Proyecto: ${row.proyecto_nombre} `, // Título del evento
            allDay: true,
            desc: `Estado: ${row.estado} - Prioridad: ${row.prueba_prioridad}`,
            start: new Date(row.fecha_asignacion), // Fecha de inicio
            end: new Date(row.fecha_finalizacion), // Fecha de fin
            style: { backgroundColor: '#10d44b' } // Color para asignaciones
        }));

        // Combina ambos arrays de eventos
        const eventos = [...eventosProyectos, ...eventosAsignaciones];

        return res.send(eventos); // Envía los eventos en el formato esperado
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


router.get('/dashpruebas', async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [row] = await db.query('SELECT * FROM asignaciones_de_prueba WHERE estado="Sin Realizar"')
        return res.send(row)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
});

router.get('/usuarioXR/:rol', async (req, res) => {
    const { rol } = req.params;
    try {
        const db = await connectToDatabase();
        //Consulta para contar los usuarios con el rol especificado
        const [rows] = await db.query('SELECT COUNT(*) AS count FROM usuarios WHERE rol = ?', [rol]);
        // Enviamos el conteo como respuesta
        return res.json({ rol, count: rows[0].count });
    } catch (err) {
        res.status(500).json({ error: 'Error en la consulta a la base de datos', details: err });
        console.log(err);
    }
});

router.get('/codigo', async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [row] = await db.query('SELECT  id ,resultado from ejecuciones_de_prueba order by 1 desc limit 4')
        return res.send(row)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
});


export default router;
