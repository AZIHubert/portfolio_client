import { DELETE_IMAGE } from '../mutations';
import { GET_IMAGES } from '../queries';

import { imagesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_IMAGE, {
    update(proxy, { data: { deleteImage } }){
        if (deleteImage) {
            try {
                const data = proxy.readQuery({ query: GET_IMAGES, variables: imagesVariables });
                const getImages = data.getImages.filter(image => image._id !== variables.imageId);
                proxy.writeQuery({ query: GET_IMAGES, variables: imagesVariables, data: { getImages } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});