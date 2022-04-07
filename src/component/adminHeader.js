import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { adminLogout, isAdminLogin } from '../middleware/adminAuth';

const AdminHeader = props => {

    const handleLogout = () => {
        adminLogout();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className="ml-auto" href="/admin">Padel play: panel administración</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                    <Nav className=''>              
                        <Nav.Link href="/admin/pendingUsers">Solicitudes de registro</Nav.Link>
                        <Nav.Link href="/admin/users">Usuarios</Nav.Link>
                        <Nav.Link href="/admin/bookings">Reservas</Nav.Link>
                        {isAdminLogin() && (
                            <Nav.Link href="/admin/login" onClick={handleLogout}>Logout</Nav.Link>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;