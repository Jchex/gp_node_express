import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import PruebaLista from './PruebaLista';
import PruebaModal from './PruebaModal';

function Prueba() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [pruebaEditando, setpruebaEditando] = useState(null);
    const [values, setValues] = useState({
        prueba: '',
        escenario: '',
        descripcion: '',
        resultado_esperado: '',
        prioridad: ''
    });

    // Carga lista de pruebas al entrar
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3001/prueba/prueba');
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
        setpruebaEditando(info);
        const data = {
            prueba: info.prueba,
            escenario: info.escenario,
            descripcion: info.descripcion,
            resultado_esperado: info.resultado_esperado,
            prioridad: info.prioridad
        };
        setValues(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/prueba/prueba/${pruebaEditando.id}`, values);
            Swal.fire('Éxito', 'Prueba actualizada correctamente', 'success');
            const respuesta = await axios.get('http://localhost:3001/prueba/prueba');
            setDatos(respuesta.data);
            setpruebaEditando(null);
        } catch (error) {
            console.error('Error al actualizar la prueba:', error);
            Swal.fire('Error', 'No se pudo actualizar la prueba', 'error');
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
                await axios.delete(`http://localhost:3001/prueba/prueba/${id}`);
                Swal.fire('Eliminado!', 'La prueba ha sido eliminada.', 'success');
                const respuesta = await axios.get('http://localhost:3001/prueba/prueba');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al eliminar la prueba:', error);
                Swal.fire('Error', 'No se pudo eliminar la prueba', 'error');
            }
        }
    };

    return (
        <div>
            <Menu />
            <div className='container py-5'>
                <Link className='btn btn-primary my-2' to="/nprueba">Crear Pruebas</Link>
                <PruebaLista
                    datos={datos}
                    manejarEdicion={manejarEdicion}
                    manejarEliminacion={manejarEliminacion}
                />
            </div>
            {pruebaEditando && (
                <PruebaModal
                    pruebaEditando={pruebaEditando}
                    values={values}
                    handleChanges={handleChanges}
                    handleSubmit={handleSubmit}
                    closeModal={() => setpruebaEditando(null)}
                />
            )}
        </div>
    );
}

export default Prueba;