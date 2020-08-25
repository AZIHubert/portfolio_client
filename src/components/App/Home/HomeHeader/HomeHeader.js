import { Box, Grid, withWidth } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { memo, useContext } from 'react';

import MultilineAnimation from '#shared/MultilineAnimation';
import { ScrollContext } from '#contexts/ScrollContext';
import Parallax from '#shared/Parallax';
import AnimatedTypography from '#shared/AnimatedTypography';

const useStyles = makeStyles(theme => ({
    bold: {
        fontFamily: 'FedraSansStdBookItalic',
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.primaryColor,
        },
    },
    header: {
        padding: '29vh 0 23vh 0 ',
    },
    multilineText: {
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
            color: theme.palette.primaryColor,
        },
    },
    textContainer: {
        padding: theme.spacing(0, 1),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 3),
        },
    },
    text: {
        color: theme.palette.tertiaryColor,
    },
}));

const HeaderContainerMemoized = withWidth()(memo(({ width }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const text = width === 'xs' ? (
        <AnimatedTypography className={classes.text} variant='h5'>
            Hello world! My name is <span className={classes.bold}>Allan Aoudji</span>,
            I’m a print & web graphic designer,
            <span className={classes.bold}>based in Paris (FR).</span>
        </AnimatedTypography>
    ) : (
        <MultilineAnimation
            texts={[
                <p className={classes.multilineText}>Hello world! My name is <span className={classes.bold}>Allan Aoudji</span></p>,
                <p className={classes.multilineText}>I’m a print & web graphic designer,</p>,
                <p className={classes.multilineText}><span className={classes.bold}>based in Paris (FR).</span></p>
            ]}
            variant='h5'
        />
    );
    return <Grid container direction='row' justify='flex-end'>
        <Grid item xs={12} className={classes.textContainer}>
            <Box textAlign='center'>
                <Parallax ratio={-0.1}>
                    {text}
                </Parallax>
            </Box>
        </Grid>
    </Grid>
}));

const HeaderContainer = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { refs } = useContext(ScrollContext);
    
    return <header id='header' ref={refs['home']} className={classes.header}>
        <HeaderContainerMemoized />
    </header>
};

export default HeaderContainer;