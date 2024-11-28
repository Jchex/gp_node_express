import React, { useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';

const AsignacionLista = ({ datos, manejarEdicion, manejarEliminacion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Cantidad para paginar

    // Filtrar los datos según el término de búsqueda
    const filteredData = datos.filter(asignacion =>
        asignacion.proyecto_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asignacion.usuario_nombre.toString().includes(searchTerm) || // Convertir a string para búsqueda
        asignacion.prueba_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asignacion.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular los índices de los elementos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Elementos actuales a mostrar

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Manejar el cambio de página
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { // Cambia 'es-ES' por el locale que necesites
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <>
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <Form.Label>Búsqueda</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por proyecto, usuario, prueba o estado"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Proyecto</th>
                        <th>Prioridad</th>
                        <th>Prueba</th>
                        <th>Estado</th>
                        <th>Finalización</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((asignacion) => (
                            <tr key={asignacion.id}>
                                <td>{asignacion.id}</td>
                                <td>{asignacion.proyecto_nombre}</td>
                                <td>{asignacion.prueba_prioridad}</td>
                                <td>{asignacion.prueba_nombre}</td>
                                <td>{asignacion.estado}</td>
                                <td>{formatDate(asignacion.fecha_finalizacion)}</td>
                                <td>
                                    {asignacion.estado.toLowerCase() !== 'prueba realizada' && (
                                        <button onClick={() => manejarEdicion(asignacion)} className='btn btn-success text-light'>
                                            <i className='bi bi-clipboard-check'></i> Realizar Prueba
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {asignacion.estado.toLowerCase() === 'sin realizar' && (
                                        <button onClick={() => manejarEliminacion(asignacion.id)} className='btn btn-danger'>
                                            <i className='bi bi-trash'></i> Eliminar
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No se encontraron asignaciones.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePagination(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default AsignacionLista;