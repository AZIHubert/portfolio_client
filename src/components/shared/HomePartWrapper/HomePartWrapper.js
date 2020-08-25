import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import TextAnimation from '#shared/TextAnimation';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(7, 0),
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(7, 1),
        },
    },
    titleContainer: {
        marginBottom: theme.spacing(10),
    },
}));

const PageContainer = ({ children, title, ...rest }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    
    return <Box {...rest} className={classes.container}>
        {title && <Box
            className={classes.titleContainer}
            textAlign='center'
        >
            <TextAnimation
                variant='h1'
                yMoving
            >
                {title}
            </TextAnimation>
        </Box>}
        {children}
    </Box>
};

export default PageContainer;