import { Box, Grid, withWidth } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import { useMoveBlock } from '#graphql';

import BackendWorkDetailSingleBlock from './BackendWorkDetailSingleBlock';

const useStyles = makeStyles(theme => ({
    createContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    }
}));

const BlocksList = props => {
    const classes = useStyles(props);

    const { setDraggableId, resetDraggableId } = useContext(DraggableContext);

    const {
        blocks,
        blockSize,
        part: {
            _id,
            alignItems,
            justifyContent,
            spacing
        },
        setBlocks,
        width
    } = props;    
    
    const [moving, setMoving] = useState({ index: '', blockId: '' });
    const [moveBlock] = useMoveBlock(moving, _id);
    useEffect(() => { if(moving.blockId) moveBlock() }, [moving, moveBlock]);

    const onBeforeCapture = useCallback(before => setDraggableId(before.draggableId), []);

    const onDragEnd = r => {
        const { destination, source, draggableId } = r;
        resetDraggableId();
        if(!destination) return;
        if(destination.droppableId === source.droppableId &&
           destination.index === source.index) return;
        const changedBlock = blocks.find(block => draggableId === block._id);
        const newBlocksId = Array.from(blocks);
        newBlocksId.splice(source.index, 1);
        newBlocksId.splice(destination.index, 0, changedBlock);
        setBlocks([ ...newBlocksId ]);
        setMoving({
            blockId: draggableId,
            index: destination.index
        });
    };

    return <Box className={classes.blockContainer}>
        <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
            <Droppable droppableId='0' direction={width === 'xs' ? 'vertical' : 'horizontal'}>
                {provided => <Grid
                    alignItems='stretch'
                    container
                    justify={justifyContent}
                    ref={provided.innerRef}
                    spacing={spacing}
                    {...provided.droppableProps}
                >
                    {blocks.map((block, index) => <BackendWorkDetailSingleBlock
                        alignItems={alignItems}
                        block={block}
                        blocksLength={blocks.length}
                        blockSize={blockSize}
                        index={index}
                        key={block._id}
                        partId={_id}
                    />)}
                    {provided.placeholder}
                </Grid>}
            </Droppable>
        </DragDropContext>
    </Box>
};

export default withWidth()(BlocksList);