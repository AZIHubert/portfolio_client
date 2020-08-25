import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    text: {
        color: theme.palette.tertiaryColor,
    },
}));

const LoadingData = ({ right }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    
    return <Box
        marginBottom={1}
        marginTop={1}
        textAlign={right ? 'right' : 'left'}
    >
        <Typography className={classes.text} variant='body1'>
            Loading...
        </Typography>
    </Box>
};

export default LoadingData;
