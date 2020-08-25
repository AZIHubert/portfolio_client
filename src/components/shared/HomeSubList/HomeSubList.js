import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Parallax from '#shared/Parallax';
import AnimatedTypography from '#shared/AnimatedTypography';

const useStyles = makeStyles(theme => ({
    itemContainer: {
        paddingBottom: props => theme.spacing(props.paddingBottom !== undefined ? props.paddingBottom : 6),
        paddingLeft: theme.spacing(1),
        textTransform: 'uppercase',
    },
    title: {
        color: theme.palette.tertiaryColor,
        fontFamily: 'FedraSansStdBold',
    }
}));

const HomeSubList = props => {
    const classes = useStyles(props);

    const { title, itemsLength, children } = props;

    return <Box>
        <Grid
            container
            direction='row'
            justify='flex-end'
        >
            <Grid
                className={classes.itemContainer}
                item
                xs={10}
            >
                <Parallax
                    horizontale
                    ratio={0.075}
                    relativeToPercent={25}
                >
                    <AnimatedTypography
                        variant='body1'
                        className={classes.title}
                        yMoving
                    >
                        {itemsLength > 1 ? `${title}s` : title}
                    </AnimatedTypography>
                </Parallax>
            </Grid>
        </Grid>
        <Grid container spacing={0}>
            {children}
        </Grid>
    </Box>
};

export default HomeSubList;