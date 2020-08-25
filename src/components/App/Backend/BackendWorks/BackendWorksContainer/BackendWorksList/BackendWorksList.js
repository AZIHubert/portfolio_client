import { Box } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useMoveWork, useGetWorks } from '#graphql';
import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendSingleWork from './BackendSingleWork';

const BackendWorksListMemoized = memo(({ works }) => works.map((work, index) =>
    <BackendSingleWork
        _id={work._id}
        index={index}
        key={work._id}
        title={work.title}
    />
));

const BackendWorksList = () => {
    const { loading: loadingWorks, setWorks, works} = useGetWorks();
    
    const [moving, setMoving] = useState({ index: '', workId: '' });
    const [moveWork] = useMoveWork(moving);
    useEffect(() => { if(moving.workId) moveWork(); }, [moving, moveWork]);

    const onDragEnd = r => {
        const { destination, source, draggableId } = r;
        if(!destination) return;
        if(destination.droppableId === source.droppableId &&
           destination.index === source.index) return;
        const changedWork = works.find(work => draggableId === work._id);
        const newWorksId = Array.from(works);
        newWorksId.splice(source.index, 1);
        newWorksId.splice(destination.index, 0, changedWork);
        setWorks(newWorksId);
        setMoving({
            workId: draggableId,
            index: destination.index
        });
    };

    return loadingWorks ? <LoadingData /> : works.length ? <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='0'>
            {provided => <Box ref={provided.innerRef} {...provided.droppableProps}>
                <BackendWorksListMemoized works={works} />
                {provided.placeholder} 
            </Box>}
        </Droppable>
    </DragDropContext> : <NoData title='works' />
};

export default memo(BackendWorksList);