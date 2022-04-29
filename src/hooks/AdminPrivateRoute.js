import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLogin } from '../middlewares/adminAuth';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (isAdminLogin() ? <Component {...props} /> : <Redirect to="/admin/login" />)} />
)
export default AdminRoute;