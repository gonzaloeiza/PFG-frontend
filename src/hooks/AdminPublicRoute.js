import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLogin } from '../middlewares/adminAuth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    <Route {...rest} render={props => (isAdminLogin() && restricted ? <Redirect to="/admin" /> : <Component {...props} />)} />
)

export default PublicRoute;