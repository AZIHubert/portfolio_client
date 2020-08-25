import { useState, useEffect } from 'react';

import { GET_BLOCKS } from '../queries';

import { blocksVariables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (partId, onSuccess, onError) => {
    const [blocks, setBlocks] = useState([]);

    const { loading, data, error } = useQuery(GET_BLOCKS, { variables: blocksVariables(partId) });
    
    useEffect(() => {
        const onCompleted = data => {
            setBlocks(data.getBlocks);
            if (typeof onSuccess === 'function') onSuccess(data.getBlocks);
        };
        if (!loading && !error) { onCompleted(data); }
        if (typeof onError === 'function' && !loading && error) onError(error);
    }, [loading, data, error, onSuccess, onError]);

    return { blocks, setBlocks, loading };
};