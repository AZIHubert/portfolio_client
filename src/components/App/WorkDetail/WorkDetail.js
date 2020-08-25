import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useGetParts, useGetWork, useGetWorks } from '#graphql';

import WorkDetailHeader from './WorkDetailHeader';
import WorkDetailNavbar from './WorkDetailNavbar';
import WorkDetailNextProject from './WorkDetailNextProject';
import WorkDetailPart from './WorkDetailPart';

const WorkDetail = () => {
    const history = useHistory();
    const { workId } = useParams();

    useEffect(() => window.scrollTo(0, 0));
    
    const [nextWork, setNextWork] = useState({ _id: '', thumbnailUrl: null });

    const onError = useCallback(() => history.push('/404'), [history]);
    const onSuccess = useCallback(() => {}, []);

    const { work, loading: loadingWork } = useGetWork(workId, onSuccess, onError);
    const { works, loading: loadingWorks } = useGetWorks();
    const { parts, loading: loadingParts } = useGetParts(workId);

    useEffect(() => {
        if(!loadingWork && !loadingWorks && works.length > 1) {
            const nextWorkIndex = (work.index + 1) % works.length;
            setNextWork({
                _id: works[nextWorkIndex]._id,
                thumbnailUrl: !!works[nextWorkIndex].thumbnail ? works[nextWorkIndex].thumbnail.url : null
            });
        }
    }, [loadingWork, loadingWorks, work, works]);

    return (!loadingWork && !loadingParts && !loadingWorks) && <div>
        <WorkDetailNavbar workId={workId} />
        <div>
            {!!Object.keys(work).length && <WorkDetailHeader
                date={new Date(work.date).getFullYear()}
                thumbnailUrl={work.thumbnail ? work.thumbnail.url : null}
                title={work.title}
                titleColor={work.titleColor}
            />}
            {!!parts.length && parts.map(part => <WorkDetailPart key={part._id} part={part} />)}
        </div>
        {works.length > 1 && <WorkDetailNextProject nextWorkId={nextWork._id} thumbnailUrl={nextWork.thumbnailUrl} />}
    </div>
};

export default WorkDetail;