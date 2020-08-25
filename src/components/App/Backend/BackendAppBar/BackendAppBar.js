import { Box, Typography, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useGetUser } from '#graphql';
import Button from '#shared/Button';
import getAuthenticatedUserID from '#shared/getAuthenticatedUserID';

const useStyles = makeStyles(theme => ({
    appBar: {
        alignItems: 'center',
        backgroundColor: theme.palette.primaryColor,
        borderBottom: `2px solid ${theme.palette.tertiaryColor}`,
        display: 'flex',
        height: 64,
        position: 'fixed',
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
        [theme.breakpoints.down('sm')]: {
            height: 50,
        },
    },
    appBarShift: {
        marginLeft: theme.custom.drawerWidth,
        width: `calc(100% - ${theme.custom.drawerWidth}px)`,
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.custom.drawerWidthDownSM,
            width: `calc(100% - ${theme.custom.drawerWidthDownSM}px)`,
        },
    },
    drawerButton: {
        color: theme.palette.tertiaryColor,
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
    },
    drawerButtonContainer: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: 70,
        '&:hover svg': {
            transform: 'rotate(180deg)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 40
        },
    },
    hide: {
        display: 'none',
    },
    navigationContainer: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        height: 64,
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 4),
        [theme.breakpoints.down('sm')]: {
            height: 50,
            padding: theme.spacing(0, 2),
        },
    },
    PPContainer: {
        alignItems: 'center',
        backgroundColor: theme.palette.tertiaryColor,
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 40,
        [theme.breakpoints.down('sm')]: {
            height: 30,
            width: 30,
        },
    },
    PPinitials: {
        color: theme.palette.primaryColor,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
    },
    profilePictureContainer: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
    },
}));

const BackendAppBar = ({ handleDrawerOpen, open, width, }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push('/');
    };

    const { user, loading: loadingUser } = useGetUser(getAuthenticatedUserID());

    return <div className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
    })}>
        <div className={clsx(classes.drawerButtonContainer, {
            [classes.hide]: open
        })} onClick={handleDrawerOpen}>
            <MenuIcon className={classes.drawerButton} />
        </div>
        <Box className={classes.navigationContainer}>
            <Box marginRight={width === 'xs' ? 2 : 6}>
                <Button
                    color={theme.palette.tertiaryColor}
                    colorHover={theme.palette.secondaryColor}
                    disabledBackgroundColor
                    link
                    to='/'
                >
                    Frontend
                </Button>
            </Box>
            <Box
                className={classes.PPContainer}
                component={Link}
                to='/backend/settings'
            >
                {
                    !loadingUser &&
                    (!!Object.keys(user.profilePicture).length ?
                        <Box className={classes.profilePictureContainer} style={{
                        backgroundImage: `url(${user.profilePicture.url})`
                        }} /> :
                        <Typography className={classes.PPinitials} variant='body1'>
                            {`${user.firstname.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`}
                        </Typography>
                    )
                }
            </Box>
            <Box marginLeft={width === 'xs' ? 2 : 6}>
                <Button
                    borderColor={theme.palette.tertiaryColor}
                    color={theme.palette.primaryColor}
                    onClick={logout}
                >
                    Disconnect
                </Button>
            </Box>
        </Box>
    </div>
};

export default withWidth()(BackendAppBar);