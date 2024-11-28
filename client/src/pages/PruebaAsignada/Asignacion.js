import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Menu from '../componentes/Menu';
import Loading from '../componentes/Cargando';
import AsignacionLista from './AsignacionLista';
import AsignacionModal from './AsignacionModal';

function Asignacion() {
    const [datos, setDatos] = useState([]);
    const [defectos, setDefectos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [asignacionEditando, setAsignacionEditando] = useState(null);
    const [values, setValues] = useState({
        proyecto: '',
        usuario_id: '',
        prueba: '',
        fecha_asignacion: '',
        fecha_finalizacion: '',
        estado: '',
        fecha_ejecucion: '',
        resultado: '',
        criterio: '',

    });

    // Carga lista de asignaciones al entrar
    useEffect(() => {
        const cargarDefectos = async () => {
            try {
                const resp = await axios.get('http://localhost:3001/defecto/defecto');
                setDefectos(resp.data);
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

        const cargarDatos = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3001/asignacion/asignacion');
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
        cargarDefectos();
    }, []);

    // Muestra esto si no hay respuesta del servidor
    if (cargando) {
        return <Loading />;
    }

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const manejarEdicion = (info) => {
        setAsignacionEditando(info);
        const data = {
            proyecto: info.proyecto_nombre,
            usuario_id: info.usuario_nombre,
            prueba: info.prueba_nombre,
            fecha_asignacion: info.fecha_asignacion.split('T')[0],
            fecha_finalizacion: info.fecha_finalizacion.split('T')[0],
            estado: info.estado,
            fecha_ejecucion: info.fecha_ejecucion,
            resultado: info.resultado,
            criterio: info.criterio,
        };
        setValues(data);
    };

    const handleDefectosChange = (selectedOptions) => {
        setValues({ ...values, defectos: selectedOptions }); // Actualizar el estado de defectos
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/asignacion/asignacion/${asignacionEditando.id}`, {
                ...values,
                defectos: values.defectos.map(defecto => defecto.value) // Extraer solo los valores de los defectos seleccionados
            });
            Swal.fire('Éxito', 'Prueba realizada correctamente', 'success');
            const respuesta = await axios.get('http://localhost:3001/asignacion/asignacion');
            setDatos(respuesta.data);
            setAsignacionEditando(null);
            setValues({
                proyecto: '',
                usuario_id: '',
                prueba: '',
                fecha_asignacion: '',
                fecha_finalizacion: '',
                estado: '',
                fecha_ejecucion: '',
                resultado: '',
                criterio: '',
                defectos: [] // Reiniciar el estado de defectos
            });
        } catch (error) {
            console.error('Error al realizar la prueba:', error);
            Swal.fire('Error', 'No se pudo realizar la prueba', 'error');
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
                await axios.delete(`http://localhost:3001/asignacion/asignacion/${id}`);
                Swal.fire('Eliminado!', 'La asignación ha sido eliminada.', 'success');
                const respuesta = await axios.get('http://localhost:3001/asignacion/asignacion');
                setDatos(respuesta.data);
            } catch (error) {
                console.error('Error al eliminar la asignación:', error);
                Swal.fire('Error', 'No se pudo eliminar la asignación', 'error');
            }
        }
    };

    // Formatear opciones para react-select
    const defectoOptions = defectos.map(defecto => ({
        value: defecto.id,
        label: defecto.defecto,
    }));

    return (
        <div>
            <Menu />
            <div className='container py-5'>
                <AsignacionLista
                    datos={datos}
                    manejarEdicion={manejarEdicion}
                    manejarEliminacion={manejarEliminacion}
                />
            </div>
            {asignacionEditando && (
                <AsignacionModal
                    values={values}
                    handleChanges={handleChanges}
                    handleSubmit={handleSubmit}
                    closeModal={() => setAsignacionEditando(null)}
                    defectos={defectoOptions} // Pasar las opciones de defectos
                    handleDefectosChange={handleDefectosChange}
                />
            )}
        </div>
    );
}

export default Asignacion;