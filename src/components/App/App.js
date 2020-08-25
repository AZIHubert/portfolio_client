import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import AuthRoute from '#shared/AuthRoute';
import PrivateRoute from '#shared/PrivateRoute';

import Backend from './Backend';
import Error from './Error';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import theme from './theme';
import WorkDetail from './WorkDetail';

// import BackPage from './backend/BackPage';
// import ErrorPage from './errorPage/ErrorPage';

const App = () => <MuiThemeProvider theme={theme()}>
    <CssBaseline />
    <Router>
        <Switch>
            <Route exact component={Home} path='/' />
            <Route component={WorkDetail} path='/works/:workId' />
            <AuthRoute exact component={Signup} path='/signup' />
            <AuthRoute exact component={Login} path='/login' />
            <PrivateRoute component={Backend} path='/backend' />
            <Route component={Error} path='/404' />
            <Redirect from='*' to='/404' />
        </Switch>
    </Router>
</MuiThemeProvider>

export default App;