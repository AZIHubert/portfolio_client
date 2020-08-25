import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import Button from '#shared/Button';

const useStyles = makeStyles(theme => ({
    paddingLR: {
        padding: theme.spacing(0, 6),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    },
    paddingTB: {
        padding: theme.spacing(4, 0)
    },
    title: {
        fontSize: '2.5rem',
    },
}));

const BackendPartWrapper = ({ children, removeChildMargin, returnButton, title, to }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return <div className={classes.paddingTB}>
        {!!returnButton && <Box className={classes.paddingLR}>
            <Button
                backgroundColor={theme.palette.primaryColor}
                borderColor={theme.palette.tertiaryColor}
                color={theme.palette.tertiaryColor}
                link
                marginBottom={3}
                to={to}
                width={70}
            >
                Return
            </Button>
        </Box>}
        <Box className={classes.paddingLR}>
            <Typography className={classes.title} variant='h3' >
                {title}
            </Typography>
        </Box>
        <Box className={clsx({
            [classes.paddingLR]: !removeChildMargin
        })} marginTop={4}>
            {children}
        </Box>
    </div>
};

export default BackendPartWrapper;
