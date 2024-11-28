import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Swal from 'sweetalert2';
import axios from 'axios';

function Nusuario() {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    pass: '',
    rol: ''
  });

  const [roles, setRoles] = useState([]); // para almacenar los roles
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/usuario/rol');
        setRoles(response.data);
      } catch (error) {
        console.error("Error  roles:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar los roles!",
        });
      }
    };

    fetchRoles(); // Llamar a la función para obtener los roles
  }, []);

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:3001/usuario/usuario', values);
      if (resp.status === 200) {
        Swal.fire("Se registró con éxito!");
        navigate('/Usuario');
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
        text: err.response?.data?.message || "Ocurrió un error al registrar el usuario!",
      });
    }
  };

  return (
    <div>
      <Menu />
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3 bg-white rounded col-12 col-md-6 col-xl-4">
          <h3 className="text-center">Nuevo Usuario</h3>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
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
              <label htmlFor="email" className="form-label">Email del Usuario</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="ejemplo@correo.com"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pass" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="pass"
                id="pass"
                placeholder="Contraseña"
                onChange={handleChanges}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rol" className="form-label">Rol del Usuario</label>
              <select
                className="form-select"
                name="rol"
                id="rol"
                value={values.rol}
                onChange={handleChanges}
                required
              >
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.nombre}>{rol.nombre}</option>
                ))}
              </select>
            </div>

            <div className='row'>
              <div className='col-12 col-md-6 col-xl-6'>
                <button type="submit" className='btn btn-primary'>
                  <i className='bi bi-floppy-fill'></i> Crear
                </button>
              </div>
              <div className='col-12 col-md-6 col-xl-6 my-2'>
                <Link to='/Usuario' className='btn btn-danger'>
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

export default Nusuario;