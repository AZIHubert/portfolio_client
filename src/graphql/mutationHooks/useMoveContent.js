import { MOVE_CONTENT } from '../mutations';
import { GET_CONTENTS } from '../queries';

import { errorsNormalize, contentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, blockId, onSuccess, onError, onFailure) => useMutation(MOVE_CONTENT, {
    update(proxy, { data : { moveContent: { OK, errors, contents } } }){
        if (OK) {
            try {
                proxy.writeQuery({ query: GET_CONTENTS, variables: contentsVariables(blockId), data: { getContents: contents } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});