import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ScrollContext } from '#contexts/ScrollContext';
import isAuthenticated from '#shared/isAuthenticated';
import MenuLink from '#shared/MenuLink';

const useStyles = makeStyles(theme => ({
    bottom: {
        bottom: 0,
    },
    gridContainer: {
        boxSizing: 'border-box',
        left: 0,
        margin: 0,
        padding: theme.spacing(1),
        pointerEvents: 'none',
        position: 'fixed',
        width: '100%',
        zIndex: '100',
    },
    left: {
        textAlign: 'left',
    },
    menu: {
        margin: 0,
    },
    right: {
        textAlign: 'right',
    },
    top: {
        top: 0,
    },
}));

const scrollToPart = ({ current }) => current.scrollIntoView({ behavior: 'smooth' });

const HomeNavbar = ({ hasAbout, hasContact, hasWorks }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { activeLink, light, refs } = useContext(ScrollContext);

    return <menu className={classes.menu}>
        <Grid
            className={clsx(classes.gridContainer, classes.top)}
            component='menu'
            container
            spacing={0}
        >
            <Grid
                className={classes.left}
                item
                xs={isAuthenticated() ? 4 : 6}
            >
                <MenuLink
                    active={activeLink === 'home'}
                    light={light ? 1 : 0}
                    onClick={() => scrollToPart(refs['home'])}
                >
                    allan aoudji
                </MenuLink>
            </Grid>
            {isAuthenticated() && <Grid item xs={4}>
                <MenuLink
                    align='center'
                    link
                    light={light ? 1 : 0}
                    to='/backend'
                >
                    backend
                </MenuLink>
            </Grid>}
            <Grid item xs={isAuthenticated() ? 4 : 6} >
                {hasWorks && <MenuLink
                    active={activeLink === 'works'}
                    align='right'
                    light={light ? 1 : 0}
                    onClick={() => scrollToPart(refs['works'])}
                >
                    works
                </MenuLink>}
            </Grid>
        </Grid>
        <Grid
            className={clsx(classes.gridContainer, classes.bottom)}
            container
            spacing={0}
        >
            <Grid
                className={classes.left}
                item
                xs={6}
            >
                {hasAbout && <MenuLink
                    active={activeLink === 'about'}
                    light={light ? 1 : 0}
                    onClick={() => scrollToPart(refs['about'])}
                >
                    about
                </MenuLink>}
            </Grid>
            <Grid item xs={6}>
                {hasContact && <MenuLink
                    active={activeLink === 'contact'}
                    align='right'
                    light={light ? 1 : 0}
                    onClick={() => scrollToPart(refs['contact'])}
                >
                    contact
                </MenuLink>}
            </Grid>
        </Grid>
    </menu>
};

export default HomeNavbar;