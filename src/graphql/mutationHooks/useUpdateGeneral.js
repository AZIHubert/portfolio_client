import { UPDATE_GENERAL } from '../mutations';
import { GET_GENERAL } from '../queries';

import { errorsNormalize } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_GENERAL, {
    update(proxy, { data: { updateGeneral: { OK, errors, general } } }){
        if (OK) {
            try {
                proxy.writeQuery({ query: GET_GENERAL, data: { getGeneral: general } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(general);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});