import { useState, useEffect } from 'react';

import { GET_GENERAL } from '../queries';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [general, setGeneral] = useState({});

    const { data, error, loading } = useQuery(GET_GENERAL);

    useEffect(() => {
        const onCompleted = data => {
            setGeneral(data.getGeneral);
            if (typeof onSuccess === 'function') onSuccess(data.getGeneral);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { general, loading, setGeneral };
};