import UPDATE_WORKSHOP from '../mutations/updateWorkshop';
import GET_WORKSHOPS from '../queries/getWorkshops';

import { errorsNormalize, workshopsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(UPDATE_WORKSHOP, {
    update(proxy, { data: { updateWorkshop: { OK, workshop, errors } } }){
        if (OK) {
            try {
                const data = proxy.readQuery({ query: GET_WORKSHOPS, variables: workshopsVariables });
                const getWorkshops = data.getWorkshops.map(w => {
                    if(w._id === variables.workshopId) return workshop;
                    return w;
                }).sort((a, b) => {
                    if(a.year < b.year) return 1;
                    if(a.year > b.year) return -1;
                    if(a.artist > b.artist) return 1;
                    if(a.artist < b.artist) return -1;
                    return 0;
                });
                proxy.writeQuery({ query: GET_WORKSHOPS, variables: workshopsVariables, data: { getWorkshops } });
            } catch (e) {}
            if (typeof onSuccess === 'function') onSuccess(workshop);
        }
        else if (typeof onError === 'function') onError(errorsNormalize(errors));
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});