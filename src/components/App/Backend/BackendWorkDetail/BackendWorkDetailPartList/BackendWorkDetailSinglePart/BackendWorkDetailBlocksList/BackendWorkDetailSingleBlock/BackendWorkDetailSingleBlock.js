import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import { HoverBackendPartContext } from '#contexts/HoverBackendPartContext';
import { useDeleteBlock, useGetContents } from '#graphql';
import AddButton from '#shared/AddButton';
import AddBlockModal from '#shared/AddBlockModal';
import AddContentModal from '#shared/AddContentModal';
import DeleteModal from '#shared/DeleteModal';

import BackendWorkDetailContentsList from './BackendWorkDetailContentsList';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        width: '100%',
        '&.dragging': {
            backgroundColor: theme.palette.primaryColor,
        },
        '&.hover': {
            outline: `2px dotted ${theme.palette.tertiaryColor}`,
        },
    },
    contentContainer: {
        padding: theme.spacing(2, 1),
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
        zIndex: 10,
        '&.hover': {
            opacity: 1,
        },
        [theme.breakpoints.down('sm')]: {
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

const BackendWorkDetailSingleBlock = ({ alignItems, block, blocksLength, blockSize, index, partId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { handleHoverBlock, handleLeaveBlock, hoverBlock } = useContext(HoverBackendPartContext);
    const { draggableId } = useContext(DraggableContext);

    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(true);
        handleHoverBlock();
    };
    const handleLeave = () => {
        setHover(false);
        handleLeaveBlock();
    };

    const [openCreate, setOpenCreate] = useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);
    
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    
    const [deleteBlock, { loading: loadingDelete }] = useDeleteBlock({ blockId: block._id }, partId, handleCloseDelete);
    
    const { contents, setContents, loading: loadingContents } = useGetContents(block._id);

    return <Draggable
        draggableId={block._id}
        isDragDisabled={blocksLength < 2}
        index={index}
    >
        {(provided, snapshot) => <Grid
            item
            md={3 * block.size}
            ref={provided.innerRef}
            xs={12}
            {...provided.draggableProps}
        >
            <Box 
                alignItems={alignItems}
                display='flex'
                height='100%'
            >
                <Box
                    className={clsx(classes.container, {
                        ['hover']: ((hover && hoverBlock) || snapshot.isDragging),
                        ['dragging']: snapshot.isDragging
                    })}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                >
                    <Box className={clsx(classes.informations, {
                        ['hover']: ((hover && hoverBlock) || snapshot.isDragging),
                    })}>
                        <Box className={classes.titleContainer}>
                            <Typography className={classes.title} variant='body1'>
                                {`Block #${index + 1}`}
                            </Typography>
                        </Box>
                        <Box
                            alignItems='center'
                            className={classes.editors}
                            display='flex'
                        >
                            <Box display='flex'>
                                {(blockSize < 4 || block.size > 1) && <Box
                                    alignItems='center'
                                    className={classes.iconContainer}
                                    display='flex'
                                    onClick={handleOpenEdit}
                                >
                                    <EditIcon className={clsx(classes.icon, classes.iconHover)} />
                                </Box>}
                                <Box
                                    alignItems='center'
                                    className={classes.iconContainer}
                                    display='flex'
                                    onClick={handleOpenDelete}
                                >
                                    <DeleteOutlineIcon className={clsx(classes.icon, classes.iconHover)} />
                                </Box>
                                {blocksLength > 1 && <Box
                                    alignItems='center'
                                    className={classes.iconContainer}
                                    display='flex'
                                    {...provided.dragHandleProps}
                                >
                                    <UnfoldMoreIcon className={classes.icon} />
                                </Box>}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.contentContainer}>
                        {(!loadingContents && draggableId !== block._id) && <BackendWorkDetailContentsList
                            blockId={block._id}
                            blockSize={block.size}
                            contents={contents}
                            setContents={setContents}
                        />}
                    </Box>
                <AddButton onClick={handleOpenCreate} />
                </Box>
                <DeleteModal
                    actionTitle='delete'
                    handleClose={handleCloseDelete}
                    handleSubmit={deleteBlock}
                    loading={loadingDelete}
                    open={openDelete}
                    title='Delete block'
                />
                <AddBlockModal
                    blockSize={blockSize}
                    handleClose={handleCloseEdit}
                    initialBlock={block}
                    open={openEdit}
                    partId={partId}
                />
                <AddContentModal
                    blockId={block._id}
                    open={openCreate}
                    handleClose={handleCloseCreate}
                />
            </Box>
        </Grid>}
    </Draggable>
};

export default BackendWorkDetailSingleBlock;