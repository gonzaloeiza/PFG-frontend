import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { logout, isLogin } from '../middleware/auth';
import { getUsername } from "../services/user.service"

const Header = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setIsLoggedIn(isLogin());
        setUsername(getUsername());
    }, [props]);


    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUsername(null);
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className="ml-auto" href="/">Padel play</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                    <Nav className='mx-auto'>
                        <Nav.Link href="/novedades">Novedades</Nav.Link>                        
                        <Nav.Link href="/bookings">Reservas</Nav.Link>
                        <Nav.Link href="/rankings">Rankings</Nav.Link>
                    </Nav>
                    <Nav>
                        {!isLoggedIn ? (
                            <>
                            <Nav.Link href="/login">Acceso a usuarios</Nav.Link>
                            <Nav.Link href="/signup">Registrarse</Nav.Link>
                            </>
                        ) : (
                            <>
                                <NavDropdown title={username} align="end">
                                <NavDropdown.Item href="#action/3.2">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Mis reservas</NavDropdown.Item>
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