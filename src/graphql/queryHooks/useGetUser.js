import { useState, useEffect } from 'react';

import { GET_USER } from '../queries';

import { userNormalize } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (userId, onSuccess, onError) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_USER, { variables: { userId } });
    
    useEffect(() => {
        const onCompleted = data => {
            const dataNormalized = userNormalize(data.getUser);
            setUser(dataNormalized);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(dataNormalized);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error) {
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { user, setUser, loading: isLoading }
};