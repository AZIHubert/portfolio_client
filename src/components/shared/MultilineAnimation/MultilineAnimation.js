import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import { useTrail, animated } from 'react-spring';

import useOnScreen from '#hooks/useOnScreen';

const AnimatedBox = animated(Box);
const AnimatedTypography = animated(Typography);

const config = {
    friction: 400,
    mass: 5,
    tension: 1800
}

const useStyles = makeStyles(() => ({
    outerContainer: {
        overflow: 'hidden',
        '& p': {
            margin: 0
        }
    }
}));

const MultilineAnimation = ({ texts, ...rest }) => {
    const classes = useStyles();

    const textRef = useRef(null);

    const onScreen = useOnScreen(textRef, '0px', true);
    
    const typesTrail = useTrail(texts.length, {
        config,
        opacity: onScreen ? 1 : 0.5,
        yBox: onScreen ? 0 : 10,
        yTypography: onScreen ? 0 : 75,
    });

    return <Box ref={textRef}>
        {typesTrail.map(({yBox, yTypography, opacity}, index) => (
            <AnimatedBox
                className={classes.outerContainer}
                key={index}
                style={{
                    transform: yBox.interpolate(y => `translate3d(0px, -${y}px, 0px)`)
                }}
            >
                <AnimatedTypography
                    {...rest}
                    style={{
                        opacity,
                        transform: yTypography.interpolate(y => `translate3d(0px, ${y}%, 0px)`)
                    }}
                >
                    {texts[index]}
                </AnimatedTypography>
            </AnimatedBox>
        ))}
    </Box>
};

export default MultilineAnimation;