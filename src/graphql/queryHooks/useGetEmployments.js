import { useState, useEffect } from 'react';

import { GET_EMPLOYMENTS } from '../queries';

import { employmentsVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [employments, setEmployments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_EMPLOYMENTS, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setEmployments(data.getEmployments);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getEmployments);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

return { employments, setEmployments, loading: isLoading };
};