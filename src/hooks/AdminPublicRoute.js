import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLogin } from '../middleware/adminAuth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (isAdminLogin() && restricted ? <Redirect to="/admin" /> : <Component {...props} />)} />
)

export default PublicRoute;