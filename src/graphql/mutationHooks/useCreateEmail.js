import { CREATE_EMAIL } from '../mutations';

import { errorsNormalize } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_EMAIL, {
    update(_, { data: { createEmail: { OK, errors } } }){
        if (OK) { if (typeof onSuccess === 'function') onSuccess(); }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});