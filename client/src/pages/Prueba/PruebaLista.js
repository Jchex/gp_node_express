import React, { useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';

const PruebaLista = ({ datos, manejarEdicion, manejarEliminacion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Cantidad para paginar

    // Filtrar los datos según el término de búsqueda
    const filteredData = datos.filter(prueba =>
        (prueba.prueba && prueba.prueba.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prueba.descripcion && prueba.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        <th>Prueba</th>
                        <th>Escenario</th>
                        <th>Descripción</th>
                        <th>Resultado Esperado</th>
                        <th>Prioridad</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((prueba) => (
                            <tr key={prueba.id}>
                                <td>{prueba.id}</td>
                                <td>{prueba.prueba}</td>
                                <td>{prueba.escenario}</td>
                                <td>{prueba.descripcion}</td>
                                <td>{prueba.resultado_esperado}</td>
                                <td>{prueba.prioridad}</td>

                                <td>
                                    <button onClick={() => manejarEdicion(prueba)} className='btn btn-primary text-light'>
                                        <i className='bi bi-pencil-square'></i> Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manejarEliminacion(prueba.id)} className='btn btn-danger'>
                                        <i className='bi bi-trash'></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No se encontraron pruebas.</td>
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

export default PruebaLista;