import { CREATE_PART } from '../mutations';
import { GET_PARTS } from '../queries';

import { errorsNormalize, partsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_PART, {
    update(proxy, { data: { createPart: { OK, part, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_PARTS, variables: partsVariables(variables.workId) });
                const getParts = [...data.getParts, part];
                proxy.writeQuery({ query: GET_PARTS, variables: partsVariables(variables.workId), data: { getParts } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(part);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});