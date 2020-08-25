import React from 'react';
import { useParams } from 'react-router-dom';

import DraggableContextProvider from '#contexts/DraggableContext';
import { useGetWork } from '#graphql';

import BackendWorkDetailForm from './BackendWorkDetailForm';
import BackendWorkDetailPartList from './BackendWorkDetailPartList';

const BackendWorkDetail = () => {

    const { workId } = useParams();
    const { work, loading: loadingWork } = useGetWork(workId);

    return (!loadingWork && !!Object.keys(work).length) && <div>
        <BackendWorkDetailForm work={work} />
        <DraggableContextProvider>
            <BackendWorkDetailPartList workId={work._id} />
        </DraggableContextProvider>
    </div>
};

export default BackendWorkDetail;