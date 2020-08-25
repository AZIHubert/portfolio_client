import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useProgressiveImage from '#hooks/useProgressiveImage';

const useStyles = makeStyles(theme => ({
    border: {
        height: '100%',
        width: '100%',
        zIndex: 10,
        '&::after': {
            border: '6px solid',
            borderColor: theme.palette.tertiaryColor,
            borderLeft: 'none',
            borderTop: 'none',
            content: "''",
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
        },
        '&::before': {
            border: '8px solid',
            borderBottom: 'none',
            borderColor: theme.palette.tertiaryColor,
            borderRight: 'none',
            bottom: 0,
            content: "''",
            height: '100%',
            left: 0,
            position: 'absolute',
            width: '100%',
        },
        '&.in::after':{
            animation: theme.transitions.create('$in', {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeIn,
            }),
            borderColor: 'transparent',
        },
        '&.in::before':{
            animation: theme.transitions.create('$in', {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeIn,
            }),
            borderColor: 'transparent',
        },
        '&.out::after': {
            animation: theme.transitions.create('$out', {
                duration: theme.transitions.duration.complexe,
                easing: theme.transitions.easing.easeIn,
            }),
            height: '100%',
            width: '100%',
        },
        '&.out::before': {
            animation: theme.transitions.create('$out', {
                duration: theme.transitions.duration.complexe,
                easing: theme.transitions.easing.easeIn,
            }),
            height: '100%',
            width: '100%',
        },
    },
    container: {
        minHeight: '100vh',
        padding: theme.spacing(5, 0),
        width: '100%',
    },
    linkContainer: {
        display: 'block',
        maxWidth: '100%',
        width: 400,
        [theme.breakpoints.down('lg')]: {
            width: 300,
        },
        [theme.breakpoints.down('xs')]: {
            width: 250,
        },
    },
    squareBox: {
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        '&:before': {
            content: '""',
            display: 'block',
            paddingTop: '140%',
        },
    },
    squareContent: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    thumbnailContainer: {
        backgroundColor: theme.palette.tertiaryColor,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '100%',
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeIn,
        }),
        width: '100%',
    },
    text: {
        color: theme.palette.primaryColor,
        fontSize: '2rem',
    },
    textContainer: {
        backgroundColor: theme.palette.secondaryColor,
        height: '100%',
        left: 0,
        position: 'absolute',
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.short
        }),
        top: 0,
        width: '100%',
    },
    wrapper: {
        height: '100%',
        position: 'relative',
        width: '100%',
        '&:hover': {
            '& .textContainer': {
                opacity: props => props.thumbnailUrl ? 0 : '',
            },
            '& .thumbnailContainer': {
                transform: 'scale(1.02)',
            },
        },
    },
    '@keyframes in': {
        '0%': {
            borderColor: theme.palette.tertiaryColor,
            height: '100%',
            width: '100%',
        },
        '50%': {
            borderColor: theme.palette.tertiaryColor,
            height: '100%',
            width: 0,
        },
        '100%': {
            borderColor: 'transparent',
            height: 0,
            width: 0,
        }
    },
    '@keyframes out': {
        '0%': {
            height: 0,
            width: 0,
        },
        '50%': {
            height: '100%',
            width: 0,
        },
        '100%': {
            width: '100%',
            height: '100%',
        },
    },    
}));

const WorkDetailNextProject = props => {
    const classes = useStyles(props);
    
    const { thumbnailUrl, nextWorkId } = props;

    const loaded = useProgressiveImage(thumbnailUrl);
    const [hover, setHover] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    const handleHover = () => {
        setHover(true);
        setStartAnimation(true);
    }
    const handleLeave = () => setHover(false);
    
    return <Box
        alignItems='center'
        className={classes.container}
        display='flex'
        justifyContent='center'
    >
        <Link
            className={classes.linkContainer}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            to={`/works/${nextWorkId}`}
        >
            <div className={classes.squareBox}>
                <div className={classes.squareContent}>
                    <div className={classes.wrapper}>
                        {props.thumbnailUrl && <Box className={clsx(classes.thumbnailContainer, 'thumbnailContainer')} style={{
                            backgroundImage: !!loaded ? `url(${loaded})` : ''
                        }}></Box>}
                        <Box
                            alignItems='center'
                            className={clsx(classes.textContainer, 'textContainer')}
                            display='flex'
                            justifyContent='center'
                            >
                            <Typography className={classes.text} variant='body2'>
                                Next project
                            </Typography>
                        </Box>
                        <Box className={clsx(classes.border, {
                            ['in']: hover,
                            ['out']: !hover && startAnimation,
                        })}></Box>
                    </div>
                </div>
            </div>
        </Link>
    </Box>
};

export default WorkDetailNextProject;