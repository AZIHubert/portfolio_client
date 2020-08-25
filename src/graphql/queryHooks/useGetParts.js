import { useState, useEffect } from 'react';

import { GET_PARTS } from '../queries';

import { partsVariables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (workId, onSuccess, onError) => {
    const [parts, setParts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_PARTS, { variables: partsVariables(workId) });

    useEffect(() => {
        const onCompleted = data => {
            setParts(data.getParts);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getParts);
        }
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { parts, setParts, loading: isLoading };
};