import { useState, useEffect } from 'react';

import { GET_USERS } from '../queries';

import { userNormalize, usersVariables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (userId, onSuccess, onError) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_USERS, { variables: usersVariables(userId) });

    useEffect(() => {
        const onCompleted = data => {
            const dataNormalized = data.getUsers.map(user => userNormalize(user));
            setUsers(data.getUsers);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(dataNormalized);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return {users, setUsers, loading: isLoading };
};