import { useState, useEffect } from 'react';

import { GET_DEGREES } from '../queries';

import { degreesVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [degrees, setDegrees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_DEGREES, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setDegrees(data.getDegrees);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getDegrees);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { degrees, setDegrees, loading: isLoading };
};