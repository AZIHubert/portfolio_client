import { Box, Typography, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useUpdateUserEmail } from '#graphql';
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
    currentEmailText: {
        '& b': {
            color: theme.palette.tertiaryColor,
        },
    },
}));

const BackendUserEmailForm = ({ width, email: currentEmail, userId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialEmail = { email: '' };
    const initialErrors = { general: '', email: '' };
    
    const [email, setEmail] = useState(initialEmail);
    const [errors, setErrors] = useState(initialErrors);
    
    const onSuccess_update = () => {
        setEmail(initialEmail);
        setErrors(initialErrors);
    };
    const onError_update = newErrors => setErrors(newErrors);
    const [updateUserEmail, { loading: loadingUpdate }] = useUpdateUserEmail({ ...email, userId }, onSuccess_update, onError_update);

    const handleChange = e => {
        setErrors({
            ...errors,
            [e.target.name]: '',
            general: ''
        });
        setEmail({
            ...email,
            general: '',
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateUserEmail();
    };

    return <BackendPartWrapper title='Edit your email'>
        <form className={classes.container} onSubmit={handleSubmit}>
            <Box marginBottom={2}>
                <Typography className={classes.currentEmailText} variant='body1'>
                    Current address email <b>{currentEmail}</b>
                </Typography>
            </Box>
            <Box flexGrow={1}>
                <Box display='flex' flexWrap='wrap'>
                    <Box width='100%'>
                        <InputTextField
                            disabled={loadingUpdate}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                            label='New email'
                            name='email'
                            onChange={handleChange}
                            value={email.email}
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
                        Edit profile
                    </Button>
                </Box>
            </Box>
        </form>
    </BackendPartWrapper>
};

export default withWidth()(BackendUserEmailForm);