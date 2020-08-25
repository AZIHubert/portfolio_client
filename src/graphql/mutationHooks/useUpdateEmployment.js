import { UPDATE_EMPLOYMENT } from '../mutations';
import { GET_EMPLOYMENTS } from '../queries';

import { errorsNormalize, employmentsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_EMPLOYMENT, {
    update(proxy, { data: { updateEmployment: { OK, employment, errors } } }){
        if(OK) {
            const data = proxy.readQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables });
            const getEmployments = data.getEmployments.map(e => {
                if(e._id === variables.employmentId) return employment;
                return e;
            }).sort((a, b) => {
                if(a.yearTo < b.yearTo) return 1;
                if(a.yearTo > b.yearTo) return -1;
                if(a.yearFrom < b.yearFrom) return 1;
                if(a.yearFrom > b.yearFrom) return -1;
                return 0;
            });
            proxy.writeQuery({ query: GET_EMPLOYMENTS, variables: employmentsVariables, data: { getEmployments } });
            if (typeof onSuccess === 'function') onSuccess(employment);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});