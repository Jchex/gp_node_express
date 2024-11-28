import React, { useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';

const ProyectoLista = ({ datos, manejarEdicion, manejarEliminacion, Seguimiento, Asignacion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Cantidad para paginar

    // Filtrar los datos según el término de búsqueda
    const filteredData = datos.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proyecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <>
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <Form.Label>Búsqueda</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nombre o descripción"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre de Proyecto</th>
                        <th>Descripción</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th colSpan={4}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((proyecto) => (
                            <tr key={proyecto.id}>
                                <td>{proyecto.id}</td>
                                <td>{proyecto.nombre}</td>
                                <td>{proyecto.descripcion}</td>
                                <td>{new Date(proyecto.fecha_inicio).toLocaleDateString()}</td>
                                <td>{new Date(proyecto.fecha_fin).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => manejarEdicion(proyecto)} className='btn btn-primary text-light'>
                                        <i className='bi bi-pencil-square'></i> Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manejarEliminacion(proyecto.id)} className='btn btn-danger'>
                                        <i className='bi bi-trash'></i> Eliminar
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => Asignacion(proyecto.id)}>
                                        <i className="bi bi-journal-code"></i> Asignar Pruebas
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-success' onClick={() => Seguimiento(proyecto.id)}>
                                        <i className="bi bi-journal-code"></i> Seguimiento Proyecto
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No se encontraron proyectos.</td>
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

export default ProyectoLista;