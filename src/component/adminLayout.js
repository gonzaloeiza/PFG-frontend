import React from 'react'
import AdminHeader from './adminHeader'
import { Container } from 'react-bootstrap'

const AdminLayout = (props) => (
    <main className={`${props.className !== undefined ? props.className : ''}`}>
        {props.isHeader && <AdminHeader/>}
        <Container fluid>
            {props.children}
        </Container>
    </main>
)

export default AdminLayout;