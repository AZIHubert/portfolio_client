import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { useGetTypes } from '#graphql';
import AddTypeModal from '#shared/AddTypeModal';
import Button from '#shared/Button';
import Modal from '#shared/Modal';
import NoData from '#shared/NoData';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.quaternaryColor,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        padding: theme.spacing(2, 3),
    },
    type: {
        color: theme.palette.tertiaryColor,
        fontSize: '0.8rem',
        lineHeight: 1,
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    typeContainer: {
        background: theme.palette.primaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        cursor: 'pointer',
        borderRadius: 25,
        marginRight: theme.spacing(0.8),
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.7, 1),
        transition: '0.6s',
        '&:hover': {
            background: theme.palette.tertiaryColor,
            '& p': {
                color: theme.palette.primaryColor,
            },
        },
    },
}));

const ListTypesModal = ({
    handleAdd,
    handleClose,
    handleRemove,
    open,
    selectedTypes,
}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { types, loading: loadingTypes } = useGetTypes();

    const [openType, setOpenType] = useState(false);
    const handleOpenType = () => setOpenType(true);
    const handleCloseType = () => setOpenType(false);

    const handleSelection = newType => {
        if(selectedTypes.filter(type => type._id === newType._id).length) handleRemove(newType);
        else handleAdd(newType);
    }

    return <Modal
        actionTitle='OK'
        handleClose={handleClose}
        handleSubmit={handleClose}
        open={open}
        title='Select types'
    >
        <Button
            borderColor={theme.palette.tertiaryColor}
            borderRadius={0}
            marginBottom={3}
            marginTop={3}
            onClick={handleOpenType}
            width={170}
        >
            Create new Type
        </Button>
        {(!loadingTypes && types.length) ? <Box
            className={classes.container}
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
        >
            {types.map(type => <div
                className={classes.typeContainer}
                key={type._id} 
                onClick={() => handleSelection(type)}
                style={{
                    backgroundColor: 
                        selectedTypes.filter(t => t._id === type._id).length ?
                        theme.palette.tertiaryColor :
                        theme.palette.primaryColor
                }}
            >
                <Typography
                    className={classes.type}
                    style={{
                        color: selectedTypes.filter(t => t._id === type._id).length ?
                            theme.palette.primaryColor :
                            theme.palette.tertiaryColor
                    }}
                    variant='body1'
                >
                    {type.title}
                </Typography>
            </div>)}
        </Box> : <NoData title='type' />}
        <AddTypeModal handleClose={handleCloseType} open={openType} />
    </Modal>
};

export default ListTypesModal;