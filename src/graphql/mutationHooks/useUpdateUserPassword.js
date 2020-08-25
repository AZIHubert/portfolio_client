import { UPDATE_USER_PASSWORD } from '../mutations';

import { errorsNormalize } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_USER_PASSWORD, {
    update(_, { data: { updateUserPassword: { OK, errors, token, refreshToken } } }){
        if (OK) {
            if (typeof onSuccess === 'function') onSuccess(token, refreshToken);
        } else {
            if (typeof onError === 'function') onError(errorsNormalize(errors));
        }
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});