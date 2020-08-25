import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(6, 0),
    },
    returnButton: {
        backgroundColor: theme.palette.quaternaryColor,
        border: '2px solid',
        borderColor: theme.palette.tertiaryColor,
        borderRadius: 0,
        color: theme.palette.tertiaryColor,
        margin: 0,
        padding: '3px 15px',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeIn,
        }),
        '&:hover': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.quaternaryColor,
        },
    },
    title: {
        color: theme.palette.tertiaryColor,
        letterSpacing: 3,
        textTransform: 'uppercase',
        fontFamily: 'FedraSansStdBold',
    },
    titleContainer: {
        margin: '0 auto',
        paddingBottom: theme.spacing(1),
    },
    userForm: {
        backgroundColor: theme.palette.quaternaryColor,
        border: '2px solid',
        borderColor: theme.palette.tertiaryColor,
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3, 3, 2, 3),
    },
    userFormContainer: {
        margin: '0 auto',
        maxWidth: props => props.width !== undefined ? props.width : 500,
        [theme.breakpoints.down('sm')]: {
            maxWidth: () => 400,
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: () => 350,
        },
    },
}));

const RegistrationForm = props => {
    const classes = useStyles(props);

    const { children, maxWidth, title, ...rest} = props;

    let history = useHistory();

    const handleClick = () => history.push('/');

    return <Box className={classes.container}>
        {!!title && <Box className={classes.titleContainer} textAlign='center'>
            <Typography className={classes.title} variant='h2'>
                {title}    
            </Typography> 
        </Box>}
        <Box className={classes.userFormContainer}>
            <form {...rest} className={classes.userForm} noValidate>
                {children}
            </form>
            <Box textAlign='right'>
                <Button
                    className={classes.returnButton}
                    disableRipple={true}
                    onClick={handleClick}
                >
                    return
                </Button>
            </Box>
        </Box>
    </Box>
}

export default RegistrationForm;