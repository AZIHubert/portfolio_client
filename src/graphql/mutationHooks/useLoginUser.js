import { LOGIN_USER } from '../mutations';

import { errorsNormalize } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: { OK, errors, token, refreshToken } } }){
        if (OK) {
            if (typeof onSuccess === 'function') onSuccess(token, refreshToken);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});