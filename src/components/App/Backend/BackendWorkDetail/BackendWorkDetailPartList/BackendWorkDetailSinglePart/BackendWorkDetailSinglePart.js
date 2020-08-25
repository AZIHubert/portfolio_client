import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import clsx from 'clsx';
import React, { memo, useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import { HoverBackendPartContext } from '#contexts/HoverBackendPartContext';
import { useDeletePart, useGetBlocks } from '#graphql';
import AddBlockModal from '#shared/AddBlockModal';
import AddButton from '#shared/AddButton';
import AddPartModal from '#shared/AddPartModal';
import DeleteModal from '#shared/DeleteModal';

import BackendWorkDetailBlocksList from './BackendWorkDetailBlocksList';

const useStyles = makeStyles(theme => ({
    blocksContainer: {
        padding: theme.spacing(2),
    },
    container: {
        backgroundColor: props => props.part.disableBackground ?
            props.part.backgroundColor :
            theme.palette.primaryColor,
        margin: theme.spacing(0, 1, 2, 1),
        position: 'relative',
        '&.hover': {
            outline: `2px dotted ${theme.palette.tertiaryColor}`,
        },
    },
    editors: {
        backgroundColor: theme.palette.tertiaryColor,
        padding: theme.spacing(0.5, 0, 0.5, 1),
    },
    icon: {
        color: theme.palette.primaryColor,
        fontSize: '1.2rem',
        pointerEvents: 'auto',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        [theme.breakpoints.down('md')]: {
            fontSize: '0.8rem',
        },
    },
    iconContainer: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(0.5),
        },
    },
    iconHover: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.secondaryColor,
        },
    },
    informations: {
        alignItems: 'center',
        display: 'flex',
        padding: theme.spacing(0.5, 1),
        justifyContent: 'space-between',
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: '0.5s',
        width: '100%',
        zIndex: 100,
        '&.hover': {
            opacity: 1,
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1),
        },
    },
    title: {
        color: theme.palette.tertiaryColor,
        fontSize: '1rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.6rem',
        },
    },
    titleContainer: {
        backgroundColor: theme.palette.primaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        padding: theme.spacing(0.5, 1),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0.5),
        },
    },
}));

const BlockContainerMemoized = memo(({ blocks, blockSize, part, setBlocks }) => {
    return <BackendWorkDetailBlocksList
        blockSize={blockSize}
        blocks={blocks}
        part={part}
        setBlocks={setBlocks}
    />
});

const SinglePart = props => {
    const classes = useStyles(props);

    const { index, parstLength, part, workId } = props;
    
    const { handleHoverPart, handleLeavePart, hoverPart } = useContext(HoverBackendPartContext);
    const { draggableId } = useContext(DraggableContext);

    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(true);
        handleHoverPart();
    };
    const handleLeave = () => {
        setHover(false);
        handleLeavePart();
    };

    const [openCreateBlock, setOpenCreateBlock] = useState(false);
    const handleOpenCreateBlock = () => setOpenCreateBlock(true);
    const handleCloseCreateBlock = () => setOpenCreateBlock(false);

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    
    const [deletePart, { loading: loadingDelete }] = useDeletePart({ partId: part._id }, workId, handleCloseDelete);

    const { blocks, loadingBlocks, setBlocks } = useGetBlocks(part._id);
    
    const blockSize = blocks.map(block => block.size).reduce((prev, curr) => prev + curr, 0);

    return <Draggable
        draggableId={part._id}
        isDragDisabled={parstLength < 2}
        index={index}
    >
        {(provided, snapshot) => <Box
            className={clsx(classes.container, {
                ['hover']: ((hover && hoverPart) || snapshot.isDragging),
            })}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <Box className={clsx(classes.informations, {
                ['hover']: ((hover && hoverPart) || snapshot.isDragging),
            })}>
                <Box className={classes.titleContainer}>
                    <Typography className={classes.title} variant='body1'>
                        {`Part #${index + 1}`}
                    </Typography>
                </Box>
                <Box
                    alignItems='center'
                    className={classes.editors}
                    display='flex'
                >
                    <Box
                        alignItems='center'
                        className={classes.iconContainer}
                        display='flex'
                        onClick={handleOpenEdit}
                    >
                        <EditIcon className={clsx(classes.icon, classes.iconHover)} />
                    </Box>
                    <Box
                        alignItems='center'
                        className={classes.iconContainer}
                        display='flex'
                        onClick={handleOpenDelete}
                    >
                        <DeleteOutlineIcon className={clsx(classes.icon, classes.iconHover)} />
                    </Box>
                    {parstLength > 1 && <Box
                        alignItems='center'
                        className={classes.iconContainer}
                        display='flex'
                        {...provided.dragHandleProps}
                    >
                        <UnfoldMoreIcon className={classes.icon} />
                    </Box>}
                </Box>
            </Box>
            <Box className={classes.blocksContainer}>
                {(!loadingBlocks && draggableId !== part._id) && <BlockContainerMemoized
                    blocks={blocks}
                    blockSize={blockSize}
                    part={part}
                    setBlocks={setBlocks}
                />}
            </Box>
            {blockSize < 4 && <AddButton onClick={handleOpenCreateBlock} />}
            <AddBlockModal
                blockSize={blockSize}
                handleClose={handleCloseCreateBlock}
                open={openCreateBlock}
                partId={part._id}
            />
            <AddPartModal
                handleClose={handleCloseEdit}
                initialPart={part}
                open={openEdit}
                workId={workId}
            />
            <DeleteModal
                actionTitle='delete'
                handleClose={handleCloseDelete}
                handleSubmit={deletePart}
                loading={loadingDelete}
                open={openDelete}
                title='Delete type'
            />
        </Box>}
    </Draggable>
};

export default SinglePart;