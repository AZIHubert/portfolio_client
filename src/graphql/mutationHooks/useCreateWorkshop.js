import { CREATE_WORKSHOP } from '../mutations';
import { GET_WORKSHOPS } from '../queries';

import { errorsNormalize, workshopsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(CREATE_WORKSHOP, {
    update(proxy, { data: { createWorkshop: { OK, workshop, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_WORKSHOPS, variables: workshopsVariables });
                const getWorkshops = [...data.getWorkshops, workshop].sort((a, b) => {
                    if(a.year < b.year) return 1;
                    if(a.year > b.year) return -1;
                    if(a.artist > b.artist) return 1;
                    if(a.artist < b.artist) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_WORKSHOPS, variables: workshopsVariables, data: { getWorkshops } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess(workshop);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});