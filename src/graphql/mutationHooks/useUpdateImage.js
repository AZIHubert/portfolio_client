import { UPDATE_IMAGE } from '../mutations';
import { GET_IMAGES } from '../queries';

import { errorsNormalize, imagesVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_IMAGE, {
    update(proxy, { data: { updateImage: { OK, image, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_IMAGES, variables: imagesVariables });
                const getImages = data.getImages.map(e => {
                    if(e._id === variables.imageId) return image;
                    return e;
                }).sort((a, b) => {
                    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if(a.createdAt > b.createdAt) return -1;
                    if(a.createdAt < b.createdAt) return 1;
                    else return 0
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