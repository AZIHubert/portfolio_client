import clsx from 'clsx';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

import Button from '#shared/Button';
import FieldContainer from '#shared/FieldContainer';

import ListTypesModal from './ListTypesModal';

const useStyles = makeStyles(theme => ({
    type: {
        color: theme.palette.tertiaryColor,
        fontSize: '0.8rem',
        lineHeight: 1,
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
    },
    typeContainer: {
        background: theme.palette.primaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        borderRadius: 25,
        cursor: 'pointer',
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(0.6),
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(0.7, 1),
        transition: '0.6s',
        '&.disabled': {
            opacity: 0.5,
        },
        '&:hover': {
            background: theme.palette.tertiaryColor,
            '& p': {
                color: theme.palette.primaryColor,
            },
        },
    },
}));

const TypesField = ({
    disabled,
    handleAddTypes,
    handleRemoveTypes,
    minHeight,
    selectedTypes,
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [open, setOpen] = useState(false);
    const handleOpen = e => {
        e.preventDefault();
        if(!disabled) setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleClick = item => {
        if(!disabled) handleRemoveTypes(item);
    };

    const transitions = useTransition(selectedTypes, type => type._id, {
        initial: {
            opacity: 1,
            transform: 'translate3d(0%, 0%,0)  scale(1)'
        },
        from: {
            opacity: 0,
            transform: 'translate3d(0%,-50%,0) scale(0.9)'
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(0%, 0%,0)  scale(1)'
        },
        leave: {
            opacity: 0,
            transform: 'translate3d(0%,-50%,0)  scale(0.9)'
        },
        config: { duration: 300 },
    });

    return <FieldContainer disabled={disabled} label='Types' minHeight={minHeight ? minHeight : 175}>
        <Box
            alignItems='center'
            display='flex'
            flexWrap='wrap'
        >
            {transitions.map(({ item, key, props }) =>
                <animated.div key={key} style={props}>
                    <Box className={clsx(classes.typeContainer, {
                        ['disabled']: disabled
                    })} onClick={() => handleClick(item)}>
                        <Typography  className={classes.type} variant='body1'>
                            {item.title}
                        </Typography>
                    </Box>
                </animated.div>
            )}
            <Button
                borderWidth={2}
                color={theme.palette.primaryColor}
                loading={disabled}
                onClick={handleOpen}
                width={140}
            >
                Add type
            </Button>
        </Box>
        <ListTypesModal
            handleAdd={handleAddTypes}
            handleClose={handleClose}
            handleRemove={handleRemoveTypes}
            open={open}
            selectedTypes={selectedTypes}
        />
    </FieldContainer>
};

export default TypesField;