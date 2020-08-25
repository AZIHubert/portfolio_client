import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        width: '100%',
    },
    menuLink: {
        backgroundColor: 'transparent',
        border: 'none',
        color: props => props.light ? theme.palette.secondaryColor : theme.palette.primaryColor,
        cursor: 'pointer',
        display: 'flex',
        fontFamily: 'FedraSansStdBook',
        fontSize: '1.2rem',
        pointerEvents: 'auto',
        textAlign: 'inherit',
        textTransform: 'uppercase',
        transition: 'color 1s ease',
        '&.active, &:hover': {
            color: theme.palette.tertiaryColor,
        },
        '&:focus': {
            outline: 0,
        },
        '&::selection': {
            backgroundColor: theme.palette.secondaryColor,
            color: theme.palette.primaryColor,
        },
    }
}));

const MenuLink = props => {
    const classes = useStyles(props);

    const { active, align, children, link, ...rest } = props;

    return <Box
        className={classes.container}
        display='flex'
        justifyContent={!!align ? align === 'right' ? 'flex-end' : align : 'flex-start'}
    >
        {link ? <Link {...rest} className={clsx(classes.menuLink, {
            ['active']: active
        })}>
            {children}
        </Link> : <button
            {...rest}
            className={clsx(classes.menuLink, {
                ['active']: active
            })}
        >
            {children}
        </button>}
    </Box>
};

export default MenuLink;