import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { memo, useContext } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';
import smiley from '#res/images/Smiley.png';
import TextAnimation from '#shared/TextAnimation';


const useStyles = makeStyles(theme => ({
    container: {
        boxSizing: 'border-box',
        height: '100vh',
        padding: theme.spacing(5),
        verticalAlign: 'text-top'
    },
    text: {
        '&:after': {
            backgroundImage:`url(${smiley})`,
            backgroundSize: '100% 100%',
            content: '""',
            display: 'inline-block',
            height: '5.5rem',
            marginLeft: theme.spacing(2),
            width: '5.5rem',
            [theme.breakpoints.down('xs')]: {
                height: '3rem',
                width: '3rem',
            },
        }
    }
}));

const HomeFooterMemoized = memo(() => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <TextAnimation
        className={classes.text}
        variant='h1'
        yMoving
    >
        See you soon
    </TextAnimation>
});

const HomeFooter = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    
    const { refs } = useContext(ScrollContext);
    
    return <Box
        alignItems='center'
        className={classes.container}
        component='footer'
        display='flex'
        justifyContent='center'
        ref={refs['footer']}
        textAlign='center'
    >
        <HomeFooterMemoized />
    </Box>
};

export default HomeFooter;