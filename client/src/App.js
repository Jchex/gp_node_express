
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Home from './pages/Home'
import Usuario from './pages/Usuario/Usuario'
import NUsuario from './pages/Usuario/UsuarioNuevo'
import NPass from './pages/Usuario/UsuarioCambioPass'
import Proyecto from './pages/Proyecto/Proyecto'
import NProyecto from './pages/Proyecto/ProyectoNuevo'
import AProyecto from './pages/Proyecto/ProyectoAsignacion'
import SProyecto from './pages/Seguimiento/ProyectoSeguimiento'
import Defecto from './pages/Defecto/Defecto'
import NDefecto from './pages/Defecto/DefectoNuevo'
import Prueba from './pages/Prueba/Prueba'
import NPrueba from './pages/Prueba/PruebaNuevo'
import Login from './Login'

import Asignacion from './pages/PruebaAsignada/Asignacion'
import Codigo from './pages/codigo/codigo'

//se uso routes para cargar los componentes
function App() {

  return (

    <BrowserRouter >
      <Routes >
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/usuario' element={<Usuario />}></Route>
        <Route path='/nusuario' element={<NUsuario />}></Route>
        <Route path='/npass' element={<NPass />}></Route>
        <Route path='/proyecto' element={<Proyecto />}></Route>
        <Route path='/nproyecto' element={<NProyecto />}></Route>
        <Route path='/aproyecto' element={<AProyecto />}></Route>
        <Route path='/sproyecto' element={<SProyecto />}></Route>
        <Route path='/defecto' element={<Defecto />}></Route>
        <Route path='/ndefecto' element={<NDefecto />}></Route>
        <Route path='/prueba' element={<Prueba />}></Route>
        <Route path='/nprueba' element={<NPrueba />}></Route>
        <Route path='/asignacion' element={<Asignacion />}></Route>
        <Route path='/codigo' element={<Codigo />}></Route>

      </Routes>
    </BrowserRouter>


  );
}

export default App;