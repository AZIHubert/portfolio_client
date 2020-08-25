import { CREATE_IMAGE } from '../mutations';
import { GET_IMAGES } from '../queries';

import { errorsNormalize, imagesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_IMAGE, {
    update(proxy, { data: { createImage: { OK, image, errors } }}){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_IMAGES, variables: imagesVariables });
                const getImages = [...data.getImages, image].sort((a, b) => {
                    if(a.title < b.title) return 1;
                    if(a.title > b.title) return -1;
                    if(a.createdAt < b.createdAt) return 1;
                    if(a.createdAt > b.createdAt) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_IMAGES, variables: imagesVariables, data: { getImages } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(image);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});