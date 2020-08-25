import { Box, Grid } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import TextAnimation from '#shared/TextAnimation';

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: props => theme.spacing(props.paddingBottom !== undefined ? props.paddingBottom : 5),
    },
    childrenContainer: {
        paddingLeft: theme.spacing(1),
    },
    date: {
        color: theme.palette.tertiaryColor,
    },
    icon: {
        color: theme.palette.tertiaryColor,
        fontSize: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
    },
    text: {
        textTransform: 'uppercase',
    }
}));

const HomeSubListItem = props => {
    const theme = useTheme();
    const classes = useStyles(props);

    const { children, date, fullWidth, icon: Icon, title, titleLink } = props;
    
    return <Grid
        className={classes.container}
        container
        spacing={0}
    >
        <Grid
            align='right'
            item
            xs={2}
        >
            <Box paddingRight={2}>
                {!!Icon ? <Icon className={classes.icon} /> : !!date && <TextAnimation
                    className={classes.date}
                    variant='body1'
                    xMoving
                    yMoving
                >
                    {date}
                </TextAnimation>}
            </Box>
        </Grid>
        <Grid
            className={classes.childrenContainer}
            item
            sm={fullWidth ? 10 : 4}
            xs={fullWidth ? 10 : 8}
        >
            
            {(!!title || !!titleLink) && (!!titleLink ? <AnimatedTypography
                className={classes.text}
                component='a'
                href={titleLink}
                target='_blank'
                variant='body2'
            >
                {title}
            </AnimatedTypography> : <AnimatedTypography
                className={classes.text}
                variant='body1'
            >
                {title}
            </AnimatedTypography>)}
            {children}
        </Grid>
    </Grid>
};

export default HomeSubListItem;