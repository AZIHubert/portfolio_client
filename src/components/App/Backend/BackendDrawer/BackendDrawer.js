import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';
import React from 'react';

import BackendDrawerMenuItem from './BackendDrawerMenuItem';

const useStyles = makeStyles(theme => ({
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: theme.custom.drawerWidth,
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.drawerWidthDownSM,
        },
    },
    drawerClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
        width: 70,
        [theme.breakpoints.down('sm')]: {
            width: 40
        },
    },
    drawerOpen: {
        width: theme.custom.drawerWidth,
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.sharp,
        }),
        [theme.breakpoints.down('sm')]: {
            width: theme.custom.drawerWidthDownSM,
        },
    },
    paper: {
        backgroundColor: theme.palette.tertiaryColor,
        height: '100vh',
        overflowX: 'hidden',
        position: 'fixed',
    },
    toolbar: {
        alignItems: 'center',
        backgroundColor: theme.palette.tertiaryColor,
        borderBottom: `2px solid ${theme.palette.primaryColor}`,
        display: 'flex',
        height: 64,
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            height: 50,
            marginBottom: theme.spacing(1),
        },
    },
    toolbarIcon: {
        color: theme.palette.primaryColor,
        fontSize: 40
    },
    toolbarIconContainer: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: 64,
    },
}));

const BackendDrawer = ({ open, handleDrawerClose }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <div className={clsx(classes.drawer, {
        [classes.drawerClose]: !open,
        [classes.drawerOpen]: open,
    })}>
        <div className={clsx(classes.paper, {
            [classes.drawerClose]: !open,
            [classes.drawerOpen]: open,
        })}>
            <div className={classes.toolbar}>
                <div className={classes.toolbarIconContainer} onClick={handleDrawerClose}>
                    <ChevronLeft className={classes.toolbarIcon} />
                </div>
            </div>
            <div>
                <BackendDrawerMenuItem exact icon={HelpOutlineIcon} title='general' to='/backend' />
                <BackendDrawerMenuItem icon={WorkIcon} title='works' to='/backend/works' />
                <BackendDrawerMenuItem icon={ImportContactsIcon} title='about' to='/backend/about' />
                <BackendDrawerMenuItem icon={CropOriginalIcon} title='images' to='/backend/images' />
            </div>
        </div>
    </div>
};

export default BackendDrawer;