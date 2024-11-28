import React, { useState } from 'react';
import Menu from '../componentes/Menu';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Codigo() {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResult('');
        setError('');

        try {
            const response = await fetch('http://localhost:3001/codigo', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const data = await response.json();
            if (response.ok) {
                setResult(`Resultado: ${data.result}`);
            } else {
                setError(`Error: ${data.error}`);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <Menu />
            <Container className='py-5'>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="text-center">Evaluador de Código JavaScript</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="codeInput">
                                <Form.Label>Escribe tu código JavaScript aquí:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={10}
                                    value={code}
                                    onChange={handleInputChange}
                                    placeholder="Ejemplo: 1+1"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Evaluar
                            </Button>
                        </Form>
                        {result && (
                            <Alert variant="success" className="mt-3">
                                {result}
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Codigo;