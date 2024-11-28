import express from 'express'
import cors from 'cors'
import auth from './routes/auth.js'
import dbusuario from './routes/usuario.js'
import dbproyecto from './routes/proyecto.js'
import dbprueba from './routes/prueba.js'
import dbdefecto from './routes/defecto.js'
import dbasignacion from './routes/asignacion.js'
import dbdashboard from './routes/dashboard.js'
import dbcodigo from './routes/codigo.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', auth)
app.use('/usuario', dbusuario)
app.use('/proyecto', dbproyecto)
app.use('/prueba', dbprueba)
app.use('/defecto', dbdefecto)
app.use('/asignacion', dbasignacion)
app.use('/dashboard', dbdashboard)
app.use('/codigo', dbcodigo)
app.listen(process.env.PORT, () => {
    console.log("corriendo en el puerto 3001")
})


