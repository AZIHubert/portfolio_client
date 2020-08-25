import { Box } from '@material-ui/core';
import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);

const config = {
    friction: 400,
    mass: 5,
    tension: 5000,
};

const transitionH = y => `translate3d(0px,${y > 300 ? 300 : y < -300 ? -300 : y}px,0px)`;
const transitionV = y => `translate3d(${y}px,0px,0px)`;

const Parallax = ({ children, horizontale, ratio = 1, relativeToPercent = false }) => {
    const ref = useRef(null);

    const [props, set] = useSpring(() => ({ config, y: 0 }));

    const getY = useCallback(() => {
        if(!!relativeToPercent){
            const refPos = ref.current.getBoundingClientRect();
            let zeroPos = refPos.top - (window.innerHeight * relativeToPercent)/100 + refPos.height/2;
            set({y: zeroPos * ratio});
        } else set({y: window.pageYOffset * ratio});
    }, [ratio, relativeToPercent, set]);

    useEffect(() => {
        getY()
        window.addEventListener('scroll', getY);
        return () => window.removeEventListener('scroll', getY);
    }, [getY]);

    return <AnimatedBox
        ref={ref}
        style={{
            transform: props.y.interpolate(horizontale ? transitionV : transitionH)
        }}
    >
        {children}
    </AnimatedBox>
};

export default Parallax;