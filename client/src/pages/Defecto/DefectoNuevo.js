import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Swal from 'sweetalert2';
import axios from 'axios';

function Ndefecto() {

  const [values, setValues] = useState({
    defecto: '',
    descripcion: '',

  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:3001/defecto/defecto', values);
      if (resp.status === 200) {
        Swal.fire("Se registró con éxito!");
        navigate('/Defecto');
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
        text: "Ocurrió un error al registrar el defecto!",
      });
    }
  };

  return (
    <div>
      <Menu />
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3 bg-white rounded col-12 col-md-6 col-xl-4">
          <h3 className="text-center">Nuevo Defecto</h3>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="defecto" className="form-label">Nombre del Defecto</label>
              <input
                type="text"
                className="form-control"
                name="defecto"
                id="defecto"
                placeholder="Ejemplo"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción del Defecto</label>
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

            <div className='row'>
              <div className='col-12 col-md-6 col-xl-6'>
                <button type="submit" className='btn btn-primary'>
                  <i className='bi bi-floppy-fill'></i> Crear
                </button>
              </div>
              <div className='col-12 col-md-6 col-xl-6 my-2'>
                <Link to='/Defecto' className='btn btn-danger'>
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

export default Ndefecto;