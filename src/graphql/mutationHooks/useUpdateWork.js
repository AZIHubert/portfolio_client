import UPDATE_WORK from '../mutations/updateWork';
import GET_WORKS from '../queries/getWorks';

import { errorsNormalize, worksVariables, displayedWorksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_WORK, {
    update(proxy, { data: { updateWork: { OK, errors, work } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_WORKS, variables: worksVariables });
                const getWorks = data.getWorks.map(w => {
                    if(w._id === variables.typeId) return work;
                    return w;
                });
                proxy.writeQuery({ query: GET_WORKS, variables: worksVariables, data: { getWorks } });
            } catch (e) {}
            if (work.display) {
                try {
                    const data = proxy.readQuery({ query: GET_WORKS, variables: displayedWorksVariables });
                    const getWorks = data.getWorks.map(w => {
                        if(w._id === variables.typeId) return work;
                        return w;
                    });
                    proxy.writeQuery({ query: GET_WORKS, variables: displayedWorksVariables, data: { getWorks } });
                } catch(e) {}
            }
            if (typeof onSuccess === 'function') onSuccess(work);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});