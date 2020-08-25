import { Grid } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';

const useStyles = makeStyles(theme => ({
    text: {
        lineHeight: '1.55'
    },
    textInnerContainer: {
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
        },
    },
    textOuterContainer: {
        paddingBottom: theme.spacing(5),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(1),
        },
    },
}));

const HomeBiography = ({ biography }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <Grid
        className={classes.textOuterContainer}
        container
        direction='row'
        justify='center'
    >
        <Grid
            item
            sm={10}
            xs={12}
        >
            <div className={classes.textInnerContainer}>
                {biography.split('\n').map((splite, index) => <div key={index}>
                    <AnimatedTypography
                        className={classes.text}
                        variant='body1'
                    >
                        {splite}
                    </AnimatedTypography>
                </div>)}
            </div>
        </Grid>
    </Grid>
};

export default HomeBiography;