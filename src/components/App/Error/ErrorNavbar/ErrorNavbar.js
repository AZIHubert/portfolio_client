import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import isAuthenticated from '#shared/isAuthenticated';
import MenuLink from '#shared/MenuLink';

const useStyles = makeStyles(theme => ({
    container: {
        margin: 0
    },
    gridContainer: {
        boxSizing: 'border-box',
        left: 0,
        padding: theme.spacing(1),
        pointerEvents: 'none',
        position: 'fixed',
        width: '100%',
        zIndex: '100',
    },
}));


const ErrorNavbar = () => {
    const classes = useStyles();

    return <menu id='menu' className={classes.container}>
        <Grid
            className={classes.gridContainer}
            container
            spacing={0}
        >
            <Grid item xs={isAuthenticated() ? 4 : 6}>
                <MenuLink link light to='/'>
                    Return
                </MenuLink>
            </Grid>
            {isAuthenticated() && <Grid item xs={4}>
                <MenuLink
                    align='center'
                    link
                    light
                    to='/backend'
                >
                    Backend
                </MenuLink>
            </Grid>}
        </Grid>
    </menu>
};

export default ErrorNavbar;
