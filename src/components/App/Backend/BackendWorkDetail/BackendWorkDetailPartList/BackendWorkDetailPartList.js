import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import HoverBackendPartContextProvider from '#contexts/HoverBackendPartContext';
import { useGetParts, useMovePart } from '#graphql';
import AddPartModal from '#shared/AddPartModal';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import Button from '#shared/Button';

import BackendWorkDetailSinglePart from './BackendWorkDetailSinglePart';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
        padding: theme.spacing(0, 6),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    }
}));

const BackendWorkDetailPartListMemoized = memo(({ parts, workId }) => parts.map((part, index) => <BackendWorkDetailSinglePart
    index={index}
    key={part._id}
    parstLength={parts.length}
    part={part}
    workId={workId}
/> ));

const BackendWorkDetailPartList = ({ workId }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { setDraggableId, resetDraggableId } = useContext(DraggableContext);

    const [moving, setMoving] = useState({ index: '', partId: '' });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const { parts, setParts, loading: loadingParts } = useGetParts(workId);
    const [movePart] = useMovePart(moving, workId);
    
    useEffect(() => { if(moving.partId) movePart() }, [moving, movePart]);

    const onBeforeCapture = useCallback(before => setDraggableId(before.draggableId), []);

    const onDragEnd = r => {
        const { destination, source, draggableId } = r;
        resetDraggableId();
        if(!destination) return;
        if(destination.droppableId === source.droppableId &&
           destination.index === source.index) return;
        const changedPart = parts.find(part => draggableId === part._id);
        const newPartsId = Array.from(parts);
        newPartsId.splice(source.index, 1);
        newPartsId.splice(destination.index, 0, changedPart);
        setParts([ ...newPartsId ]);
        setMoving({
            partId: draggableId,
            index: destination.index
        });
    };

    return <HoverBackendPartContextProvider>
        <BackendPartWrapper removeChildMargin title={'parts'}>
            <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
                <Droppable droppableId='0'>
                    {provided => <Box marginTop={2} ref={provided.innerRef} {...provided.droppableProps}>
                        {(!loadingParts && !!parts.length) && <BackendWorkDetailPartListMemoized parts={parts} workId={workId} />}
                        {provided.placeholder} 
                    </Box>}
                </Droppable>
            </DragDropContext>
            <Box className={classes.buttonContainer}>
                <Button
                    marginBottom={3}
                    borderColor={theme.palette.tertiaryColor}
                    width={180}
                    onClick={handleOpen}
                >
                    Create part
                </Button>
            </Box>
            <AddPartModal
                handleClose={handleClose}
                open={open}
                workId={workId}
            />
        </BackendPartWrapper>
    </HoverBackendPartContextProvider>
};

export default BackendWorkDetailPartList;