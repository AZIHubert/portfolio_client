import { Box, Typography, withWidth } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useDeleteUser } from '#graphql';
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

const BackendUserDeleteForm = ({ width, userId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const history = useHistory();

    const initialState = { password: '' };
    const initialError = { general: '',  ...initialState };
    const [passwords, setPasswords] = useState(initialState);
    const [errors, setErrors] = useState(initialError);

    const onError = newErrors => setErrors(newErrors);
    const onSuccess = () => {
        history.push('/');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };
    const [deleteUser, { loading: loadingDelete }] = useDeleteUser({ ...passwords, userId }, onSuccess, onError);

    const handleChange = e => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setErrors({ ...errors, general: '', [e.target.name]: '' });
    };

    const handleSubmit = e => {
        e.preventDefault();
        deleteUser();
    };

    return <BackendPartWrapper title='Become an admin'>
        <form onSubmit={deleteUser} className={classes.container}>
            <Box marginBottom={2}>
                <Typography variant='body1'>
                    Register your password to delete your account
                </Typography>
            </Box>
            <Box flexGrow='1'>
                <Box display='flex' flexWrap='wrap'>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingDelete}
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            label='Password'
                            name='password'
                            onChange={handleChange}
                            value={passwords.password}
                        />
                    </Box>
                    <Button
                        backgroundColor={theme.palette.primaryColor}
                        borderColor={theme.palette.tertiaryColor}
                        color={theme.palette.tertiaryColor}
                        disabled={loadingDelete}
                        marginTop={2}
                        onClick={handleSubmit}
                        type='submit'
                        width={(width === 'xs' || width === 'sm') ? '100%' : '48%'}
                    >
                        Delete account
                    </Button>
                </Box>
            </Box>
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendUserDeleteForm)