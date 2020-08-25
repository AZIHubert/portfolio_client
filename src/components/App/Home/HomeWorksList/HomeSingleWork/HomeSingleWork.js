import { Box, Grid, Typography, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useProgressiveImage from '#hooks/useProgressiveImage';

const useStyles = makeStyles(theme => ({
    border: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
        '& div': {
            height: '100%',
            position: 'relative',
            width: '100%',
            '&::after': {
                border: '6px solid',
                borderColor: 'transparent',
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
            },
            '&::before': {
                border: '8px solid',
                borderColor: 'transparent',
                bottom: 0,
                content: '""',
                left: 0,
                position: 'absolute',
            },
        },
        '&.in div::after':{
            animation: theme.transitions.create('$in', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.standard
            }),
            borderBottom: 'none',
            borderColor: theme.palette.tertiaryColor,
            borderRight: 'none',
            height: '100%',
            width: '100%',
        },
        '&.in div::before':{
            animation: theme.transitions.create('$in', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.standard
            }),
            borderColor: theme.palette.tertiaryColor,
            borderLeft: 'none',
            borderTop: 'none',
            height: '100%',
            width: '100%',
        },
        '&.out div::after':{
            animation: theme.transitions.create('$out', {
                duration: theme.transitions.duration.complexe,
                easing: theme.transitions.easing.easeIn,
            }),
            borderBottom: 'none',
            borderRight: 'none',
        },
        '&.out div::before':{
            animation: theme.transitions.create('$out', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.complexe
            }),
            borderLeft: 'none',
            borderTop: 'none',
        },
    },
    container: {
        height: 500,
        marginBottom: 70,
        position: 'relative',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            paddingLeft: props => props.index%3 === 2 || props.index%3 === 0  ? props.index%3 === 2 ? theme.spacing(0.5) : theme.spacing(1) : 0,
            paddingRight: props => props.index%3 === 1 || props.index%3 === 2 ? props.index%3 === 2 ? theme.spacing(0.5) : theme.spacing(1) : 0,
        },
        [theme.breakpoints.down('sm')]: {
            height: 400,
            marginBottom: 50,
            padding: 0,
        },
        [theme.breakpoints.only('sm')]: {
            paddingLeft: props => props.index%2 === 0 ? theme.spacing(1) : 0,
            paddingRight: props => props.index%2 === 0 ? 0 : theme.spacing(1),
        },
    },
    content: {
        cursor: 'pointer',
        display: 'box',
        height: '100%',
        position: 'relative',
        width: '100%',
        '&:hover': {
            '& .image': {
                opacity: '0'
            },
            '& .index': {
                top: '-90px'
            },
            '& .title h4': {
                transform: 'scale(1)',
            },
        },
    },
    index: {
        color: theme.palette.tertiaryColor,
        pointerEvents: 'none',
        position: 'absolute',
        top: '-80px',
        transition: theme.transitions.create('top', {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeIn,
        }),
        width: '100%',
        zIndex: 20,
        '& h1': {
            fontFamily: 'ClearSansBold',
            fontSize: 120,
            margin: 0,
            '&::selection': {
                backgroundColor: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: 50,
            },
        },
        [theme.breakpoints.only('xs')]: {
            textAlign: 'center'
        },
    },
    thumbnail: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        position: 'absolute',
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeIn,
        }),
        width: '100%',
    },
    thumbnailLoader: {
        backgroundColor: theme.palette.quaternaryColor,
        height: '100%',
        position: 'absolute',
        width: '100%',
        '&.loaded': {
            backgroundColor: 'transparent'
        },
        transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeIn,
        }),
    },
    title: {
        transform: 'scale(0.97)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.complex,
            easing: theme.transitions.easing.easeIn,
        })
    },
    titleContainer: {
        position: 'absolute',
        width: '100%', height: '100%',
        backgroundColor: theme.palette.quaternaryColor,
        padding: 30,
        '& > div': {
            width: '100%',
            height: '100%'
        },
    },
    '@keyframes in': {
        '0%': {
            height: 0,
            width: 0,
        },
        '50%': {
            height: 0,
            width: '100%',
        },
        '100%': {
            height: '100%',
            width: '100%',
        }
    },
    '@keyframes out': {
        '0%': {
            borderColor: theme.palette.tertiaryColor,
            height: '100%',
            width: '100%',
        },
        '50%': {
            borderColor: theme.palette.tertiaryColor,
            height: 0,
            width: '100%',
        },
        '25%': {
            borderColor: theme.palette.tertiaryColor,
        },
        '100%': {
            borderColor: 'transparent',
            height: 0,
            width: 0,
        }
    },
    
}));

const WorksContainer = props => {
    const classes = useStyles(props);

    const { index, thumbnailUrl, title, width, workId } = props;

    const loaded = useProgressiveImage(thumbnailUrl);
    const [hover, setHover] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    const handleHover = () => {
        setHover(true);
        setStartAnimation(true);
    };
    const handleLeave = () => setHover(false);
    
    return <Grid
        className={classes.container}
        item
        md={4}
        sm={6}
        xs={12}
    >
        <Box
            className={clsx(classes.content, 'content')}
            component={Link}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            to={`works/${workId}`}
        >
            {width !== 'xs' && <div className={clsx(classes.index, 'index')}>
                <h1>{`${index}.`}</h1>
            </div>}
            <div className={clsx(classes.titleContainer, 'title')}>
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    textAlign='center'
                >
                    <Typography className={classes.title} variant='h4'>
                        {title}
                    </Typography>
                </Box>
            </div>
            {!!thumbnailUrl ? <div>
                <div className={clsx(classes.thumbnail, 'image')} style={{
                    backgroundImage: !!loaded ? `url(${loaded})` : ''
                }}></div>
                <div className={clsx(classes.thumbnailLoader, 'image-loader', {
                    ['loaded']: !!loaded
                })}></div>
            </div> : null}
            <div className={clsx(classes.border, 'border', {
                ['in']: hover,
                ['out']: !hover && startAnimation
            })}>
                <div></div>
            </div>
        </Box>
    </Grid>
};

export default withWidth()(WorksContainer);