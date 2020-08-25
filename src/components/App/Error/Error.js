import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

import ErrorNavBar from './ErrorNavbar';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary,
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    error: {
        color: theme.palette.secondaryColor
    },
}));

const ErrorPage = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <Box
        className={classes.container}
        display='flex'
        justifyContent='center'
    >
        <ErrorNavBar />
        <Box display='flex' flexDirection='column' justifyContent='center'>
            <Typography className={classes.error} variant='h3'>
                Error 404
            </Typography>
            <Typography variant='h4'>
                Sorry this page doesn't exist...
            </Typography>
        </Box>
    </Box>
};
export default ErrorPage;
