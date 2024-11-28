import React, { useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';

const DefectoLista = ({ datos, manejarEdicion, manejarEliminacion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Cantidad para paginar

    // Filtrar los datos según el término de búsqueda
    const filteredData = datos.filter(defecto =>
        defecto.defecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        defecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
                        placeholder="Buscar por defecto o descripción"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Defecto</th>
                        <th>Descripción</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((defecto) => (
                            <tr key={defecto.id}>
                                <td>{defecto.id}</td>
                                <td>{defecto.defecto}</td>
                                <td>{defecto.descripcion}</td>
                                <td>
                                    <button onClick={() => manejarEdicion(defecto)} className='btn btn-primary text-light'>
                                        <i className='bi bi-pencil-square'></i> Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manejarEliminacion(defecto.id)} className='btn btn-danger'>
                                        <i className='bi bi-trash'></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No se encontraron defectos.</td>
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

export default DefectoLista;