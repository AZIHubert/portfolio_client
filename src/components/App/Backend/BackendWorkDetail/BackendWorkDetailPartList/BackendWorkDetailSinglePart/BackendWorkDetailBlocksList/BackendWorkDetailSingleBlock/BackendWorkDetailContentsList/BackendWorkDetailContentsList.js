import { Box } from '@material-ui/core';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import { useMoveContent } from '#graphql';

import BackendWorkDetailSingleContent from './BackendWorkDetailSingleContent';

const BackendWorkDetailContentsList = ({
    blockId,
    contents,
    setContents,
}) => {

    const { setDraggableId, resetDraggableId } = useContext(DraggableContext);

    const [moving, setMoving] = useState({ index: '', contentId: '' });
    const [moveContent] = useMoveContent(moving, blockId);
    useEffect(() => { if(moving.contentId) moveContent(); }, [moving, moveContent]);

    const onBeforeCapture = useCallback(before => setDraggableId(before.draggableId), []);

    const onDragEnd = r => {
        const { destination, source, draggableId } = r;
        resetDraggableId();
        if(!destination) return;
        if(destination.droppableId === source.droppableId &&
           destination.index === source.index) return;
        const changedContent = contents.find(content => draggableId === content._id);
        const newContentsId = Array.from(contents);
        newContentsId.splice(source.index, 1);
        newContentsId.splice(destination.index, 0, changedContent);
        setContents(newContentsId);
        setMoving({
            contentId: draggableId,
            index: destination.index
        });
    };
    
    return <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
        <Droppable droppableId='0'>
            {provided => <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {contents.map((content, index) => <BackendWorkDetailSingleContent
                    blockId={blockId}
                    content={content}
                    contentsLength={contents.length}
                    index={index}
                    key={content._id}
                />)}
                {provided.placeholder}
            </Box>}
        </Droppable>
    </DragDropContext>
}

export default BackendWorkDetailContentsList;