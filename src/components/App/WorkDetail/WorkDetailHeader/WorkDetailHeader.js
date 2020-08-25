import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import useProgressiveImage from '#hooks/useProgressiveImage';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primaryColor,
        height: '100vh',
        position: 'relative',
        width: '100%',
    },
    date: {
        fontFamily: 'FedraSansStdBookItalic',
        fontSize: '2rem',
        letterSpacing: 3,
        paddingBottom: theme.spacing(3),
    },
    imageContainer: {
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '100%',
        opacity: 0,
        position: 'absolute',
        width: '100%',
        transition: '0.5s',
        '&.loaded': {
            opacity: 1,
        },
    },
    text: {
        color: props => props.thumbnailUrl ? props.titleColor : theme.palette.secondaryColor,
    },
    textContainer: {
        borderBox: 'box-sizing',
        height: '100%',
        left: 0,
        marginBottom: theme.spacing(15),
        padding: theme.spacing(0, 6),
        position: 'absolute',
        top: 0,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(10),
            padding: theme.spacing(0, 2),
        },
    },
    title: {
        fontFamily: 'FedraSansStdBold',
        fontSize: '5.7rem',
        letterSpacing: 1.01,
        [theme.breakpoints.down('sm')]: {
            fontSize: '4rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.3rem',
        },
    },
}));

const WorkDetailHeader = props => {
    const classes = useStyles(props);

    const { date, thumbnailUrl, title } = props;
    
    const loaded = useProgressiveImage(thumbnailUrl);

    return <Box className={classes.container}>
        {!!thumbnailUrl && <Box
            className={clsx(classes.imageContainer, {
                ['loaded']: loaded
            })}
            style={{
                backgroundImage: !!loaded ? `url(${loaded})` : ''
            }}
        ></Box>}
        <Box
            alignItems='center'
            className={classes.textContainer}
            component='header'
            display='flex'
            justifyContent='center'
            textAlign='center'
        >
            <Typography className={clsx(classes.text, classes.title)} variant='h1'>
                {title}
            </Typography>
            <Box
                bottom='0'
                position='absolute'
                right='5%'
                textAlign='right'
            >
                <Typography className={clsx(classes.text, classes.date)} variant='h6'>
                    {date}
                </Typography>
            </Box>
        </Box>
    </Box>
};

export default WorkDetailHeader;