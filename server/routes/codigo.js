// src/components/Codigo.js
import express from 'express';
const router = express.Router();
import { connectToDatabase } from '../lib/db.js'

router.post('/', async(req, res) => {
    const { code } = req.body; // Extraemos el código del cuerpo de la solicitud
    // Conexión a la base de datos
    const db = await connectToDatabase();

    // Obtener la fecha en un formato compatible con MySQL
    const fechaEjecucion = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(fechaEjecucion);
    //console.log("Código recibido:", code); // Imprimimos el código recibido para depuración
  
    // Verificamos si el código está vacío
    if (!code) {
      return res.status(400).json({ error: "El código no puede estar vacío." });
    }
  
    // Creamos un contexto para la evaluación
    const context = {};
    const consoleOutput = [];
  
    // Redefinimos console.log para capturar la salida
    const originalLog = console.log;
    console.log = (...args) => {
      consoleOutput.push(args.join(' '));
      originalLog.apply(console, args);
    };
  
    try {
      // Evalúa el código JavaScript
      const result = eval(code);
      
      // Restauramos console.log
      console.log = originalLog;


      // Inserta el resultado en la base de datos
      const [row] = await db.query('INSERT INTO ejecuciones_de_prueba (fecha_ejecucion,resultado, comentarios) VALUES (?, ?, ?)', 
          [ fechaEjecucion,code +" = "+ result , "Evaluación de código"]);
      

      // Enviamos el resultado y la salida de console.log como respuesta
      res.json({ result, consoleOutput });
    } catch (error) {
      console.error("Error al evaluar el código:", error);

  
      // Aquí puedes personalizar el mensaje de error para el frontend
      let errorMessage = "Error al evaluar el código.";
      
      // Si el error tiene un mensaje, lo añadimos
      if (error.message) {
        errorMessage += ` Detalle: ${error.message}`;
                  // Capturamos cualquier error que ocurra durante la evaluación
      const [row] = await db.query('INSERT INTO ejecuciones_de_prueba (fecha_ejecucion,resultado, comentarios) VALUES (?, ?, ?)', 
        [ fechaEjecucion,error.message, "Evaluación de código"]);
      }
  
      // Enviamos el mensaje de error al cliente
      res.status(400).json({ error: errorMessage });
    }
  });

export default router;