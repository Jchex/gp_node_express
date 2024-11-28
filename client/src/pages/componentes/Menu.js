import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Menu() {
    const navigate = useNavigate();
    // Función para obtener el correo del token
    const getFromToken = () => {
        const token = localStorage.getItem('token'); // Obtiene el token de localStorage
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decodifica el token
                return decoded.user; // Devuelve el usuario
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                return null;
            }
        }
        return null;
    };

    const userData = getFromToken(); // Llama a la función para obtener los datos

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        navigate('/'); //Redirige al login
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/Home">Gestor Proyectos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Usuario">Usuarios</Nav.Link>
                        <Nav.Link href="/Proyecto">Proyectos</Nav.Link>
                        <Nav.Link href="/Prueba">Pruebas</Nav.Link>
                        <Nav.Link href="/Defecto">Defectos</Nav.Link>
                        <Nav.Link href="/Asignacion">Pruebas Asignadas</Nav.Link>
                        <Nav.Link href="/codigo">Ejecutar prueba</Nav.Link>
                        <NavDropdown title={userData || "Usuario"} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/npass">
                                Cambiar Contraseña
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Cerrar Sesion
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;