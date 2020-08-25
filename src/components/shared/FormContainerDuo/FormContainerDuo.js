import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    containerDuo: {
        marginRight: props => props.marginRight ? '4%' : '',
        width: '48%',
        [theme.breakpoints.down('sm')]: {
            marginRight: props => props.marginRight ? '2%' : '' ,
            width: '49%',
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: props => props.marginRight ? '0%' : '',
            width: '100%',
        },
    },
}));

const FormContainerDuo = props => {
    const classes = useStyles(props);

    const { children } = props;

    return <Box className={classes.containerDuo}>
        {children}
    </Box>
};

export default FormContainerDuo;