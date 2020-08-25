import { MOVE_PART } from '../mutations';
import { GET_PARTS } from '../queries';

import { errorsNormalize, partsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, workId, onSuccess, onError, onFailure) => useMutation(MOVE_PART, {
    update(proxy, { data: { movePart: { OK, errors, parts: getParts } } }){
        if (OK) {
            try {
                proxy.writeQuery({ query: GET_PARTS, variables: partsVariables(workId), data: { getParts } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});