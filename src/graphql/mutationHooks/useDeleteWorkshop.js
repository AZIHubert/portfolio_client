import { DELETE_WORKSHOP } from '../mutations';
import { GET_WORKSHOPS } from '../queries';

import { workshopsVariables } from '../util';

import { useMutation } from '@apollo/react-hooks';

export default (variables, onSuccess, onError, onFailure) => useMutation(DELETE_WORKSHOP, {
    update(proxy, { data: { deleteWorkshop } }){
        if (deleteWorkshop) {
            try {
                const data = proxy.readQuery({ query: GET_WORKSHOPS, variables: workshopsVariables });
                const getWorkshops = data.getWorkshops.filter(workshop => workshop._id !== variables.workshopId);
                proxy.writeQuery({ query: GET_WORKSHOPS, variables: workshopsVariables, data: { getWorkshops } });
            } catch(e) {}
            if (typeof onSuccess === 'function') onSuccess();
        }
        else if (typeof onError === 'function') onError();
    },
    onError(){ if (typeof onFailure === 'function') onFailure(); },
    variables
});