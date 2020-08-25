import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    menuIcon: {
        color: theme.palette.primaryColor,
        fontSize: 35,
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
        [theme.breakpoints.down('sm')]: {
            width: 25
        }
    },
    menuIconContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        width: 70,
        [theme.breakpoints.down('sm')]: {
            width: 40,
        },
    },
    menuItemContainer: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        width: theme.custom.drawerWidth,
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(0.4),
            width: theme.custom.drawerWidthDownSM,
        },
        '&:hover, &.active': {
            '& svg, & p': {
                color: theme.palette.secondaryColor,
            },
        },
    },
    menuText: {
        color: theme.palette.primaryColor,
        textTransform: 'capitalize',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    menuTextContainer: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
    },
}));

const BackendDrawerMenuItem = ({ exact, icon: Icon, title, to, ...rest }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <Box
        {...rest}
        className={classes.menuItemContainer}
        component={NavLink}
        exact={exact}
        to={to}
    >
        <div className={classes.menuIconContainer}>
            <Icon className={classes.menuIcon} />
        </div>
        <div className={classes.menuTextContainer}>
            <Typography className={classes.menuText} variant='body1'>
                {title}
            </Typography>
        </div>
    </Box>
};

export default BackendDrawerMenuItem;