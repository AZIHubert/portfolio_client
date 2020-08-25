import { useState, useEffect } from 'react';

import { GET_WORKS } from '../queries';

import { workNormalize, worksVariables, displayedWorksVariables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (display, onSuccess, onError) => {
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_WORKS, { variables: display ? displayedWorksVariables : worksVariables });

    useEffect(() => {
        const onCompleted = data => {
            const dataNormalized = data.getWorks.map(work => workNormalize(work));
            setWorks(data.getWorks);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(dataNormalized);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return {works, setWorks, loading: isLoading };
};