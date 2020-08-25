import { CREATE_EMPLOYMENT } from '../mutations';
import { GET_EMPLOYMENTS } from '../queries';

import { errorsNormalize, employmentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_EMPLOYMENT, {
    update(proxy, { data: { createEmployment: { OK, employment, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables });
                const getEmployments = [...data.getEmployments, employment].sort((a, b) => {
                    if(a.yearFrom < b.yearFrom) return 1;
                    if(a.yearFrom > b.yearFrom) return -1;
                    if(a.yearTo < b.yearTo) return 1;
                    if(a.yearTo > b.yearTo) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables, data: { getEmployments } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(employment);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});