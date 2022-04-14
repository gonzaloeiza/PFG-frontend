import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from '../middleware/auth';

const Header = props => {

    const handleLogout = () => {
        logout();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className="ml-auto" href="/">Padel play</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                {(props.username === null || props.username === undefined) || (  
                    <Nav className=''>
                        <Nav.Link href="/">Página de inicio</Nav.Link>                        
                        <Nav.Link href="/courts">Pistas</Nav.Link>
                        <Nav.Link href="/booking">Reservas</Nav.Link>
                        <Nav.Link href="/ranking">Rankings</Nav.Link>
                    </Nav>
                )}
                    <Nav>
                        {props.username === null || props.username === undefined ? (
                            <>
                                <Nav.Link href="/login">Acceso a usuarios</Nav.Link>
                                <Nav.Link href="/signup">Registrarse</Nav.Link>
                                <NavDropdown title="Otros" align="end">
                                    <NavDropdown.Item href="/">Página de inicio</NavDropdown.Item>
                                    <NavDropdown.Item href="/courts">Pistas</NavDropdown.Item>
                                </ NavDropdown>
                            </>
                        ) : (
                            <>
                                <NavDropdown title={props.username} align="end">
                                    <NavDropdown.Item href="#action/3.2">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/mybookings">Mis reservas</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Ajustes</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout} href="/">Cerrar sesión</NavDropdown.Item>
                                </ NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header