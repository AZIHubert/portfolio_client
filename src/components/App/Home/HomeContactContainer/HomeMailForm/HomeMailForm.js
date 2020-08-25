import { Box, CircularProgress, Grid, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useCreateEmail } from '#graphql';
import TextAnimation from '#shared/TextAnimation';
import TextField from '#shared/TextField';

import HomeMailFormFeedBack from './HomeMailFormFeedBack';

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: theme.palette.tertiaryColor,
        border: `2px solid ${theme.palette.tertiaryColor}`,
        color:  theme.palette.primaryColor,
        cursor: 'pointer',
        fontFamily: 'FedraSansStdBook',
        fontSize: '1rem',
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5),
        transition: '0.5s ease',
        width: 100,
        '& svg': {
            color:  theme.palette.primaryColor
        },
        '&:focus': {
            outline: 0
        },
        '&:hover': {
            backgroundColor: theme.palette.primaryColor,
            color:  theme.palette.tertiaryColor,
            '& svg': {
                color:  theme.palette.tertiaryColor
            },
        },
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.primaryColor,
        },
    },
    container: {
        paddingBottom: theme.spacing(12),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(6),
        },
    },
    form: {
        margin: '0 auto',
        width: 650,
        [theme.breakpoints.down('sm')]: {
            width: 600
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    title: {
        display: 'inline-block',
        textTransform: 'Capitalize',
    },
    titleContainer: {
        paddingBottom: theme.spacing(6),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(3),
        },
    },
}))

const MailForm = ({ width }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const initialState = {
        email: '',
        firstname: '',
        lastname: '',
        object: '',
        body: ''
    };
    const initialErrors = { general: '', ...initialState };

    const [mailer, setMailer] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const onError = errors => {
        setErrors(errors);
        setSuccess(false);
        setFailed(false);
    };
    const onFailure = () => {
        setSuccess(true);
        setFailed(true);
    };
    const onSuccess = () => {
        setMailer(initialState);
        setErrors(initialErrors);
        setSuccess(true);
        setFailed(false);
    };
    const [createEmail, { loading: loadingEmail }] = useCreateEmail(mailer, onSuccess, onError, onFailure);

    const handleChange = e => {
        setMailer({
            ...mailer,
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
        createEmail();
    };

    return <Box
        alignItems='center'
        className={classes.container}
        display='flex'
        flexDirection='column'
        justifyContent='center'
    >
        <Box className={classes.titleContainer} textAlign='center'>
            <TextAnimation
                className={classes.title}
                variant='h5'
                yMoving
            >
                Get in touch
            </TextAnimation>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                error={errors.email ? true : false}
                helperText={errors.email}
                label='Email'
                name='email'
                marginBottom={1}
                onChange={handleChange}
                value={mailer.email}
            />
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    sm={6}
                    xs={12}
                >
                    <TextField
                        error={errors.firstname ? true : false}
                        helperText={errors.firstname}
                        label='First Name'
                        marginBottom={1}
                        name='firstname'
                        onChange={handleChange}
                        value={mailer.firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={errors.lastname ? true : false}
                        helperText={errors.lastname}
                        label='Last Name'
                        labelJustification={width !== 'xs' && 'flex-end'}
                        marginBottom={1}
                        name='lastname'
                        onChange={handleChange}
                        value={mailer.lastname}
                    />
                </Grid>
            </Grid>
            <TextField
                error={errors.object ? true : false}
                helperText={errors.object}
                label='Object'
                marginBottom={1}
                name='object'
                onChange={handleChange}
                value={mailer.object}
            />
            <TextField
                error={errors.body ? true : false}
                helperText={errors.body}
                label='Message'
                marginBottom={1}
                multiline
                name='body'
                onChange={handleChange}
                rows={10}
                value={mailer.body}
            />
            <button className={classes.button} onClick={handleSubmit}>
                {!loadingEmail ? 'Send' : <CircularProgress size={12} />}
            </button>
        </form>
        <HomeMailFormFeedBack
            failed={failed}
            setFailed={setFailed}
            setSuccess={setSuccess}
            success={success}
        />
    </Box>
};

export default withWidth()(MailForm);