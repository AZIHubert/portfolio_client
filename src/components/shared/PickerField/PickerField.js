import clsx from 'clsx';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

import FieldContainer from '#shared/FieldContainer';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1.5),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    state: {
        color: theme.palette.tertiaryColor,
        fontSize: '0.8rem',
        lineHeight: '1.1rem',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    stateContainer: {
        backgroundColor: theme.palette.primaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        borderRadius: 15,
        cursor: 'pointer',
        marginBottom: 0,
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.4, 1.4),
        transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        '&.disabled': {
            opacity: 0.5,
        },
        '&:hover, &.active': {
            backgroundColor: theme.palette.tertiaryColor,
            '& p': {
                color: theme.palette.quaternaryColor,
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
        },
    },
}));

const PickerField = ({
    disabled,
    handleClick,
    label,
    minHeight,
    selected,
    states,
    transformState,
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const transform = transformState ? transformState : e => e;

    const conditionalHandleClick = state => {
        if(!disabled) handleClick(state);
    };
    
    return <FieldContainer disabled={disabled} label={label} minHeight={minHeight ? minHeight : 175}>
        <Box className={classes.container}>
            {states.map(state => (
                <Box
                    className={clsx(classes.stateContainer, {
                        ['active']: selected === state,
                        ['disabled']: disabled
                    })}
                    key={label + state}
                    onClick={() => conditionalHandleClick(state)}
                    textAlign='center'
                >
                    <Typography className={classes.state} variant='body1'>
                        {transform(state)}
                    </Typography>
                </Box>
            ))}
        </Box>
    </FieldContainer>
};

export default PickerField;