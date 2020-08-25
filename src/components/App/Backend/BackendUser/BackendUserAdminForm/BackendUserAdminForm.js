import { Box, withWidth } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useUpdateUserAdmin } from '#graphql';
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

const BackendUserAdminForm = ({ width, userId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialState = { adminRegistrationPassword: '' };
    const initialError = { adminRegistrationPassword: '', general: '' };

    const [passwords, setPasswords] = useState(initialState);
    const [errors, setErrors] = useState(initialError);

    const onError_update = newErrors => setErrors(newErrors);
    const onSucces_update = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setPasswords(initialState);
        setErrors(initialError);
    };
    const [updateUserPassword, { loading: loadingUpdate }] = useUpdateUserAdmin({ ...passwords, userId }, onSucces_update, onError_update);

    const handleChange = e => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setErrors({ ...errors, general: '', [e.target.name]: '' });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateUserPassword();
    };

    return <BackendPartWrapper title='Become an admin'>
        <form className={classes.container} onSubmit={handleSubmit}>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingUpdate}
                            error={errors.adminRegistrationPassword ? true : false}
                            helperText={errors.adminRegistrationPassword}
                            label='Admin registration password'
                            name='adminRegistrationPassword'
                            onChange={handleChange}
                            value={passwords.adminRegistrationPassword}
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
                        Become an admin
                    </Button>
                </Box>
            </Box>
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendUserAdminForm);