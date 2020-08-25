import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, memo } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';

import useOnScreen from '#hooks/useOnScreen';

const AnimatedBox = animated(Box);
const AnimatedTypography = animated(Typography);

const config = {
    friction: 400,
    mass: 5,
    tension: 1800
};

const useStyles = makeStyles(() => ({
    container: {
        position: 'relative'
    },
    link: {
        display: 'inline',
    },
    outerContainer: {
        overflow: 'hidden'
    }
}));

const TextAnimation = ({ children, yMoving, xMoving, ...rest }) => {
    const classes = useStyles();

    const textRef = useRef(null);

    const onScreen = useOnScreen(textRef, '0px', true);
    const {yBox, yTypography, xTypography, opacity} = useSpring({
        config,
        opacity: onScreen ? 1 : yMoving ? 0.25 : 0,
        xTypography: onScreen ? 0 : 75,
        yBox: onScreen ? 0 : xMoving ? 0 : 30,
        yTypography: onScreen ? 0 : 75,
    });

    return <Box className={classes.container} ref={textRef}>
        <AnimatedBox className={classes.outerContainer} style={{
            transform: yMoving ? yBox.interpolate(y => `translate3d(0px, -${y}px, 0px)`) : ''
        }}>
            <Box className={classes.innerContainer}>
                <AnimatedTypography
                    className={classes.link}
                    {...rest}
                    style={{
                        opacity,
                        transform: yMoving ? interpolate([xTypography, yTypography], (x, y) => `translate3d(${xMoving ? x : 0}px, ${y}%, 0px)`) : ''
                    }}
                >
                    {children}
                </AnimatedTypography>
            </Box>
        </AnimatedBox>
    </Box>
};

export default memo(TextAnimation);