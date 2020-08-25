import { useState, useEffect } from 'react';

import { GET_WORKSHOPS } from '../queries';

import { workshopsVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_WORKSHOPS, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setWorkshops(data.getWorkshops);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getWorkshops);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { workshops, setWorkshops, loading: isLoading };
};