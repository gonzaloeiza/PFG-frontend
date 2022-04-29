import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = (props) => (
    <main className={`${props.className !== undefined ? props.className : ''}`}>
        {props.isHeader && <Header username={props.username}/>}
        {props.children}
        <Footer />
    </main>
)

export default Layout