import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLogin } from '../middleware/adminAuth';

const AdminRoute = ({ component: Component, ...rest }) => (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (isAdminLogin() ? <Component {...props} /> : <Redirect to="/admin/login" />)} />
)
export default AdminRoute;