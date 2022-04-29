import React from 'react'
import AdminHeader from './adminHeader'

const AdminLayout = (props) => (
    <main className={`${props.className !== undefined ? props.className : ''}`}>
        {props.isHeader && <AdminHeader/>}
        {props.children}
    </main>
)

export default AdminLayout;