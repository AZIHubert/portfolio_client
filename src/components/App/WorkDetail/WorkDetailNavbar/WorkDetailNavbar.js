import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


import isAuthenticated from '#shared/isAuthenticated';
import MenuLink from '#shared/MenuLink';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        margin: 0,
        padding: theme.spacing(1),
        position: 'fixed',
        width: '100%',
        zIndex: '100',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        left: 0,
    },
    menu: {
        margin: 0,
    },
}));


const WorkDetailNavbar = ({ workId }) => {
    const classes = useStyles();

    return <menu className={classes.menu}>
        <Grid
            className={classes.gridContainer}
            component='menu'
            container
            spacing={0}
        >
            <Grid item xs={isAuthenticated() ? 4 : 6}>
                <MenuLink
                    link
                    light={1}
                    to='/'
                >
                    Return
                </MenuLink>
            </Grid>
            {isAuthenticated() && <Grid item xs={4}>
                <MenuLink
                    align='center'
                    link
                    light={1}
                    to='/backend'
                >
                    Backend
                </MenuLink>
            </Grid>}
            {isAuthenticated() && <Grid item xs={isAuthenticated() ? 4 : 6}>
                <MenuLink
                    align='right'
                    link
                    light={1}
                    to={`/backend/works/${workId}`}
                >
                    Edit work
                </MenuLink>
            </Grid>}
        </Grid>
    </menu>
};

export default WorkDetailNavbar;