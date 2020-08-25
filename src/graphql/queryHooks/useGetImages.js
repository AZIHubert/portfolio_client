import { useState, useEffect } from 'react';

import { GET_IMAGES } from '../queries';

import { imagesVariables as variables } from '../util';

import { useQuery } from '@apollo/react-hooks';

export default (onSuccess, onError) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { loading, data, error } = useQuery(GET_IMAGES, { variables });
    
    useEffect(() => {
        const onCompleted = data => {
            setImages(data.getImages);
            setIsLoading(false);
            if (typeof onSuccess === 'function') onSuccess(data.getImages);
        };
        if (!loading && !error) onCompleted(data);
        if (!loading && error){
            setIsLoading(false);
            if (typeof onError === 'function') onError(error);
        }
    }, [loading, data, error, onSuccess, onError]);

    return { images, setImages, loading: isLoading };
};