import React, { useState } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';

const UsuarioLista = ({ datos, manejarEdicion, manejarEliminacion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Cantidad para paginar

    // Filtrar los datos según el término de búsqueda
    const filteredData = datos.filter(usuario =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                        placeholder="Buscar por nombre o email"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.rol}</td>
                                <td>
                                    <button onClick={() => manejarEdicion(usuario)} className='btn btn-primary text-light'>
                                        <i className='bi bi-pencil-square'></i> Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => manejarEliminacion(usuario.id)} className='btn btn-danger'>
                                        <i className='bi bi-trash'></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No se encontraron usuarios.</td>
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

export default UsuarioLista;