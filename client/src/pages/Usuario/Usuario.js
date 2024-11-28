import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import UsuarioLista from './UsuarioLista';
import UsuarioModal from './UsuarioModal';

function Usuario() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [values, setValues] = useState({
        nombre: '',
        email: '',
        pass: '',
        rol: ''
    });

    // Carga lista de usuarios al entrar
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3001/usuario/usuario');
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

    // Muestra esto si no hay respuesta del servidor
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
            email: info.email,
            pass: info.pass,
            rol: info.rol
        };
        setValues(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/usuario/usuario/${usuarioEditando.id}`, values);
            Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
            const respuesta = await axios.get('http://localhost:3001/usuario/usuario');
            setDatos(respuesta.data);
            setUsuarioEditando(null);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
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
                await axios.delete(`http://localhost:3001/usuario/usuario/${id}`);
                Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
                const respuesta = await axios.get('http://localhost:3001/usuario/usuario');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            }
        }
    };

    return (
        <div>
            <Menu />
            <div className='container py-5'>
                <Link className='btn btn-primary my-2' to="/nusuario">Crear Usuario</Link>
                <UsuarioLista
                    datos={datos}
                    manejarEdicion={manejarEdicion}
                    manejarEliminacion={manejarEliminacion}
                />
            </div>
            {usuarioEditando && (
                <UsuarioModal
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

export default Usuario;