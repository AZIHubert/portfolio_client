import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary,
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    welcomeMessage: {
        color: theme.palette.secondaryColor,
    }
}));

const HomeLoader = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <Box
        className={classes.container}
        display='flex'
        justifyContent='center'
    >
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
        >
            <Box textAlign='center'>
                <Typography variant='h1'>
                    Loading
                </Typography>
                <Box marginTop={2}>
                    <Typography className={classes.welcomeMessage} variant='h4'>
                        Welcome to my portfolio
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
};

export default HomeLoader;