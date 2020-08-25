import { UPDATE_CONTENT } from '../mutations';
import { GET_CONTENTS } from '../queries';

import { errorsNormalize, contentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_CONTENT, {
    update(proxy, { data: { updateContent: { OK, content, errors } } }){
        if (OK) {
            try {
                let data = proxy.readQuery({ query: GET_CONTENTS, variables: contentsVariables(content.block) });
                const getContents = data.getContents.map(b => {
                    if(b._id === variables.contentId) return content;
                    return b;
                });
                proxy.writeQuery({ query: GET_CONTENTS, variables: contentsVariables(content.block), data: { getContents } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(content);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});