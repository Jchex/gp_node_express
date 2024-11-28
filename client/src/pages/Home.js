import React, { useEffect, useState } from 'react';
import Menu from './componentes/Menu';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';// componente de boostrap
import axios from 'axios';
import Loading from './componentes/Cargando';// componente de espera
import { Calendar, momentLocalizer } from 'react-big-calendar';//componente calendario
import moment from 'moment-timezone';// para calendario
import 'moment/locale/es'; // localización en español meses
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import css de calendar
import Event from './componentes/Event'; // Importa el componente de evento

function Home() {
  moment.locale('es'); // Establece el idioma a español
  const localizer = momentLocalizer(moment);

  const [proyectos, setProyectos] = useState([]);
  const [pruebas, setPruebas] = useState([]);
  const [userCounts, setUserCounts] = useState({
    Desarrollador: 0,
    Tester: 0
  });
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]); // datos del calendario

  const [codigo, setcodigo] = useState([]);

  useEffect(() => {
    const dashdatos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dashboard/dashproyecto');
        setProyectos(response.data);
        const response1 = await axios.get('http://localhost:3001/dashboard/codigo');
        setcodigo(response1.data);
        const responses = await axios.get('http://localhost:3001/dashboard/dashpruebas');
        setPruebas(responses.data);
        const roles = ['Desarrollador', 'Tester'];
        const counts = {};
        for (const rol of roles) {
          const resp = await axios.get(`http://localhost:3001/dashboard/usuarioXR/${rol}`);
          counts[rol] = resp.data.count;
        }
        setUserCounts(counts);
        console.log(setUserCounts)
        //Fetchcalendar events (this is an example, adjust according to your API)
        const eventsResponse = await axios.get('http://localhost:3001/dashboard/calendarproyecto');
        setEvents(eventsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    dashdatos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Menu />
      <Container >
        <Row className="mt-2" >
        <Col md={6} lg={3} className="mb-4" >
          <Card className="h-100 shadow-lg rounded" style={{ border: 'none', backgroundColor: '#96b6d6'}}>
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <Card.Title className="d-flex align-items-center mb-3">
                <i className="fas fa-folder-open fa-2x mr-2" style={{ color: '#007bff' }}></i>
                <span>Total de Proyectos Activos</span>
              </Card.Title>
              <Card.Text className="display-4 font-weight-bold text-primary mb-4">
                {proyectos.length}
              </Card.Text>
              <Link to="/Proyecto" className="btn btn-primary btn-lg">
                Ver Proyectos
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-lg rounded" style={{ border: 'none', backgroundColor: '#96b6d6' }}>
                <Card.Body className="d-flex flex-column align-items-center text-center">
                    <Card.Title className="d-flex align-items-center mb-3">
                        <i className="fas fa-folder-open fa-2x mr-2" style={{ color: '#007bff' }}></i>
                        <span>Pruebas realizadas</span>
                    </Card.Title>
                    <ul className="list-unstyled">
                        {codigo.map((item) => (
                            <li key={item.id} className="mb-2">
                                <strong>Prueba {item.id}:</strong> {item.resultado}
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-lg rounded" style={{ border: 'none', backgroundColor: '#96b6d6' }}>
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <Card.Title className="d-flex align-items-center mb-3">
                <i className="fas fa-users fa-2x mr-2" style={{ color: '#007bff' }}></i>
                <span>Conteo de Usuarios</span>
              </Card.Title>
              <Card.Text className="mb-4" style={{ fontSize: '1.2rem' }}>
              <br /> <strong>Desarrolladores:</strong> <span Text="backgroundColor">{userCounts.Desarrollador}</span> <br />
                <strong>Testers:</strong> <span Text="backgroundColor">{userCounts.Tester}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-lg rounded" style={{ border: 'none', backgroundColor: '#96b6d6' }}>
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <Card.Title className="mb-3">
                <i className="fas fa-exclamation-circle fa-2x" style={{ color: '#dc3545' }}></i>
                <span className="ml-2">Total de Pruebas Pendientes</span>
              </Card.Title>
              <Card.Text className="display-4 font-weight-bold text-danger">
                {pruebas.length}
              </Card.Text>
              <Link to="/Asignacion" className="btn btn-primary btn-lg mt-3">
                Ver Pruebas
              </Link>
            </Card.Body>
          </Card>
        </Col>
        </Row>
        <div className="mt-2" style={{ height: '100vh', padding: '0px', backgroundColor: '#f8f9fa' }}>
          <h3 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Calendario de Actividades</h3>
          <div className="d-flex justify-content-center">
            <div className="calendar-container" style={{ border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "0px", padding: '20px', borderRadius: '8px' }}
                components={{
                  event: Event // Usa el componente personalizado aquí
                }}
                messages={{
                  allDay: 'Todo el día',
                  previous: 'Anterior',
                  next: 'Siguiente',
                  today: 'Hoy',
                  month: 'Mes',
                  week: 'Semana',
                  day: 'Día',
                  agenda: 'Agenda',
                  noEventsInRange: 'No hay eventos',
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;