import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import { animated, useTransition } from 'react-spring';

const CONTAINER_HEIGHT = 200;
const CROSS_CONTAINER_HEIGHT = 40;

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primaryColor,
        border: `2px solid ${theme.palette.tertiaryColor}`,
        bottom: 60,
        minHeight: CONTAINER_HEIGHT,
        width: 500,
        position: 'fixed',
        right: 40,
        zIndex: 1000,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            right: '5%',
            bottom: 20,
        },
    },
    cross: {
        color: theme.palette.primaryColor,
        cursor: 'pointer',
        fontSize: '1.3rem',
    },
    crossContainer: {
        background: theme.palette.tertiaryColor,
        padding: theme.spacing(0.5, 2),
    },
    text: {
        color: theme.palette.tertiaryColor
    },
    textContainer: {
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
        },
    },
}));

const config = {
    friction: 40,
    precision: 0.1,
    tension: 125,
};

const HomeMailerFormFeedBack = ({ failed, setFailed, setSuccess, success }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onRest = () => {
        setSuccess(false);
        setFailed(false);
    };
    const transitions = useTransition(success, null, {
        config,
        from: { opacity: 0, height: 0 },
        enter: success => async next => await next({ height: 200, opacity: 1 }),
        leave: success => async (next) => {
          await next({ opacity: 0 });
          await next({ height: 0 });
        },
        onRest,
    });

    const handleSuccess = () => setSuccess(false);

    return transitions.map(({
        item,
        key,
        props: { life, ...style }
    }) => item && <animated.div
        className={classes.container}
        key={key}
        style={style}
    >
        <Box height={CONTAINER_HEIGHT} width='100%'>
            <Box
                className={classes.crossContainer}
                display='flex'
                height={CROSS_CONTAINER_HEIGHT}
                justifyContent='flex-end'
                width='100%'
            >
                <Typography
                    className={classes.cross}
                    onClick={handleSuccess}
                    variant='body1'
                >
                    x
                </Typography>
            </Box>
            <Box
                alignItems='center'
                className={classes.textContainer}
                display='flex'
                height={CONTAINER_HEIGHT - CROSS_CONTAINER_HEIGHT}
                justifyContent='center'
                textAlign='center'
                width='100%'
            >
                <Typography className={classes.text} variant='body1'>
                    {
                        !failed ?
                        'Thank you, your mail has been successfully send.' :
                        'Sorry something went wrong, try to send me an email again.'
                    }
                </Typography>
            </Box>
        </Box>
    </animated.div>);
};

export default HomeMailerFormFeedBack;