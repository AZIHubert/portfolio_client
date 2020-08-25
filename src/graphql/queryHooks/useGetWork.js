import { useState, useEffect } from 'react';

import { GET_WORK } from '../queries';

import { workNormalize } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (workId, onSuccess, onError) => {
    const [work, setWork] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_WORK, { variables: { workId } });

    useEffect(() => {
        const onCompleted = data => {
            const dataNormalized = workNormalize(data.getWork);
            setWork(dataNormalized);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(dataNormalized);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { work, setWork, loading: isLoading }
};