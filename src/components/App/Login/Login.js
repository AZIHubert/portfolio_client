import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useLoginUser } from '#graphql';
import Button from '#shared/Button';
import RegistrationForm from '#shared/RegistrationForm';
import TextField from '#shared/TextField';

const useStyles = makeStyles(theme => ({
    changeRegistrationFormContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(4),
    },
    changeRegistrationFormText: {
        fontSize: 12,
        lineHeight: 1,
        '& a': {
            color: theme.palette.tertiaryColor,
            fontSize: 14,
            paddingLeft: theme.spacing(0.3),
            textTransform: 'uppercase',
            transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeIn,
            }),
            '&::selection': {
                background: theme.palette.tertiaryColor,
                color: theme.palette.quaternaryColor,
            },
            '&:hover': {
                color: theme.palette.secondaryColor,
            },
        },
    },
}));

const Login = () =>{
    const theme = useTheme();
    const classes = useStyles(theme);

    let history = useHistory();

    const initialState = { emailOrUsername: '', password: '' };
    const initialErrors = { general: '', ...initialState };

    const [logger, setLogger] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const onError = err => setErrors(err);
    const onFailure = () => history.push('/');
    const onSuccess = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        history.push('/backend');
    };
    const [loginUser, { loading }] = useLoginUser(logger, onSuccess, onError, onFailure);

    const handleChange = e => {
        setLogger({
            ...logger,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            general: '',
            [e.target.name]: ''
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        loginUser();
    };

    return <RegistrationForm onSubmit={handleSubmit} title='login'>
        <TextField
            autoFocus
            backgroundColor={theme.palette.primaryColor}
            error={errors.emailOrUsername ? true : false}
            helperText={errors.emailOrUsername}
            label='Email Or Username'
            marginBottom={1}
            name='emailOrUsername'
            onChange={handleChange}
            value={logger.emailOrUsername}
        />
        <TextField
            backgroundColor={theme.palette.primaryColor}
            error={errors.password ? true : false}
            helperText={errors.password}
            label='Password'
            marginBottom={4}
            name='password'
            onChange={handleChange}
            type='password'
            value={logger.password}
        />
        <Button
            borderColor={theme.palette.tertiaryColor}
            borderWidth={2}
            loading={loading}
            onClick={handleSubmit}
            type='submit'
        >
            Login
        </Button>
        <div className={classes.changeRegistrationFormContainer}>
            <span className={classes.changeRegistrationFormText}>
                Need an acount ? <Link to={'/signup'}>signup</Link>
            </span>
        </div>
    </RegistrationForm>
};

export default Login;