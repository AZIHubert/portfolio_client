import { Box } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useCreateUser } from '#graphql';
import Button from '#shared/Button';
import FormContainerDuo from '#shared/FormContainerDuo';
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

const Signup = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    let history = useHistory();

    const initialState = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        passwordRegistration: ''
    };
    const initialErrors = { general: '', ...initialState };

    const [errors, setErrors] = useState(initialErrors);
    const [signer, setSigner] = useState(initialState);

    const onError = err => setErrors(err);
    const onFailure = () => history.push('/');
    const onSuccess = () => history.push('/');
    const [createUser, { loading }] = useCreateUser(signer, onSuccess, onError, onFailure);
    
    const handleChange = e => {
        setSigner({
            ...signer,
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
        createUser();
    };

    return <RegistrationForm
        onSubmit={handleSubmit}
        title='signup'
        width={800}
    >
        <Box display='flex' flexWrap='wrap'>
            <Box width="100%">
                <TextField
                    autoFocus
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                    label='Email'
                    marginBottom={1}
                    name='email'
                    onChange={handleChange}
                    type='email'
                    value={signer.email}
                />
            </Box>
            <Box width="100%">
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.username ? true : false}
                    helperText={errors.username}
                    label='Username'
                    marginBottom={1}
                    name='username'
                    onChange={handleChange}
                    value={signer.username}
                />
            </Box>
            <FormContainerDuo marginRight>
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    label='Password'
                    marginBottom={1}
                    name='password'
                    onChange={handleChange}
                    value={signer.password}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword}
                    label='Confirm Password'
                    marginBottom={1}
                    name='confirmPassword'
                    onChange={handleChange}
                    value={signer.confirmPassword}
                />
            </FormContainerDuo>
            <FormContainerDuo marginRight>
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.firstname ? true : false}
                    helperText={errors.firstname}
                    label='First Name'
                    marginBottom={1}
                    name='firstname'
                    onChange={handleChange}
                    value={signer.firstname}
                />
            </FormContainerDuo>
            <FormContainerDuo>
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.lastname ? true : false}
                    helperText={errors.lastname}
                    label='Last Name'
                    marginBottom={1}
                    name='lastname'
                    onChange={handleChange}
                    value={signer.lastname}
                />
            </FormContainerDuo>
            <Box width="100%">
                <TextField
                    backgroundColor={theme.palette.primaryColor}
                    error={errors.passwordRegistration ? true : false}
                    helperText={errors.passwordRegistration}
                    label='Password Registration'
                    marginBottom={4}
                    name='passwordRegistration'
                    onChange={handleChange}
                    type='password'
                    value={signer.passwordRegistration}
                />
            </Box>
        </Box>
        <Button
            borderColor={theme.palette.tertiaryColor}
            borderWidth={2}
            loading={loading}
            onClick={handleSubmit}
            type='submit'
        >
            Signup
        </Button>
        <div className={classes.changeRegistrationFormContainer}>
            <span className={classes.changeRegistrationFormText}>
                You already have an account ? <Link to={'/login'}>login</Link>
            </span>
        </div>
    </RegistrationForm>
};

export default Signup;