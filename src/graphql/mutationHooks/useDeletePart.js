import { DELETE_PART } from '../mutations';
import { GET_PARTS } from '../queries';

import { partsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, workId, onSuccess, onError, onFailure) => useMutation(DELETE_PART, {
    update(proxy, { data: { deletePart } }){
        if (deletePart) {
            try {
                const { getParts } = proxy.readQuery({ query: GET_PARTS, variables: partsVariables(workId) });
                const newParts = getParts.filter(t => t._id !== variables.partId);
                proxy.writeQuery({ query: GET_PARTS, variables: partsVariables(workId), data: { getParts: newParts } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});