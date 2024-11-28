import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import Swal from 'sweetalert2';
import axios from 'axios';
import ProyectoListaSeguimiento from './ProyectoListaSeguimiento';

function ProyectoSeguimiento() {
  const location = useLocation();
  const { seguimiento } = location.state || { seguimiento: null };
  const [cargando, setCargando] = useState(true);
  const [pruebas, setPruebas] = useState([]);
  const [proyectoNombre, setProyectoNombre] = useState(''); // Estado para el nombre del proyecto

  useEffect(() => {
    const cargarPruebas = async () => {
      try {
        const resp = await axios.get(`http://localhost:3001/asignacion/asignacionXP/${seguimiento}`);
        setPruebas(resp.data);
        const datoProyect = await axios.get(`http://localhost:3001/proyecto/proyectoX/${seguimiento}`);
        if (datoProyect.data.length > 0) {
          setProyectoNombre(datoProyect.data[0].nombre);
        }

      } catch (error) {
        console.error('Error al cargar pruebas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar las pruebas.',
        });
      } finally {
        setCargando(false);
      }
    };

    cargarPruebas();
  }, [seguimiento]);

  if (cargando) {
    return <Loading />;
  }

  return (
    <div>
      <Menu />
      <div className='container py-5'>
        <div className='col-12 col-md-6 col-xl-6 my-2'>
          <Link to='/proyecto' className='btn btn-danger'>
            <i className="bi bi-arrow-left"></i> Regresar
          </Link>
        </div>
        <h3 className="text-center">Seguimiento del proyecto {proyectoNombre}</h3>
        <ProyectoListaSeguimiento
          datos={pruebas}
        />
      </div>
    </div>
  );
}

export default ProyectoSeguimiento;