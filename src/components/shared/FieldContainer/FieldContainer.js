import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const AnimatedBox = animated(Box);
const config = {
    friction: 200,
    mass: 10,
    tension: 1800,
};

const useStyles = makeStyles(theme => ({
    absolute: {
        height: '100%',
        pointerEvents: 'none',
        position: 'absolute',
        width: '100%',
    },
    backgroundImageContainer: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    container: {
        backgroundColor: props => {
            return props.backgroundColor ?
                props.backgroundColor :
                theme.palette.quaternaryColor;
        },
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        minHeight: props => props.minHeight ? props.minHeight : '',
        overflow: props => props.backgroundImage ? 'hidden' : '',
    },
    gradient: {
        background: `linear-gradient(150deg, rgba(0,0,0,0) 25%, ${theme.palette.quaternaryColor} 100%);`,
        opacity: '40%',
    },
    labelContainer: {
        color: props => {
            return props.color ?
                props.color :
                theme.palette.tertiaryColor;
        },
        fontFamily: 'FedraSansStdBook',
        fontSize: '1rem',
        '&.disabled': {
            opacity: 0.5,
        },
    },
    wrapper: {
        padding: theme.spacing(2, 3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        }
    },
}));

const FieldContainer = props => {
    const classes = useStyles(props);

    const { backgroundImage, children, disabled, flexGrowContent, label, ...rest } = props;

    const [firstBackgroundImageCache, setFirstBackgroundImageCache] = useState('');
    const [secondBackgroundImageCache, setSecondBackgroundImageCache] = useState('');
    const [switchBG, setSwitchBG] = useState(false);
    const [triggerBGChange, setTriggerBGChange] = useState(false);
    
    useEffect(() => {
        if(triggerBGChange){
            if(switchBG) setSecondBackgroundImageCache(backgroundImage);
            else setFirstBackgroundImageCache(backgroundImage);
            setSwitchBG(prevState => !prevState);
            setTriggerBGChange(false);
        }
    }, [backgroundImage, switchBG, triggerBGChange]);

    useEffect(() => setTriggerBGChange(true), [backgroundImage]);

    const { opacityFirst, opacitySecond } = useSpring({
        config,
        opacityFirst: switchBG ? 1 : 0,
        opacitySecond: switchBG ? 0 : 1,
    });
    
    return <Box
        {...rest}
        className={classes.container}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        marginBottom={2}
        position='relative'
    >
        <AnimatedBox
            className={clsx(classes.absolute, classes.backgroundImageContainer)}
            style={{
                backgroundImage: firstBackgroundImageCache !== '' ? `${firstBackgroundImageCache}` : '',
                opacity: opacityFirst,
            }}
        />
        <AnimatedBox
            className={clsx(classes.absolute, classes.backgroundImageContainer)}
            style={{
                backgroundImage: secondBackgroundImageCache !== '' ? `${secondBackgroundImageCache}` : '',
                opacity: opacitySecond,
            }}
        />
        {(firstBackgroundImageCache || secondBackgroundImageCache) && <Box className={clsx(classes.absolute, classes.gradient)} />}
        {!!label && <Box className={clsx(classes.wrapper, classes.labelContainer, {
            ['disabled']: disabled
        })}>
            <label>{label}</label>
        </Box>}
        <Box
            className={classes.wrapper}
            display='flex'
            flexDirection='column'
            flexGrow={flexGrowContent ? 1 : 0}
            justifyContent='space-between'
        >
            { children }
        </Box>
    </Box>
};

export default FieldContainer;