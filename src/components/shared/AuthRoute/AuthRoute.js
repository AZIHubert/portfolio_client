import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import isAuthenticated from '#shared/isAuthenticated';

const AuthRoute = ({ component: Component, rest}) => (
    <Route {...rest} render={props => (!isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/backend' }} />
    ))} />
);

export default AuthRoute;