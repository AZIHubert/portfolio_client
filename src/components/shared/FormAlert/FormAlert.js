import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

const useStyles = makeStyles(theme => ({
    alert: {
        color: theme.palette.primaryColor,
        fontSize: '1rem',
    },
    alertContainer: {
        backgroundColor: '#e68983',
        borderRadius: 50,
        marginBottom: props => props.marginBottom !== undefined ? theme.spacing(props.marginBottom) : 0,
        marginTop: props => props.marginTop !== undefined ? theme.spacing(props.marginTop) : 0,
        maxWidth: props => props.maxWidth !== undefined ? props.maxWidth : 220,
        padding: theme.spacing(0.5, 1.4),
    },
}));

const FormAlert = props => {
    const classes = useStyles(props);

    const { children } = props;
    
    return <Box className={classes.alertContainer} textAlign='center'>
        <Typography className={classes.alert} variant='body1'>
            {children}
        </Typography>
    </Box>
};

export default memo(FormAlert);