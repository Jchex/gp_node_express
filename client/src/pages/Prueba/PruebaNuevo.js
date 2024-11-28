import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Swal from 'sweetalert2';
import axios from 'axios';

function Nprueba() {
  const [values, setValues] = useState({
    prueba: '',
    nombre: '',
    escenario: '',
    descripcion: '',
    resultado_esperado: '',
    prioridad: '' // Inicialmente vacío
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se haya seleccionado una prioridad
    if (!values.prioridad) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Por favor, selecciona una prioridad.",
      });
      return; // Detener el envío del formulario
    }

    try {
      const resp = await axios.post('http://localhost:3001/prueba/prueba', values);
      if (resp.status === 200) {
        Swal.fire("Se registró con éxito!");
        navigate('/Prueba');
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
        text: "Ocurrió un error al registrar la prueba!",
      });
    }
  };

  return (
    <div>
      <Menu />
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3 bg-white rounded col-12 col-md-6 col-xl-4">
          <h3 className="text-center">Nueva Prueba</h3>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="prueba" className="form-label">Nombre de la Prueba</label>
              <input
                type="text"
                className="form-control"
                name="prueba"
                id="prueba"
                placeholder="Ejemplo"
                value={values.prueba}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Tipo de Prueba</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                placeholder="-----"
                value={values.nombre}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="escenario" className="form-label">Escenario de la Prueba</label>
              <input
                type="text"
                className="form-control"
                name="escenario"
                id="escenario"
                placeholder="-----"
                value={values.escenario}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción de la Prueba</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                id="descripcion"
                placeholder="-----"
                value={values.descripcion}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="resultado_esperado" className="form-label">Resultado esperado de la Prueba</label>
              <input
                type="text"
                className="form-control"
                name="resultado_esperado"
                id="resultado_esperado"
                placeholder="-----"
                value={values.resultado_esperado}
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Prioridad</label>
              <div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="prioridad"
                    id="prioridadBaja"
                    value="Baja"
                    checked={values.prioridad === "Baja"}
                    onChange={handleChanges}
                  />

                  <label className="form-check-label" htmlFor="prioridadBaja">Baja</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="prioridad"
                    id="prioridadMedia"
                    value="Media"
                    checked={values.prioridad === "Media"}
                    onChange={handleChanges}
                  />
                  <label className="form-check-label" htmlFor="prioridadMedia">Media</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="prioridad"
                    id="prioridadAlta"
                    value="Alta"
                    checked={values.prioridad === "Alta"}
                    onChange={handleChanges}
                  />
                  <label className="form-check-label" htmlFor="prioridadAlta">Alta</label>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 col-md-6 col-xl-6'>
                <button type="submit" className='btn btn-primary'>
                  <i className='bi bi-floppy-fill'></i> Crear
                </button>
              </div>
              <div className='col-12 col-md-6 col-xl-6 my-2'>
                <Link to='/Prueba' className='btn btn-danger'>
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

export default Nprueba;