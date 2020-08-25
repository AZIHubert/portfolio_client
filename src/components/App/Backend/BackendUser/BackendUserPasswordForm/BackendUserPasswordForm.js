import { Box, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useUpdateUserPassword } from '#graphql';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';
import InputTextField from '#shared/InputTextField';

const useStyles = makeStyles(theme => ({
    container: {
        marginRight: theme.spacing(37),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(33),
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0)
        },
    },
}));

const BackendUserPasswordForm = ({ width, userId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialPasswords = { oldPassword: '', password: '' };
    const initialErrors = { general: '', oldPassword: '', password: '' };

    const [passwords, setPasswords] = useState(initialPasswords);
    const [errors, setErrors] = useState(initialErrors);

    const onSuccess_update = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setErrors(initialErrors);
        setPasswords(initialPasswords);
    };
    const onError_update = newErrors => setErrors(newErrors);
    const [updateUserPassword, { loading: loadingUpdate }] = useUpdateUserPassword({ ...passwords, userId }, onSuccess_update, onError_update);

    const handleChange = e => {
        setErrors({
            ...errors,
            [e.target.name]: '',
            general: ''
        });
        setPasswords({
            ...passwords,
            general: '',
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateUserPassword();
    };

    return <BackendPartWrapper title='Edit your email'>
        <form className={classes.container} onSubmit={handleSubmit}>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingUpdate}
                            error={errors.oldPassword ? true : false}
                            helperText={errors.oldPassword}
                            label='Old password'
                            name='oldPassword'
                            onChange={handleChange}
                            value={passwords.oldPassword}
                        />
                    </Box>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingUpdate}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            label='New password'
                            name='password'
                            onChange={handleChange}
                            value={passwords.password}
                        />
                    </Box>
                    <Button
                        backgroundColor={theme.palette.primaryColor}
                        borderColor={theme.palette.tertiaryColor}
                        color={theme.palette.tertiaryColor}
                        disabled={loadingUpdate}
                        marginTop={2}
                        onClick={handleSubmit}
                        type='submit'
                        width={(width === 'xs' || width === 'sm') ? '100%' : '48%'}
                    >
                        Edit password
                    </Button>
                </Box>
            </Box>
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendUserPasswordForm);