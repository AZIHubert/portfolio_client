import { UPDATE_PART } from '../mutations';
import { GET_PARTS } from '../queries';

import { errorsNormalize, partsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, workId, onSuccess, onError, onFailure) => useMutation(UPDATE_PART, {
    update(proxy, { data: { updatePart: { OK, part, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_PARTS, variables: partsVariables(workId) });
                const getPart = data.getPart.map(p => {
                    if(p._id === variables.partId) return part;
                    return p;
                });
                proxy.writeQuery({ query: GET_PARTS, variables: partsVariables(workId), data: { getPart } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(part);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});