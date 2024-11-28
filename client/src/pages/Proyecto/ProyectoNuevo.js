import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Swal from 'sweetalert2';
import axios from 'axios';

function Nproyecto() {
  // Obtener la fecha actual
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, '0');
  const mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const yyyy = hoy.getFullYear();
  const fecha = `${yyyy}-${mm}-${dd}`;

  const [values, setValues] = useState({
    nombre: '',
    descripcion: '',
    fechai: fecha, // Inicializa con la fecha actual
    fechaf: ''
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:3001/proyecto/proyecto', values);
      if (resp.status === 200) {
        Swal.fire("Se registró con éxito!");
        navigate('/Proyecto');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo realizar la acción!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar el proyecto!",
      });
    }
  };

  return (
    <div>
      <Menu />
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3 bg-white rounded col-12 col-md-6 col-xl-4">
          <h3 className="text-center">Nuevo Proyecto</h3>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del Proyecto</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                placeholder="Ejemplo"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción del Proyecto</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                id="descripcion"
                placeholder="-----"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechai" className="form-label">Fecha Inicio</label>
              <input
                type="date"
                className="form-control"
                name="fechai"
                id="fechai"
                value={values.fechai}
                onChange={handleChanges}
                required
              />

              <label htmlFor="fechaf" className="form-label">Fecha Final</label>
              <input
                type="date"
                className="form-control"
                name="fechaf"
                id="fechaf"
                min={values.fechai}
                onChange={handleChanges}
                required
              />
            </div>

            <div className='row'>
              <div className='col-12 col-md-6 col-xl-6'>
                <button type="submit" className='btn btn-primary'>
                  <i className='bi bi-floppy-fill'></i> Crear
                </button>
              </div>
              <div className='col-12 col-md-6 col-xl-6 my-2'>
                <Link to='/Proyecto' className='btn btn-danger'>
                  <i className="bi bi-x-circle"></i> Cancelar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Nproyecto;