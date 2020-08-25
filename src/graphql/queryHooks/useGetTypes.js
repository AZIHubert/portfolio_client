import { useState, useEffect } from 'react';

import { GET_TYPES } from '../queries';

import { typesVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [types, setTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_TYPES, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setTypes(data.getTypes);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getTypes);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { types, setTypes, loading: isLoading };
};