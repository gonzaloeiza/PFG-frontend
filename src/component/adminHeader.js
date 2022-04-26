import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { adminLogout, isAdminLogin } from '../middleware/adminAuth';

const AdminHeader = props => {

    const handleLogout = () => {
        adminLogout();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className="ml-auto" href="/admin">Padel play: Panel de administración</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                    {isAdminLogin() && (
                        <>
                            <Nav className=''>              
                                <Nav.Link href="/admin/users">Usuarios</Nav.Link>
                                <Nav.Link href="/admin/courts">Pistas</Nav.Link>                             
                                <Nav.Link href="/admin/bookings">Reservas</Nav.Link>
                                <Nav.Link href="/admin/rankings">Rankings</Nav.Link>
                                </Nav>
                            <Nav>
                            <NavDropdown title="Admin" align="end">
                                <NavDropdown.Item href="/admin/pendingUsers">Solicitudes de registro</NavDropdown.Item>                                
                                <NavDropdown.Item href="/admin/contactMessages">Formularios de contacto</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/settings">Ajustes</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/admin/">Panel administración</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} href="/admin/login">Cerrar sesión</NavDropdown.Item>
                            </ NavDropdown>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;