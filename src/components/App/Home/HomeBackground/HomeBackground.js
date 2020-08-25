import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo, useContext } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: props => props.light ? theme.palette.primaryColor : theme.palette.secondaryColor,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        transition: 'background-color 1s ease',
        width: '100%',
        zIndex: -1,
    }
}));

const HomeBackgroundMemoized = memo((props) => {
    const classes = useStyles(props);
    return <Box className={classes.container} />
});

const HomeBackground = () => {
    const { light } = useContext(ScrollContext);
    return <HomeBackgroundMemoized light={light ? 1 : 0} />
};

export default HomeBackground;

