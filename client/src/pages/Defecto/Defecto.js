import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import DefectoLista from './DefectoLista';
import DefectoModal from './DefectoModal';

function Defecto() {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [defectoEditando, setDefectoEditando] = useState(null);
    const [values, setValues] = useState({
        defecto: '',
        descripcion: ''
    });

    // Carga lista de defectos al entrar
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3001/defecto/defecto');
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
        setDefectoEditando(info);
        const data = {
            defecto: info.defecto,
            descripcion: info.descripcion
        };
        setValues(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/defecto/defecto/${defectoEditando.id}`, values);
            Swal.fire('Éxito', 'Defecto actualizado correctamente', 'success');
            const respuesta = await axios.get('http://localhost:3001/defecto/defecto');
            setDatos(respuesta.data);
            setDefectoEditando(null);
        } catch (error) {
            console.error('Error al actualizar el defecto:', error);
            Swal.fire('Error', 'No se pudo actualizar el defecto', 'error');
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
                await axios.delete(`http://localhost:3001/defecto/defecto/${id}`);
                Swal.fire('Eliminado!', 'El defecto ha sido eliminado.', 'success');
                const respuesta = await axios.get('http://localhost:3001/defecto/defecto');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al eliminar el defecto:', error);
                Swal.fire('Error', 'No se pudo eliminar el defecto', 'error');
            }
        }
    };

    return (
        <div>
            <Menu />
            <div className='container py-5'>
                <Link className='btn btn-primary my-2' to="/ndefecto">Crear Defecto</Link>
                <DefectoLista
                    datos={datos}
                    manejarEdicion={manejarEdicion}
                    manejarEliminacion={manejarEliminacion}
                />
            </div>
            {defectoEditando && (
                <DefectoModal
                    defectoEditando={defectoEditando}
                    values={values}
                    handleChanges={handleChanges}
                    handleSubmit={handleSubmit}
                    closeModal={() => setDefectoEditando(null)}
                />
            )}
        </div>
    );
}

export default Defecto;