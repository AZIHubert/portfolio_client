import { Box, Typography, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import useProgressiveImage from '#hooks/useProgressiveImage';

const useStyles = makeStyles(theme => ({
    clickableIcon: {
        cursor: 'pointer',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        '&:hover': {
            color: props =>
                props.colorHover !== undefined ?
                props.colorHover :
                theme.palette.secondaryColor,
        },
    },
    container: {
        backgroundColor: props =>
            props.backgroundColor !== undefined ?
            props.backgroundColor :
            theme.palette.quaternaryColor,
        color: props =>
            props.color !== undefined ?
            props.color :
            theme.palette.tertiaryColor,
        borderRadius: 25,
        boxShadow: props => 
            props.boxShadow !== undefined ?
            '2px 3px 4px rgba(0,0,0,0.3)' :
            'none',
        height: 30,
        marginBottom: theme.spacing(1),
        padding: theme.spacing(0, 3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    },
    gradient: {
        background: `linear-gradient(90deg, rgba(0,0,0,0) 25%, ${theme.palette.quaternaryColor} 100%);`,
        height: '100%',
    },
    icon: {
        color: props =>
            props.color !== undefined ?
            props.color :
            theme.palette.tertiaryColor,
        fontSize: '1.5rem',
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.1rem'
        },
    },
    image: {
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
    title: {
        color: 'inherit',
        cursor: 'pointer',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        '&:hover': {
            color: props =>
                props.colorHover !== undefined ?
                props.colorHover :
                theme.palette.secondaryColor,
        },
    },
}));

const BackendSingleItem = props => {
    const {
        backgroundColor,
        boxShadow,
        children,
        color,
        colorHover,
        deleteIcon,
        handleOpenDelete,
        handleOpenEdit,
        imageUrl,
        title,
        to,
        width,
        ...rest
    } = props;
    const classes = useStyles(props);

    const loaded = useProgressiveImage(imageUrl);

    const titleSplit = title => {
        if(width === 'xs') return title.length > 15 ? `${title.slice(0, 15)}...` : title;
        if(width === 'sm') return title.length > 20 ? `${title.slice(0, 20)}...` : title;
        if(width === 'md') return title.length > 30 ? `${title.slice(0, 30)}...` : title;
        if(width === 'lg') return title.length > 40 ? `${title.slice(0, 40)}...` : title;
        return title;
    };

    return <Box
        {...rest}
        alignItems='center'
        className={classes.container}
        display='flex'
        justifyContent='space-between'
    >
        {imageUrl !== undefined && <Box
            height='100%'
            position='relative'
            width='33%'
        >
            <Box
                className={clsx(classes.image, { ['loaded']: loaded })}
                style={{ backgroundImage: !!loaded ? `url(${loaded})` : '' }}
            ></Box>
            <Box
                className={classes.gradient}
                height='100%'
                position='absolute'
                width='100%'
            />
        </Box>}
        {title && <Box className={classes.titleContainer}>
            {to ? <Typography
                className={classes.title}
                component={Link}
                to={to}
                variant='body1'
            >
                {titleSplit(title)}
            </Typography> : <Typography
                className={classes.title}
                variant='body1'
                onClick={handleOpenEdit}
            >
                {titleSplit(title)}
            </Typography>}
        </Box>}
        <Box display='flex' flexGrow={1} justifyContent='flex-end'>
            <Box
                alignItems='center'
                display='flex'
                justifyContent='space-between'
            >
                {children}
                {deleteIcon && <Box
                    alignItems='center'
                    marginLeft={1}
                    display='flex'
                    onClick={handleOpenDelete}
                >
                    <DeleteOutlineIcon className={clsx(classes.clickableIcon, classes.icon)} />
                </Box>}
            </Box>
        </Box>
    </Box>
};

export default withWidth()(BackendSingleItem);