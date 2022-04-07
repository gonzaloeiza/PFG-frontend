import React from 'react'
import Header from './header'
import { Container } from 'react-bootstrap'

const Layout = (props) => (
    <main className={`${props.className !== undefined ? props.className : ''}`}>
        {props.isHeader && <Header username={props.username}/>}
        <Container fluid>
            {props.children}
        </Container>

    </main>
)

export default Layout