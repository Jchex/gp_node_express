import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../componentes/Cargando';
import Select from 'react-select';

function NAsignacion() {
  const location = useLocation();
  
  const { asignacion } = location.state || { asignacion: null };
  const [cargando, setCargando] = useState(true);

  const [values, setValues] = useState({
    proyecto: asignacion,
    usuario_id: '',
    prueba: '',
    fecha_asignacion: new Date().toISOString().split('T')[0],
    fecha_finalizacion: new Date().toISOString().split('T')[0],
    estado: 'Sin Realizar',
  });

  

  const [proyectos, setProyectos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pruebas, setPruebas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const resp = await axios.get('http://localhost:3001/proyecto/proyectoA');
        setProyectos(resp.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setCargando(false);
      }
    };

    const cargarUsuarios = async () => {
      try {
        const resp = await axios.get('http://localhost:3001/usuario/usuario');
        setUsuarios(resp.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setCargando(false);
      }
    };

    const cargarPruebas = async () => {
      try {
        const resp = await axios.get('http://localhost:3001/prueba/prueba');
        setPruebas(resp.data);
      } catch (error) {
        console.error('Error al cargar pruebas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarProyectos();
    cargarUsuarios();
    cargarPruebas();
  }, []);

  if (cargando) {
    return <Loading />;
  }

  const handleChanges = (selectedOption, name) => {
    setValues({ ...values, [name]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('\t\t values', values);
    
    try {
      const resp = await axios.post('http://localhost:3001/asignacion/asignacion', values);
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
        text: "Ocurrió un error al registrar la asignación!",
      });
    }
  };

  // Formatear opciones para react-select
  const usuarioOptions = usuarios.map(usuario => ({
    value: usuario.id,
    label: usuario.nombre,
  }));

  const pruebaOptions = pruebas.map(prueba => ({
    value: prueba.id,
    label: `${prueba.prueba} - ${prueba.escenario} - ${prueba.prioridad}`,
  }));

  return (
    <div>
      <Menu />
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3 bg-white rounded col-12 col-md-6 col-xl-4">
          <h3 className="text-center">Nueva Asignación</h3>
          <form onSubmit={handleSubmit} className="form-control">
            <div className="mb-3">
              <label htmlFor="proyecto" className="form-label">Proyecto</label>
              <select
                className="form-select"
                name="proyecto"
                id="proyecto"
                onChange={handleChanges}
                value={values.proyecto}
                required
              >
                <option value="">Seleccione un proyecto</option>
                {proyectos
                  .filter(proyecto => proyecto.id === asignacion) // Filtrar proyectos
                  .map((proyecto) => (
                    <option key={proyecto.id} value={proyecto.id}>
                      {proyecto.nombre}
                    </option>
                  ))}
              </select>
            </div>


            <div className="mb-3">
              <label htmlFor="usuario_id" className="form-label">Usuario</label>
              <Select
                name="usuario_id"
                options={usuarioOptions}
                onChange={(selectedOption) => handleChanges(selectedOption, 'usuario_id')}
                placeholder="Seleccione un usuario"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="prueba" className="form-label">Prueba</label>
              <Select
                name="prueba"
                options={pruebaOptions}
                onChange={(selectedOption) => handleChanges(selectedOption, 'prueba')}
                placeholder="Seleccione una prueba"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha_asignacion" className="form-label">Fecha de Asignación</label>
              <input
                type="date"
                className="form-control"
                name="fecha_asignacion"
                id="fecha_asignacion"
                value={values.fecha_asignacion}
                onChange={(selectedOption) => handleChanges(selectedOption, 'fecha_asignacion')}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha_finalizacion" className="form-label">Fecha de Finalización</label>
              <input
                type="date"
                className="form-control"
                name="fecha_finalizacion"
                id="fecha_finalizacion"
                min={values.fecha_asignacion}
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
                <Link to='/proyecto' className='btn btn-danger'>
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

export default NAsignacion;