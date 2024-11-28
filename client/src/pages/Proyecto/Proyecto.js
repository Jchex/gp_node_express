import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import ProyectoLista from './ProyectoLista';
import ProyectoModal from './ProyectoModal';

function Proyecto() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const navigate = useNavigate();
    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        fechai: '',
        fechaf: ''
    });


    // Carga lista de proyectos al entrar
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3001/proyecto/proyectoA');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo cargar los datos!",
                });
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);
    //muestra esto si no hay respuesta del servidor
    if (cargando) {
        return <Loading />;
    }

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const manejarEdicion = (info) => {
        setUsuarioEditando(info);
        const data = {
            nombre: info.nombre,
            descripcion: info.descripcion,
            fechai: info.fecha_inicio.split('T')[0],
            fechaf: info.fecha_fin.split('T')[0]
        };
        setValues(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/proyecto/proyecto/${usuarioEditando.id}`, values);
            if (response.status === 200) {
                Swal.fire('Éxito', 'Proyecto actualizado correctamente', 'success');
                const respuesta = await axios.get('http://localhost:3001/proyecto/proyectoA');
                setDatos(respuesta.data);
                setUsuarioEditando(null);
            }
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            if (error.response && error.response.status === 404) {
                Swal.fire('Error', error.response.data.message, 'error');
            } else {
                Swal.fire('Error', 'No se pudo actualizar el proyecto', 'error');
            }
        }
    };

    const manejarEliminacion = async (id) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        });

        if (confirmacion.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/proyecto/proyecto/${id}`);
                Swal.fire('Eliminado!', 'El proyecto ha sido eliminado.', 'success');
                const respuesta = await axios.get('http://localhost:3001/proyecto/proyecto');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al eliminar el proyecto:', error);
                Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
            }
        }
    };


    const Seguimiento = async (id) => {
        navigate('/sproyecto', {
            state: { seguimiento: id }
        });
    };

    const Asignacion = async (id) => {
        navigate('/aproyecto', {
            state: { asignacion: id }
        });
    };

    return (
        <div>
            <Menu />
            <div className='container py-5'>
                <Link className='btn btn-primary my-2' to="/nproyecto">Crear Proyecto</Link>
                <ProyectoLista
                    datos={datos}
                    manejarEdicion={manejarEdicion}
                    manejarEliminacion={manejarEliminacion}
                    Seguimiento={Seguimiento}
                    Asignacion={Asignacion}
                />
            </div>
            {usuarioEditando && (
                <ProyectoModal
                    usuarioEditando={usuarioEditando}
                    values={values}
                    handleChanges={handleChanges}
                    handleSubmit={handleSubmit}
                    closeModal={() => setUsuarioEditando(null)}
                />
            )}
        </div>
    );
}

export default Proyecto;