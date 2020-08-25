import { useState, useEffect } from 'react';

import { GET_CONTENTS } from '../queries';

import { contentsVariables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (blockId, onSuccess, onError) => {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_CONTENTS, { variables: contentsVariables(blockId) });
    
    useEffect(() => {
        const onCompleted = data => {
            setContents(data.getContents);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getContents);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { contents, setContents, loading: isLoading };
};