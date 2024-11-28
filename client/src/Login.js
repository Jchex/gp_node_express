import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir a alguna página
import Swal from 'sweetalert2'; // Para las alertas 
import axios from 'axios'; // Para los post y get a la base de datos
import logo from './pages/assets/logo.png'; // URL del logo
import { Container, Card, Form, Button } from 'react-bootstrap'; // Importar componentes de bootstrap

function Login() {
    // Inicialización de variables
    const [values, setValues] = useState({
        email: '',
        pass: ''
    });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Envío de datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post('http://localhost:3001/auth/login', values);
            if (resp.status === 200) {
                localStorage.setItem('token', resp.data.token); // Creación de token inicio de sesión
                Swal.fire("Bienvenido");
                navigate('/home');
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o Contraseña incorrecta!",
            });
        }
    };

    return (
        <div className="App" style={{ backgroundColor: '#295f94'}}>
            <Container className="d-flex vh-100 justify-content-center align-items-center">
                <Card className="p-4 col-12 col-md-6 col-xl-4 border-0 shadow" style={{ backgroundColor: '#79b1f2'}}>
                    <div className="text-center mb-3">
                        <h2 className="text-center mb-3">
                        Gestión de pruebas
                        </h2>
                        <img src={logo} alt="Logo" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                    </div>
                    <h2 className="text-center mb-3">Inicio de sesión</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="form-floating mb-3" controlId="email">
                            <Form.Control size="lg"
                                type="email"
                                name="email"
                                placeholder="correo@gmail.com"
                                onChange={handleChanges}
                                required
                            />
                            <Form.Label>correo@mail.com</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-3" controlId="pass">
                            <Form.Control size="lg"
                                type="password"
                                name="pass"
                                placeholder="********"
                                onChange={handleChanges}
                                required
                            />
                            <Form.Label>Contraseña</Form.Label>
                        </Form.Group>

                        <Button type="submit" className="btn btn-primary w-100 btn-lg">
                            Ingresar
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}

export default Login;