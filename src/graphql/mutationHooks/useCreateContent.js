import { CREATE_CONTENT } from '../mutations';
import { GET_CONTENTS } from '../queries';

import { errorsNormalize, contentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_CONTENT, {
    update(proxy, { data: { createContent: { OK, content, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_CONTENTS, variables: contentsVariables(variables.blockId) });
                const getContents = [...data.getContents, content];
                proxy.writeQuery({ query: GET_CONTENTS, variables: contentsVariables(variables.blockId), data: { getContents } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(content);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});