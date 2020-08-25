import { CREATE_USER } from '../mutations';

import { errorsNormalize } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_USER, {
    update(_, { data: { createUser: { OK, errors, user } } }){
        if (OK) {
            if (typeof onSuccess === 'function') onSuccess(user);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});