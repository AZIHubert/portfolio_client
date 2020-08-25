import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useContext, memo } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';
import TextAnimation from '#shared/TextAnimation';

const useStyles = makeStyles(theme => ({
    typography: {
        color: props => props.light ? theme.palette.secondaryColor : theme.palette.primaryColor,
        display: 'inline',
        transition: 'color 1s ease',
        '&:hover': {
            color: props => props.href && theme.palette.tertiaryColor,
            transition: 'color 600ms ease',
        },
    }
}));

const AnimatedTypographyMemoized = memo(props => {
    const classes = useStyles(props);

    const { children, className, fixed, ...rest } = props;
    
    return fixed ? <Typography {...rest} className={clsx(classes.typography, className)}>
        {children}
    </Typography> : <TextAnimation {...rest} className={clsx(classes.typography, className)}>
        {children}
    </TextAnimation>
});

const AnimatedTypography = ({ children, ...rest }) => {
    const { light } = useContext(ScrollContext);

    return <AnimatedTypographyMemoized {...rest} light={light ? 1 : 0}>
        {children}
    </AnimatedTypographyMemoized>
};

export default AnimatedTypography;

// TODO:
// Should be HomeColoredTypography