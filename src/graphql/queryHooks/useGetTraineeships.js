import { useState, useEffect } from 'react';

import { GET_TRAINEESHIPS } from '../queries';

import { traineeshipsVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [traineeships, setTraineeships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_TRAINEESHIPS, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setTraineeships(data.getTraineeships);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getTraineeships);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { traineeships, setTraineeships, loading: isLoading };
};