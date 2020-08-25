import { Box, Fade, Modal, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

import Button from '#shared/Button';

const useStyles = makeStyles(theme => ({
    fade: {
        backgroundColor: theme.palette.primaryColor,
        border: `4px solid ${theme.palette.tertiaryColor}`,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
        maxHeight: '95%',
        maxWidth: 1000,
        overflowY: 'auto',
        width: '95%',
        '&:focus': {
            outline: 'none'
        },
    },
    modal: {
        alignItems: 'center',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    paper: {
        padding: theme.spacing(4, 4, 2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3, 2, 2),
        },
    },
    title: {
        color: theme.palette.tertiaryColor,
        textTransform: 'capitalize',
    },
}));

export default ({
    actionTitle,
    children,
    form,
    handleClose,
    handleSubmit,
    loading,
    open,
    title,
    ...rest
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const handleConditionalClose = e => {
        e.preventDefault();
        !loading && handleClose();
    };

    const buttonContainer = <Box display='flex' justifyContent='space-between'>
        <Button
            borderColor={theme.palette.tertiaryColor}
            borderWidth={2}
            loading={loading}
            marginTop={4}
            onClick={handleSubmit}
            type='submit'
            width={150}
        >
            {actionTitle}
        </Button>
        <Button
            borderWidth={2}
            borderColor={theme.palette.tertiaryColor}
            loading={loading}
            marginTop={4}
            onClick={handleConditionalClose}
            width={150}
        >
            Close
        </Button>
    </Box>

    return <Modal
        {...rest}
        className={classes.modal}
        closeAfterTransition
        onClose={handleClose}
        open={loading || open}
    >
        <Fade className={classes.fade} in={loading || open}>
            <div>
                <Box>
                    <Box className={classes.paper}>
                        <Box marginBottom={6}>
                            <Typography className={classes.title} variant='h6'>
                                {loading ? 'WAIT FOR SAVING' : title.toUpperCase()}
                            </Typography>
                        </Box>
                        {form ? <form onSubmit={handleSubmit}>
                            {children}
                            {buttonContainer}
                        </form> : <div>
                            {children}
                            {buttonContainer}
                        </div>}
                    </Box>
                </Box>
            </div>
        </Fade>
    </Modal>
};