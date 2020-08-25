import { MOVE_WORK } from '../mutations';
import { GET_WORKS } from '../queries';

import { errorsNormalize, worksVariables, displayedWorksVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(MOVE_WORK, {
    update(proxy, { data: { moveWork: { OK, errors, works }} }){
        if (OK) {
            try {
                proxy.writeQuery({ query: GET_WORKS, variables: worksVariables, data: { getWorks: works } });
            } catch (e) {}
            if (works.display) {
                try {
                    const getDisplayedWorks = works.filter(work => work.display)
                    proxy.writeQuery({ query: GET_WORKS, variables: displayedWorksVariables, data: { getWorks: getDisplayedWorks } });
                } catch (e) {}
            }
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});