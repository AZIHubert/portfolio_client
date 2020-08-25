import { CREATE_WORK } from '../mutations';
import { GET_WORKS } from '../queries';

import { errorsNormalize, worksVariables, displayedWorksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_WORK, {
    update(proxy, { data: { createWork: { OK, work, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_WORKS, variables: worksVariables });
                const getWorks = [work, ...data.getWorks];
                proxy.writeQuery({ query: GET_WORKS, variables: worksVariables, data: { getWorks } });
            } catch(e) {}
            if (work.display) try{
                const data = proxy.readQuery({ query: GET_WORKS, variables: displayedWorksVariables });
                const getWorks = [work, ...data.getWorks];
                proxy.writeQuery({ query: GET_WORKS, variables: displayedWorksVariables, data: { getWorks } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(work);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});